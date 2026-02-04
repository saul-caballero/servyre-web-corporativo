<?php
/**
 * ARCHIVO DE CONFIGURACIÓN EJEMPLO
 * 
 * INSTRUCCIONES:
 * 1. Copia este archivo como "config.php" en la misma carpeta (carpeta php)
 * 2. Completa los valores con tus credenciales reales
 * 3. NO SUBAS config.php a GitHub (está en .gitignore)
 * 
 * Comando: cp config.example.php config.php
 */

// CONFIGURACIÓN DE EMAIL

// Email donde llegarán las solicitudes de empleo
define('EMAIL_DESTINO', 'tu-email@empresa.com');

// Nombre de tu empresa (aparecerá en el remitente)
define('NOMBRE_EMPRESA', 'Tu Empresa');

// Asunto base del correo
define('ASUNTO_BASE', 'Nueva Solicitud de Empleo');


// CONFIGURACIÓN DE SEGURIDAD

// Segundos de espera entre envíos (anti-spam)
// Recomendado: 60 segundos
define('TIEMPO_ESPERA_ENVIOS', 60);

// Tamaño máximo de archivo en MB
// Recomendado: 5 MB
define('TAMANO_MAXIMO_ARCHIVO', 5);

// CONFIGURACIÓN DE GOOGLE reCAPTCHA v3
// Obtén tus claves en: https://www.google.com/recaptcha/admin

// Site Key (pública - va en el HTML)
define('RECAPTCHA_SITE_KEY', 'tu-site-key-publica-aqui');

// Secret Key (privada - solo servidor)
define('RECAPTCHA_SECRET_KEY', 'tu-secret-key-privada-aqui');

// Activar/desactivar reCAPTCHA
define('USAR_RECAPTCHA', true);

// CONFIGURACIÓN SMTP

// OPCIÓN 1: Gmail SMTP (Recomendado)
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_SECURE', 'tls');

// OPCIÓN 2: Outlook/Hotmail SMTP - Verificar host para Cuenta de Empresa Microsoft 365
// define('SMTP_HOST', 'smtp-mail.outlook.com');
// define('SMTP_PORT', 587);
// define('SMTP_SECURE', 'tls');

// OPCIÓN 3: Otro proveedor SMTP
// define('SMTP_HOST', 'smtp.tu-proveedor.com');
// define('SMTP_PORT', 465); // o 587
// define('SMTP_SECURE', 'ssl'); // o 'tls'

// CREDENCIALES SMTP

define('SMTP_AUTH', true);

// Tu email completo
define('SMTP_USERNAME', 'tu-email@gmail.com');

// IMPORTANTE para Gmail:
// 1. Habilita verificación en 2 pasos
// 2. Genera una "Contraseña de Aplicación" aquí:
//    https://myaccount.google.com/apppasswords
// 3. Usa esa contraseña de 16 caracteres (sin espacios)
define('SMTP_PASSWORD', 'tu-contraseña-de-aplicacion-aqui');


// MODO DE DESARROLLO

// true = Muestra errores de PHP (solo desarrollo)
// false = Oculta errores (producción)
define('MODO_DESARROLLO', true);

// NOTAS IMPORTANTES
/*
 * GMAIL - Contraseña de Aplicación:
 * ===================================
 * 1. Ve a: https://myaccount.google.com/security
 * 2. Activa "Verificación en dos pasos"
 * 3. Ve a: https://myaccount.google.com/apppasswords
 * 4. Selecciona "Correo" y "Otro dispositivo"
 * 5. Nombra: "Sitio Web Servyre"
 * 6. Copia la contraseña de 16 caracteres generada
 * 7. Pégala en SMTP_PASSWORD (sin espacios)
 * 
 * 
 * RECAPTCHA - Obtener Claves:
 * ============================
 * 1. Ve a: https://www.google.com/recaptcha/admin
 * 2. Registra un nuevo sitio
 * 3. Selecciona "reCAPTCHA v3"
 * 4. Agrega tu dominio (ejemplo: servyre.com)
 * 5. Para desarrollo local, agrega: localhost
 * 6. Copia Site Key y Secret Key
 * 7. Pégalas en las constantes correspondientes
 * 
 * 
 * SEGURIDAD:
 * ===========
 * - NUNCA subas este archivo a GitHub en Repositorio Público una vez configurado
 * - Verifica que config.php esté en .gitignore
 * - Cambia MODO_DESARROLLO a false en producción
 * - Usa siempre HTTPS en producción
 * - Mantén PHP actualizado (7.4+)
 * 
 * 
 */

?>