/**
 * Dashboard Page — Dragon Swim Team
 * TaskFlow-inspired dashboard with sidebar + cards for swim plans, meets, schedules
 */

import '../styles/reset.css';
import '../styles/variables.css';
import '../styles/global.css';
import './dashboard.css';

import { initTheme, toggleTheme, updateToggleIcon } from '../components/theme-toggle.js';
import { t } from '../utils/i18n.js';
import { auth, db, doc, getDoc, onAuthStateChanged, signOut } from '../utils/firebase.js';

initTheme();

// ── Sample Data ──
const swimPlans = [
  { id: 1, name: 'Endurance Base Building', season: 'Winter 2026', daysPerWeek: 4, priority: 'High', progress: 72, tasks: '18 / 25 workouts completed', due: 'Feb 28, 2026', status: 'In Progress' },
  { id: 2, name: 'Sprint Technique Focus', season: 'Spring 2026', daysPerWeek: 3, priority: 'Medium', progress: 45, tasks: '9 / 20 workouts completed', due: 'Mar 15, 2026', status: 'In Progress' },
  { id: 3, name: 'Stroke Refinement (Butterfly)', season: 'Summer 2026', daysPerWeek: 5, priority: 'Low', progress: 0, tasks: '0 / 12 workouts completed', due: 'Apr 30, 2026', status: 'Not Started' },
  { id: 4, name: 'Fall Conditioning', season: 'Fall 2025', daysPerWeek: 3, priority: 'High', progress: 100, tasks: '30 / 30 workouts completed', due: 'Nov 20, 2025', status: 'Completed' },
];

const swimMeets = [
  { id: 1, name: 'Regional Championships', date: 'Mar 8, 2026', location: 'Aquatic Center', events: ['100m Free', '200m IM', '50m Fly'], status: 'Registered' },
  { id: 2, name: 'Spring Invitational', date: 'Apr 12, 2026', location: 'City Pool Complex', events: ['200m Free', '100m Back'], status: 'Open' },
  { id: 3, name: 'State Qualifiers', date: 'May 3, 2026', location: 'State Aquatic Facility', events: ['100m Free', '50m Fly', '200m IM'], status: 'Open' },
  { id: 4, name: 'Winter Classic', date: 'Dec 15, 2025', location: 'Dragon Home Pool', events: ['50m Free', '100m Breast'], status: 'Completed' },
];

const practiceSchedules = [
  { day: 'Monday', time: '5:30 AM – 7:00 AM', group: 'Competitive', focus: 'Endurance & Distance', coach: 'Coach Martinez' },
  { day: 'Monday', time: '4:00 PM – 5:30 PM', group: 'Intermediate', focus: 'Stroke Technique', coach: 'Coach Kim' },
  { day: 'Tuesday', time: '5:30 AM – 7:00 AM', group: 'Competitive', focus: 'Sprint Training', coach: 'Coach Martinez' },
  { day: 'Wednesday', time: '5:30 AM – 7:00 AM', group: 'Competitive', focus: 'IM & Medley', coach: 'Coach Davis' },
  { day: 'Wednesday', time: '4:00 PM – 5:30 PM', group: 'Beginner', focus: 'Fundamentals', coach: 'Coach Kim' },
  { day: 'Thursday', time: '5:30 AM – 7:00 AM', group: 'Competitive', focus: 'Race Pace Sets', coach: 'Coach Martinez' },
  { day: 'Friday', time: '5:30 AM – 7:00 AM', group: 'Competitive', focus: 'Recovery & Drill', coach: 'Coach Davis' },
  { day: 'Saturday', time: '8:00 AM – 10:00 AM', group: 'All Levels', focus: 'Open Practice', coach: 'All Coaches' },
];

const coachRoster = [
  { id: 101, name: 'Alice Thompson', group: 'Competitive', age: 14, rank: 'Regional' },
  { id: 102, name: 'Bob Wilson', group: 'Intermediate', age: 12, rank: 'Novice' },
  { id: 103, name: 'Charlie Brown', group: 'Competitive', age: 15, rank: 'State' },
  { id: 104, name: 'Daisy Miller', group: 'Beginner', age: 10, rank: 'Novice' },
  { id: 105, name: 'Ethan Hunt', group: 'Competitive', age: 16, rank: 'National' },
];

// App State
let currentTab = 'overview';
let isMobileMenuOpen = false;

