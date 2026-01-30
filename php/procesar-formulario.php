<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Cargar PHPMailer
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

// Cargar configuración
require_once __DIR__ . '/config.php';

error_reporting(E_ALL);
ini_set('display_errors', MODO_DESARROLLO ? 1 : 0);

header('Content-Type: application/json; charset=utf-8');

try {
    // PROTECCIÓN 1: Limitar envíos por IP (anti-spam)
    session_start();
    
    if (isset($_SESSION['ultimo_envio'])) {
        $tiempo_transcurrido = time() - $_SESSION['ultimo_envio'];
        if ($tiempo_transcurrido < TIEMPO_ESPERA_ENVIOS) {
            throw new Exception('Por favor espera ' . (TIEMPO_ESPERA_ENVIOS - $tiempo_transcurrido) . ' segundos antes de enviar otro formulario');
        }
    }

    // Verificar método POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Método no permitido');
    }

    // PROTECCIÓN 2: Validar reCAPTCHA (si está habilitado)
    if (USAR_RECAPTCHA) {
        if (!isset($_POST['recaptcha_token']) || empty($_POST['recaptcha_token'])) {
            throw new Exception('Por favor completa la verificación de seguridad');
        }

        $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
        $recaptcha_response = file_get_contents($recaptcha_url . '?secret=' . RECAPTCHA_SECRET_KEY . '&response=' . $_POST['recaptcha_token']);
        $recaptcha_data = json_decode($recaptcha_response);

        if (!$recaptcha_data->success || $recaptcha_data->score < 0.5) {
            throw new Exception('Verificación de seguridad fallida. Por favor intenta nuevamente');
        }
    }

    // PROTECCIÓN 3: Obtener y limpiar datos (anti-injection)
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $telefono = isset($_POST['telefono']) ? trim($_POST['telefono']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $mensaje = isset($_POST['mensaje']) ? trim($_POST['mensaje']) : '';

    // Limpiar saltos de línea (prevenir email header injection)
    $nombre = str_replace(["\r", "\n", "%0a", "%0d"], '', $nombre);
    $email = str_replace(["\r", "\n", "%0a", "%0d"], '', $email);
    $telefono = str_replace(["\r", "\n", "%0a", "%0d"], '', $telefono);

    // PROTECCIÓN 4: Validar campos obligatorios
    if (empty($nombre) || empty($telefono) || empty($email)) {
        throw new Exception('Por favor completa todos los campos obligatorios');
    }

    // Validar longitud máxima de campos
    if (strlen($nombre) > 100) {
        throw new Exception('El nombre es demasiado largo');
    }
    if (strlen($telefono) > 20) {
        throw new Exception('El teléfono es demasiado largo');
    }
    if (strlen($mensaje) > 1000) {
        throw new Exception('El mensaje es demasiado largo');
    }

    // Validar que teléfono solo contenga números
    if (!preg_match('/^[0-9]{10,15}$/', $telefono)) {
        throw new Exception('El teléfono debe contener solo números (10-15 dígitos)');
    }

    // PROTECCIÓN 5: Validar formato de email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('El formato del email no es válido');
    }

    // PROTECCIÓN 6: Validar archivo
    if (!isset($_FILES['curriculum']) || $_FILES['curriculum']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('No se recibió el currículum correctamente');
    }

    $archivo = $_FILES['curriculum'];

    // Validar tamaño
    $tamano_maximo_bytes = TAMANO_MAXIMO_ARCHIVO * 1024 * 1024;
    if ($archivo['size'] > $tamano_maximo_bytes) {
        throw new Exception('El archivo es demasiado grande. Máximo ' . TAMANO_MAXIMO_ARCHIVO . 'MB');
    }

    // Validar tamaño mínimo (evitar archivos vacíos)
    if ($archivo['size'] < 100) {
        throw new Exception('El archivo parece estar vacío o corrupto');
    }

    // PROTECCIÓN 7: Validar extensión
    $nombre_archivo_original = basename($archivo['name']);
    $extension = strtolower(pathinfo($nombre_archivo_original, PATHINFO_EXTENSION));
    
    $extensiones_permitidas = ['pdf'];
    if (!in_array($extension, $extensiones_permitidas)) {
        throw new Exception('Solo se permiten archivos PDF.');
    }

    // PROTECCIÓN 8: Verificar tipo MIME real del archivo
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime_real = finfo_file($finfo, $archivo['tmp_name']);
    finfo_close($finfo);

    $mimes_permitidos = [
        'application/pdf'
    ];

    if (!in_array($mime_real, $mimes_permitidos)) {
        throw new Exception('El tipo de archivo no es válido');
    }

