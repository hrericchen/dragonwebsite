/**
 * Registration Page — Dragon Swim Team
 */

import '../styles/reset.css';
import '../styles/variables.css';
import '../styles/global.css';
import '../styles/navbar.css';
import '../styles/footer.css';
import './registration.css';

import { initTheme } from '../components/theme-toggle.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';

initTheme();
renderNavbar();

const app = document.getElementById('app');
app.innerHTML = `
  <section class="section" style="min-height: calc(100vh - var(--nav-height)); display: flex; align-items: center;">
    <div class="container" style="max-width: 800px;">
      <div class="text-center" style="margin-bottom: var(--space-2xl);">
        <h1 class="section-title">Join Dragon Swim Team</h1>
        <div class="divider" style="margin: var(--space-md) auto;"></div>
        <p class="section-subtitle" style="margin: 0 auto;">Everything you need to know to become part of the team.</p>
      </div>

      <article class="registration-article" style="background: var(--bg-card); border-radius: var(--radius-lg); padding: var(--space-2xl); border: 1px solid var(--border-color); line-height: 1.8; color: var(--text-secondary);">
        
        <h3 style="color: var(--text-primary); font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 1rem;">1. Create an Account</h3>
        <p style="margin-bottom: 1.5rem;">The first step in joining is creating an account on our platform. Your account will give you access to our dashboard where you can manage your practices, upcoming swim meets, and communicate with our coaches. You can quickly register using your email or a Google account.</p>

        <h3 style="color: var(--text-primary); font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 1rem;">2. Schedule a Tryout</h3>
        <p style="margin-bottom: 1.5rem;">After creating your account, we require all prospective swimmers to schedule a brief tryout evaluation with our coaching staff. This ensures that we place you in the appropriate training group based on your current skill level, endurance, and stroke technique. Tryouts typically take around 20-30 minutes.</p>

        <h3 style="color: var(--text-primary); font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 1rem;">3. Submit Paperwork</h3>
        <p style="margin-bottom: 1.5rem;">Once a coach completes your evaluation and assigns a training group, you will receive notifications in your dashboard. You will then need to complete basic registration paperwork, choose your seasonal commitment (Spring, Summer, Fall, Winter), and submit it.</p>

        <h3 style="color: var(--text-primary); font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 1rem;">4. Dive In!</h3>
        <p style="margin-bottom: 1.5rem;">Once everything is set, you're officially part of the Dragon Swim Team! Check your dashboard practice schedule to see your first training session.</p>

        <div style="text-align: center; margin-top: 2rem;">
          <a href="/signin.html" class="btn btn-primary" style="font-size: 1.25rem; padding: 1rem 3rem;">Start Registration / Sign Up</a>
        </div>
      </article>

    </div>
  </section>
`;

renderFooter();
