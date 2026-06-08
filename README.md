# KineOS - Software de Gestión para Kinesiología y Centros de Estética 🇨🇱

KineOS es una plataforma SaaS moderna, elegante y de alto rendimiento diseñada específicamente para el mercado de kinesiología y centros de estética integral en Chile (como *KineEstética Cordillera*). 

KineOS optimiza la gestión diaria del centro reuniendo en un solo lugar la agenda de boxes, el control contable de ingresos y egresos, el cálculo automatizado de comisiones del personal (por quincenas), fichas clínicas de progreso de pacientes, y flujos de automatización de chats.

---

## ✦ Características Principales

### 1. Control de Acceso por Roles (Seguridad)
El sistema restringe dinámicamente las herramientas y datos de acuerdo al perfil del usuario logueado:
* **Administrador (Owner):** Control total de finanzas, catálogo de servicios, paquetes multisesión, contratación de personal, sucursales y agenda general.
* **Especialista (Kinesióloga / Masoterapeuta):** Acceso exclusivo a su agenda de box, bitácora de sesiones y comisiones acumuladas.
* **Clienta:** Portal de autogestión donde realiza seguimiento a su progreso (gráfico de sesiones, bitácora del tratamiento, galería de fotos de evolución) y reserva de horas sugeridas en tiempo real.

### 2. Localización Completa para Chile
* **Sistema Monetario CLP:** Formateo nativo en pesos chilenos sin decimales y con separador de miles correcto (`$45.000`, `$8.420.000`).
* **Identificación por RUT:** Formularios adaptados para validar y guardar números de RUT chileno (`12.345.678-9`).
* **Indexación a la UF (Unidad de Fomento):** Indicador en tiempo real del valor diario de la UF, convirtiendo montos financieros y reportes automáticamente para proyecciones estables.
* **Medios de Pago Integrados:** Soporte visual para pasarelas nacionales como **Redcompra**, **Webpay (Transbank)**, **Transferencias Electrónicas**, **MACH**, **Chek**, **Mercado Pago** y **Efectivo**.

### 3. Agenda Reactiva de Boxes
* Grid dinámico de distribución horaria de boxes.
* Al contratar una nueva especialista, se crea de forma inmediata y reactiva una columna dedicada para su box en la agenda diaria.
* Clasificación de citas por colores (Sesión de paquete, Servicio individual, Evaluación o Cancelada).

### 4. Contabilidad y Liquidación de Personal
* Libro de transacciones de ingresos y egresos en tiempo real.
* Gráfico de composición de ingresos dinámico (servicios vs. paquetes vs. productos) calculado reactivamente.
* Gráfico histórico de facturación mensual.
* Motor de conciliación y liquidación quincenal: calcula automáticamente las comisiones generadas por cada kinesióloga y registra el egreso contable en un clic.

### 5. Asistente con Inteligencia Artificial (Simulado)
* Módulo IA capaz de leer chats entrantes (WhatsApp/Instagram), sugerir horarios óptimos en la agenda de los boxes y reservar turnos de manera autónoma.

---

## 🛠️ Tecnologías Utilizadas

KineOS está desarrollado bajo un enfoque *offline-first* ultraliviano, garantizando tiempos de carga inmediatos y un rendimiento óptimo sin dependencias complejas:
* **Estructura y Vistas:** HTML5 Semántico.
* **Estilos y Experiencia Visual:** CSS3 moderno utilizando propiedades personalizadas, gradientes suaves, efectos de glassmorphism y micro-animaciones premium.
* **Lógica de Aplicación:** JavaScript vanilla (ES6+) estructurado de forma reactiva.
* **Persistencia de Datos:** `localStorage` como base de datos del cliente, asegurando la resiliencia de datos local.
* **Entorno de Desarrollo:** Vite.

---

## 🚀 Instalación y Uso Local

Para ejecutar KineOS en tu entorno de desarrollo local, sigue estos sencillos pasos:

1. **Clona el repositorio o descarga el código:**
   ```bash
   git clone <url-de-tu-repositorio>
   cd kineos
   ```

2. **Instala las dependencias del proyecto:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo local:**
   ```bash
   npm run dev
   ```

4. **Abre la aplicación en tu navegador:**
   La terminal te indicará la dirección local (usualmente `http://localhost:5173/`).

---

## 🔑 Cuentas Demo de Prueba

Puedes probar los diferentes portales usando estos datos de acceso rápido integrados en la pantalla de login:
* **Owner / Administrador:** `admin@kineos.cl` (contraseña: `admin` o cualquier texto)
* **Kinesióloga (Especialista):** `laura@kineos.cl` (contraseña: `laura` o cualquier texto)
* **Clienta:** `ana@kineos.cl` (contraseña: `ana` o cualquier texto)
