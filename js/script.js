document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const serviciosToggle = document.querySelector('.nav-servicios__toggle');
    const serviciosDiv = document.querySelector('.nav-servicios');

    // Toggle menú hamburguesa 
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('img');
        if (navLinks.classList.contains('active')) {
            icon.src = '../../assets/icons/close.svg' || '../assets/icons/close.svg';
            icon.alt = 'cerrar menu';
        } else {
            icon.src = '../../assets/icons/toggle.svg' || '../assets/icons/toggle.svg';
            icon.alt = 'menu';
            // Cerrar submenú al cerrar el panel
            if (serviciosDiv) serviciosDiv.classList.remove('abierto');
        }
    });

    // ── Toggle submenú Servicios (solo móvil) ────────
    if (serviciosToggle) {
        serviciosToggle.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                serviciosDiv.classList.toggle('abierto');
                const expandido = serviciosDiv.classList.contains('abierto');
                serviciosToggle.setAttribute('aria-expanded', expandido);
            }
        });
    }

    // Cerrar panel al hacer click en links normales
    document.querySelectorAll('.nav-links a, .nav-servicios__submenu a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (serviciosDiv) serviciosDiv.classList.remove('abierto');
            const icon = mobileToggle.querySelector('img');
            icon.src = '../../assets/icons/toggle.svg' || '../assets/icons/toggle.svg';
            icon.alt = 'menu';
        });
    });

    // ── Scroll suave ─────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Fade-in sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});