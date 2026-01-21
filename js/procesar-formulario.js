
console.log('Script del formulario cargado');

// Asegurar que el spinner inicie oculto
document.getElementById('spinner').classList.add('hidden');
document.getElementById('botones').classList.remove('hidden');

// Mostrar notificaciones toast
function mostrarNotificacion(tipo, titulo, mensaje) {
    const container = document.getElementById('notificaciones-container');
    
    // Crear el elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    
    // Iconos según el tipo
    const iconos = {
        success: '✓',
        error: '✕',
        warning: '⚠'
    };
    
    notificacion.innerHTML = `
        <div class="notificacion__icono">${iconos[tipo] || '!'}</div>
        <div class="notificacion__contenido">
            <div class="notificacion__titulo">${titulo}</div>
            <div class="notificacion__mensaje">${mensaje}</div>
        </div>
        <button class="notificacion__cerrar" onclick="cerrarNotificacion(this)">×</button>
    `;
    
    // Agregar al contenedor
    container.appendChild(notificacion);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        const botonCerrar = notificacion.querySelector('.notificacion__cerrar');
        if (botonCerrar) {
            cerrarNotificacion(botonCerrar);
        }
    }, 5000);
}

// Cerrar notificaciones
function cerrarNotificacion(boton) {
    const notificacion = boton.closest('.notificacion');
    if (notificacion) {
        notificacion.classList.add('saliendo');
        
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }
}

// Validación de teléfono: solo números
const inputTelefono = document.getElementById('telefono');

// Eliminar caracteres no numéricos mientras se escribe
inputTelefono.addEventListener('input', function(e) {
    this.value = this.value.replace(/[^0-9]/g, '');
    
    // Limitar a 15 dígitos
    if (this.value.length > 15) {
        this.value = this.value.slice(0, 15);
    }
});

// Prevenir pegar texto que no sean números
inputTelefono.addEventListener('paste', function(e) {
    e.preventDefault();
    const pastedText = (e.clipboardData || window.clipboardData).getData('text');
    const numbersOnly = pastedText.replace(/[^0-9]/g, '');
    this.value = numbersOnly.slice(0, 15);
});

// Prevenir teclas que no sean números (MÉTODO MODERNO)
inputTelefono.addEventListener('keydown', function(e) {
    // Permitir teclas especiales
    const allowedKeys = [
        'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Home', 'End'
    ];
    
    // Permitir teclas especiales
    if (allowedKeys.includes(e.key)) {
        return;
    }
    
    // Permitir Ctrl/Cmd + A, C, V, X
    if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())) {
        return;
    }
    
    // Bloquear si no es número (0-9)
    if (!/^[0-9]$/.test(e.key)) {
        e.preventDefault();
    }
});

// Manejo de seleccion de archivo
const inputArchivo = document.getElementById('curriculum');
const divNombreArchivo = document.getElementById('fileName');
const botonEnviar = document.querySelector('.form__submit');

inputArchivo.addEventListener('change', function(e) {
    const archivo = e.target.files[0];
    
    if (archivo) {
        console.log('Archivo seleccionado:', archivo.name);
        
        // Validar tamaño (5MB máximo)
        const tamanoMaximo = 5 * 1024 * 1024;
        if (archivo.size > tamanoMaximo) {
            divNombreArchivo.textContent = '❌ Archivo demasiado grande (máx 5MB)';
            divNombreArchivo.style.color = '#ff0000';
            botonEnviar.disabled = true;
            inputArchivo.value = '';
            mostrarNotificacion('error', 'Archivo muy grande', 'El tamaño máximo permitido es 5MB');
            return;
        }
        
        // Validar extensión
        const extension = archivo.name.split('.').pop().toLowerCase();
        const extensionesValidas = ['pdf', 'doc', 'docx'];
        
        if (!extensionesValidas.includes(extension)) {
            divNombreArchivo.textContent = '❌ Solo PDF, DOC o DOCX';
            divNombreArchivo.style.color = '#ff0000';
            botonEnviar.disabled = true;
            inputArchivo.value = '';
            mostrarNotificacion('error', 'Formato no válido', 'Solo se permiten archivos PDF, DOC o DOCX');
            return;
        }
        
        // Todo correcto
        divNombreArchivo.textContent = `✅ ${archivo.name}`;
        divNombreArchivo.style.color = '#059669';
        botonEnviar.disabled = false;
    } else {
        divNombreArchivo.textContent = '';
        botonEnviar.disabled = true;
    }
});

