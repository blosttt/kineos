# TallerOS - Software de Gestión para Talleres Automotrices & Detailing 🇨🇱

TallerOS es una plataforma SaaS moderna, elegante y de alto rendimiento diseñada específicamente para el mercado de talleres mecánicos, desabolladura, pintura y detailing automotriz en Chile (inspirado en la gestión del taller boutique *Taller Automotriz Cordillera*). 

TallerOS optimiza la gestión diaria del taller reuniendo en un solo lugar la agenda de bahías de trabajo (o elevadores), el control contable de ingresos y egresos, el cálculo automatizado de comisiones de técnicos por mano de obra (por quincenas), el historial técnico (bitácora) y registro fotográfico de vehículos, y flujos de automatización de chats mediante IA.

---

## ✦ Características Principales

### 1. Control de Acceso por Roles (Seguridad)
El sistema restringe dinámicamente las herramientas y datos de acuerdo al perfil del usuario logueado:
* **Jefe de Taller (Owner / Admin):** Control total de finanzas, catálogo de servicios automotrices, convenios/packs de aseguradoras, contratación de técnicos, sucursales y la agenda general de bahías.
* **Técnico (Pintora / Desabollador):** Acceso exclusivo a su planificación de bahía, bitácora de trabajos de hoy y sus comisiones acumuladas.
* **Cliente / Dueño de Vehículo:** Portal de autogestión donde realiza el seguimiento de la reparación de su auto en tiempo real (radial de avance, historial técnico, galería fotográfica del proceso) y reserva de horas sugeridas.

### 2. Localización Completa para Chile
* **Sistema Monetario CLP:** Formateo nativo en pesos chilenos sin decimales y con separador de miles correcto (`$120.000`, `$8.420.000`).
* **Identificación por RUT:** Formularios adaptados para validar y guardar números de RUT chileno (`12.345.678-9`).
* **Indexación a la UF (Unidad de Fomento):** Indicador en tiempo real del valor diario de la UF, convirtiendo montos financieros y presupuestos automáticamente para proyecciones de cobros con aseguradoras chilenas.
* **Medios de Pago Integrados:** Soporte visual para pasarelas nacionales como **Redcompra**, **Webpay (Transbank)**, **Transferencias Electrónicas**, **MACH**, **Chek**, **Fintoc** y **Efectivo**.

### 3. Agenda Reactiva de Bahías
* Grid dinámico de distribución horaria de elevadores y bahías de trabajo.
* Al contratar un nuevo técnico, se crea de forma inmediata y reactiva una columna dedicada para su bahía en la agenda diaria.
* Clasificación de trabajos por colores (Servicio por Convenio, Servicio Particular, Presupuesto / Diagnóstico o Cancelado).

### 4. Contabilidad y Liquidación de Técnicos
* Libro de transacciones de ingresos y egresos en tiempo real.
* Gráfico de composición de ingresos dinámico (servicios particulares vs. convenios vs. repuestos/productos) calculado reactivamente.
* Gráfico histórico de facturación mensual.
* Motor de conciliación y liquidación quincenal: calcula automáticamente las comisiones generadas por cada técnico por sus trabajos realizados y registra el egreso contable en un clic.

### 5. Asistente con Inteligencia Artificial (Simulado)
* Módulo IA capaz de leer chats entrantes (WhatsApp/Instagram), detectar patentes, sugerir horarios óptimos en la agenda de bahías y registrar de manera autónoma las órdenes de trabajo de los clientes.

---

## 🛠️ Tecnologías Utilizadas

TallerOS está desarrollado bajo un enfoque *offline-first* ultraliviano, garantizando tiempos de carga inmediatos y un rendimiento óptimo sin dependencias complejas:
* **Estructura y Vistas:** HTML5 Semántico.
* **Estilos y Experiencia Visual:** CSS3 moderno utilizando propiedades personalizadas, gradientes suaves, efectos de glassmorphism y micro-animaciones premium.
* **Lógica de Aplicación:** JavaScript vanilla (ES6+) estructurado de forma reactiva.
* **Persistencia de Datos:** `localStorage` como base de datos del cliente, asegurando la resiliencia de datos local bajo la clave `TALLER_OS_DATA`.
* **Entorno de Desarrollo:** Vite.

---

## 🚀 Instalación y Uso Local

Para ejecutar TallerOS en tu entorno de desarrollo local, sigue estos sencillos pasos:

1. **Clona el repositorio o descarga el código:**
   ```bash
   git clone <url-de-tu-repositorio>
   cd talleros
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
* **Jefe de Taller (Administrador):** `admin@tallerOS.cl` (contraseña: `admin` o cualquier texto)
* **Técnico (Pintora Senior):** `laura@tallerOS.cl` (contraseña: `laura` o cualquier texto)
* **Cliente / Dueño de Vehículo:** `ana@tallerOS.cl` (contraseña: `ana` o cualquier texto)
