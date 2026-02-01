// top-info-bar.js
// Manejo de la barra de información superior al hacer scroll

(function() {
    const topInfoBar = document.getElementById('topInfoBar');
    const mainHeader = document.getElementById('mainHeader');
    let lastScrollTop = 0;
    const scrollThreshold = 50; // Píxeles de scroll antes de ocultar

    if (!topInfoBar || !mainHeader) return;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
            // Ocultar la barra de información
            topInfoBar.classList.add('hidden');
            mainHeader.classList.add('scrolled');
        } else {
            // Mostrar la barra de información
            topInfoBar.classList.remove('hidden');
            mainHeader.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    }

    // Event listener con throttle para mejor rendimiento
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Llamar una vez al cargar para establecer el estado inicial
    handleScroll();
})();