// Fills the "terminal wall" mock: a grid of anonymous mini terminals.
// <div class="twall" data-twall="12" data-status="1"></div>
// data-status="1" colours each terminal with the state AI Squared would show.
(function () {
  var NAMES = ['api-server', 'firmware', 'docs', 'parser', 'ui', 'tests', 'installer', 'web', 'cli', 'sdk', 'bench', 'tools', 'driver', 'sim', 'export', 'auth'];
  var STATES = ['g', 'g', 'o', 'g', 'b', 'r', 'g', 'b', 'r', 'g', 'o', 'b', 'g', '', 'g', 'b'];
  var GLYPH = { g: '●', o: '?', r: '!', b: '✓', '': '·' };
  function fill(el) {
    var n = parseInt(el.getAttribute('data-twall'), 10) || 12;
    var status = el.getAttribute('data-status') === '1';
    var html = '';
    for (var i = 0; i < n; i++) {
      var s = STATES[i % STATES.length];
      var lines = '';
      for (var k = 0; k < 4; k++) {
        var w = 35 + ((i * 37 + k * 53) % 60);
        lines += '<div class="ln' + ((i + k) % 5 === 0 ? ' hi' : '') + '" style="width:' + w + '%"></div>';
      }
      html += '<div class="tt' + (status && s ? ' s-' + s : '') + '" data-s="' + s + '"><div class="h">' + NAMES[i % NAMES.length] +
        '</div>' + lines + '<span class="q">' + (status ? GLYPH[s] : '') + '</span></div>';
    }
    el.innerHTML = html;
  }
  window.fillWalls = function () { document.querySelectorAll('[data-twall]').forEach(fill); };
  window.fillWalls();
})();