// Enviar con PHPMailer (NO CON mail())
    $mail = new PHPMailer(true);

    try {
        // Configuración del servidor SMTP
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = SMTP_AUTH;
        $mail->Username   = SMTP_USERNAME;
        $mail->Password   = SMTP_PASSWORD;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Port       = SMTP_PORT;
        $mail->CharSet    = 'UTF-8';

        // Configuración del remitente y destinatario
        $mail->setFrom(SMTP_USERNAME, NOMBRE_EMPRESA . ' - Bolsa de Trabajo');
        $mail->addAddress(EMAIL_DESTINO);
        $mail->addReplyTo($email, $nombre);

        // Adjuntar currículum
        $mail->addAttachment($archivo['tmp_name'], $nombre_archivo_original);

        // Contenido del email
        $mail->isHTML(true);
        $mail->Subject = '📄 ' . ASUNTO_BASE . ' - ' . $nombre;
        
        // Cuerpo HTML
        $mail->Body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #e7b40b 0%, #1b1b1b 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .field { margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #ddd; }
        .label { font-weight: bold; color: #e7b40b; display: block; margin-bottom: 5px; }
        .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #e7b40b; font-size: 12px; color: #666; text-align: center; }
    </style>
</head>
<body>
    <div class='header'>
        <h1>📄 Nueva Solicitud de Empleo</h1>
    </div>
    <div class='content'>
        <div class='field'>
            <span class='label'>👤 Nombre:</span>
            <span>" . htmlspecialchars($nombre) . "</span>
        </div>
        <div class='field'>
            <span class='label'>📧 Email:</span>
            <span>" . htmlspecialchars($email) . "</span>
        </div>
        <div class='field'>
            <span class='label'>📱 Teléfono:</span>
            <span>" . htmlspecialchars($telefono) . "</span>
        </div>
        <div class='field'>
            <span class='label'>💬 Mensaje:</span>
            <span>" . ($mensaje ? nl2br(htmlspecialchars($mensaje)) : '<em>Sin mensaje</em>') . "</span>
        </div>
        <div class='footer'>
            <p>📎 <strong>Currículum adjunto:</strong> " . htmlspecialchars($nombre_archivo_original) . "</p>
            <p>🕐 Recibido: " . date('d/m/Y H:i:s') . "</p>
            <p>🌐 IP: " . htmlspecialchars($_SERVER['REMOTE_ADDR']) . "</p>
        </div>
    </div>
</body>
</html>";

        // Versión texto plano
        $mail->AltBody = "
Nueva Solicitud de Empleo
=========================

Nombre: $nombre
Email: $email
Teléfono: $telefono
Mensaje: " . ($mensaje ?: 'Sin mensaje') . "

Currículum adjunto: $nombre_archivo_original
Recibido: " . date('d/m/Y H:i:s') . "
IP: " . $_SERVER['REMOTE_ADDR'];

        // ENVIAR
        $mail->send();

        // Registrar envío exitoso
        $_SESSION['ultimo_envio'] = time();

        echo json_encode([
            'success' => true,
            'mensaje' => '¡Solicitud enviada correctamente!',
            'datos' => [
                'nombre' => $nombre,
                'email' => $email,
                'archivo' => $nombre_archivo_original
            ],
            'nota' => 'Tu solicitud ha sido recibida. Nos pondremos en contacto pronto.'
        ], JSON_UNESCAPED_UNICODE);

    } catch (Exception $e) {
        throw new Exception('Error al enviar el correo: ' . $mail->ErrorInfo);
    }

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'mensaje' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>