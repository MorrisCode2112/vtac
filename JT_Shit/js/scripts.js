document.addEventListener('DOMContentLoaded', () => {
    const lightCanvas = document.getElementById('light-ray-canvas');
    if (lightCanvas) {
        const lightCtx = lightCanvas.getContext('2d');
        lightCanvas.width = window.innerWidth;
        lightCanvas.height = window.innerHeight;
        
        const rays = [];
        const rayCount = 8;
        
        class LightRay {
            constructor() {
                this.baseX = lightCanvas.width * (Math.random() * 0.8 + 0.1);
                this.xOffset = 0;
                this.swaySpeed = Math.random() * 0.004 + 0.001;
                this.swayAmplitude = Math.random() * 50 + 25;
                this.length = lightCanvas.height * (Math.random() * 0.3 + 0.7);
                this.angle = Math.random() * 0.1 - 0.05;
                this.width = Math.random() * 60 + 10;
            }
            update() {
                this.xOffset = Math.sin(Date.now() * this.swaySpeed * 0.001) * this.swayAmplitude;
                this.angle += (Math.random() * 0.002 - 0.001);
                this.angle = Math.max(-0.1, Math.min(0.1, this.angle));
            }
            draw() {
                const startX = this.baseX + this.xOffset;
                const endX = startX + Math.sin(this.angle) * this.length;
                const endY = this.length;
                const gradient = lightCtx.createLinearGradient(startX, 0, endX, endY);
                gradient.addColorStop(0, 'rgba(200, 200, 200, 0.075)');
                gradient.addColorStop(1, 'rgba(200, 200, 200, 0)');
                lightCtx.beginPath();
                lightCtx.moveTo(startX, 0);
                lightCtx.lineTo(endX, endY);
                lightCtx.lineWidth = this.width;
                lightCtx.strokeStyle = gradient;
                lightCtx.filter = 'blur(5px)';
                lightCtx.stroke();
            }
        }
        
        for (let i = 0; i < rayCount; i++) {
            rays.push(new LightRay());
        }
        
        function animateLightRays() {
            lightCtx.clearRect(0, 0, lightCanvas.width, lightCanvas.height);
            rays.forEach(ray => {
                ray.update();
                ray.draw();
            });
            requestAnimationFrame(animateLightRays);
        }
        
        animateLightRays();
        
        window.addEventListener('resize', () => {
            lightCanvas.width = window.innerWidth;
            lightCanvas.height = window.innerHeight;
        });
    }
    
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
            this.opacity += Math.random() * 0.01 - 0.005;
            this.opacity = Math.max(this.isLarge ? 0.05 : 0.1, Math.min(this.opacity, this.isLarge ? 0.3 : 0.6));
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
    
    const galleryModal = document.getElementById('gallery-modal');
    if (galleryModal) {
        const photos = {
            combat: [
                'https://i.gyazo.com/a161aab9807da2bdf3f0ab76949602cf.jpg',
                'https://i.gyazo.com/34e608ba5b0cff4f829e8c3d8f7ec75a.jpg',
                'https://i.gyazo.com/e586d9a42feb72c99109bcdb015be1ed.jpg',
                'https://i.gyazo.com/0c4623350a092423f25078dba8690abe.jpg',
                'https://placehold.co/400x300?text=Combat5',
                'https://placehold.co/400x300?text=Combat6'
            ],
            mobility: [
                'https://i.gyazo.com/7bb7da1308b86921b0b4d98c182a34aa.jpg',
                'https://i.gyazo.com/e7fde87c48bc1393a72f1c5c5bc5d293.jpg',
                'https://i.gyazo.com/9e4d0c0a9ff3bec882d7c3464d1e9c98.jpg',
                'https://i.gyazo.com/76722621df6417bb8ec76b209040d440.jpg',
                'https://placehold.co/400x300?text=Mobility5',
                'https://placehold.co/400x300?text=Mobility6'
            ],
            strike: [
                'https://i.gyazo.com/0e19ccc93eb93707bb6b6fa91a6c5fb4.jpg',
                'https://i.gyazo.com/be86b925554f4f3014e7471df6fa3436.jpg',
                'https://i.gyazo.com/9d2caa45687d6754052c798a9106d357.jpg',
                'https://i.gyazo.com/3077e0beb52902e8b1db60a95cd047f6.jpg',
                'https://placehold.co/400x300?text=Strike5',
                'https://placehold.co/400x300?text=Strike6'
            ]
        };
        
        function showGallery(category) {
            const selectedPhotos = photos[category];
            const mainPhoto = document.getElementById('main-photo');
            const thumbnails = document.getElementById('thumbnails');
            thumbnails.innerHTML = '';
            mainPhoto.src = selectedPhotos[0];
            selectedPhotos.forEach((photo, index) => {
                const thumb = document.createElement('img');
                thumb.src = photo;
                thumb.classList.add('w-20', 'h-auto', 'cursor-pointer');
                thumb.onclick = () => mainPhoto.src = photo;
                thumb.dataset.index = index;
                thumbnails.appendChild(thumb);
            });
            galleryModal.classList.add('open');
        }
        
        galleryModal.addEventListener('click', (e) => {
            if (!e.target.closest('#main-photo') && !e.target.closest('#thumbnails') && !e.target.closest('#close-modal')) {
                galleryModal.classList.remove('open');
            }
        });
        
        document.getElementById('close-modal').addEventListener('click', () => {
            galleryModal.classList.remove('open');
        });
        
        document.querySelectorAll('.category').forEach(category => {
            category.onclick = () => showGallery(category.id.split('-')[0]);
        });
    }
});