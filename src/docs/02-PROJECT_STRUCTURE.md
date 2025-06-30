# Estructura del Proyecto y Mapeo de Archivos

Este documento es el mapa completo de tu aplicación. Entenderlo te ayudará a saber dónde encontrar cada pieza y cómo se conectan entre sí.

---

### **Directorio Raíz (`/`)**

Estos son los archivos de configuración principales que controlan todo el proyecto.

*   `package.json`: El "certificado de nacimiento" del proyecto. Define las librerías que usa (dependencias) y los comandos para ejecutarlo (`npm run dev`).
*   `tailwind.config.ts`: El centro de control del diseño. Aquí se define la paleta de colores, las tipografías y otros estilos de Tailwind CSS.
*   `next.config.ts`: Archivo de configuración para Next.js.
*   `tsconfig.json`: Archivo de configuración de TypeScript, que ayuda a mantener el código limpio y sin errores.
*   `apphosting.yaml`: Define la configuración para el despliegue en Firebase App Hosting.
*   `README.md`: Un resumen del proyecto que apunta a esta carpeta de documentación.

---

### **La Carpeta `src` (El Código Fuente)**

La carpeta más importante, donde vive toda la lógica y el contenido de tu aplicación.

#### **`src/app/` (El Corazón de la Aplicación)**
*   **Propósito:** Gestiona todas las páginas y rutas de tu sitio web. Cada subcarpeta aquí representa una página.
*   **Archivos Principales:**
    *   `layout.tsx`: La plantilla principal que envuelve todo el sitio (contiene la cabecera y el pie de página).
    *   `page.tsx`: La página de inicio (`/`).
    *   `globals.css`: Define los estilos globales y los colores del tema.
    *   `not-found.tsx`: La página de error 404.
    *   `robots.ts` & `sitemap.ts`: Archivos de SEO que ayudan a Google a entender tu sitio.
*   **Subcarpetas (Páginas):** `confirmacion`, `ejemplos`, `faq`, `formularios`, `privacy`, `proceso`, `quienes-somos`, `terms`, `test-pago`. El nombre de cada carpeta corresponde a la URL.

#### **`src/ai/` (El Cerebro de IA)**
*   **Propósito:** Contiene toda la lógica relacionada con la Inteligencia Artificial.
*   **Archivos:**
    *   `genkit.ts`: Inicializa y configura Genkit.
    *   `flows/`: Contiene los "flujos" de IA que definen las tareas complejas.
        *   `generate-song-lyrics-and-audio.ts`: El flujo principal que recibe los datos del formulario, escribe la letra con SSML y genera el audio "hablado-cantado".
        *   `generate-album-art.ts`: El flujo que toma la historia, la resume en un prompt visual y genera la carátula.
        *   `incorporate-user-requests-into-song.ts`: El flujo que se activa cuando un usuario pide una revisión. Toma la letra existente y la modifica según las instrucciones.

#### **`src/components/` (Bloques de Construcción)**
*   **Propósito:** Almacena componentes de interfaz reutilizables.
*   **Archivos Principales:**
    *   `Header.tsx` y `Footer.tsx`: Cabecera y pie de página globales.
    *   `SongCreationForm.tsx`: Uno de los archivos más importantes. Contiene toda la lógica del formulario de varios pasos para crear la canción.
*   **Subcarpeta `ui/`:** Tu kit de herramientas de UI. Contiene componentes de ShadCN listos para usar (botones, tarjetas, diálogos, etc.). Generalmente no necesitas editarlos, solo importarlos donde los necesites.

#### **`src/config/` (Configuraciones Centralizadas)**
*   **Propósito:** Almacena la configuración clave de la aplicación para mantenerla organizada.
*   **Archivos:**
    *   `plans.ts`: Define los detalles de los planes de precios (Creador, Artista, Maestro) para ambos tipos de canciones, incluyendo sus características y precios.
    *   `schemas.ts`: **Archivo crucial**. Define el "plano" o la estructura de los datos del formulario usando Zod. Garantiza que todos los datos sean correctos antes de ser procesados.

#### **`src/hooks/` (Lógica Reutilizable)**
*   **Propósito:** Contiene "hooks" de React para encapsular lógica que se usa en múltiples lugares.
*   **Archivos:**
    *   `use-toast.ts`: Gestiona las notificaciones emergentes (toasts) que aparecen en pantalla.

#### **`src/lib/` (Utilidades)**
*   **Propósito:** Funciones de ayuda generales.
*   **Archivos:**
    *   `utils.ts`: Contiene la función `cn` para combinar clases de CSS de forma inteligente.
    *   `audio.ts`: Contiene la función `toWav` para convertir el audio generado por la IA al formato correcto.

#### **`src/docs/` (Documentación del Proyecto)**
*   **Propósito:** Contiene todos los documentos (como este) que explican cómo funciona el proyecto.

---

### **Carpeta `public`**

*   **Propósito:** Aquí se colocan todos los archivos estáticos que necesitan ser accesibles directamente desde la web, como imágenes, audios de ejemplo (`/audio/placeholder-1.mp3`), fuentes o videos.
