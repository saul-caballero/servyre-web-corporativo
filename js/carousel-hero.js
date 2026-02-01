// Hero Carousel
(function() {
    const track = document.querySelector('.hero-carousel__track');
    const slides = Array.from(document.querySelectorAll('.hero-carousel__slide'));
    const dots = document.querySelectorAll('.hero-carousel__dot');
    const prevBtn = document.querySelector('.hero-carousel__btn--prev');
    const nextBtn = document.querySelector('.hero-carousel__btn--next');
    
    const slideCount = slides.length;
    let currentIndex = 0;
    let isAnimating = false;
    let autoplayTimer;
    const AUTOPLAY_DELAY = 5000;
    
    // Posición inicial
    track.style.transform = 'translateX(0%)';
    
    // Función para ir al siguiente slide
    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Ocultar textos actuales
        hideTexts(slides[currentIndex]);
        
        // Animar hacia la izquierda
        track.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
            // Quitar transición
            track.style.transition = 'none';
            
            // Mover el primer slide al final
            const firstSlide = track.firstElementChild;
            track.appendChild(firstSlide);
            
            // Resetear posición
            track.style.transform = 'translateX(0%)';
            
            // Actualizar índice
            currentIndex = (currentIndex + 1) % slideCount;
            
            // Mostrar textos nuevos
            showTexts(slides[currentIndex]);
            updateDots();
            
            // Permitir siguiente animación
            setTimeout(() => {
                isAnimating = false;
            }, 50);
        }, 700);
    }
    
    // Función para ir al slide anterior
    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        // Ocultar textos actuales
        hideTexts(slides[currentIndex]);
        
        // Mover el último slide al principio SIN animación
        track.style.transition = 'none';
        const lastSlide = track.lastElementChild;
        track.insertBefore(lastSlide, track.firstElementChild);
        track.style.transform = 'translateX(-100%)';
        
        // Forzar reflow
        void track.offsetWidth;
        
        // Animar hacia la derecha
        track.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = 'translateX(0%)';
        
        setTimeout(() => {
            // Actualizar índice
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            
            // Mostrar textos nuevos
            showTexts(slides[currentIndex]);
            updateDots();
            
            // Permitir siguiente animación
            setTimeout(() => {
                isAnimating = false;
            }, 50);
        }, 700);
    }
    
    // Ocultar textos
    function hideTexts(slide) {
        const subtitle = slide.querySelector('.hero-carousel__subtitle');
        const title = slide.querySelector('.hero-carousel__title');
        
        if (subtitle && title) {
            subtitle.style.opacity = '0';
            subtitle.style.transform = 'translateX(-100vw)';
            title.style.opacity = '0';
            title.style.transform = 'translateX(100vw)';
        }
    }
    
    // Mostrar textos
    function showTexts(slide) {
        const subtitle = slide.querySelector('.hero-carousel__subtitle');
        const title = slide.querySelector('.hero-carousel__title');
        
        if (subtitle && title) {
            // Forzar reflow para que la animación se ejecute
            void subtitle.offsetWidth;
            void title.offsetWidth;
            
            // Aplicar inmediatamente sin setTimeout
            subtitle.style.opacity = '1';
            subtitle.style.transform = 'translateX(0)';
            title.style.opacity = '1';
            title.style.transform = 'translateX(0)';
        }
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
    
    // Ir a un slide específico directamente
    function goToSlide(targetIndex) {
        if (isAnimating || targetIndex === currentIndex) return;
        
        isAnimating = true;
        
        // Ocultar textos actuales
        hideTexts(slides[currentIndex]);
        
        // Calcular la diferencia
        const diff = targetIndex - currentIndex;
        
        // Reorganizar slides sin animación para posicionar el objetivo
        track.style.transition = 'none';
        
        if (diff > 0) {
            // Mover slides hacia adelante
            for (let i = 0; i < diff; i++) {
                const firstSlide = track.firstElementChild;
                track.appendChild(firstSlide);
            }
        } else if (diff < 0) {
            // Mover slides hacia atrás
            for (let i = 0; i < Math.abs(diff); i++) {
                const lastSlide = track.lastElementChild;
                track.insertBefore(lastSlide, track.firstElementChild);
            }
        }
        
        // Actualizar índice
        currentIndex = targetIndex;
        
        // Resetear posición
        track.style.transform = 'translateX(0%)';
        
        // Forzar reflow
        void track.offsetWidth;
        
        // Mostrar textos del nuevo slide
        showTexts(slides[currentIndex]);
        updateDots();
        
        // Permitir siguiente animación
        setTimeout(() => {
            isAnimating = false;
        }, 50);
    }
    
    // Autoplay
    function startAutoplay() {
        autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
    }
    
    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }
    
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
    
    // Indicadores
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoplay();
        });
    });
    
    // Teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });
    
    // Inicialización
    function init() {
        // Ocultar todos excepto el primero
        slides.forEach((slide, index) => {
            const subtitle = slide.querySelector('.hero-carousel__subtitle');
            const title = slide.querySelector('.hero-carousel__title');
            
            if (subtitle && title) {
                subtitle.style.transition = 'none';
                title.style.transition = 'none';
                
                if (index === 0) {
                    subtitle.style.opacity = '1';
                    subtitle.style.transform = 'translateX(0)';
                    title.style.opacity = '1';
                    title.style.transform = 'translateX(0)';
                } else {
                    subtitle.style.opacity = '0';
                    subtitle.style.transform = 'translateX(-100vw)';
                    title.style.opacity = '0';
                    title.style.transform = 'translateX(100vw)';
                }
                
                requestAnimationFrame(() => {
                    subtitle.style.transition = '';
                    title.style.transition = '';
                });
            }
        });
        
        updateDots();
        startAutoplay();
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();