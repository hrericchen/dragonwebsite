import{i as Q,t as i}from"./i18n-B18Li6OH.js";import{X as W}from"./xlsx-DkFutVy2.js";import{o as K,h as j,g as C,e as b,q as I,l as U,c as x,k as O,b as J,t as Y,i as A,w as q,a as H,u as R,f as M}from"./firebase-BSPq4bKM.js";const V=[{key:"firstName",label:"First Name"},{key:"lastName",label:"Last Name"},{key:"gender",label:"Gender"},{key:"age",label:"Age"},{key:"dob",label:"DOB"},{key:"usaSwimmingId",label:"USA Swimming ID"},{key:"status",label:"Status"},{key:"parentFirstName",label:"Parent First Name"},{key:"parentLastName",label:"Parent Last Name"},{key:"parentEmail",label:"Parent Email"},{key:"parentPhone",label:"Parent Phone"},{key:"address",label:"Address"},{key:"ecName",label:"Emergency Contact Name"},{key:"ecPhone",label:"Emergency Contact Phone"}];function Z(p,n){const e=p.parent||{},l=p.emergencyContact||{},m=n.dob?Math.floor((new Date-new Date(n.dob))/(365.25*24*60*60*1e3)):"";return{firstName:n.firstName||"",lastName:n.lastName||"",gender:n.gender||"",age:m,dob:n.dob||"",usaSwimmingId:n.usaSwimmingId||"",status:n.status||"pending",parentFirstName:e.firstName||"",parentLastName:e.lastName||"",parentEmail:e.email||"",parentPhone:e.phone||"",address:e.address||"",ecName:l.name||"",ecPhone:l.phone||""}}function ee(p,n,e){const l=e&&e.length>0?e:V.map(u=>u.key),m={};for(const u of V)m[u.key]=u;const o=l.map(u=>{var w;return((w=m[u])==null?void 0:w.label)||u}),g=[];for(const u of p){const w=u.swimmers||[];for(const _ of w){if(_.deleted)continue;const s=Z(u,_);g.push(l.map(d=>G(s[d]??"")).join(","))}}const y=[o.map(u=>G(u)).join(","),...g].join(`
`);te(y,n)}function G(p){return`"${String(p).replace(/"/g,'""')}"`}function te(p,n){const e=new Blob([p],{type:"text/csv;charset=utf-8;"}),l=URL.createObjectURL(e),m=document.createElement("a");m.href=l,m.download=n,document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(l)}window.XLSX=W;Q();let k=null,$="coach",D=[];const ae=document.getElementById("app");function v(p){return String(p).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}K(J,async p=>{if(!p){window.location.href="/signin.html";return}const n=await j(C(b,"users",p.uid));if((n.exists()?n.data().role:null)!=="admin"){window.location.href="/dashboard.html";return}k=p;const l=I(x(b,"registrations"),U("createdAt","desc"));O(l,m=>{D=m.docs.map(o=>({id:o.id,...o.data()})),($==="export"||$==="editreg")&&T()}),T()});function T(){ae.innerHTML=`
    <div class="admin-layout">
      <aside class="admin-sidebar">
        <div class="admin-sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav class="admin-nav">
          <button class="admin-nav-item ${$==="coach"?"active":""}" data-tab="coach">
            👥 Add Coach
          </button>
          <button class="admin-nav-item ${$==="family"?"active":""}" data-tab="family">
            👪 Add Family
          </button>
          <button class="admin-nav-item ${$==="export"?"active":""}" data-tab="export">
            📥 Export Data
          </button>
          <button class="admin-nav-item ${$==="editreg"?"active":""}" data-tab="editreg">
            ✏️ Edit Registrations
          </button>
        </nav>
        <div class="admin-sidebar-footer">
          <a href="/dashboard.html" class="admin-nav-item">← Back to Dashboard</a>
          <button class="admin-nav-item" id="admin-signout" style="color: var(--color-accent);">🚪 Sign Out</button>
        </div>
      </aside>

      <main class="admin-main">
        <header class="admin-topbar">
          <div class="admin-topbar-left">
            <button class="admin-hamburger" id="admin-hamburger" aria-label="Toggle menu" title="Menu">
              <span></span><span></span><span></span>
            </button>
            <h1 class="admin-page-title">${$==="coach"?"Add Coach":$==="family"?"Add Family":$==="editreg"?"Edit Registrations":"Export Data"}</h1>
          </div>
        </header>
        <div class="admin-content">
          ${$==="coach"?ie():$==="family"?ne():$==="editreg"?le():se()}
        </div>
      </main>
    </div>
  `,re()}function ie(){return`
    <div class="admin-panel">
      <h3>Pre-authorize Coach</h3>
      <p class="admin-hint">Add a coach's email to the whitelist. They will create their own account and set their own password when they sign up.</p>
      <form id="coach-form" class="admin-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="coach-email">Email *</label>
            <input class="form-input" type="email" id="coach-email" placeholder="coach@example.com" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="coach-name">Display Name (optional)</label>
            <input class="form-input" type="text" id="coach-name" placeholder="e.g. Coach Thompson" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="coach-role">Role *</label>
          <select class="form-input" id="coach-role" required>
            <option value="coach">Coach (no admin access)</option>
            <option value="admin">Admin Coach (can manage coaches)</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" id="create-coach-btn">Add Coach</button>
        <p id="coach-form-message" class="admin-form-message"></p>
      </form>
    </div>

    <div class="admin-panel" style="margin-top: 2rem;">
      <div class="admin-panel-header">
        <h3>All Coaches</h3>
        <span class="admin-badge" id="pending-count">0 pending</span>
      </div>
      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="coach-table-body">
            <tr><td colspan="6" class="admin-empty">Loading...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `}function ne(){return`
    <div class="admin-panel">
      <h3>${i("admin_family_title")}</h3>
      <p class="admin-hint">${i("admin_family_hint")}</p>
      <form id="family-form" class="admin-form">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="family-email">${i("admin_family_email")}</label>
            <input class="form-input" type="email" id="family-email" placeholder="parent@example.com" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="family-name">${i("admin_family_name")}</label>
            <input class="form-input" type="text" id="family-name" placeholder="e.g. John Chen" />
          </div>
        </div>
        <button type="submit" class="btn btn-primary" id="add-family-btn">${i("admin_family_add_btn")}</button>
        <p id="family-form-message" class="admin-form-message"></p>
      </form>
      <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color);">
        <p class="admin-hint">Or upload an Excel file (.xls/.xlsx) with columns: <strong>email</strong>, <strong>name</strong></p>
        <button class="btn btn-outline btn-sm" id="family-upload-btn">📤 ${i("admin_family_upload_btn")}</button>
        <p id="family-upload-message" class="admin-form-message"></p>
      </div>
    </div>

    <div class="admin-panel" style="margin-top: 2rem;">
      <h3>${i("admin_family_list_title")}</h3>
      <div class="admin-table-wrapper">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Status</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="family-table-body">
            <tr><td colspan="5" class="admin-empty">Loading...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `}function se(){let p=D.length,n=0;const e={pending:0,active:0,inactive:0};for(const o of D){const g=o.swimmers||[];for(const y of g){if(y.deleted)continue;n++;const u=y.status||"pending";e[u]=(e[u]||0)+1}}const l=["Families","Swimmers","Active","Pending","Inactive"],m=[p,n,e.active||0,e.pending||0,e.inactive||0];return`
    <div class="admin-panel">
      <h3>Export All Registration Data</h3>
      <p class="admin-hint">Download a CSV file with every swimmer and their family contact information.</p>

      <div class="admin-table-wrapper" style="margin: 1.5rem 0; max-width: 600px;">
        <table class="admin-table">
          <thead>
            <tr>${l.map(o=>`<th>${o}</th>`).join("")}</tr>
          </thead>
          <tbody>
            <tr>${m.map(o=>`<td style="font-weight: 600; font-size: 1.1rem;">${o}</td>`).join("")}</tr>
          </tbody>
        </table>
      </div>

      <div class="admin-panel" style="background: var(--bg-secondary, #f9fafb); margin-top: 1.5rem;">
        <h4>CSV Columns</h4>
        <p class="admin-hint">
          One row per swimmer. Families with multiple swimmers appear on multiple rows with the same parent info.
          <button type="button" class="btn btn-outline btn-sm" id="export-select-all" style="margin-left: 1rem;">Select All</button>
          <button type="button" class="btn btn-outline btn-sm" id="export-deselect-all">Deselect All</button>
        </p>
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 1rem 0;" id="export-column-checkboxes">
          ${V.map(o=>`
            <label class="checkbox-label" style="display: inline-flex; align-items: center; gap: 0.35rem; cursor: pointer;">
              <input type="checkbox" class="export-col-cb" value="${o.key}" checked />
              <span>${o.label}</span>
            </label>
          `).join("")}
        </div>
      </div>

      <div style="margin-top: 2rem; display: flex; gap: 1rem; align-items: center;">
        <button class="btn btn-primary" id="admin-export-csv-btn" ${n===0?"disabled":""}>
          📥 Download CSV
        </button>
        <span style="color: var(--text-muted); font-size: 0.9rem;" id="export-filename-preview"></span>
      </div>
      <p id="export-message" class="admin-form-message" style="margin-top: 1rem;"></p>
    </div>
  `}function le(){const p=D;return`
    <div class="admin-panel" style="max-width: 100%;">
      <h3>${i("admin_edit_tab")}</h3>
      <p class="admin-hint">Click a family row to view and edit their registration data.</p>
      <input type="text" class="edit-reg-search" id="edit-reg-search" placeholder="${i("admin_edit_search")}" />
      <div class="edit-reg-table-wrapper">
        <table class="edit-reg-table">
          <thead>
            <tr>
              <th>Parent Name</th>
              <th>Email</th>
              <th>Swimmers</th>
              <th>Status</th>
              <th>Registered</th>
              <th>Last Edited</th>
            </tr>
          </thead>
          <tbody id="edit-reg-table-body">
            ${p.length===0?`<tr><td colspan="6" class="admin-empty">${i("admin_edit_no_results")}</td></tr>`:p.map(n=>{var u,w,_,s;const e=n.parent||{},l=[e.firstName,e.lastName].filter(Boolean).join(" ")||"—",m=(n.swimmers||[]).filter(d=>!d.deleted),o=m.length>0?'<span class="admin-status admin-status-active">active</span>':'<span class="admin-status admin-status-pending">pending</span>',g=((w=(u=n.createdAt)==null?void 0:u.toDate)==null?void 0:w.call(u))||new Date(n.createdAt||0),y=((s=(_=n.lastEditedAt)==null?void 0:_.toDate)==null?void 0:s.call(_))||(n.lastEditedAt?new Date(n.lastEditedAt):null);return`
                  <tr data-reg-id="${v(n.id||"")}" class="edit-reg-row">
                    <td><strong>${v(l)}</strong></td>
                    <td>${v(e.email||"—")}</td>
                    <td>${m.length}</td>
                    <td>${o}</td>
                    <td>${g.toLocaleDateString()}</td>
                    <td>${y?y.toLocaleDateString():"—"}</td>
                  </tr>
                `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function de(p){var s,d;const n=document.createElement("div");n.className="confirm-overlay",n.id="edit-reg-overlay";const e=p.parent||{},l=p.spouse||null,m=(p.swimmers||[]).filter(a=>!a.deleted),o=p.emergencyContact||{},g=p.notes||"",y=(a,t)=>`
    <select class="form-input" id="${t}">
      <option value="male" ${(a||"").toLowerCase()==="male"?"selected":""}>${i("admin_edit_gender_male")}</option>
      <option value="female" ${(a||"").toLowerCase()==="female"?"selected":""}>${i("admin_edit_gender_female")}</option>
    </select>
  `,u=(a,t)=>`
    <div class="edit-reg-grid">
      <div class="edit-reg-field">
        <label>${i("admin_edit_field_firstName")}</label>
        <input type="text" id="${a}-firstName" value="${v(t.firstName||"")}" />
      </div>
      <div class="edit-reg-field">
        <label>${i("admin_edit_field_lastName")}</label>
        <input type="text" id="${a}-lastName" value="${v(t.lastName||"")}" />
      </div>
      <div class="edit-reg-field">
        <label>${i("admin_edit_field_middleName")}</label>
        <input type="text" id="${a}-middleName" value="${v(t.middleName||"")}" />
      </div>
      <div class="edit-reg-field">
        <label>${i("admin_edit_field_gender")}</label>
        ${y(t.gender,`${a}-gender`)}
      </div>
      <div class="edit-reg-field">
        <label>${i("admin_edit_field_email")}</label>
        <input type="email" id="${a}-email" value="${v(t.email||"")}" />
      </div>
      <div class="edit-reg-field">
        <label>${i("admin_edit_field_phone")}</label>
        <input type="text" id="${a}-phone" value="${v(t.phone||"")}" />
      </div>
      ${a==="parent"?`
        <div class="edit-reg-field full-width">
          <label>${i("admin_edit_field_address")}</label>
          <input type="text" id="${a}-address" value="${v(t.address||"")}" />
        </div>
      `:""}
    </div>
  `,w=(a,t)=>`
    <div class="edit-reg-swimmer-card" data-swimmer-idx="${t}">
      <div class="edit-reg-swimmer-header">
        <span class="edit-reg-swimmer-label">Swimmer ${t+1}</span>
        <button class="edit-reg-swimmer-remove" data-remove-swimmer="${t}">${i("admin_edit_swimmer_remove")}</button>
      </div>
      <div class="edit-reg-swimmer-fields">
        <div class="edit-reg-field">
          <label>${i("admin_edit_field_firstName")}</label>
          <input type="text" id="swimmer-${t}-firstName" value="${v(a.firstName||"")}" />
        </div>
        <div class="edit-reg-field">
          <label>${i("admin_edit_field_lastName")}</label>
          <input type="text" id="swimmer-${t}-lastName" value="${v(a.lastName||"")}" />
        </div>
        <div class="edit-reg-field">
          <label>${i("admin_edit_field_middleName")}</label>
          <input type="text" id="swimmer-${t}-middleName" value="${v(a.middleName||"")}" />
        </div>
        <div class="edit-reg-field">
          <label>${i("admin_edit_field_gender")}</label>
          ${y(a.gender,`swimmer-${t}-gender`)}
        </div>
        <div class="edit-reg-field">
          <label>${i("admin_edit_field_dob")}</label>
          <input type="date" id="swimmer-${t}-dob" value="${v(a.dob||"")}" />
        </div>
        <div class="edit-reg-field">
          <label>${i("admin_edit_field_usaSwimmingId")}</label>
          <input type="text" id="swimmer-${t}-usaSwimmingId" value="${v(a.usaSwimmingId||"")}" />
        </div>
      </div>
    </div>
  `;n.innerHTML=`
    <div class="confirm-modal edit-reg-modal">
      <h3 class="confirm-title">${i("admin_edit_title")}</h3>
      <div class="edit-reg-body">
        <!-- Parent -->
        <div class="edit-reg-section">
          <p class="edit-reg-section-title">${i("admin_edit_section_parent")}</p>
          ${u("parent",e)}
        </div>

        <!-- Spouse -->
        <div class="edit-reg-section">
          <p class="edit-reg-section-title">${i("admin_edit_section_spouse")}</p>
          ${l?u("spouse",l):`<p class="edit-reg-no-spouse">${i("admin_edit_no_spouse")}</p>`}
          <!-- Always render hidden spouse fields so admin can add spouse -->
          <div id="spouse-fields" style="${l?"":"display:none;"}">
            ${l?"":u("spouse",{})}
          </div>
          ${l?"":'<button class="edit-reg-add-swimmer-btn" id="add-spouse-btn" style="width:auto;">+ Add Spouse</button>'}
        </div>

        <!-- Swimmers -->
        <div class="edit-reg-section">
          <p class="edit-reg-section-title">${i("admin_edit_section_swimmers")}</p>
          <div class="edit-reg-swimmers" id="swimmers-container">
            ${m.map((a,t)=>w(a,t)).join("")}
          </div>
          <button class="edit-reg-add-swimmer-btn" id="add-swimmer-btn">${i("admin_edit_swimmer_add")}</button>
        </div>

        <!-- Emergency Contact -->
        <div class="edit-reg-section">
          <p class="edit-reg-section-title">${i("admin_edit_section_emergency")}</p>
          <div class="edit-reg-grid">
            <div class="edit-reg-field">
              <label>${i("admin_edit_field_firstName")}</label>
              <input type="text" id="emergency-name" value="${v(o.name||"")}" />
            </div>
            <div class="edit-reg-field">
              <label>${i("admin_edit_field_phone")}</label>
              <input type="text" id="emergency-phone" value="${v(o.phone||"")}" />
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="edit-reg-section">
          <p class="edit-reg-section-title">${i("admin_edit_section_notes")}</p>
          <div class="edit-reg-field full-width">
            <textarea id="edit-notes" placeholder="Internal notes...">${v(g)}</textarea>
          </div>
        </div>
      </div>

      <div class="confirm-actions">
        <button class="btn btn-outline btn-sm" id="edit-reg-cancel">${i("admin_edit_cancel_btn")}</button>
        <button class="btn btn-primary btn-sm" id="edit-reg-save">${i("admin_edit_save_btn")}</button>
      </div>
    </div>
  `,document.body.appendChild(n);let _=m.length;n.querySelector("#edit-reg-cancel").addEventListener("click",()=>n.remove()),n.addEventListener("click",a=>{a.target===n&&n.remove()}),(s=n.querySelector("#add-spouse-btn"))==null||s.addEventListener("click",()=>{const a=document.getElementById("spouse-fields");a&&(a.style.display="block",a.innerHTML=u("spouse",{}));const t=n.querySelector("#add-spouse-btn");t&&t.remove()}),n.addEventListener("click",a=>{const t=a.target.closest("[data-remove-swimmer]");if(!t)return;const r=t.closest(".edit-reg-swimmer-card");r&&(r.style.display="none",r.dataset.removed="true")}),(d=n.querySelector("#add-swimmer-btn"))==null||d.addEventListener("click",()=>{const a=document.getElementById("swimmers-container"),t={firstName:"",lastName:"",middleName:"",gender:"",dob:"",usaSwimmingId:""},r=document.createElement("div");r.innerHTML=w(t,_),a.appendChild(r.firstElementChild),_++}),n.querySelector("#edit-reg-save").addEventListener("click",async()=>{await oe(p.id,n),n.remove(),T()})}async function oe(p,n){const e=s=>{var d;return((d=n.querySelector("#"+s))==null?void 0:d.value)||""},l={firstName:e("parent-firstName"),lastName:e("parent-lastName"),middleName:e("parent-middleName")||null,gender:e("parent-gender"),email:e("parent-email"),phone:e("parent-phone"),address:e("parent-address")},m=e("spouse-firstName");let o=null;(m||e("spouse-lastName")||e("spouse-email"))&&(o={firstName:m,lastName:e("spouse-lastName"),middleName:e("spouse-middleName")||null,gender:e("spouse-gender")||null,email:e("spouse-email")||null,phone:e("spouse-phone")||null});const g=[];n.querySelectorAll(".edit-reg-swimmer-card").forEach(s=>{if(s.dataset.removed==="true")return;const d=s.dataset.swimmerIdx;g.push({firstName:e(`swimmer-${d}-firstName`),lastName:e(`swimmer-${d}-lastName`),middleName:e(`swimmer-${d}-middleName`)||null,gender:e(`swimmer-${d}-gender`),dob:e(`swimmer-${d}-dob`)||null,usaSwimmingId:e(`swimmer-${d}-usaSwimmingId`)||null})});const u={name:e("emergency-name"),phone:e("emergency-phone")},w=[l.email];if(o&&o.email){const s=o.email.toLowerCase().trim();s&&!w.includes(s)&&w.push(s)}const _={parent:l,spouse:o,swimmers:g,emergencyContact:u,notes:e("edit-notes")||null,parentEmails:w,lastEditedBy:(k==null?void 0:k.email)||"unknown",lastEditedAt:new Date};try{await R(C(b,"registrations",p),_);const s=document.getElementById("family-upload-message");s&&(s.textContent=i("admin_edit_save_success"),s.className="admin-form-message success",setTimeout(()=>{s.textContent="",s.className="admin-form-message"},3e3))}catch(s){console.error("Error saving registration:",s),alert(i("admin_edit_save_error")+": "+s.message)}}function re(){var u,w,_;const p=document.getElementById("admin-hamburger"),n=document.querySelector(".admin-sidebar"),e=document.querySelector(".admin-layout");let l=null;const m=()=>{n==null||n.classList.remove("open"),e==null||e.classList.remove("menu-open"),l&&(l.remove(),l=null)};p==null||p.addEventListener("click",s=>{s.stopPropagation();const d=!n.classList.contains("open");d&&!l&&e&&(l=document.createElement("div"),l.className="admin-overlay",l.setAttribute("data-testid","admin-overlay"),l.addEventListener("click",m),e.appendChild(l)),n.classList.toggle("open",d),e==null||e.classList.toggle("menu-open",d)}),document.addEventListener("keydown",s=>{s.key==="Escape"&&m()}),document.querySelectorAll(".admin-nav-item[data-tab]").forEach(s=>{s.addEventListener("click",()=>{$=s.dataset.tab,T()})}),(u=document.getElementById("admin-signout"))==null||u.addEventListener("click",async()=>{await Y(J),window.location.href="/signin.html"});const o=document.getElementById("coach-form");o&&o.addEventListener("submit",async s=>{s.preventDefault();const d=document.getElementById("coach-form-message"),a=document.getElementById("create-coach-btn"),t=document.getElementById("coach-email").value.trim(),r=document.getElementById("coach-name").value.trim()||null,f=document.getElementById("coach-role").value;if(!t){d.textContent="Email is required.",d.className="admin-form-message error";return}a.disabled=!0,d.textContent="";try{if(!(await A(I(x(b,"coaches"),q("email","==",t)))).empty)throw new Error("A coach with this email already exists.");if(!(await A(I(x(b,"families"),q("email","==",t)))).empty)throw new Error("This email is already in the family whitelist.");await H(x(b,"coaches"),{email:t,displayName:r,role:f,status:"pending",registeredUid:null,createdBy:k.uid,createdAt:new Date}),d.textContent=`Coach "${r||t}" added to whitelist. They can now sign up with this email.`,d.className="admin-form-message success",o.reset()}catch(c){d.textContent=`Error: ${c.message}`,d.className="admin-form-message error"}a.disabled=!1});const g=document.getElementById("family-form");g&&g.addEventListener("submit",async s=>{s.preventDefault();const d=document.getElementById("family-form-message"),a=document.getElementById("add-family-btn"),t=document.getElementById("family-email").value.trim(),r=document.getElementById("family-name").value.trim()||null;if(!t){d.textContent="Email is required.",d.className="admin-form-message error";return}a.disabled=!0,d.textContent="";try{if(!(await A(I(x(b,"families"),q("email","==",t)))).empty)throw new Error(i("admin_family_already_exists"));await H(x(b,"families"),{email:t,parentName:r,status:"pending",registeredUid:null,createdBy:k.uid,createdAt:new Date}),d.textContent=`"${r||t}" added successfully.`,d.className="admin-form-message success",g.reset()}catch(f){d.textContent=`Error: ${f.message}`,d.className="admin-form-message error"}a.disabled=!1});const y=document.getElementById("family-upload-btn");if(y&&y.addEventListener("click",()=>{const s=document.createElement("input");s.type="file",s.accept=".xls,.xlsx",s.addEventListener("change",me),s.click()}),$==="family"){const s=document.getElementById("family-table-body");if(s){const d=I(x(b,"families"),U("createdAt","desc"));O(d,a=>{const t=a.docs.map(r=>{var E,S;const f=r.data(),c=((S=(E=f.createdAt)==null?void 0:E.toDate)==null?void 0:S.call(E))||new Date(f.createdAt),h=f.status==="registered"?i("admin_family_status_registered"):i("admin_family_status_pending"),N=f.status==="registered"?"admin-status-active":"admin-status-pending";return`
            <tr>
              <td>${f.email||"—"}</td>
              <td>${f.parentName||"—"}</td>
              <td><span class="admin-status ${N}">${h}</span></td>
              <td>${c.toLocaleDateString()}</td>
              <td><button class="btn btn-outline btn-sm family-delete-btn" data-id="${r.id}" data-email="${f.email||""}" style="color: var(--color-accent);">${i("admin_family_delete")}</button></td>
            </tr>
          `}).join("");s.innerHTML=t||'<tr><td colspan="5" class="admin-empty">No families authorized yet.</td></tr>',s.querySelectorAll(".family-delete-btn").forEach(r=>{r.addEventListener("click",async()=>{const f=r.dataset.id,c=r.dataset.email;if(confirm(i("admin_family_delete_confirm")+`

`+c))try{const h=await j(C(b,"families",f)),N=h.exists()?h.data().registeredUid:null,E=I(x(b,"registrations"),q("parentEmails","array-contains",c)),S=await A(E);let F=[];S.empty||(F=(S.docs[0].data().parentEmails||[]).filter(L=>L!==c&&L!==""));for(const B of F){const L=await A(I(x(b,"families"),q("email","==",B)));if(!L.empty){if(confirm("This family has another parent: "+B+`

Their whitelist entry is still active. Remove them too?

OK = Remove both  |  Cancel = Remove only `+c))for(const X of L.docs){const z=X.data().registeredUid;z&&await R(C(b,"users",z),{role:"removed"}).catch(()=>{}),await M(C(b,"families",X.id))}break}}N&&await R(C(b,"users",N),{role:"removed"}).catch(()=>{}),await M(C(b,"families",f))}catch(h){console.error("Error deleting family:",h),alert("Failed to delete: "+h.message)}})})},a=>{s.innerHTML=`<tr><td colspan="5" class="admin-empty">Error loading: ${a.message}</td></tr>`})}}if($==="coach"){const s=document.getElementById("coach-table-body"),d=document.getElementById("pending-count");if(!s)return;const a=I(x(b,"coaches"),U("createdAt","desc"));O(a,t=>{let r=0;const f=t.docs.map(c=>{var L,P;const h=c.data();h.status==="pending"&&r++;const N=((P=(L=h.createdAt)==null?void 0:L.toDate)==null?void 0:P.call(L))||new Date(h.createdAt),E=h.role==="admin"?"Admin Coach":"Coach",S=h.role==="admin"?"admin-role-admin":"admin-role-coach",F=h.status==="active"?"active":"pending",B=h.status==="active"?"admin-status-active":"admin-status-pending";return`
          <tr>
            <td>${h.email||"—"}</td>
            <td>${h.displayName||"—"}</td>
            <td><span class="admin-role-badge ${S}">${E}</span></td>
            <td><span class="admin-status ${B}">${F}</span></td>
            <td>${N.toLocaleDateString()}</td>
            <td><button class="btn btn-outline btn-sm coach-delete-btn" data-id="${c.id}" data-email="${h.email||""}" style="color: var(--color-accent);">Delete</button></td>
          </tr>
        `}).join("");s.innerHTML=f||'<tr><td colspan="6" class="admin-empty">No coaches yet.</td></tr>',d.textContent=`${r} pending`,s.querySelectorAll(".coach-delete-btn").forEach(c=>{c.addEventListener("click",async()=>{const h=c.dataset.id,N=c.dataset.email;if(confirm(`Remove this coach authorization?

`+N))try{const E=await j(C(b,"coaches",h)),S=E.exists()?E.data().registeredUid:null;S&&await R(C(b,"users",S),{role:"removed"}).catch(()=>{}),await M(C(b,"coaches",h))}catch(E){console.error("Error deleting coach:",E),alert("Failed to delete: "+E.message)}})})},t=>{s.innerHTML=`<tr><td colspan="6" class="admin-empty">Error loading: ${t.message}</td></tr>`})}if($==="export"){const s=document.getElementById("admin-export-csv-btn"),d=document.getElementById("export-filename-preview");if(d){const a=new Date().toISOString().slice(0,10);d.textContent=`dragon-full-roster-${a}.csv`}(w=document.getElementById("export-select-all"))==null||w.addEventListener("click",()=>{document.querySelectorAll(".export-col-cb").forEach(a=>{a.checked=!0})}),(_=document.getElementById("export-deselect-all"))==null||_.addEventListener("click",()=>{document.querySelectorAll(".export-col-cb").forEach(a=>{a.checked=!1})}),s==null||s.addEventListener("click",()=>{const a=[];if(document.querySelectorAll(".export-col-cb:checked").forEach(f=>{a.push(f.value)}),a.length===0){const f=document.getElementById("export-message");f.textContent="Please select at least one column.",f.className="admin-form-message error";return}const t=new Date().toISOString().slice(0,10);ee(D,`dragon-full-roster-${t}.csv`,a);const r=document.getElementById("export-message");r&&(r.textContent=`Download started — ${a.length} columns.`,r.className="admin-form-message success",setTimeout(()=>{r.textContent="",r.className="admin-form-message"},3e3))})}if($==="editreg"){const s=document.getElementById("edit-reg-search"),d=document.getElementById("edit-reg-table-body");s&&d&&(s.addEventListener("input",()=>{const a=s.value.toLowerCase().trim();d.querySelectorAll(".edit-reg-row").forEach(t=>{const r=t.textContent.toLowerCase();t.style.display=a===""||r.includes(a)?"":"none"})}),d.querySelectorAll(".edit-reg-row").forEach(a=>{a.addEventListener("click",()=>{const t=a.dataset.regId,r=D.find(f=>f.id===t);r&&de(r)})}))}}async function me(p){var a;const n=(a=p.target.files)==null?void 0:a[0];if(p.target.remove(),!n)return;const e=document.getElementById("family-upload-message");e&&(e.textContent="",e.className="admin-form-message");const l=window.XLSX;if(!l){e&&(e.textContent="Excel parser not loaded. Please refresh the page.",e.className="admin-form-message error");return}let m;try{const t=await n.arrayBuffer(),r=l.read(new Uint8Array(t),{type:"array"}),f=r.Sheets[r.SheetNames[0]];m=l.utils.sheet_to_json(f,{header:1,defval:null})}catch(t){console.error("Excel parse error:",t),e&&(e.textContent=i("admin_family_upload_parse_error"),e.className="admin-form-message error");return}if(!m||m.length<2){e&&(e.textContent=i("admin_family_upload_empty"),e.className="admin-form-message error");return}const o=m[0];if(!o){e&&(e.textContent=i("admin_family_upload_parse_error"),e.className="admin-form-message error");return}const g=o.findIndex(t=>t&&String(t).toLowerCase().trim()==="email"),y=o.findIndex(t=>t&&String(t).toLowerCase().trim()==="name");if(g===-1){e&&(e.textContent=i("admin_family_upload_parse_error"),e.className="admin-form-message error");return}const u=[],w=new Set;for(let t=1;t<m.length;t++){const r=m[t];if(!r||r.every(N=>N==null||String(N).trim()===""))continue;const f=r[g]?String(r[g]).trim():"",c=y!==-1&&r[y]?String(r[y]).trim():"";if(!f)continue;if(!f.includes("@")||!f.includes(".")){u.push({email:f,name:c,rowNum:t+1,error:"Invalid email format"});continue}const h=f.toLowerCase();if(w.has(h)){u.push({email:f,name:c,rowNum:t+1,error:"Duplicate email in file"});continue}w.add(h),u.push({email:f,name:c,rowNum:t+1})}if(u.length===0){e&&(e.textContent=i("admin_family_upload_empty"),e.className="admin-form-message error");return}let _=[];try{_=(await A(x(b,"families"))).docs.map(r=>({id:r.id,...r.data()}))}catch(t){console.error("Error fetching families:",t),e&&(e.textContent=i("admin_family_upload_error"),e.className="admin-form-message error");return}const s=new Map;for(const t of _)s.set((t.email||"").toLowerCase(),t);const d=ce(u,s);pe(d,n.name)}function ce(p,n){const e={new:[],update:[],conflict:[],skip:[],errors:[]};for(const l of p){if(l.error){e.errors.push(l);continue}const m=l.email.toLowerCase(),o=n.get(m);if(!o){e.new.push(l);continue}const g=(o.parentName||"").trim(),y=(l.name||"").trim();!y&&!g||g.toLowerCase()===y.toLowerCase()?e.skip.push(l):!g&&y?e.update.push({...l,existingId:o.id}):e.conflict.push({...l,existingId:o.id,existingName:g})}return e}function pe(p,n){var r,f;const{new:e,update:l,conflict:m,skip:o,errors:g}=p,y=e.length+l.length+m.length+o.length+g.length,u=m.length>0,w=e.length+l.length>0,_=(c,h)=>`<span class="status-badge ${h}">${c}</span>`,s=[...e.map(c=>({...c,status:"new"})),...l.map(c=>({...c,status:"updated"})),...m.map(c=>({...c,status:"conflict"})),...o.map(c=>({...c,status:"skipped"})),...g.map(c=>({...c,status:"error"}))],d=s.length>0?`
    <div class="family-preview-table-wrapper">
      <table class="family-preview-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>${i("admin_family_conflict_col_excel_name")}</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${s.map(c=>`
            <tr>
              <td>${c.rowNum||"—"}</td>
              <td>${v(c.email)}</td>
              <td>${v(c.name||"—")}</td>
              <td>${_(c.status,c.status)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `:"",a=u?`
    <div class="family-conflict-block">
      <p class="family-conflict-title">${i("admin_family_upload_conflicts_title")}</p>
      <p class="family-conflict-hint">${i("admin_family_upload_conflict_hint")}</p>
      <div class="family-conflict-table-wrapper">
        <table class="family-conflict-table">
          <thead>
            <tr>
              <th>${i("admin_family_conflict_col_email")}</th>
              <th>${i("admin_family_conflict_col_excel_name")}</th>
              <th>${i("admin_family_conflict_col_existing_name")}</th>
            </tr>
          </thead>
          <tbody>
            ${m.map(c=>`
              <tr>
                <td>${v(c.email)}</td>
                <td>${v(c.name||"—")}</td>
                <td>${v(c.existingName||"—")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `:"",t=document.createElement("div");t.className="confirm-overlay",t.innerHTML=`
    <div class="confirm-modal family-import-modal">
      <h3 class="confirm-title">${i("admin_family_upload_title")}</h3>
      <p class="family-import-filename">${i("admin_family_upload_file")}: <strong>${v(n)}</strong></p>

      <div class="family-summary">
        <span class="family-summary-item new">${i("admin_family_upload_summary",{total:String(y),new:String(e.length),updated:String(l.length),conflict:String(m.length),skipped:String(o.length)})}</span>
        ${g.length>0?`<span class="family-summary-item conflict">⚠ ${g.length} errors</span>`:""}
      </div>

      ${a}

      ${u?`<p class="confirm-warning" style="text-align: center;">${i("admin_family_upload_conflict_hint")}</p>`:`<p style="text-align: center; color: #16A34A; font-weight: var(--fw-semibold); margin-bottom: 1rem;">✅ ${i("admin_family_upload_no_conflicts")}</p>`}

      ${d}

      <div class="confirm-actions">
        <button class="btn btn-outline btn-sm" id="family-import-cancel">${i("admin_family_upload_cancel")}</button>
        ${w&&!u?`<button class="btn btn-primary btn-sm" id="family-import-confirm">${i("admin_family_upload_confirm",{count:String(e.length+l.length)})}</button>`:""}
      </div>
    </div>
  `,document.body.appendChild(t),(r=t.querySelector("#family-import-cancel"))==null||r.addEventListener("click",()=>t.remove()),(f=t.querySelector("#family-import-confirm"))==null||f.addEventListener("click",async()=>{t.remove(),await ue(p)}),t.addEventListener("click",c=>{c.target===t&&t.remove()})}async function ue(p){const{new:n,update:e}=p,l=n.length+e.length,m=document.getElementById("family-upload-message");if(l!==0)try{for(const o of n)await H(x(b,"families"),{email:o.email,parentName:o.name||null,status:"pending",registeredUid:null,createdBy:(k==null?void 0:k.uid)||null,createdAt:new Date});for(const o of e)await R(C(b,"families",o.existingId),{parentName:o.name});m&&(m.textContent=i("admin_family_upload_success",{count:String(l)}),m.className="admin-form-message success")}catch(o){console.error("Batch import error:",o),m&&(m.textContent=i("admin_family_upload_error"),m.className="admin-form-message error")}}
