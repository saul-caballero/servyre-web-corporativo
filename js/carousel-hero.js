// Hero Carousel - Sistema simple y eficiente
(function() {
    // Selectores con nombres únicos
    const track = document.querySelector('.hero-carousel__track');
    const slides = document.querySelectorAll('.hero-carousel__slide');
    const dots = document.querySelectorAll('.hero-carousel__dot');
    const prevBtn = document.querySelector('.hero-carousel__btn--prev');
    const nextBtn = document.querySelector('.hero-carousel__btn--next');
    
    // Variables de control
    let currentIndex = 0;
    let autoplayTimer;
    const AUTOPLAY_DELAY = 5000;
    const TRANSITION_DELAY = 200;
    let isAnimating = false;

    // Función para mover el carousel
    function moveToSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        // Ocultar textos del slide actual
        hideSlideTexts(slides[currentIndex]);

        // Actualizar índice
        currentIndex = index;

        // Mover track
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;

        // Actualizar dots
        updateDots();

        // Mostrar textos del nuevo slide
        setTimeout(() => {
            showSlideTexts(slides[currentIndex]);
            isAnimating = false;
        }, TRANSITION_DELAY);
    }

    // Ocultar textos de un slide
    function hideSlideTexts(slide) {
        const subtitle = slide.querySelector('.hero-carousel__subtitle');
        const title = slide.querySelector('.hero-carousel__title');
        
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateX(-30px)';
        
        title.style.opacity = '0';
        title.style.transform = 'translateX(30px)';
    }

    // Mostrar textos de un slide
    function showSlideTexts(slide) {
        const subtitle = slide.querySelector('.hero-carousel__subtitle');
        const title = slide.querySelector('.hero-carousel__title');
        
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateX(0)';
        
        title.style.opacity = '1';
        title.style.transform = 'translateX(0)';
    }

    // Actualizar indicadores
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('hero-carousel__dot--active');
            } else {
                dot.classList.remove('hero-carousel__dot--active');
            }
        });
    }

    // Navegación
    function nextSlide() {
        const next = (currentIndex + 1) % slides.length;
        moveToSlide(next);
    }

    function prevSlide() {
        const prev = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prev);
    }

    // Autoplay
    function startAutoplay() {
        autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
    }

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        startAutoplay();
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        if (!isAnimating) {
            prevSlide();
            resetAutoplay();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (!isAnimating) {
            nextSlide();
            resetAutoplay();
        }
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (!isAnimating && index !== currentIndex) {
                moveToSlide(index);
                resetAutoplay();
            }
        });
    });

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (!isAnimating) {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoplay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoplay();
            }
        }
    });

    // Inicialización
    function init() {
        // Ocultar todos los slides excepto el primero
        slides.forEach((slide, index) => {
            if (index !== 0) {
                hideSlideTexts(slide);
            }
        });

        // Asegurar que el primero esté visible
        showSlideTexts(slides[0]);

        // Iniciar autoplay
        startAutoplay();
    }

    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();