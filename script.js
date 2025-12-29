const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let time = 0;

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

resize();
window.addEventListener('resize', resize);

// Organic flowing shapes - minimal, premium, innovative
class FlowingShape {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = 100 + Math.random() * 300;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.0002 + Math.random() * 0.0003;
        this.rotationSpeed = (Math.random() - 0.5) * 0.001;
        this.opacity = 0.02 + Math.random() * 0.03;
        this.phase = Math.random() * Math.PI * 2;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Morphing blob shape
        ctx.beginPath();
        const points = 6;
        for (let i = 0; i <= points; i++) {
            const a = (i / points) * Math.PI * 2;
            const wobble = Math.sin(time * 0.001 + this.phase + a * 2) * 0.3;
            const r = this.size * (0.7 + wobble);
            const x = Math.cos(a) * r;
            const y = Math.sin(a) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();

        // Subtle black fill
        ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
        ctx.fill();

        ctx.restore();

        // Slow movement
        this.x += Math.cos(time * this.speed + this.phase) * 0.15;
        this.y += Math.sin(time * this.speed * 0.7 + this.phase) * 0.1;
        this.angle += this.rotationSpeed;
    }
}

// Floating code fragments - Thice syntax
class CodeFragment {
    constructor() {
        this.reset();
    }

    reset() {
        const snippets = [':ns', ':type', ':fn', ':use', ':out', ':loop', ':pure', ':async'];
        this.text = snippets[Math.floor(Math.random() * snippets.length)];
        this.x = Math.random() * width;
        this.y = height + 50;
        this.speed = 0.2 + Math.random() * 0.3;
        this.opacity = 0.03 + Math.random() * 0.04;
        this.size = 12 + Math.random() * 8;
    }

    draw() {
        ctx.font = `${this.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(0, 0, 0, ${this.opacity})`;
        ctx.fillText(this.text, this.x, this.y);

        this.y -= this.speed;

        if (this.y < -50) this.reset();
    }
}

// Initialize
const shapes = Array.from({ length: 5 }, () => new FlowingShape());
const fragments = Array.from({ length: 12 }, () => {
    const f = new CodeFragment();
    f.y = Math.random() * height; // Start scattered
    return f;
});

function animate() {
    requestAnimationFrame(animate);

    // Soft white background with subtle grain
    ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.fillRect(0, 0, width, height);

    // Draw flowing shapes
    shapes.forEach(s => s.draw());

    // Draw code fragments
    fragments.forEach(f => f.draw());

    time++;
}

// Clear and start
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, width, height);
animate();

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
        const command = "curl -sL thice.dev/install | bash";
        navigator.clipboard.writeText(command).then(() => {
            copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
            setTimeout(() => {
                copyBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
            }, 2000);
        });
    });
}
