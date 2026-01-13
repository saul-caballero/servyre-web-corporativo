// Variables
const mvvButton = document.querySelector('.mvv__buttons');
const infoMvv = document.querySelector('#mvv__info');

// Eventos
mvvButton.addEventListener('click', cambiarInfoMvv);

// Funciones
function cambiarInfoMvv(e){
    e.preventDefault();
    // Si el objetivo es diferente a mvv__button...
    if(!e.target.classList.contains('mvv__button')){
        return; // pausar o dejar de ejecutar
    }
    // Variable de existencia
    const btnActivo = document.querySelector('.mvv__button--active');
    // Si existe..
    if(btnActivo){
         btnActivo.classList.remove('mvv__button--active'); // borrar
    }
    // Aplicar activacion al objetivo clickeado
    e.target.classList.add('mvv__button--active');
    
    // Extraer id de boton
    const idBoton = e.target.id;
    // Crear array nodelist para recorrer que texto mostrar
    const secciones = infoMvv.querySelectorAll('.mvv__text');
    secciones.forEach(seccion => {
        // Remover primero todo display block (desaparecer todos)
        seccion.classList.remove('mvv__text--active');
        // Obetner data-id y Si el id que se clickeo es igual hacer...
        if(seccion.getAttribute('data-id') === idBoton){
            seccion.classList.add('mvv__text--active'); // Agregar block para mostrar info
        }
    });
}