function render() {
  const app = document.getElementById('app');

  // Add auth check before rendering content
  onAuthStateChanged(auth, async (user) => {
    if (!user) {
      // Not signed in, redirect
      window.location.href = import.meta.env.BASE_URL + 'signin.html';
      return; // Stop rendering
    }

    try {
      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      let role = "swimmer"; // Default fallback

      // Override for specific coach email per user request
      if (user.email === 'dragonswim@outlook.com') {
        role = 'coach';
      } else if (userDoc.exists()) {
        role = userDoc.data().role || "swimmer";
      }

      if (role === "coach") {
        renderCoachDashboard(user);
      } else {
        renderDashboard(user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Fallback to normal dashboard if database fails
      renderDashboard(user);
    }
  });
}

function renderDashboard(user) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="dash-layout">
      <!-- Sidebar -->
      <aside class="dash-sidebar" id="dash-sidebar">
        <div class="dash-sidebar-header">
          <a href="${import.meta.env.BASE_URL}" class="dash-logo">
            <img src="${import.meta.env.BASE_URL}logo-light.jpg" alt="Dragon Swim Team" class="dash-logo-img light-logo" />
            <img src="${import.meta.env.BASE_URL}logo-dark.png" alt="Dragon Swim Team" class="dash-logo-img dark-logo" />
          </a>
        </div>
        <nav class="dash-nav">
          <div class="dash-nav-section">
            <span class="dash-nav-label">Menu</span>
            <button class="dash-nav-item ${currentTab === 'overview' ? 'active' : ''}" data-tab="overview">
              <span class="dash-nav-icon">📊</span> Overview
            </button>
            <button class="dash-nav-item ${currentTab === 'plans' ? 'active' : ''}" data-tab="plans">
              <span class="dash-nav-icon">📋</span> Swim Plans
            </button>
            <button class="dash-nav-item ${currentTab === 'meets' ? 'active' : ''}" data-tab="meets">
              <span class="dash-nav-icon">🏆</span> Swim Meets
            </button>
            <button class="dash-nav-item ${currentTab === 'schedule' ? 'active' : ''}" data-tab="schedule">
              <span class="dash-nav-icon">📅</span> Schedule
            </button>
          </div>
          <div class="dash-nav-section" style="margin-top: auto;">
            <span class="dash-nav-label">System</span>
            <a href="${import.meta.env.BASE_URL}contact.html" class="dash-nav-item" style="text-decoration: none;">
              <span class="dash-nav-icon">💬</span> Messages
            </a>
            <button class="dash-nav-item" id="dash-theme-toggle">
              <span class="dash-nav-icon" id="sidebar-theme-icon">🌙</span> Theme
            </button>
            <button class="dash-nav-item" id="sidebar-signout" style="color: var(--color-accent); margin-top: var(--space-md);">
              <span class="dash-nav-icon">🚪</span> Sign Out
            </button>
          </div>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="dash-main">
        <!-- Topbar -->
        <header class="dash-topbar">
          <div class="dash-topbar-left">
            <button class="dash-hamburger" id="dash-hamburger">
              <span></span><span></span><span></span>
            </button>
            <div>
              <h1 class="dash-page-title">${getTabTitle(currentTab)}</h1>
              <p class="dash-page-subtitle">${getTabSubtitle(currentTab)}</p>
            </div>
          </div>
          <div class="dash-topbar-right">
            <div class="dash-search">
              <span class="dash-search-icon">🔍</span>
              <input type="text" class="dash-search-input" placeholder="Search...">
            </div>
            <div class="dash-user">
              <div class="dash-avatar" id="dash-user-initial">${(user.displayName || user.email || 'D').charAt(0).toUpperCase()}</div>
              <div class="dash-user-name" id="dash-user-name-display">${user.displayName || user.email || 'Swimmer'}</div>
            </div>
          </div>
        </header>

        <!-- Dynamic Content -->
        <div class="dash-content">
          ${renderTabContent(currentTab, 'swimmer')}
        </div>
      </main>
    </div>
  `;

  bindEvents();
  initTheme();
  updateSidebarThemeIcon();
}

function renderCoachDashboard(user) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="dash-layout">
      <!-- Sidebar -->
      <aside class="dash-sidebar" id="dash-sidebar">
        <div class="dash-sidebar-header">
          <a href="${import.meta.env.BASE_URL}" class="dash-logo">
            <img src="${import.meta.env.BASE_URL}logo-light.jpg" alt="Dragon Swim Team" class="dash-logo-img light-logo" />
            <img src="${import.meta.env.BASE_URL}logo-dark.png" alt="Dragon Swim Team" class="dash-logo-img dark-logo" />
          </a>
        </div>
        <nav class="dash-nav">
          <div class="dash-nav-section">
            <span class="dash-nav-label">Coach Menu</span>
            <button class="dash-nav-item ${currentTab === 'overview' ? 'active' : ''}" data-tab="overview">
              <span class="dash-nav-icon">🏠</span> Overview
            </button>
            <button class="dash-nav-item ${currentTab === 'roster' ? 'active' : ''}" data-tab="roster">
              <span class="dash-nav-icon">👥</span> Swimmer Roster
            </button>
            <button class="dash-nav-item ${currentTab === 'meets' ? 'active' : ''}" data-tab="meets">
              <span class="dash-nav-icon">🏁</span> Meet Management
            </button>
            <button class="dash-nav-item ${currentTab === 'schedule' ? 'active' : ''}" data-tab="schedule">
              <span class="dash-nav-icon">⏱️</span> Practice Schedule
            </button>
          </div>
          <div class="dash-nav-section" style="margin-top: auto;">
            <span class="dash-nav-label">System</span>
            <button class="dash-nav-item" id="dash-theme-toggle">
              <span class="dash-nav-icon" id="sidebar-theme-icon">🌙</span> Theme
            </button>
            <button class="dash-nav-item" id="sidebar-signout" style="color: var(--color-accent); margin-top: var(--space-md);">
              <span class="dash-nav-icon">🚪</span> Sign Out
            </button>
          </div>
        </nav>
      </aside>

      <!-- Main Content Area -->
      <main class="dash-main">
        <!-- Topbar -->
        <header class="dash-topbar">
          <div class="dash-topbar-left">
            <button class="dash-hamburger" id="dash-hamburger">
              <span></span><span></span><span></span>
            </button>
            <div>
              <h1 class="dash-page-title">Coach: ${getTabTitle(currentTab, 'coach')}</h1>
              <p class="dash-page-subtitle">Managing the Dragon Swim Team roster and sessions</p>
            </div>
          </div>
          <div class="dash-topbar-right">
             <div class="badge badge-primary" style="margin-right: 1rem;">Coach Mode</div>
            <div class="dash-user">
              <div class="dash-avatar" style="background: var(--color-accent); color: white;">${(user.displayName || user.email || 'C').charAt(0).toUpperCase()}</div>
              <div class="dash-user-name">${user.displayName || user.email || 'Coach'}</div>
            </div>
          </div>
        </header>

        <!-- Dynamic Content -->
        <div class="dash-content">
          ${renderTabContent(currentTab, 'coach')}
        </div>
      </main>
    </div>
  `;

  bindEvents();
  initTheme();
  updateSidebarThemeIcon();
}

function getTabTitle(tab, role = 'swimmer') {
  if (role === 'coach') {
    const titles = {
      'overview': 'Coach Dashboard',
      'roster': 'Team Roster',
      'meets': 'Meet Management',
      'schedule': 'Season Schedule',
    };
    return titles[tab] || 'Coach Dashboard';
  }
  const titles = {
    'overview': 'Dashboard',
    'plans': 'Swim Plans',
    'meets': 'Swim Meets',
    'schedule': 'Practice Schedule',
  };
  return titles[tab] || 'Dashboard';
}

function getTabSubtitle(tab) {
  const subs = {
    'overview': 'Overview of your swim season at a glance',
    'plans': 'Track and manage your training plans',
    'meets': 'View registered and upcoming competitions',
    'schedule': 'Your weekly practice timetable',
  };
  return subs[tab] || '';
}

function renderTabContent(tab, role = 'swimmer') {
  if (role === 'coach') {
    switch (tab) {
      case 'overview': return renderCoachOverview();
      case 'roster': return renderCoachRoster();
      case 'meets': return renderSwimMeets(); // Reuse for now
      case 'schedule': return renderSchedule(); // Reuse for now
      default: return renderCoachOverview();
    }
  }
  switch (tab) {
    case 'overview': return renderOverview();
    case 'plans': return renderSwimPlans();
    case 'meets': return renderSwimMeets();
    case 'schedule': return renderSchedule();
    default: return '';
  }
}

function updateSidebarThemeIcon() {
  const themeIcon = document.getElementById('sidebar-theme-icon');
  if (themeIcon) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeIcon.textContent = isDark ? '☀️' : '🌙';
  }
}

