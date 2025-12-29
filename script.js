const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    draw();
}

// Simple, elegant grid pattern - subtle and non-distracting
function draw() {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);

    // Subtle dot grid
    ctx.fillStyle = 'rgba(0, 0, 0, 0.03)';
    const spacing = 40;

    for (let x = spacing; x < width; x += spacing) {
        for (let y = spacing; y < height; y += spacing) {
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Subtle gradient overlay on bottom right
    const gradient = ctx.createRadialGradient(
        width * 0.8, height * 0.8, 0,
        width * 0.8, height * 0.8, width * 0.5
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.02)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

resize();
window.addEventListener('resize', resize);

// Header scroll effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Copy button
const copyBtn = document.querySelector('.copy-btn');
if (copyBtn) {
    copyBtn.addEventListener('click', () => {
        const command = "curl -sL thice.tc/install | bash";
        navigator.clipboard.writeText(command).then(() => {
            copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            setTimeout(() => {
                copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
            }, 2000);
        });
    });
}
