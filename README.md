# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Tecnologías Utilizadas

Esta aplicación está construida con una selección de tecnologías modernas y potentes para garantizar un rendimiento y una experiencia de usuario de primera categoría.

| Herramienta / Framework | Uso                                         | Estado      |
| ----------------------- | ------------------------------------------- | ----------- |
| **Next.js (con React)** | Framework principal para la aplicación web   | ✅ Instalado |
| **TailwindCSS**         | Estilos rápidos, responsive y modernos      | ✅ Instalado |
| **shadcn/ui**           | Componentes de UI accesibles y personalizables | ✅ Instalado |
| **TypeScript**          | Código tipado, menos errores                | ✅ Activado  |
| **Genkit**              | Orquestación de IA con Google Gemini        | ✅ Instalado |
| **Zod**                 | Validación de datos y esquemas              | ✅ Instalado |
| **React Hook Form**     | Manejo de formularios complejos             | ✅ Instalado |
| **Lucide React**        | Biblioteca de íconos                        | ✅ Instalado |


## Project Structure Map

This is a breakdown of your web application's structure. Understanding it will help you know where to find each piece and how they connect.

### **Root Directory (`/`)**

These are the main configuration files that control the entire project.

*   `package.json`: The project's "birth certificate." It defines the libraries it uses (dependencies) and the commands to run it (`npm run dev`).
*   `tailwind.config.ts`: The design control center. Here you define the color palette, fonts, and other Tailwind CSS styles.
*   `next.config.ts`: Configuration file for Next.js.
*   `tsconfig.json`: Configuration file for TypeScript, which helps keep the code clean and error-free.
*   `apphosting.yaml`: Defines the configuration for deployment to Firebase App Hosting.
*   `README.md`: This file, your project's documentation!

---

### **`src` Folder (The Source Code)**

The most important folder, where all the logic and content of your application lives.

*   **`src/app/` (The Application Heart - 20 files)**
    *   **Purpose:** Manages all the pages and routes of your website. Each subfolder here represents a page.
    *   **Main Files:**
        *   `layout.tsx`: The main template that wraps the entire website (contains the Header and Footer).
        *   `page.tsx`: The home page.
        *   `globals.css`: Defines the global styles and colors (the theme).
        *   `not-found.tsx`: The 404 error page.
        *   `robots.ts` & `sitemap.ts`: SEO files that help Google understand your site.
    *   **Subfolders (Pages):** `confirmacion`, `ejemplos`, `faq`, `formularios`, `privacy`, `proceso`, `quienes-somos`, `terms`, `test-pago`.

*   **`src/ai/` (The AI Brain - 5 files)**
    *   **Purpose:** Contains all the logic related to Artificial Intelligence.
    *   **Files:** `genkit.ts` (initialization) and `dev.ts`.
    *   **Subfolder `flows/`:** Contains the AI "flows" that define how songs and album covers are generated and how revisions are processed.

*   **`src/components/` (Building Blocks - 36 files)**
    *   **Purpose:** Stores reusable interface components.
    *   **Main Files:** `Header.tsx`, `Footer.tsx`, and `SongCreationForm.tsx` (the song creation form).
    *   **Subfolder `ui/` (33 files):** This is your UI toolkit. It contains ready-to-use ShadCN components like buttons, cards, dialogs, etc. You generally don't need to edit them, just import them.

*   **`src/hooks/` (Reusable Logic - 2 files)**
    *   **Purpose:** Contains React "hooks" to encapsulate logic used in multiple places.
    *   **Files:** `use-mobile.ts` (to detect if a mobile device is being used) and `use-toast.ts` (to manage notifications).

*   **`src/lib/` (Utilities - 1 file)**
    *   **Purpose:** General helper functions.
    *   **Files:** `utils.ts`, which contains the `cn` function for intelligently combining CSS classes.

---

### **`public` Folder**

*   **Purpose:** This is where you place all static files that need to be directly accessible from the web, such as images, sample audio (`/audio/placeholder-1.mp3`), fonts, or videos.
