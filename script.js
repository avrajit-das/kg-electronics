const API_URL = '/api';
let reviews = [];
let currentRating = 0;
let isAdmin = localStorage.getItem('kg_admin') === 'yes';
let currentLang = localStorage.getItem('kg_lang') || 'en';

const devices=[
 {id:'Microwave',ico:'♨️',sub:'Oven Repair'},
 {id:'Induction Oven',ico:'🍳',sub:'Cooktop'},
 {id:'Laptop',ico:'💻',sub:'PC & Hardware'},
 {id:'Desktop PC',ico:'🖥️',sub:'Hardware'},
 {id:'Guitar',ico:'🎸',sub:'Musical'},
 {id:'Keyboard / Amp',ico:'🎹',sub:'Speaker & Amp'},
 {id:'Home Theatre',ico:'🔊',sub:'New / Repair'},
 {id:'Smart Home',ico:'🏠',sub:'ESP32 / Arduino / IoT'},
 {id:'Other Device',ico:'🔧',sub:'Ask Us'},
];
const issues={
 'Microwave':['Not Heating','Not Powering ON','Turntable Not Rotating','Sparking Inside','Buttons Not Working'],
 'Induction Oven':['Not Heating','Display Error','Fan Noise','Auto Shut Off','Touch Not Working'],
 'Laptop':['Not Powering ON','Screen Black / Broken','Battery Issue','Slow / Hanging','Keyboard Issue'],
 'Desktop PC':['Not Booting','No Display','Overheating','No Sound','Hardware Upgrade'],
 'Guitar':['No Sound','String / Fret Issue','Pickup Issue','Jack Loose','Full Service'],
 'Keyboard / Amp':['No Sound','Keys Not Working','Distortion','Power Issue','Speaker Repair'],
 'Home Theatre':['No Sound','One Speaker Dead','Bluetooth Issue','New Setup Needed','Old System Repair'],
 'Smart Home':['Smart Light Setup','Sensor Project','ESP32 / Arduino Project','PCB Design','Home Automation'],
 'Other Device':['Not Powering ON','Physical Damage','Sound Issue','Need Custom Project','General Repair'],
};
let selDevice='', selIssue='';
let texts=["Microwave Dead?","Laptop Not Booting?","Guitar No Sound?","Home Theatre No Sound?","Want Smart Home?"];

