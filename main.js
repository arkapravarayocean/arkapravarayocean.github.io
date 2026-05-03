/* ── LIGHTBOX ── */
(function () {
    function buildLightbox() {
        const overlay = document.createElement('div');
        overlay.id = 'lb-overlay';
        overlay.innerHTML = `
            <div id="lb-box">
                <button id="lb-close" aria-label="Close">&times;</button>
                <img id="lb-img" src="" alt="">
                <p id="lb-caption"></p>
            </div>`;
        document.body.appendChild(overlay);

        overlay.addEventListener('click', function (e) {
            if (e.target === overlay || e.target.id === 'lb-close') closeLightbox();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    function openLightbox(src, alt, caption) {
        const overlay = document.getElementById('lb-overlay');
        document.getElementById('lb-img').src = src;
        document.getElementById('lb-img').alt = alt;
        document.getElementById('lb-caption').textContent = caption;
        overlay.classList.add('lb-active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        document.getElementById('lb-overlay').classList.remove('lb-active');
        document.body.style.overflow = '';
    }

    document.addEventListener('DOMContentLoaded', function () {
        buildLightbox();

        document.querySelectorAll('.result-img-wrap').forEach(function (wrap) {
            const img = wrap.querySelector('.result-img');
            if (!img) return;
            wrap.style.cursor = 'zoom-in';
            const captionEl = wrap.querySelector('.result-caption');
            const caption = captionEl ? captionEl.textContent.trim() : '';
            wrap.addEventListener('click', function () {
                openLightbox(img.src, img.alt, caption);
            });
        });
    });
})();

/* ── PUBLICATION HIGHLIGHT ── */
(function () {
    function highlightTarget() {
        const hash = window.location.hash;
        if (!hash) return;
        const target = document.querySelector(hash);
        if (!target) return;

        setTimeout(function () {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            target.classList.add('pub-highlight');
            setTimeout(function () { target.classList.remove('pub-highlight'); }, 3200);
        }, 180);
    }

    document.addEventListener('DOMContentLoaded', highlightTarget);
    window.addEventListener('hashchange', highlightTarget);
})();

/* ── HAMBURGER MENU ── */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const header = document.querySelector('header');
        if (!header) return;
        const nav = header.querySelector('.nav-links');
        if (!nav) return;

        const btn = document.createElement('button');
        btn.className = 'hamburger';
        btn.setAttribute('aria-label', 'Toggle navigation');
        btn.innerHTML = '<span></span><span></span><span></span>';
        header.appendChild(btn);

        btn.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('nav-open');
            btn.classList.toggle('is-open', isOpen);
            btn.setAttribute('aria-expanded', isOpen);
        });

        nav.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () {
                nav.classList.remove('nav-open');
                btn.classList.remove('is-open');
                btn.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', function (e) {
            if (!header.contains(e.target)) {
                nav.classList.remove('nav-open');
                btn.classList.remove('is-open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
})();

/* ── EXPANDABLE TOGGLES (education page) ── */
function togglePanel(btn) {
    const panel = btn.nextElementSibling;
    if (!panel) return;
    const isOpen = panel.classList.toggle('open');
    btn.textContent = btn.textContent.replace(isOpen ? '▼' : '▲', isOpen ? '▲' : '▼');
}
