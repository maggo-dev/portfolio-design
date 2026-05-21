(function () {
  const n = document.getElementById('ln'),
    b = document.getElementById('lb'),
    l = document.getElementById('loader');
  let v = 0;
  const t = setInterval(() => {
    v += Math.random() * 12 + 3;
    if (v > 100) v = 100;
    n.textContent = Math.floor(v);
    b.style.transform = `scaleX(${v / 100})`;
    b.style.transition = 'transform .05s linear';
    if (v >= 100) {
      clearInterval(t);
      setTimeout(() => {
        l.style.transition = 'opacity .6s ease';
        l.style.opacity = '0';
        setTimeout(() => (l.style.display = 'none'), 600);
      }, 200);
    }
  }, 45);
})();

window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);

  const rp = document.getElementById('rp');
  if (rp) {
    const h = document.documentElement;
    const pct = (h.scrollTop || document.body.scrollTop) / (h.scrollHeight - h.clientHeight);
    rp.style.transform = `scaleX(${pct})`;
  }
});

const ro = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        ro.unobserve(e.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
);
document.querySelectorAll('.r').forEach((el) => ro.observe(el));

const preview = document.getElementById('preview');
const previewText = document.getElementById('preview-text');
document.querySelectorAll('.proj-item[data-preview]').forEach((item) => {
  item.addEventListener('mouseenter', () => {
    previewText.textContent = item.dataset.preview;
    preview.classList.add('show');
  });
  item.addEventListener('mouseleave', () => preview.classList.remove('show'));
  item.addEventListener('mousemove', (e) => {
    preview.style.left = e.clientX + 20 + 'px';
    preview.style.top = e.clientY - 95 + 'px';
  });
});

const em = document.querySelector('.cta-email');
if (em) {
  em.addEventListener('mousemove', (e) => {
    const r = em.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) * 0.15;
    const dy = (e.clientY - r.top - r.height / 2) * 0.15;
    em.style.transform = `translate(${dx}px,${dy}px)`;
  });
  em.addEventListener('mouseleave', () => {
    em.style.transition = 'transform .5s cubic-bezier(.16,1,.3,1)';
    em.style.transform = 'none';
  });
  em.addEventListener('mouseenter', () => (em.style.transition = 'none'));
}