// ── Coach Specific Tab Views ──
function renderCoachOverview() {
  return `
    <div class="dash-stats-row">
      <div class="dash-stat-card">
        <div class="dash-stat-number">${coachRoster.length}</div>
        <div class="dash-stat-label">Active Athletes</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-number">12</div>
        <div class="dash-stat-label">New Registrations</div>
      </div>
      <div class="dash-stat-card accent">
        <div class="dash-stat-number">4</div>
        <div class="dash-stat-label">Upcoming Meets</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-number">85%</div>
        <div class="dash-stat-label">Practice Attendance</div>
      </div>
    </div>

    <div class="dash-overview-grid">
      <div class="dash-panel">
        <h3 class="dash-panel-title">Top Athletes</h3>
        <div class="dash-panel-body">
          ${coachRoster.slice(0, 3).map(s => `
            <div class="dash-mini-card">
               <div class="dash-mini-top">
                <span class="dash-mini-name">${s.name}</span>
                <span class="badge badge-primary">${s.rank}</span>
              </div>
              <div class="dash-mini-meta">Group: ${s.group} · Age: ${s.age}</div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="dash-panel">
        <h3 class="dash-panel-title">Recent Announcements</h3>
        <div class="dash-panel-body">
          <div class="dash-mini-card">
            <div class="dash-mini-top"><span class="dash-mini-name">Meet Registration Deadline</span></div>
            <div class="dash-mini-meta">Sent to 45 parents · 2 hours ago</div>
          </div>
          <div class="dash-mini-card">
            <div class="dash-mini-top"><span class="dash-mini-name">New Training Equipment</span></div>
            <div class="dash-mini-meta">Sent to all coaches · Yesterday</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCoachRoster() {
  return `
    <div class="dash-panel">
      <div class="dash-panel-header" style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h3 class="dash-panel-title">Team Management</h3>
        <button class="btn btn-primary btn-sm">+ Add Swimmer</button>
      </div>
      <div class="dash-panel-body">
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="border-bottom: 1px solid var(--border-color); color: var(--text-muted);">
              <th style="padding: 1rem;">Name</th>
              <th style="padding: 1rem;">Group</th>
              <th style="padding: 1rem;">Age</th>
              <th style="padding: 1rem;">Rank</th>
              <th style="padding: 1rem;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${coachRoster.map(s => `
              <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 1rem; font-weight: 500;">${s.name}</td>
                <td style="padding: 1rem;"><span class="group-badge">${s.group}</span></td>
                <td style="padding: 1rem;">${s.age}</td>
                <td style="padding: 1rem;"><span class="status-badge status-registered">${s.rank}</span></td>
                <td style="padding: 1rem;"><button class="btn btn-outline btn-sm">Edit</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Overview Tab ──
function renderOverview() {
  const activePlans = swimPlans.filter(p => p.status !== 'Completed').length;
  const completedPlans = swimPlans.filter(p => p.status === 'Completed').length;
  const upcomingMeets = swimMeets.filter(m => m.status !== 'Completed').length;

  return `
    <div class="dash-stats-row">
      <div class="dash-stat-card">
        <div class="dash-stat-number">${swimPlans.length}</div>
        <div class="dash-stat-label">Total Plans</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-number">${activePlans}</div>
        <div class="dash-stat-label">Active Plans</div>
      </div>
      <div class="dash-stat-card accent">
        <div class="dash-stat-number">${completedPlans}</div>
        <div class="dash-stat-label">Completed</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-number">${upcomingMeets}</div>
        <div class="dash-stat-label">Upcoming Meets</div>
      </div>
    </div>

    <div class="dash-overview-grid">
      <div class="dash-panel">
        <h3 class="dash-panel-title">Active Swim Plans</h3>
        <div class="dash-panel-body">
          ${swimPlans.filter(p => p.status !== 'Completed').map(p => miniPlanCard(p)).join('')}
        </div>
      </div>
      <div class="dash-panel">
        <h3 class="dash-panel-title">Upcoming Meets</h3>
        <div class="dash-panel-body">
          ${swimMeets.filter(m => m.status !== 'Completed').map(m => miniMeetCard(m)).join('')}
        </div>
      </div>
    </div>

    <div class="dash-panel">
      <h3 class="dash-panel-title">Today's Practice</h3>
      <div class="dash-panel-body">
        ${renderTodayPractice()}
      </div>
    </div>
  `;
}

function miniPlanCard(plan) {
  return `
    <div class="dash-mini-card">
      <div class="dash-mini-top">
        <span class="dash-mini-name">${plan.name}</span>
        <span class="priority-badge priority-${plan.priority.toLowerCase()}">${plan.priority}</span>
      </div>
      <div class="dash-progress-row">
        <div class="dash-progress-bar"><div class="dash-progress-fill" style="width: ${plan.progress}%"></div></div>
        <span class="dash-progress-pct">${plan.progress}%</span>
      </div>
    </div>
  `;
}

function miniMeetCard(meet) {
  return `
    <div class="dash-mini-card">
      <div class="dash-mini-top">
        <span class="dash-mini-name">${meet.name}</span>
        <span class="status-badge status-${meet.status.toLowerCase().replace(' ', '-')}">${meet.status}</span>
      </div>
      <div class="dash-mini-meta">${meet.date} · ${meet.location}</div>
    </div>
  `;
}

function renderTodayPractice() {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];
  const todayPractices = practiceSchedules.filter(s => s.day === today);

  if (todayPractices.length === 0) {
    return `<p class="dash-empty">No practices scheduled for today (${today}). Rest day! 🎉</p>`;
  }

  return todayPractices.map(s => `
    <div class="dash-mini-card">
      <div class="dash-mini-top">
        <span class="dash-mini-name">${s.focus}</span>
        <span class="group-badge">${s.group}</span>
      </div>
      <div class="dash-mini-meta">${s.time} · ${s.coach}</div>
    </div>
  `).join('');
}

// ── Swim Plans Tab ──
function renderSwimPlans() {
  return `
    <div class="dash-cards-grid">
      ${swimPlans.map(p => `
        <div class="dash-card">
          <div class="dash-card-header">
            <h3 class="dash-card-title">${p.name}</h3>
            <div class="dash-card-badges">
              <span class="status-badge status-${p.status.toLowerCase().replace(' ', '-')}">${p.status}</span>
              <span class="priority-badge priority-${p.priority.toLowerCase()}">${p.priority}</span>
            </div>
          </div>
          <div class="dash-card-body">
            <div class="dash-card-row">
              <span class="dash-card-label">Progress</span>
              <span class="dash-card-value">${p.progress}%</span>
            </div>
            <div class="dash-progress-bar"><div class="dash-progress-fill" style="width: ${p.progress}%"></div></div>
            <div class="dash-card-meta">
              <span>📅 Season: ${p.season}</span>
              <span>Training: ${p.daysPerWeek} Days/Week</span>
            </div>
            <div class="dash-card-meta">
              <span>📋 ${p.tasks}</span>
              <span>Due: ${p.due}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── Swim Meets Tab ──
function renderSwimMeets() {
  return `
    <div class="dash-cards-grid">
      ${swimMeets.map(m => `
        <div class="dash-card">
          <div class="dash-card-header">
            <h3 class="dash-card-title">${m.name}</h3>
            <span class="status-badge status-${m.status.toLowerCase().replace(' ', '-')}">${m.status}</span>
          </div>
          <div class="dash-card-body">
            <div class="dash-card-meta">
              <span>📅 ${m.date}</span>
              <span>📍 ${m.location}</span>
            </div>
            <div class="dash-card-events">
              <span class="dash-card-label">Events</span>
              <div class="dash-event-tags">
                ${m.events.map(e => `<span class="event-tag">${e}</span>`).join('')}
              </div>
            </div>
            ${m.status === 'Open' ? `<button class="btn btn-primary dash-register-btn">Register</button>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── Schedule Tab ──
function renderSchedule() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return `
    <div class="dash-schedule-grid">
      ${days.map(day => {
    const sessions = practiceSchedules.filter(s => s.day === day);
    return `
          <div class="dash-schedule-day">
            <h3 class="dash-schedule-day-name">${day}</h3>
            ${sessions.length === 0
        ? `<p class="dash-empty-sm">No practice</p>`
        : sessions.map(s => `
                <div class="dash-schedule-item">
                  <div class="dash-schedule-time">${s.time}</div>
                  <div class="dash-schedule-focus">${s.focus}</div>
                  <div class="dash-schedule-meta">
                    <span class="group-badge">${s.group}</span>
                    <span>${s.coach}</span>
                  </div>
                </div>
              `).join('')}
          </div>
        `;
  }).join('')}
    </div>
  `;
}

// ── Events ──
function bindEvents() {
  // Sidebar nav
  document.querySelectorAll('.dash-nav-item[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentTab = btn.dataset.tab;
      render();
    });
  });

  // Theme toggle
  document.getElementById('dash-theme-toggle')?.addEventListener('click', () => {
    toggleTheme();
    render();
  });

  // Mobile sidebar toggle
  const hamburger = document.getElementById('dash-hamburger');
  const sidebar = document.getElementById('dash-sidebar');
  hamburger?.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Register buttons
  document.querySelectorAll('.dash-register-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = import.meta.env.BASE_URL + 'registration.html';
    });
  });

  // Sign out button
  document.getElementById('sidebar-signout')?.addEventListener('click', async () => {
    try {
      await signOut(auth);
      // Redirect happens automatically due to onAuthStateChanged, but we can force it:
      window.location.href = import.meta.env.BASE_URL + 'signin.html';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  });
}

// Initial render
render();
