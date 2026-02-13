document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-links a');

    // Toggle menu
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('img');
        if (navLinks.classList.contains('active')) {
            icon.src = '../../assets/icons/close.svg' || '../assets/icons/close.svg';
            icon.alt = 'cerrar menu';
        } else {
            icon.src = '../../assets/icons/toggle.svg' || '../assets/icons/toggle.svg';
            icon.alt = 'menu';
        }
    });

    // Cerrar cuando dan click en el menu
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('img');
            icon.src = '../../assets/icons/toggle.svg' || '../assets/icons/toggle.svg';
            icon.alt = 'menu';
        });
    });

    // Scroll lento al seleccionar (efecto)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll simple (efecto)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});