const translations = {
  en: { langBtn:'বাংলা', devices:{'Microwave':'Microwave','Induction Oven':'Induction Oven','Laptop':'Laptop','Desktop PC':'Desktop PC','Guitar':'Guitar','Keyboard / Amp':'Keyboard / Amp','Home Theatre':'Home Theatre','Smart Home':'Smart Home','Other Device':'Other Device'} },
  bn: { langBtn:'English', devices:{'Microwave':'মাইক্রোওয়েভ','Induction Oven':'ইন্ডাকশন ওভেন','Laptop':'ল্যাপটপ','Desktop PC':'ডেস্কটপ পিসি','Guitar':'গিটার','Keyboard / Amp':'কিবোর্ড / অ্যাম্প','Home Theatre':'হোম থিয়েটার','Smart Home':'স্মার্ট হোম','Other Device':'অন্যান্য ডিভাইস'} }
};
function toggleLang(){
  currentLang = currentLang === 'en' ? 'bn' : 'en';
  localStorage.setItem('kg_lang', currentLang);
  applyLang();
}
function applyLang(){
  let t = translations[currentLang];
  document.getElementById('langBtn').innerText = t.langBtn;
  document.body.classList.toggle('lang-bn', currentLang === 'bn');
  renderDeviceGrid();
  if(currentLang === 'bn'){
    texts.length=0; texts.push("মাইক্রোওয়েভ খারাপ?","ল্যাপটপ চালু হচ্ছে না?","গিটারে শব্দ নেই?","হোম থিয়েটারে শব্দ নেই?","স্মার্ট হোম চান?");
    document.querySelector('.hero h1').innerHTML = `ফেলে না দিয়ে, মেরামত করুন।<br><span class="green">স্মার্ট রিপেয়ার</span> একটি <span class="blue">টেকসই ভারতের জন্য।</span>`;
    document.querySelector('.hero p').innerHTML = `নতুন কিনবেন না — পুরোনোটাই সারিয়ে নিন। টাকা বাঁচান, পরিবেশ বাঁচান।<br>মাইক্রোওয়েভ • ইন্ডাকশন • ল্যাপটপ • হোম থিয়েটার • গিটার • স্মার্ট হোম`;
  } else {
    texts.length=0; texts.push("Microwave Dead?","Laptop Not Booting?","Guitar No Sound?","Home Theatre No Sound?","Want Smart Home?");
    document.querySelector('.hero h1').innerHTML = `Reuse. Repair. Repower.<br><span class="green">Smart Repairs</span> for a <span class="blue">Sustainable India.</span>`;
    document.querySelector('.hero p').innerHTML = `Don't Replace — Repair & Reuse. Save Money. Save Planet. Stay Smart.<br>Microwave • Induction • Laptop • Home Theatre • Guitar • Smart Home • LiFePO4 Battery`;
  }
}
function renderDeviceGrid(){
  let t = translations[currentLang];
  const dg=document.getElementById('deviceGrid'); dg.innerHTML='';
  devices.forEach(d=>{
    let div=document.createElement('div');div.className='opt';
    let displayName = t.devices[d.id] || d.id;
    div.innerHTML=`<span class="ico">${d.ico}</span><b>${displayName}</b><small>${d.sub}</small>`;
    div.onclick=()=>{selDevice=d.id;goStep(2);renderIssues()};
    dg.appendChild(div);
  });
}
function renderIssues(){
  const ig=document.getElementById('issueGrid');ig.innerHTML='';
  issues[selDevice].forEach(iss=>{
    let div=document.createElement('div');div.className='opt';
    div.innerHTML=`<span class="ico">⚠️</span><b>${iss}</b>`;
    div.onclick=()=>{selIssue=iss;showResult()};
    ig.appendChild(div);
  });
}
function goStep(n){
  document.getElementById('step1').style.display=n==1?'block':'none';
  document.getElementById('step2').style.display=n==2?'block':'none';
  document.getElementById('step3').style.display=n==3?'block':'none';
  ['d1','d2','d3'].forEach((id,i)=>{document.getElementById(id).classList.toggle('active',i+1<=n)});
  window.scrollTo({top:document.getElementById('finder').offsetTop-80,behavior:'smooth'});
}
function showResult(){
  goStep(3);
  document.getElementById('resTitle').innerText=`✅ ${selDevice} - ${selIssue}`;
  document.getElementById('resDesc').innerText=`We can repair your ${selDevice} with the "${selIssue}" problem. We repair it, then test it continuously for a minimum of 2 days, and then return it to you.`;
  document.getElementById('resTime').innerText='5-7 Days';
  document.getElementById('resCost').innerText='Final quote after inspection - Affordable Pricing';
  let msg=`Hello KG Electronics! %0A%0AMy Device: ${selDevice}%0AProblem: ${selIssue}%0A%0APlease share estimate & pickup details.`;
  document.getElementById('waLink').href=`https://wa.me/919432735009?text=${msg}`;
}
let ti=0,ci=0,del=false;
function type(){let t=texts[ti];document.getElementById('typing').innerText=t.substring(0,ci);if(!del){ci++;if(ci>t.length){del=true;setTimeout(type,1200);return}}else{ci--;if(ci==0){del=false;ti=(ti+1)%texts.length}}setTimeout(type,del?30:70)}
type();
let smart={light:false,fan:false,sensor:false};
function toggleSmart(what){
  smart[what]=!smart[what];
  document.getElementById('lightBtn').innerText = smart.light ? '💡 Light ON' : '💡 Light OFF';
  document.getElementById('lightBtn').style.background = smart.light ? '#00ff88' : '#1a2a24';
  document.getElementById('lightBtn').style.color = smart.light ? '#000' : '#fff';
  document.getElementById('fanBtn').innerText = smart.fan ? '🌀 Fan ON' : '🌀 Fan OFF';
  document.getElementById('fanBtn').style.background = smart.fan ? '#00c2ff' : '#1a2a24';
  document.getElementById('fanBtn').style.color = smart.fan ? '#000' : '#fff';
  document.getElementById('sensorBtn').innerText = smart.sensor ? '📡 Sensor ON' : '📡 Sensor OFF';
  document.getElementById('sensorBtn').style.background = smart.sensor ? '#ffcc00' : '#1a2a24';
  document.getElementById('sensorBtn').style.color = smart.sensor ? '#000' : '#fff';
  let emoji = smart.light ? '💡' : '🌑';
  if(smart.fan) emoji += ' 🌀';
  if(smart.sensor) emoji += ' 📡';
  document.getElementById('room').innerText = emoji;
  document.getElementById('roomText').innerText = `Light ${smart.light?'ON':'OFF'} • Fan ${smart.fan?'ON':'OFF'} • Sensor ${smart.sensor?'ON - Motion Detected!':'OFF'}`;
}
let baBox=document.getElementById('baBox');
function moveBA(e){
  let r=baBox.getBoundingClientRect();
  let x=(e.touches?e.touches[0].clientX:e.clientX)-r.left;
  let p=Math.max(5,Math.min(95, x/r.width*100));
  document.getElementById('baAfter').style.width=p+'%';
  document.getElementById('baHandle').style.left=p+'%';
}
baBox.addEventListener('mousemove',e=>{if(e.buttons) moveBA(e)});
baBox.addEventListener('touchmove',moveBA);
document.getElementById('inquiryForm').addEventListener('submit',function(e){
  e.preventDefault();
  let name=document.getElementById('custName').value;
  let phone=document.getElementById('custPhone').value;
  let dev=document.getElementById('custDevice').value;
  let prob=document.getElementById('custProblem').value;
  let msg=`Hello KG Electronics! %0A%0A*New Inquiry*%0AName: ${name}%0APhone: ${phone}%0ADevice: ${dev}%0AProblem: ${prob}`;
  window.open(`https://wa.me/919432735009?text=${msg}`,'_blank');
});
async function loadReviews(){
  try{
    let res = await fetch(`${API_URL}/reviews`);
    reviews = await res.json();
    if(!Array.isArray(reviews)) reviews = [];
  } catch(e){ reviews = []; }
  renderReviews();
}
function setRating(n){
  currentRating = n;
  let stars = document.getElementById('starInput').children;
  for(let i=0;i<5;i++){ stars[i].innerText = i < n ? '★' : '☆'; stars[i].style.color = i < n ? '#ffcc00' : '#fff'; }
}
async function submitReview(){
  let name = document.getElementById('revName').value.trim();
  let device = document.getElementById('revDevice').value;
  let text = document.getElementById('revText').value.trim();
  if(!name || !text || currentRating === 0){ alert('Please enter your name, select rating (1-5 stars) and write your review.'); return; }
  await fetch(`${API_URL}/reviews`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({name, device, rating: currentRating, text})
  });
  document.getElementById('revName').value=''; document.getElementById('revText').value=''; setRating(0);
  loadReviews();
  alert('Thank you! Your review is now live.');
}
function renderReviews(){
  let list = document.getElementById('reviewsList');
  list.innerHTML = '';
  let total = 0;
  if(reviews.length === 0){ list.innerHTML = '<p style="text-align:center;color:#888">No reviews yet. Be the first to review!</p>'; }
  reviews.forEach((r)=>{
    total += r.rating;
    let stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    let div = document.createElement('div');
    div.className = 'review-card';
    div.innerHTML = `<b>${r.name}</b><div class="rev-meta">${r.device} • Verified Customer</div><div class="rev-stars">${stars}</div><p>${r.text}</p>${isAdmin ? `<button class="delete-btn" onclick="deleteReview('${r._id}')">Delete ❌</button>` : ''}`;
    list.appendChild(div);
  });
  let avg = reviews.length ? (total / reviews.length).toFixed(1) : '5.0';
  document.getElementById('avgRating').innerText = avg;
  document.getElementById('totalReviews').innerText = reviews.length;
  document.getElementById('avgStars').innerText = '★'.repeat(Math.round(avg)) + '☆'.repeat(5 - Math.round(avg));
  document.getElementById('adminStatus').style.display = isAdmin ? 'block' : 'none';
  if(isAdmin) renderAdminDashboard();
}
async function deleteReview(id){
  if(!isAdmin){ alert('Admin access required.'); return; }
  if(confirm('Are you sure you want to delete this review?')){
    await fetch(`${API_URL}/delete-review?id=${id}`, {method:'DELETE'});
    loadReviews();
  }
}
function openAdminPanel(){
  document.getElementById('adminModal').style.display = 'flex';
  if(isAdmin){
    document.getElementById('adminLoginBox').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    renderAdminDashboard();
  } else {
    document.getElementById('adminLoginBox').style.display = 'block';
    document.getElementById('adminDashboard').style.display = 'none';
  }
}
function closeAdminPanel(){ document.getElementById('adminModal').style.display = 'none'; }
async function adminLoginCheck(){
  let name = document.getElementById('adminNameInput').value.trim();
  let email = document.getElementById('adminEmailInput').value.trim().toLowerCase();
  let pass = document.getElementById('adminPassInput').value.trim();
  if(!name || !email || !pass){ alert('Please fill Admin Name, Email and Password.'); return; }
  let res = await fetch(`${API_URL}/admin-login`, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({name, email, password: pass})
  });
  let data = await res.json();
  if(data.success){
    isAdmin = true;
    localStorage.setItem('kg_admin','yes');
    localStorage.setItem('kg_admin_name', data.admin.name);
    localStorage.setItem('kg_admin_email', data.admin.email);
    document.getElementById('adminLoginBox').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    renderReviews();
    alert('Welcome ' + data.admin.name + '! Admin Panel Unlocked.');
  } else {
    alert(data.message || 'Wrong Admin Name, Email or Password.');
  }
}
function renderAdminDashboard(){
  let savedName = localStorage.getItem('kg_admin_name') || 'Admin';
  let savedEmail = localStorage.getItem('kg_admin_email') || '';
  document.getElementById('adminDisplayName').innerText = savedName;
  document.getElementById('adminDisplayEmail').innerText = savedEmail;
  document.getElementById('adminTotalReviews').innerText = reviews.length;
  let avg = reviews.length ? (reviews.reduce((a,b)=>a+b.rating,0)/reviews.length).toFixed(1) : '5.0';
  document.getElementById('adminAvgRating').innerText = avg + ' ⭐';
  let list = document.getElementById('adminReviewList');
  list.innerHTML = '';
  if(reviews.length === 0){ list.innerHTML = '<p style="color:#888;font-size:13px">No reviews yet.</p>'; return; }
  reviews.forEach((r)=>{
    let div = document.createElement('div');
    div.style.cssText = 'border-bottom:1px solid #22332b;padding:10px 0;display:flex;justify-content:space-between;gap:10px;align-items:center';
    div.innerHTML = `<div><b style="font-size:13px">${r.name}</b> <span style="color:#ffcc00;font-size:12px">${'★'.repeat(r.rating)}</span><br><span style="color:#9aa8a2;font-size:12px">${r.device} - ${r.text.substring(0,60)}...</span></div><button onclick="deleteReview('${r._id}')" style="background:#ff4444;color:#fff;border:none;padding:6px 10px;border-radius:999px;cursor:pointer;font-size:11px;flex-shrink:0">Delete</button>`;
    list.appendChild(div);
  });
}
function adminLogout(){
  isAdmin = false;
  localStorage.removeItem('kg_admin');
  localStorage.removeItem('kg_admin_name');
  localStorage.removeItem('kg_admin_email');
  document.getElementById('adminNameInput').value='';
  document.getElementById('adminEmailInput').value='';
  document.getElementById('adminPassInput').value='';
  closeAdminPanel();
  renderReviews();
}
applyLang();
loadReviews();