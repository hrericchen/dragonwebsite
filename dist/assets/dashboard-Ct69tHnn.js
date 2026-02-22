import{i as o,t as v}from"./theme-toggle-BN4tHHK6.js";import{o as p,a as l,s as u}from"./firebase-Dm7jUCH0.js";o();const n=[{id:1,name:"Endurance Base Building",season:"Winter 2026",daysPerWeek:4,priority:"High",progress:72,tasks:"18 / 25 workouts completed",due:"Feb 28, 2026",status:"In Progress"},{id:2,name:"Sprint Technique Focus",season:"Spring 2026",daysPerWeek:3,priority:"Medium",progress:45,tasks:"9 / 20 workouts completed",due:"Mar 15, 2026",status:"In Progress"},{id:3,name:"Stroke Refinement (Butterfly)",season:"Summer 2026",daysPerWeek:5,priority:"Low",progress:0,tasks:"0 / 12 workouts completed",due:"Apr 30, 2026",status:"Not Started"},{id:4,name:"Fall Conditioning",season:"Fall 2025",daysPerWeek:3,priority:"High",progress:100,tasks:"30 / 30 workouts completed",due:"Nov 20, 2025",status:"Completed"}],c=[{id:1,name:"Regional Championships",date:"Mar 8, 2026",location:"Aquatic Center",events:["100m Free","200m IM","50m Fly"],status:"Registered"},{id:2,name:"Spring Invitational",date:"Apr 12, 2026",location:"City Pool Complex",events:["200m Free","100m Back"],status:"Open"},{id:3,name:"State Qualifiers",date:"May 3, 2026",location:"State Aquatic Facility",events:["100m Free","50m Fly","200m IM"],status:"Open"},{id:4,name:"Winter Classic",date:"Dec 15, 2025",location:"Dragon Home Pool",events:["50m Free","100m Breast"],status:"Completed"}],h=[{day:"Monday",time:"5:30 AM – 7:00 AM",group:"Competitive",focus:"Endurance & Distance",coach:"Coach Martinez"},{day:"Monday",time:"4:00 PM – 5:30 PM",group:"Intermediate",focus:"Stroke Technique",coach:"Coach Kim"},{day:"Tuesday",time:"5:30 AM – 7:00 AM",group:"Competitive",focus:"Sprint Training",coach:"Coach Martinez"},{day:"Wednesday",time:"5:30 AM – 7:00 AM",group:"Competitive",focus:"IM & Medley",coach:"Coach Davis"},{day:"Wednesday",time:"4:00 PM – 5:30 PM",group:"Beginner",focus:"Fundamentals",coach:"Coach Kim"},{day:"Thursday",time:"5:30 AM – 7:00 AM",group:"Competitive",focus:"Race Pace Sets",coach:"Coach Martinez"},{day:"Friday",time:"5:30 AM – 7:00 AM",group:"Competitive",focus:"Recovery & Drill",coach:"Coach Davis"},{day:"Saturday",time:"8:00 AM – 10:00 AM",group:"All Levels",focus:"Open Practice",coach:"All Coaches"}];let d="overview";function r(){document.getElementById("app"),p(l,a=>{if(!a){window.location.href="/dragonwebsite/signin.html";return}m(a)})}function m(a){const e=document.getElementById("app");e.innerHTML=`
    <div class="dash-layout">
      <!-- Sidebar -->
      <aside class="dash-sidebar" id="dash-sidebar">
        <div class="dash-sidebar-header">
          <a href="/dragonwebsite/" class="dash-logo">
            <img src="/dragonwebsite/logo-light.jpg" alt="Dragon Swim Team" class="dash-logo-img light-logo" />
            <img src="/dragonwebsite/logo-dark.png" alt="Dragon Swim Team" class="dash-logo-img dark-logo" />
          </a>
        </div>
        <nav class="dash-nav">
          <div class="dash-nav-section">
            <span class="dash-nav-label">Menu</span>
            <button class="dash-nav-item ${d==="overview"?"active":""}" data-tab="overview">
              <span class="dash-nav-icon">📊</span> Overview
            </button>
            <button class="dash-nav-item ${d==="plans"?"active":""}" data-tab="plans">
              <span class="dash-nav-icon">📋</span> Swim Plans
            </button>
            <button class="dash-nav-item ${d==="meets"?"active":""}" data-tab="meets">
              <span class="dash-nav-icon">🏆</span> Swim Meets
            </button>
            <button class="dash-nav-item ${d==="schedule"?"active":""}" data-tab="schedule">
              <span class="dash-nav-icon">📅</span> Schedule
            </button>
          </div>
          <div class="dash-nav-section" style="margin-top: auto;">
            <span class="dash-nav-label">System</span>
            <a href="/dragonwebsite/contact.html" class="dash-nav-item" style="text-decoration: none;">
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
              <h1 class="dash-page-title">${g(d)}</h1>
              <p class="dash-page-subtitle">${y(d)}</p>
            </div>
          </div>
          <div class="dash-topbar-right">
            <div class="dash-search">
              <span class="dash-search-icon">🔍</span>
              <input type="text" class="dash-search-input" placeholder="Search...">
            </div>
            <div class="dash-user">
              <div class="dash-avatar" id="dash-user-initial">${(a.displayName||a.email||"D").charAt(0).toUpperCase()}</div>
              <div class="dash-user-name" id="dash-user-name-display">${a.displayName||a.email||"Swimmer"}</div>
            </div>
          </div>
        </header>

        <!-- Dynamic Content -->
        <div class="dash-content">
          ${b(d)}
        </div>
      </main>
    </div>
  `,T(),o(),$()}function g(a){return{overview:"Dashboard",plans:"Swim Plans",meets:"Swim Meets",schedule:"Practice Schedule"}[a]||"Dashboard"}function y(a){return{overview:"Overview of your swim season at a glance",plans:"Track and manage your training plans",meets:"View registered and upcoming competitions",schedule:"Your weekly practice timetable"}[a]||""}function b(a){switch(a){case"overview":return w();case"plans":return S();case"meets":return P();case"schedule":return k();default:return""}}function $(){const a=document.getElementById("sidebar-theme-icon");if(a){const e=document.documentElement.getAttribute("data-theme")==="dark";a.textContent=e?"☀️":"🌙"}}function w(){const a=n.filter(s=>s.status!=="Completed").length,e=n.filter(s=>s.status==="Completed").length,t=c.filter(s=>s.status!=="Completed").length;return`
    <div class="dash-stats-row">
      <div class="dash-stat-card">
        <div class="dash-stat-number">${n.length}</div>
        <div class="dash-stat-label">Total Plans</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-number">${a}</div>
        <div class="dash-stat-label">Active Plans</div>
      </div>
      <div class="dash-stat-card accent">
        <div class="dash-stat-number">${e}</div>
        <div class="dash-stat-label">Completed</div>
      </div>
      <div class="dash-stat-card">
        <div class="dash-stat-number">${t}</div>
        <div class="dash-stat-label">Upcoming Meets</div>
      </div>
    </div>

    <div class="dash-overview-grid">
      <div class="dash-panel">
        <h3 class="dash-panel-title">Active Swim Plans</h3>
        <div class="dash-panel-body">
          ${n.filter(s=>s.status!=="Completed").map(s=>f(s)).join("")}
        </div>
      </div>
      <div class="dash-panel">
        <h3 class="dash-panel-title">Upcoming Meets</h3>
        <div class="dash-panel-body">
          ${c.filter(s=>s.status!=="Completed").map(s=>M(s)).join("")}
        </div>
      </div>
    </div>

    <div class="dash-panel">
      <h3 class="dash-panel-title">Today's Practice</h3>
      <div class="dash-panel-body">
        ${C()}
      </div>
    </div>
  `}function f(a){return`
    <div class="dash-mini-card">
      <div class="dash-mini-top">
        <span class="dash-mini-name">${a.name}</span>
        <span class="priority-badge priority-${a.priority.toLowerCase()}">${a.priority}</span>
      </div>
      <div class="dash-progress-row">
        <div class="dash-progress-bar"><div class="dash-progress-fill" style="width: ${a.progress}%"></div></div>
        <span class="dash-progress-pct">${a.progress}%</span>
      </div>
    </div>
  `}function M(a){return`
    <div class="dash-mini-card">
      <div class="dash-mini-top">
        <span class="dash-mini-name">${a.name}</span>
        <span class="status-badge status-${a.status.toLowerCase().replace(" ","-")}">${a.status}</span>
      </div>
      <div class="dash-mini-meta">${a.date} · ${a.location}</div>
    </div>
  `}function C(){const e=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()],t=h.filter(s=>s.day===e);return t.length===0?`<p class="dash-empty">No practices scheduled for today (${e}). Rest day! 🎉</p>`:t.map(s=>`
    <div class="dash-mini-card">
      <div class="dash-mini-top">
        <span class="dash-mini-name">${s.focus}</span>
        <span class="group-badge">${s.group}</span>
      </div>
      <div class="dash-mini-meta">${s.time} · ${s.coach}</div>
    </div>
  `).join("")}function S(){return`
    <div class="dash-cards-grid">
      ${n.map(a=>`
        <div class="dash-card">
          <div class="dash-card-header">
            <h3 class="dash-card-title">${a.name}</h3>
            <div class="dash-card-badges">
              <span class="status-badge status-${a.status.toLowerCase().replace(" ","-")}">${a.status}</span>
              <span class="priority-badge priority-${a.priority.toLowerCase()}">${a.priority}</span>
            </div>
          </div>
          <div class="dash-card-body">
            <div class="dash-card-row">
              <span class="dash-card-label">Progress</span>
              <span class="dash-card-value">${a.progress}%</span>
            </div>
            <div class="dash-progress-bar"><div class="dash-progress-fill" style="width: ${a.progress}%"></div></div>
            <div class="dash-card-meta">
              <span>📅 Season: ${a.season}</span>
              <span>Training: ${a.daysPerWeek} Days/Week</span>
            </div>
            <div class="dash-card-meta">
              <span>📋 ${a.tasks}</span>
              <span>Due: ${a.due}</span>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `}function P(){return`
    <div class="dash-cards-grid">
      ${c.map(a=>`
        <div class="dash-card">
          <div class="dash-card-header">
            <h3 class="dash-card-title">${a.name}</h3>
            <span class="status-badge status-${a.status.toLowerCase().replace(" ","-")}">${a.status}</span>
          </div>
          <div class="dash-card-body">
            <div class="dash-card-meta">
              <span>📅 ${a.date}</span>
              <span>📍 ${a.location}</span>
            </div>
            <div class="dash-card-events">
              <span class="dash-card-label">Events</span>
              <div class="dash-event-tags">
                ${a.events.map(e=>`<span class="event-tag">${e}</span>`).join("")}
              </div>
            </div>
            ${a.status==="Open"?'<button class="btn btn-primary dash-register-btn">Register</button>':""}
          </div>
        </div>
      `).join("")}
    </div>
  `}function k(){return`
    <div class="dash-schedule-grid">
      ${["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map(e=>{const t=h.filter(s=>s.day===e);return`
          <div class="dash-schedule-day">
            <h3 class="dash-schedule-day-name">${e}</h3>
            ${t.length===0?'<p class="dash-empty-sm">No practice</p>':t.map(s=>`
                <div class="dash-schedule-item">
                  <div class="dash-schedule-time">${s.time}</div>
                  <div class="dash-schedule-focus">${s.focus}</div>
                  <div class="dash-schedule-meta">
                    <span class="group-badge">${s.group}</span>
                    <span>${s.coach}</span>
                  </div>
                </div>
              `).join("")}
          </div>
        `}).join("")}
    </div>
  `}function T(){var t,s;document.querySelectorAll(".dash-nav-item[data-tab]").forEach(i=>{i.addEventListener("click",()=>{d=i.dataset.tab,r()})}),(t=document.getElementById("dash-theme-toggle"))==null||t.addEventListener("click",()=>{v(),r()});const a=document.getElementById("dash-hamburger"),e=document.getElementById("dash-sidebar");a==null||a.addEventListener("click",()=>{e.classList.toggle("open")}),document.querySelectorAll(".dash-register-btn").forEach(i=>{i.addEventListener("click",()=>{window.location.href="/dragonwebsite/registration.html"})}),(s=document.getElementById("sidebar-signout"))==null||s.addEventListener("click",async()=>{try{await u(l),window.location.href="/dragonwebsite/signin.html"}catch(i){console.error("Error signing out:",i)}})}r();
