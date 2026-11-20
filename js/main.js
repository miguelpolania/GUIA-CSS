// Modo claro / oscuro
function toggleTheme() {
    var h = document.documentElement;
    h.setAttribute('data-bs-theme', h.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark');
}
document.getElementById('themeBtn').addEventListener('click', toggleTheme);
document.getElementById('themeBtnMobile').addEventListener('click', toggleTheme);

// Scrollspy
new bootstrap.ScrollSpy(document.body, { target: '#topnav', rootMargin: '-20% 0px -70% 0px' });

// Breakpoint actual + ancho de ventana
function bpName(w) {
    if (w >= 1400) return 'xxl';
    if (w >= 1200) return 'xl';
    if (w >= 992) return 'lg';
    if (w >= 768) return 'md';
    if (w >= 576) return 'sm';
    return 'xs';
}
function updateWidth() {
    var w = window.innerWidth;
    document.getElementById('bpBadge').textContent = bpName(w) + ' · ' + w + 'px';
    document.getElementById('mqWidth').textContent = w + ' px';
    document.getElementById('mqBar').style.width = Math.min(100, w / 1600 * 100) + '%';
}
window.addEventListener('resize', updateWidth);
updateWidth();

// 2.4 Especificidad
var specRules = {
    el: 'blockquote { color: #0d6efd; }',
    cl: '.spec-demo { color: #198754; }',
    id: '#specTarget { color: #dc3545; }',
    im: '.spec-demo { color: #fd7e14 !important; }'
};
var specNames = {
    el: 'elemento (azul)', cl: 'clase (verde)', id: 'id (rojo)',
    in: 'en línea (morado)', im: '!important (naranja)'
};
function updateSpec() {
    var css = '', winner = null, on = {};
    document.querySelectorAll('.spec-chk').forEach(function (c) {
        on[c.dataset.rule] = c.checked;
        if (c.checked && specRules[c.dataset.rule]) css += specRules[c.dataset.rule] + '\n';
    });
    document.getElementById('specStyle').textContent = css;
    var t = document.getElementById('specTarget');
    t.style.color = on['in'] ? '#6f42c1' : '';
    var order = ['im', 'in', 'id', 'cl', 'el'];
    for (var i = 0; i < order.length; i++) { if (on[order[i]]) { winner = order[i]; break; } }
    document.getElementById('specResult').innerHTML = winner
        ? 'Ganador: <strong>' + specNames[winner] + '</strong> · color calculado: <code>' + getComputedStyle(t).color + '</code>'
        : 'Ganador: ninguna regla activa, el texto usa el color por defecto.';
}
document.querySelectorAll('.spec-chk').forEach(function (c) { c.addEventListener('change', updateSpec); });
updateSpec();

// 2.5 Flexbox playground
function updateFlex() {
    var box = document.getElementById('fxBox'), lines = ['.contenedor {', '    display: flex;'];
    document.querySelectorAll('.fx-ctl').forEach(function (s) {
        box.style[s.dataset.prop] = s.value;
        var prop = s.dataset.prop.replace(/[A-Z]/g, function (m) { return '-' + m.toLowerCase(); });
        lines.push('    ' + prop + ': ' + s.value + ';');
    });
    lines.push('}');
    document.getElementById('fxCode').textContent = lines.join('\n');
}
document.querySelectorAll('.fx-ctl').forEach(function (s) { s.addEventListener('change', updateFlex); });
updateFlex();

// 2.9 Z-index
document.querySelectorAll('.z-range').forEach(function (r) {
    function apply() {
        document.getElementById(r.dataset.target).style.zIndex = r.value;
        document.getElementById(r.dataset.out).textContent = r.value;
    }
    r.addEventListener('input', apply);
    apply();
});

// Toast final
document.getElementById('toastBtn').addEventListener('click', function () {
    bootstrap.Toast.getOrCreateInstance(document.getElementById('doneToast')).show();
});
