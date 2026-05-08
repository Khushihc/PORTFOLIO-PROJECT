// THEME TOGGLE
const themeBtn = document.getElementById('theme-toggle');
let isDark = true;
function setTheme(dark) {
  isDark = dark;
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  themeBtn.textContent = dark ? '☀️' : '🌙';
  localStorage.setItem('theme', dark ? 'dark' : 'light');
}
const saved = localStorage.getItem('theme');
if (saved) setTheme(saved === 'dark');
themeBtn.addEventListener('click', () => setTheme(!isDark));

// MOBILE MENU
const menuBtn = document.getElementById('menu-btn');
const mobileNav = document.getElementById('mobile-nav');
menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// TYPED TEXT
const phrases = ['Full Stack Developer', 'Java Enthusiast', 'CS Student @ Navkis', 'Problem Solver', 'Open to Opportunities'];
let pi = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');
function type() {
  const cur = phrases[pi];
  typedEl.textContent = deleting ? cur.slice(0, ci--) : cur.slice(0, ci++);
  if (!deleting && ci > cur.length) { deleting = true; setTimeout(type, 1200); return; }
  if (deleting && ci < 0) { deleting = false; pi = (pi + 1) % phrases.length; ci = 0; }
  setTimeout(type, deleting ? 50 : 90);
}
type();

// PARTICLES CANVAS
const canvas = document.getElementById('hero-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, pts;
  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  function mkPts() { pts = Array.from({length: 60}, () => ({ x: Math.random()*W, y: Math.random()*H, vx: (Math.random()-0.5)*0.4, vy: (Math.random()-0.5)*0.4, r: Math.random()*2+1 })); }
  resize(); mkPts();
  window.addEventListener('resize', () => { resize(); mkPts(); });
  function draw() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
      ctx.fillStyle = 'rgba(124,58,237,0.4)';
      ctx.fill();
    });
    pts.forEach((a, i) => pts.slice(i+1).forEach(b => {
      const d = Math.hypot(a.x-b.x, a.y-b.y);
      if (d < 120) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(6,182,212,${0.15*(1-d/120)})`; ctx.lineWidth = 0.5; ctx.stroke(); }
    }));
    requestAnimationFrame(draw);
  }
  draw();
}

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

// NAV ACTIVE STATE
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
  navLinks.forEach(a => { a.style.color = a.getAttribute('href') === '#'+cur ? 'var(--accent2)' : ''; });
});

// CONTACT FORM
const form = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name || !email || !message) { formMsg.textContent = 'Please fill in all fields.'; formMsg.style.color = 'var(--accent3)'; formMsg.style.display = 'block'; return; }
  formMsg.textContent = `Thanks ${name}! Your message has been received. I'll get back to you soon!`;
  formMsg.style.color = 'var(--accent2)';
  formMsg.style.display = 'block';
  form.reset();
  setTimeout(() => formMsg.style.display = 'none', 4000);
});
