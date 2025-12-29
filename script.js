// Thice Mural Animation - Hero section only
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const canvas = document.getElementById('bg-canvas');
    if (!hero || !canvas) return;

    const ctx = canvas.getContext('2d');
    let cells = [];

    // Thice keywords
    const words = [
        ':ns', ':type', ':fn', ':use', ':out', ':loop',
        ':pure', ':async', ':ffi', ':db', ':cloud',
        ':require', ':ensure', ':snapshot', ':deny',
        'str', 'int', 'decimal', 'bool', 'i32', 'i64'
    ];

    function setup() {
        // Size to hero section
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;

        cells = [];
        const gapX = 110;
        const gapY = 45;

        for (let y = 30; y < canvas.height; y += gapY) {
            for (let x = 20; x < canvas.width; x += gapX) {
                cells.push({
                    x: x,
                    y: y,
                    text: words[Math.floor(Math.random() * words.length)],
                    lit: Math.random() < 0.2
                });
            }
        }
        render();
    }

    function render() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '14px JetBrains Mono, monospace';

        cells.forEach(c => {
            ctx.fillStyle = c.lit ? 'rgba(0,0,0,0.30)' : 'rgba(0,0,0,0.06)';
            ctx.fillText(c.text, c.x, c.y);
        });
    }

    function toggle() {
        const count = Math.max(1, Math.floor(cells.length * 0.05));
        for (let i = 0; i < count; i++) {
            const idx = Math.floor(Math.random() * cells.length);
            cells[idx].lit = !cells[idx].lit;
        }
        render();
    }

    setup();
    window.addEventListener('resize', setup);
    setInterval(toggle, 300);

    // Header scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // Copy button
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText('curl -sL thice.tc/install | bash');
            copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(() => {
                copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
            }, 2000);
        });
    }
});
