document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const smallParticles = [];
    const largeParticles = [];
    const smallParticleCount = 100;
    const largeParticleCount = 20;
    
    class Particle {
        constructor(isLarge = false) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = isLarge ? (Math.random() * 7.5 + 2.5) : (Math.random() * 1.5 + 0.5);
            this.speedX = (Math.random() * (isLarge ? 0.125 : 0.25) - (isLarge ? 0.0625 : 0.125));
            this.speedY = (Math.random() * (isLarge ? 0.125 : 0.25) - (isLarge ? 0.0625 : 0.125));
            this.opacity = Math.random() * (isLarge ? 0.25 : 0.5) + (isLarge ? 0.05 : 0.1);
            this.isLarge = isLarge;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            this.opacity += Math.random() * 0.1 - 0.05;
            this.opacity = Math.max(this.isLarge ? 0.5 : 1, Math.min(this.opacity, this.isLarge ? 0.3 : 0.6));
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 200, 200, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < smallParticleCount; i++) {
        smallParticles.push(new Particle(false));
    }
    for (let i = 0; i < largeParticleCount; i++) {
        largeParticles.push(new Particle(true));
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.filter = 'none';
        smallParticles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        ctx.restore();
        ctx.save();
        ctx.filter = 'blur(5px)';
        largeParticles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        ctx.restore();
        requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    animateParticles();
    
    const animateElements = () => {
        document.querySelectorAll('.animate-slide-in').forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = null;
        });
        document.querySelectorAll('.nav-link').forEach((el, index) => {
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animation = null;
            el.style.animationDelay = `${(index + 1) * 0.1}s`;
        });
    };
    
    animateElements();
    
    document.querySelectorAll('a[href]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.includes('.html') || href.startsWith('#')) {
                e.preventDefault();
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            }
        });
    });
});