// Manejo del envio del formulario
const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    console.log('Enviando formulario...');
    
    // Obtener elementos del DOM
    const spinner = document.getElementById('spinner');
    const botones = document.getElementById('botones');
    const btnEnviar = document.querySelector('.form__submit');
    const btnReset = document.querySelector('.form__reset');
    
    // Obtener y validar datos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const curriculum = document.getElementById('curriculum').files[0];
    
    // Validar campos obligatorios
    if (!nombre || !telefono || !email || !curriculum) {
        mostrarNotificacion('warning', 'Campos incompletos', 'Por favor completa todos los campos obligatorios marcados con (*)');
        return;
    }
    
    // Validar que teléfono solo contenga números
    if (!/^[0-9]+$/.test(telefono)) {
        mostrarNotificacion('error', 'Teléfono inválido', 'El teléfono solo debe contener números');
        return;
    }
    
    // Validar longitud mínima de teléfono (10 dígitos)
    if (telefono.length < 10) {
        mostrarNotificacion('error', 'Teléfono muy corto', 'El teléfono debe tener al menos 10 dígitos');
        return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarNotificacion('error', 'Email inválido', 'Por favor ingresa un correo electrónico válido');
        return;
    }
    
    // Mostrar spinner, ocultar botones
    botones.classList.add('hidden');
    spinner.classList.remove('hidden');
    btnEnviar.disabled = true;
    btnReset.disabled = true;
    
    // INICIAR PROCESO CON reCAPTCHA
    console.log('Obteniendo verificación de seguridad...');
    
    grecaptcha.ready(async function() {
        try {
            // Obtener token de reCAPTCHA
            // Sitkey publica
            const token = await grecaptcha.execute('6Lf_S04sAAAAACkuE8PuokEaac4umzslAxDRtOpp', {action: 'submit'});
            console.log('Verificación completada');
            
            // Preparar datos
            const formData = new FormData(formulario);
            formData.append('recaptcha_token', token);
            
            console.log('Enviando datos a: php/procesar-formulario.php');
            
            try {
                // Enviar al servidor
                const respuesta = await fetch('php/procesar-formulario.php', {
                    method: 'POST',
                    body: formData
                });
                
                console.log('Respuesta del servidor - Status:', respuesta.status);
                
                // Obtener respuesta como texto
                const textoRespuesta = await respuesta.text();
                console.log('Texto recibido:', textoRespuesta);
                
                // Parsear JSON
                let resultado;
                try {
                    resultado = JSON.parse(textoRespuesta);
                } catch (errorJSON) {
                    console.error('Error al parsear JSON:', errorJSON);
                    console.error('Respuesta recibida:', textoRespuesta);
                    throw new Error('El servidor no respondió con el formato esperado');
                }
                
                console.log('Resultado parseado:', resultado);
                
                // Verificar resultado
                if (resultado.success) {
                    // ÉXITO
                    mostrarNotificacion('success', 
                        '¡Solicitud enviada correctamente!', 
                        `Gracias ${resultado.datos.nombre}, hemos recibido tu solicitud. Nos pondremos en contacto pronto.`
                    );
                    
                    // Limpiar formulario
                    formulario.reset();
                    divNombreArchivo.textContent = '';
                    botonEnviar.disabled = true;
                    
                    console.log('Formulario enviado y limpiado correctamente');
                } else {
                    // ERROR DEL SERVIDOR
                    mostrarNotificacion('error', 'Error al procesar', resultado.mensaje);
                    console.error('Error del servidor:', resultado.mensaje);
                }
                
            } catch (errorEnvio) {
                // ERROR DE CONEXIÓN
                console.error('Error de conexión:', errorEnvio);
                mostrarNotificacion('error', 
                    'Error de conexión', 
                    'No se pudo conectar con el servidor. Por favor verifica tu conexión e intenta nuevamente.'
                );
            }
            
        } catch (errorRecaptcha) {
            // ERROR DE reCAPTCHA
            console.error('Error de reCAPTCHA:', errorRecaptcha);
            mostrarNotificacion('error', 
                'Error de seguridad', 
                'No se pudo verificar la seguridad. Recarga la página e intenta nuevamente.'
            );
        } finally {
            // SIEMPRE restaurar botones
            botones.classList.remove('hidden');
            spinner.classList.add('hidden');
            btnEnviar.disabled = false;
            btnReset.disabled = false;
        }
    }); // Cierre de grecaptcha.ready
});

// Manejo del boton resetear
formulario.addEventListener('reset', function() {
    console.log('Formulario reseteado');
    divNombreArchivo.textContent = '';
    botonEnviar.disabled = true;
});

// Logs
console.log('Todos los eventos del formulario registrados correctamente');
console.log('Formulario listo para usar');