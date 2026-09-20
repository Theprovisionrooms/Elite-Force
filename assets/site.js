/* Elite Force | Intellectual property of Sidedoor Digital. */
/* Loaded in the head so motion styles apply before first paint. Everything else waits for the DOM. */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  var root = document.documentElement;
  var body = document.body;
  var still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header, reading progress, phone contact bar */
  var header = document.querySelector('.site-header');
  var bar = document.querySelector('.progress');
  var cta = document.querySelector('.mobile-cta');
  var cover = document.querySelector('.cover');
  var lastY = window.scrollY;
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var max = root.scrollHeight - window.innerHeight;
    if (bar) bar.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
    if (header && !body.classList.contains('menu-open')) {
      header.classList.toggle('is-solid', y > 40);
      header.classList.toggle('is-hidden', y > 400 && y > lastY + 4);
      if (y < lastY - 4) header.classList.remove('is-hidden');
    }
    if (cta && cover) cta.classList.toggle('is-on', y > cover.offsetHeight * 0.6);
    parallax();
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* Parallax on the wide collection plate */
  var par = document.querySelector('img.parallax');
  function parallax() {
    if (!par || still) return;
    var r = par.parentNode.getBoundingClientRect();
    if (r.bottom < 0 || r.top > window.innerHeight) return;
    var t = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
    t = Math.max(-1, Math.min(1, t));
    par.style.setProperty("--py", (t * -8 - 9).toFixed(2) + "%");
  }

  /* Menu */
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); toggle.focus(); } });
  }

  /* Current section in the nav */
  var links = nav ? nav.querySelectorAll('a[href^="#"]') : [];
  var sections = [];
  links.forEach(function (a) { var s = document.querySelector(a.getAttribute('href')); if (s) sections.push([s, a]); });

  /* Reveals: page elements come up as they enter, like turning to a new spread */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var t = en.target.classList.contains('plate') ? en.target.querySelector('.wipe') : en.target;
          if (t) t.classList.add('is-in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    // Plates are watched rather than their clipped image, which reads as invisible while clipped.
    document.querySelectorAll('.reveal, .plate, [data-steps]').forEach(function (el) { io.observe(el); });

    var navIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        sections.forEach(function (p) { if (p[0] === en.target) p[1].classList.toggle('is-current', en.isIntersecting); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (p) { navIo.observe(p[0]); });
  } else {
    document.querySelectorAll('.reveal, .wipe, [data-steps]').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Swipe decks on phones: count and progress */
  document.querySelectorAll('[data-deck]').forEach(function (deck) {
    var list = deck.querySelector('.services');
    var items = list.children;
    var count = deck.querySelector('.deck-count');
    var fill = deck.querySelector('.deck-track span');
    if (fill) fill.style.width = (100 / items.length) + '%';
    var raf = 0;
    list.addEventListener('scroll', function () {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var w = items[0].getBoundingClientRect().width + 12;
        var max = list.scrollWidth - list.clientWidth;
        var i = list.scrollLeft >= max - 4 ? items.length - 1 : Math.round(list.scrollLeft / w);
        if (count) count.textContent = (i + 1) + ' of ' + items.length;
        if (fill) fill.style.setProperty('--i', i);
      });
    }, { passive: true });
  });

  /* FAQ: smooth open and close, one open at a time */
  document.querySelectorAll('.faq details').forEach(function (d) {
    var summary = d.querySelector('summary');
    var panel = d.querySelector('.faq-body');
    summary.addEventListener('click', function (e) {
      if (still || !panel.animate) return;
      e.preventDefault();
      if (d.open) {
        var h = panel.offsetHeight;
        panel.animate([{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 320, easing: 'cubic-bezier(.4,0,.2,1)' }).onfinish = function () { d.open = false; };
      } else {
        document.querySelectorAll('.faq details[open]').forEach(function (o) { if (o !== d) o.open = false; });
        d.open = true;
        var full = panel.offsetHeight;
        panel.animate([{ height: '0px', opacity: 0 }, { height: full + 'px', opacity: 1 }], { duration: 420, easing: 'cubic-bezier(.2,.75,.15,1)' });
      }
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Enquiry form: builds a WhatsApp message on the device and opens WhatsApp. Nothing is sent to this website. */
  var form = document.getElementById('enquiry-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var NUMBER = '447348131285';

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = new FormData(form);
    var name = String(f.get('name') || '').trim();
    if (!name) {
      status.textContent = 'Add your name so a director knows who they are speaking to.';
      status.className = 'form-status is-error';
      form.name.focus();
      return;
    }
    var org = String(f.get('organisation') || '').trim();
    var msg = String(f.get('message') || '').trim();
    var lines = [
      'Hello Elite Force, I would like to make a private enquiry.',
      '',
      'Name: ' + name
    ];
    if (org) lines.push('Organisation: ' + org);
    lines.push('Help with: ' + f.get('service'));
    lines.push('Please reply by: ' + f.get('preferred_contact'));
    lines.push('Best time: ' + f.get('best_time'));
    if (msg) { lines.push(''); lines.push(msg); }

    var url = 'https://wa.me/' + NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
    var win = window.open(url, '_blank');
    if (win) win.opener = null; else window.location.href = url;
    status.textContent = 'WhatsApp is open with your message. Press send there and a director will reply.';
    status.className = 'form-status is-ok';
  });
});
