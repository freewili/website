// Reveal only when scripting is available; content stays readable without JS.
if ('IntersectionObserver' in window) {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.rise:not(.in)').forEach(function (el) { io.observe(el); });
} else {
  document.querySelectorAll('.rise').forEach(function (el) { el.classList.add('in'); });
}

var burger = document.getElementById('burger'), links = document.getElementById('links');
var mobile = matchMedia('(max-width: 980px)');
function menu(open, returnFocus) {
  burger.classList.toggle('open', open);
  links.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  links.inert = mobile.matches && !open;
  document.body.classList.toggle('menu-open', open);
  if (returnFocus) burger.focus();
}
menu(false);
burger.addEventListener('click', function () {
  var open = burger.getAttribute('aria-expanded') !== 'true';
  menu(open);
  if (open) links.querySelector('a').focus();
});
links.addEventListener('click', function (e) {
  if (e.target.closest('a')) menu(false);
});
mobile.addEventListener('change', function () { menu(false); });

var lb = document.getElementById('lightbox'), lbImg = lb.querySelector('img'), previousFocus;
function closeLightbox() {
  if (!lb.classList.contains('open')) return;
  lb.classList.remove('open');
  lb.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-open');
  if (previousFocus) previousFocus.focus();
}
document.querySelectorAll('.frame img').forEach(function (img) {
  img.tabIndex = 0;
  img.setAttribute('role', 'button');
  img.setAttribute('aria-label', 'Enlarge: ' + img.alt);
  function show() {
    previousFocus = img;
    lbImg.src = img.src; lbImg.alt = img.alt;
    lb.classList.add('open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    lb.querySelector('button').focus();
  }
  img.addEventListener('click', show);
  img.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); }
  });
});
lb.addEventListener('click', closeLightbox);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeLightbox();
    if (links.classList.contains('open')) menu(false, true);
  }
  if (e.key === 'Tab' && lb.classList.contains('open')) {
    e.preventDefault(); lb.querySelector('button').focus();
  } else if (e.key === 'Tab' && links.classList.contains('open')) {
    var items = Array.from(links.querySelectorAll('a')).concat(burger);
    var index = items.indexOf(document.activeElement);
    if (e.shiftKey && index === 0) { e.preventDefault(); burger.focus(); }
    else if (!e.shiftKey && index === items.length - 1) { e.preventDefault(); items[0].focus(); }
  }
});
document.getElementById('yr').textContent = new Date().getFullYear();
