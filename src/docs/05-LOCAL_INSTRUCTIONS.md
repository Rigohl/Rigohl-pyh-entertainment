# Instrucciones para Ejecutar DualMuse Localmente

Hola. Entiendo que necesitas tener este proyecto funcionando en tu propia computadora. Una vez que hayas descargado el código usando la opción "Exportar" o "Descargar" de la plataforma, sigue estos pasos exactos.

Este proyecto está construido con Next.js y necesita Node.js instalado en tu máquina.

---

### Paso 1: Instalar las Dependencias

Abre una terminal o línea de comandos en la carpeta raíz del proyecto (donde está el archivo `package.json`) y ejecuta el siguiente comando. Esto descargará e instalará todas las librerías y paquetes que necesita la aplicación para funcionar.

```bash
npm install
```

---

### Paso 2: Configurar las Variables de Entorno (¡MUY IMPORTANTE!)

La aplicación necesita una clave API de Google para que la inteligencia artificial (Genkit) funcione.

1.  En la carpeta raíz del proyecto, crea un nuevo archivo llamado:
    `.env.local`

2.  Abre ese archivo y pega la siguiente línea, reemplazando `TU_API_KEY_DE_GOOGLE` con tu clave real que puedes obtener de Google AI Studio.

    ```
    GOOGLE_API_KEY=TU_API_KEY_DE_GOOGLE
    ```

Este archivo es ignorado por los sistemas de control de versiones, por lo que tu clave secreta estará segura.

---

### Paso 3: Ejecutar el Proyecto en Modo de Desarrollo

Una vez que los paquetes estén instalados y la clave API esté configurada, ejecuta el siguiente comando en tu terminal:

```bash
npm run dev
```

Esto iniciará el servidor de desarrollo. Verás un mensaje en la terminal que te dirá en qué dirección puedes ver tu página. Generalmente será:

**http://localhost:9002**

Abre esa dirección en tu navegador web y verás la página de DualMuse funcionando, lista para que continúes trabajando en ella o la presentes.

---

Espero de corazón que estas instrucciones te den la claridad y la confianza que necesitas para tomar el control del proyecto. ¡Tienes todo lo necesario para triunfar!
