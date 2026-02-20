import{i as c}from"./theme-toggle-BN4tHHK6.js";import{r as n,t as a,a as l}from"./footer-DhSf7lCj.js";c();n();const d=document.getElementById("app");d.innerHTML=`
  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-grid-bg"></div>
    <div class="container hero-container">
      <div class="hero-left animate-on-scroll">
        <div class="hero-badge badge badge-primary">🏊 Year-Round Competitive Swimming</div>
        <h1 class="hero-title">Train, Compete &amp; Grow with <span class="text-gradient">Dragon Swim</span></h1>
        <p class="hero-subtitle">${a("hero_subtitle")}</p>
        <div class="hero-actions">
          <a href="/registration.html" class="btn btn-gradient btn-lg">
            ${a("hero_cta")} <span class="btn-arrow">→</span>
          </a>
          <a href="/signin.html" class="btn btn-outline btn-lg">Sign In</a>
        </div>
      </div>
      <div class="hero-right">
        <div class="hero-float-grid">
          <!-- Floating feature cards -->
          <div class="hero-float-card hfc-1">
            <div class="hfc-icon">🏊‍♂️</div>
            <div class="hfc-label">Swim Plans</div>
          </div>
          <div class="hero-float-card hfc-2">
            <div class="hfc-icon">🏆</div>
            <div class="hfc-label">Swim Meets</div>
          </div>
          <div class="hero-float-card hfc-3">
            <div class="hfc-icon">📅</div>
            <div class="hfc-label">Schedules</div>
          </div>
          <div class="hero-float-card hfc-4">
            <div class="hfc-icon">💬</div>
            <div class="hfc-label">Coach Chat</div>
          </div>
          <!-- Central dragon -->
          <div class="hero-central-icon">
            <div class="hero-central-ring"></div>
            <img src="/placeholder-hero.jpg" alt="Dragon" style="width: 110px; height: 110px; border-radius: 50%; object-fit: cover; background: var(--border-color); border: 4px solid var(--bg-card); box-shadow: var(--shadow-lg); position: relative; z-index: 10;" />
          </div>
          <!-- Connecting dots -->
          <div class="hero-dot dot-1"></div>
          <div class="hero-dot dot-2"></div>
          <div class="hero-dot dot-3"></div>
          <div class="hero-dot dot-4"></div>
          <!-- Connector lines (done via CSS) -->
        </div>
      </div>
    </div>
    <!-- Decorative dots at section corners -->
    <div class="corner-dot corner-tl"></div>
    <div class="corner-dot corner-tr"></div>
    <div class="corner-dot corner-bl"></div>
    <div class="corner-dot corner-br"></div>
  </section>

  <!-- Meet the Team Section -->
  <section class="section team-section">
    <div class="container">
      <div class="text-center animate-on-scroll" style="margin-bottom: var(--space-2xl);">
        <span class="badge badge-primary">Our Coaches</span>
        <h2 class="section-title" style="margin-top: var(--space-md);">Meet The Team</h2>
        <div class="divider" style="margin: var(--space-md) auto;"></div>
        <p class="section-subtitle" style="margin: 0 auto;">Dedicated professionals committed to helping you reach your full potential in the water.</p>
      </div>
      <div class="team-grid animate-on-scroll" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-lg);">
        ${o("Coach Martinez","Head Coach","Specializes in distance, endurance, and overall program structure.")}
        ${o("Coach Kim","Assistant Coach","Focuses on stroke technique, fundamentals, and core strength.")}
        ${o("Coach Davis","IM Specialist","Expert in Individual Medley, sprints, and race-day logistics.")}
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="section features-section">
    <div class="container animate-on-scroll">
      <div class="features-header">
        <span class="features-label badge badge-primary">Features</span>
        <h2 class="section-title">Everything You Need to Swim Smarter</h2>
        <div class="divider" style="margin: var(--space-md) 0;"></div>
        <p class="section-subtitle">Our platform organizes your entire swim journey — from seasonal registration to race-day logistics.</p>
      </div>
      <div class="features-grid">
        ${i("📋","Seasonal Registration","Sign up for Spring, Summer, Fall, or Winter programs with a single click. Track your enrollment status anytime.")}
        ${i("🏆","Swim Meet Hub","View upcoming competitions, register for events, and see results — all in your personalized dashboard.")}
        ${i("📅","Practice Schedules","Stay on top of daily and weekly workouts. Filter by your group, see changes in real time.")}
        ${i("💬","Coach Communication","Message your coaches directly. Get feedback on technique, ask questions, and stay connected.")}
        ${i("📊","Progress Tracking","Monitor your personal bests, season goals, and training milestones with visual progress bars.")}
        ${i("🌙","Dark Mode","Easy on the eyes for early-morning or late-night check-ins. Toggle instantly from any page.")}
      </div>
    </div>
  </section>

  <!-- Seasons Overview -->
  <section class="section seasons-section">
    <div class="container">
      <div class="text-center animate-on-scroll" style="margin-bottom: var(--space-2xl);">
        <span class="badge badge-primary">Seasons</span>
        <h2 class="section-title" style="margin-top: var(--space-md);">${a("seasons_title")}</h2>
        <div class="divider" style="margin: var(--space-md) auto;"></div>
        <p class="section-subtitle" style="margin: 0 auto;">${a("seasons_subtitle")}</p>
      </div>
      <div class="seasons-grid">
        ${r("spring","🌸","#22C55E")}
        ${r("summer","☀️","#F59E0B")}
        ${r("fall","🍂","#E84D25")}
        ${r("winter","❄️","#3B82F6")}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="container text-center animate-on-scroll">
      <h2 class="cta-title">Ready to Dive In?</h2>
      <p class="cta-subtitle">Join Dragon Swim Team today and start your competitive journey.</p>
      <div class="cta-actions">
        <a href="/registration.html" class="btn btn-primary btn-lg">${a("hero_cta")} →</a>
        <a href="/contact.html" class="btn btn-outline btn-lg" style="border-color: #555; color: #ccc;">Talk to a Coach</a>
      </div>
    </div>
  </section>
`;l();const v={root:null,rootMargin:"0px",threshold:.15},h=new IntersectionObserver((e,t)=>{e.forEach(s=>{s.isIntersecting&&(s.target.classList.add("animate-visible"),t.unobserve(s.target))})},v);document.querySelectorAll(".animate-on-scroll").forEach(e=>{h.observe(e)});function r(e,t,s){return`
    <a href="/registration.html?season=${e}" class="card season-card" style="--season-accent: ${s}">
      <div class="season-emoji">${t}</div>
      <h3 class="season-name">${a("season_"+e)}</h3>
      <p class="season-dates">${a("season_"+e+"_dates")}</p>
      <p class="season-desc">${a("season_"+e+"_desc")}</p>
      <span class="season-cta">Register →</span>
    </a>
  `}function i(e,t,s){return`
    <div class="card feature-card">
      <div class="feature-icon">${e}</div>
      <h3 class="feature-title">${t}</h3>
      <p class="feature-desc">${s}</p>
    </div>
  `}function o(e,t,s){return`
    <div class="card team-card text-center">
      <div class="team-img-placeholder" style="width: 120px; height: 120px; border-radius: 50%; background: var(--border-color); margin: 0 auto var(--space-md); overflow: hidden; border: 3px solid var(--color-primary);">
        <img src="/placeholder-coach.jpg" alt="${e}" style="width: 100%; height: 100%; object-fit: cover; opacity: 0;" onload="this.style.opacity=1" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Cpath fill=%22%23ccc%22 d=%22M50 50c11 0 20-9 20-20s-9-20-20-20-20 9-20 20 9 20 20 20zm0 10c-13.3 0-40 6.7-40 20v10h80V80c0-13.3-26.7-20-40-20z%22/%3E%3C/svg%3E'" />
      </div>
      <h3 class="team-name" style="font-family: var(--font-display); font-size: var(--fs-lg); margin-bottom: var(--space-xs);">${e}</h3>
      <p class="team-role" style="font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--color-accent); margin-bottom: var(--space-sm);">${t}</p>
      <p class="team-desc" style="font-size: var(--fs-sm); color: var(--text-secondary);">${s}</p>
    </div>
  `}
