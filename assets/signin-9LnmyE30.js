import{i as w}from"./theme-toggle-CI3g1rpd.js";import{r as y,t as e,a as E}from"./footer-BQePl1TG.js";import{c as _,b as l,u as $,e as p,d as h,a as f,f as B,h as I,i as x}from"./firebase-BD5oMwgZ.js";w();y();let t=!1;const k=document.getElementById("app");function b(){k.innerHTML=`
    <section class="section signin-section">
      <div class="container">
        <div class="signin-wrapper">
          <div class="signin-card">
            <div class="signin-header">
              <div class="signin-logo">
                <img src="/dragonwebsite/logo-light.jpg" alt="Dragon Swim Team" class="nav-logo-img, light-logo" style="height:60px" />
                <img src="/dragonwebsite/logo-dark.png" alt="Dragon Swim Team" class="nav-logo-img, dark-logo" style="height:60px" />
              </div>
              <h1 class="signin-title">${t?e("signup_title"):e("signin_title")}</h1>
              <p class="signin-subtitle">${e("signin_subtitle")}</p>
            </div>

            <form class="signin-form" id="auth-form">
              ${t?`
                <div class="form-group">
                  <label class="form-label" for="auth-name">${e("signup_name")}</label>
                  <input class="form-input" type="text" id="auth-name" placeholder="Username" required />
                </div>
              `:""}
              <div class="form-group">
                <label class="form-label" for="auth-email">${t?e("signup_email"):e("signin_email")}</label>
                <input class="form-input" type="email" id="auth-email" placeholder="you@example.com" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="auth-password">${t?e("signup_password"):e("signin_password")}</label>
                <input class="form-input" type="password" id="auth-password" placeholder="••••••••" required />
              </div>
              ${t?`
                <div class="form-group">
                  <label class="form-label" for="auth-confirm">${e("signup_confirm")}</label>
                  <input class="form-input" type="password" id="auth-confirm" placeholder="••••••••" required />
                </div>
              `:""}
              ${t?"":`
                <div class="signin-forgot">
                  <a href="#">${e("signin_forgot")}</a>
                </div>
              `}
              <button type="submit" class="btn btn-primary btn-lg signin-submit" id="submit-btn" style="width: 100%;">
                ${t?e("signup_btn"):e("signin_btn")}
              </button>
            </form>

            <div class="signin-divider">
              <span>or</span>
            </div>

            <button class="btn btn-outline btn-lg signin-google" id="google-signin">
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              ${e("signin_google")}
            </button>

            <div class="signin-toggle">
              ${t?`${e("signup_has_account")} <a href="#" id="toggle-auth">${e("signup_signin_link")}</a>`:`${e("signin_no_account")} <a href="#" id="toggle-auth">${e("signin_signup_link")}</a>`}
            </div>
            
            <p id="auth-error" style="color:red; font-size: 14px; text-align: center; margin-top: 10px; display: none;"></p>
          </div>
        </div>
      </div>
    </section>
  `,E(),A()}function A(){var g,c,u;const n=document.getElementById("auth-error"),r=document.getElementById("submit-btn");function d(i){n&&(n.textContent=i,n.style.display="block")}(g=document.getElementById("toggle-auth"))==null||g.addEventListener("click",i=>{var s;i.preventDefault(),t=!t,(s=document.querySelector(".footer"))==null||s.remove(),b()}),(c=document.getElementById("auth-form"))==null||c.addEventListener("submit",async i=>{i.preventDefault();const s=document.getElementById("auth-email").value,o=document.getElementById("auth-password").value;n.style.display="none",r.disabled=!0;try{if(t){const a=document.getElementById("auth-name").value,v=document.getElementById("auth-confirm").value;if(o!==v)throw new Error("Passwords do not match.");const m=(await _(l,s,o)).user;await $(m,{displayName:a}),await p(h(f,"users",m.uid),{username:a,email:s,role:"swimmer",createdAt:new Date}),window.location.href="/dragonwebsite/dashboard.html"}else await B(l,s,o),window.location.href="/dragonwebsite/dashboard.html"}catch(a){console.error(a),d(a.message||"Authentication failed"),r.disabled=!1}}),(u=document.getElementById("google-signin"))==null||u.addEventListener("click",async()=>{try{const i=await I(l,x);await p(h(f,"users",i.user.uid),{username:i.user.displayName||"Google User",email:i.user.email,role:"swimmer",lastLoginAt:new Date},{merge:!0}),window.location.href="/dragonwebsite/dashboard.html"}catch(i){console.error(i),d(i.message||"Google sign in failed")}})}b();
