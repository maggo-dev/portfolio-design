const cur = document.getElementById('cur');
let mx = 0,
  my = 0;
document.addEventListener('mousemove', (e) => {
  mx = e.clientX;
  my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top = my + 'px';
});
document.querySelectorAll('a,button,.proj-item,.skill-pill,.ref-pill,.step-item').forEach((el) => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});
