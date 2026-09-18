/* Elite Force | Intellectual property of Sidedoor Digital. */
(function () {
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-solid', window.scrollY > 40); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.textContent = open ? 'Close' : 'Menu';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      }
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var form = document.getElementById('enquiry-form');
  if (!form) return;
  var status = document.getElementById('form-status');
  var ts = document.getElementById('f-ts');
  if (ts) ts.value = String(Date.now());

  function say(msg, ok) {
    status.textContent = msg;
    status.className = 'form-status ' + (ok ? 'is-ok' : 'is-error');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());

    if (!data.name || !data.name.trim()) { say('Add your name so a director knows who to contact.'); form.name.focus(); return; }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { say('Enter a valid email address.'); form.email.focus(); return; }
    if (!data.consent) { say('Tick the consent box so we can reply to you.'); return; }

    var btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending';

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error('bad status');
      form.reset();
      say('Enquiry sent. A director will contact you within one working day.', true);
      btn.textContent = 'Sent';
    }).catch(function () {
      say('Your enquiry did not send. Check your connection and try again.');
      btn.disabled = false;
      btn.textContent = 'Send enquiry';
    });
  });
})();
