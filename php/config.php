<?php
// IMPORTANTE: NO subir este archivo a GitHub o repositorios públicos
// Agregar "config.php" a .gitignore

// Configuración de Email
define('EMAIL_DESTINO', 'msaulcaballero@gmail.com');      // Email
define('NOMBRE_EMPRESA', 'Servyre');                 // Nombre de la empresa
define('ASUNTO_BASE', 'Nueva Solicitud de Empleo'); // Asunto del correo

// Configuración de Seguridad
define('TIEMPO_ESPERA_ENVIOS', 60);  // Segundos entre envíos (anti-spam)
define('TAMANO_MAXIMO_ARCHIVO', 5);  // MB máximo para archivos

// Configuración de reCAPTCHA
define('RECAPTCHA_SITE_KEY', '6LcQclssAAAAAJUVE8jAD0_Kv6I3oDcExBtOUu34');    // Site Public Key
define('RECAPTCHA_SECRET_KEY', '6LcQclssAAAAACS99GSrea648E2FbRlVq59MyoCA');  // Secret Key
define('USAR_RECAPTCHA', true);  // Cambiar a true

// Usa Gmail SMTP para máxima entregabilidad a Outlook
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');
define('SMTP_AUTH', true);
define('SMTP_USERNAME', 's.mondragon9999@gmail.com');  // EMAIL
define('SMTP_PASSWORD', 'asgu cody kbia jlkp');  // Generar en Google (16 caracteres)


// Modo de desarrollo (true = muestra errores, false = no muestra)
define('MODO_DESARROLLO', false);    // Cambiar a false en producción

?>