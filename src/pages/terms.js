import '../styles/reset.css';
import '../styles/variables.css';
import '../styles/global.css';
import '../styles/navbar.css';
import '../styles/footer.css';

import { initTheme } from '../components/theme-toggle.js';
import { renderNavbar } from '../components/navbar.js';
import { renderFooter } from '../components/footer.js';

initTheme();
renderNavbar();

const app = document.getElementById('app');
app.innerHTML = `
  <section class="section" style="min-height: calc(100vh - var(--nav-height)); align-content: center;">
    <div class="container" style="max-width: 800px;">
      <h1 class="section-title">Terms & Conditions</h1>
      <div class="divider" style="margin: var(--space-md) 0;"></div>
      <div style="background: var(--bg-card); padding: var(--space-2xl); border-radius: var(--radius-lg); border: 1px solid var(--border-color); color: var(--text-secondary); line-height: 1.8;">
        <p><em>[Placeholder: Insert your Terms & Conditions content here. This covers rules of conduct, payment terms, and platform usage guidelines.]</em></p>
      </div>
    </div>
  </section>
`;

renderFooter();
