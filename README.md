# SERVYRE - Sitio Web Corporativo

<div align="center">

![SERVYRE](https://img.shields.io/badge/SERVYRE-Infraestructura%20Vial-e7b40b?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)

**Sitio web corporativo profesional para empresa líder en infraestructura y señalización vial en México**

[Demo](#) • [Características](#-características) • [Instalación](#-instalación) • [Documentación](#-documentación)

</div>

---

## Tabla de Contenidos

- [Acerca del Proyecto](#-acerca-del-proyecto)
- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Configuración](#️-configuración)
- [Uso](#-uso)
- [Seguridad](#-seguridad)
- [Optimización y Rendimiento](#-optimización-y-rendimiento)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## Acerca del Proyecto

SERVYRE es una empresa líder en **infraestructura vial**, **señalización** y **sistemas inteligentes de transporte (ITS)** en México. Este sitio web corporativo presenta sus servicios, productos y soluciones tecnológicas de manera profesional y accesible.

### Objetivos del Proyecto

- Presentar la empresa y sus servicios de forma profesional
- Facilitar el contacto con clientes potenciales
- Proporcionar un sistema de bolsa de trabajo seguro
- Ofrecer una experiencia de usuario óptima en todos los dispositivos
- Implementar las mejores prácticas de seguridad web

---

## Características

### Diseño y UX

- **Diseño Responsivo**: Adaptable a móviles, tablets y escritorio
- **Carruseles Interactivos**: Hero carousel con animaciones suaves y controles intuitivos
- **Navegación Intuitiva**: Menú hamburguesa para móviles con transiciones fluidas
- **Barra de Información Superior**: Datos de contacto siempre visibles
- **Efectos de Scroll**: Animaciones al hacer scroll para mejor experiencia

### Seguridad

- **Google reCAPTCHA v3**: Protección contra bots y spam
- **Validación de Archivos Multinivel**:
  - Validación de extensión
  - Verificación de tipo MIME real
  - Análisis de firma binaria de archivos PDF
  - Límite de tamaño (5MB)
- **Sanitización de Datos**: Prevención de inyección SQL y XSS
- **Rate Limiting**: Control de envíos por IP (anti-spam)
- **SMTP Seguro**: Envío de correos mediante PHPMailer con TLS

### Sistema de Bolsa de Trabajo

- **Formulario Avanzado**: Validación en tiempo real
- **Subida de Currículum**: Solo archivos PDF con validación estricta
- **Notificaciones Toast**: Feedback visual al usuario
- **Spinner de Carga**: Indicador durante el procesamiento
- **Envío por SMTP**: Correos profesionales con formato HTML
- **Respuesta JSON**: Comunicación moderna cliente-servidor

### Componentes Interactivos

- **Hero Carousel**: 4 slides con transiciones cinematográficas
- **Carousel "Sobre SERVYRE"**: Navegación por indicadores
- **Componente MVV**: Misión, Visión y Valores interactivo
- **Smooth Scroll**: Navegación suave entre secciones
- **Intersection Observer**: Animaciones al aparecer en viewport

---

## Tecnologías Utilizadas

### Frontend

Tecnología - Versión - Uso 
HTML5 - / - Estructura semántica
CSS3 - / - Estilos y animaciones
JavaScript (ES6+)  - / -  Interactividad y lógica
Google reCAPTCHA - v3 - Seguridad anti-bot

### Backend

Tecnología - Versión - Uso
PHPMailer - 6.x - Envío de correos SMTP
PHP - 7.4+ - Procesamiento del servidor

### Librerías y Dependencias

PHPMailer/
├── Exception.php
├── PHPMailer.php
└── SMTP.php

##  Estructura del Proyecto

servyre-website/
│
├── index.html                 # Página principal
├── empresa.html              # Página "Sobre la Empresa"
├── empleo.html               # Bolsa de trabajo
├── aviso-de-privacidad.html  # Aviso de privacidad
│
├── css/
│   ├── styles.css           # Estilos principales
│   └── carousel.css         # Estilos del carrusel hero
│
├── js/
│   ├── script.js            # Script principal (menú, scroll)
│   ├── carousel.js          # Carrusel "Sobre SERVYRE"
│   ├── carousel-hero.js     # Carrusel principal
│   ├── component-mvv.js     # Componente Misión/Visión/Valores
│   ├── top-info-bar.js      # Barra superior
│   └── procesar-formulario.js  # Lógica del formulario
│
├── php/
│   ├── config.php           # Configuración (NO SUBIR A GIT si es Repositorio Público)
│   ├── procesar-formulario.php  # Procesamiento del formulario
│   └── PHPMailer/           # Librería PHPMailer
│
├── assets/
│   └── icons/               # Iconos SVG
│
├── img/                     # Imágenes optimizadas (WebP)
│
└── README.md               # Este archivo


## Instalación

### Requisitos Previos

- Servidor web (Apache/Nginx)
- PHP 7.4 o superior
- Servidor SMTP o cuenta Microsfoft 365/Gmail para envío de correos
- Certificado SSL (recomendado para producción)

### Paso 1: Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/servyre-website.git
cd servyre-website
```

### Paso 2: Configurar el Archivo `config.php`

Edita `php/config.php` con tus credenciales:

```php
<?php
// Configuración de Email
define('EMAIL_DESTINO', 'tu-email@empresa.com');
define('NOMBRE_EMPRESA', 'Servyre');

// Configuración de reCAPTCHA
define('RECAPTCHA_SITE_KEY', 'tu-site-key-publica');
define('RECAPTCHA_SECRET_KEY', 'tu-secret-key-privada');

// Configuración SMTP
define('SMTP_HOST', 'smtp.gmail.com'); // Si es cuenta de Microsoft cambiar a host de microsoft (Recomendado)
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'tu-email@gmail.com');
define('SMTP_PASSWORD', 'tu-app-password');

define('MODO_DESARROLLO', false); // Cambiar a false en producción
?>
```

### Paso 3: Configurar `.gitignore`

```bash
echo "php/config.php" >> .gitignore
```

**IMPORTANTE**: Nunca subas `config.php` al repositorio público.


## Configuración

### Google reCAPTCHA v3

1. Obtén tus claves en: https://www.google.com/recaptcha/admin
2. Selecciona **reCAPTCHA v3**
3. Agrega tus dominios autorizados
4. Copia las claves en `config.php`

### Gmail SMTP (Contraseña de Aplicación)

1. Habilita la verificación en 2 pasos en tu cuenta Google o Microsoft 365
2. Ve a: https://myaccount.google.com/apppasswords
3. Genera una contraseña de aplicación (16 caracteres)
4. Usa esta contraseña en `SMTP_PASSWORD`

### Permisos de Archivos (Linux/Unix)

```bash
chmod 755 php/
chmod 644 php/*.php
chmod 600 php/config.php  # Solo lectura para el propietario
```

---

## Uso

### Producción

1. Sube todos los archivos excepto `config.php` (si es repositorio privado queda a criterio del desarrollador)
2. Crea `config.php` directamente en el servidor
3. Configura SSL/HTTPS
4. Cambia `MODO_DESARROLLO` a `false`
5. Prueba el formulario de contacto


## Seguridad

### Medidas Implementadas

| Capa | Protección |
|------|-----------|
| **Capa 1** | Rate limiting por IP (60 segundos entre envíos) |
| **Capa 2** | Google reCAPTCHA v3 (score > 0.5) |
| **Capa 3** | Sanitización de datos (prevención XSS) |
| **Capa 4** | Validación de campos obligatorios |
| **Capa 5** | Validación de formato (email, teléfono) |
| **Capa 6** | Validación de extensión de archivo |
| **Capa 7** | Validación de tipo MIME real |
| **Capa 8** | Verificación de firma binaria PDF |
| **Capa 9** | Límite de tamaño de archivo (5MB) |
| **Capa 10** | Transferencia cifrada TLS/SSL |

### Validación de Archivos PDF

```php
// 1. Extensión
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

// 2. Tipo MIME declarado
$mime_declarado = $file['type'];

// 3. Tipo MIME real (firma binaria)
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime_real = finfo_file($finfo, $file['tmp_name']);
```

### Prevención de Ataques

- **SQL Injection**: No hay consultas SQL directas
- **XSS**: Sanitización con `htmlspecialchars()`
- **CSRF**: Validación de origen
- **Email Header Injection**: Limpieza de saltos de línea
- **File Upload Attacks**: Validación multinivel
- **Brute Force**: Rate limiting
- **Bot Attacks**: reCAPTCHA v3

---

## Optimización y Rendimiento

### Imágenes

- Formato **WebP** para mejor compresión
- Imágenes responsivas con `<picture>` y `srcset`
- Lazy loading nativo: `loading="lazy"`

### CSS y JavaScript

- Minificación de archivos en producción
- Carga diferida de scripts: `defer`
- CSS crítico inline (opcional)

### Performance Metrics

| Métrica | Objetivo |
|---------|----------|
| First Contentful Paint | < 1.8s |
| Time to Interactive | < 3.9s |
| Lighthouse Score | > 90+ |


### Guidelines

- Sigue las convenciones de código existentes
- Documenta funciones complejas
- Prueba en múltiples navegadores
- Asegura que el código sea responsivo

## Licencia

Este proyecto es propiedad de **SERVYRE S.A. de C.V.** Todos los derechos reservados.

El código puede ser utilizado como referencia educativa, pero no debe ser redistribuido sin permiso.


## Contacto

**SERVYRE S.A. de C.V.**

-  Sitio web: [www.servyre.com](https://www.servyre.com)
-  Email: info@servyre.com
-  Teléfono: 800 822 3484
-  Dirección: P.º de los Tamarindos 100, Piso #2, Bosques de las Lomas, CDMX


