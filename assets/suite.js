/* Elite Force Private Client Suite demo | Intellectual property of Sidedoor Digital. */
(function () {
  var phone = document.getElementById('portal-phone');
  var face = document.getElementById('face-btn');
  if (phone && face) {
    face.addEventListener('click', function () {
      phone.classList.add('is-scanning');
      setTimeout(function () {
        phone.classList.remove('is-scanning');
        phone.classList.add('is-open');
      }, 1400);
    });
  }

  var hold = document.getElementById('hold-btn');
  if (hold) {
    var label = hold.querySelector('span');
    var timer = null, start = 0, DURATION = 1800;
    var reset = function () {
      cancelAnimationFrame(timer); timer = null;
      if (!hold.classList.contains('is-done')) hold.style.setProperty('--p', '0%');
    };
    var tick = function () {
      var p = Math.min(1, (performance.now() - start) / DURATION);
      hold.style.setProperty('--p', (p * 100) + '%');
      if (p >= 1) {
        hold.classList.add('is-done');
        label.textContent = 'Request sent. Duty team alerted';
        timer = null;
        setTimeout(function () {
          hold.classList.remove('is-done');
          hold.style.setProperty('--p', '0%');
          label.textContent = 'Hold to request extraction';
        }, 3500);
        return;
      }
      timer = requestAnimationFrame(tick);
    };
    var begin = function (e) {
      if (hold.classList.contains('is-done')) return;
      e.preventDefault(); start = performance.now(); timer = requestAnimationFrame(tick);
    };
    hold.addEventListener('pointerdown', begin);
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { hold.addEventListener(ev, reset); });
    hold.addEventListener('keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !timer && !e.repeat) begin(e); });
    hold.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') reset(); });
  }

  var inputs = document.querySelectorAll('.calc input[type="range"]');
  var mrr = document.getElementById('mrr');
  var arr = document.getElementById('arr');
  var fmt = function (n) { return '\u00a3' + n.toLocaleString('en-GB'); };
  var calc = function () {
    var total = 0;
    inputs.forEach(function (i) {
      total += Number(i.value) * Number(i.dataset.price);
      var out = document.getElementById('o-' + i.id.split('-')[1]);
      if (out) out.textContent = i.value;
    });
    mrr.textContent = fmt(total);
    arr.textContent = fmt(total * 12);
  };
  inputs.forEach(function (i) { i.addEventListener('input', calc); });
  if (inputs.length) calc();
})();
