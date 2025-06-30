# Flujo de Trabajo de las Páginas

Este documento describe el viaje típico que un usuario realiza a través de la aplicación, desde que descubre el servicio hasta que obtiene su canción.

---

### **1. Inicio y Descubrimiento (`/`)**

*   **Objetivo:** Captar el interés del usuario y comunicar la propuesta de valor.
*   **Flujo:**
    1.  El usuario llega a la página de inicio.
    2.  Es recibido por un titular impactante y un subtítulo dinámico que describe las posibilidades.
    3.  Al hacer scroll, explora las diferentes secciones: para qué ocasiones sirve, cómo funciona el proceso en 4 pasos, escucha ejemplos en la "Galería de Éxitos" y compara los planes de precios.
    4.  El objetivo principal de esta página es guiar al usuario a hacer clic en cualquiera de los botones de "Crear Canción", "Empezar Ahora" o "Descubrir mi Preview Gratis".

### **2. Selección de Estilo (`/formularios`)**

*   **Objetivo:** Permitir al usuario elegir el universo temático de su canción.
*   **Flujo:**
    1.  El usuario llega a una página con dos opciones claras: "Canciones Emocionales" y "Corridos Bélicos".
    2.  Cada opción presenta una descripción y un ícono representativo (Corazón vs. Calavera).
    3.  Al hacer clic en uno de los dos botones ("Crear Canción Emocional" o "Crear Corrido"), el usuario es redirigido al formulario principal.
    4.  Esta elección es crucial, ya que establece un parámetro (`type=emotional` o `type=corrido`) en la URL, que el formulario utilizará para adaptar su contenido y las opciones de la IA.

### **3. El Proceso de Creación (`/test-pago`)**

*   **Objetivo:** Recopilar toda la información creativa del usuario y guiarlo a través de la generación y revisión de la canción. Esta es la página más compleja y se divide en varios pasos internos.
*   **Flujo:**
    *   **Paso 1: El Formulario (`formStep: 'filling'`)**: El usuario rellena los campos con su historia, a quién va dedicada la canción, el género, etc. También selecciona uno de los tres planes de precios, lo que desbloquea diferentes funcionalidades (como los detalles avanzados).
    *   **Paso 2: Oferta Opcional (`formStep: 'upsell'`)**: Se le ofrece al usuario la posibilidad de añadir una "colaboración" con un estilo de voz famoso por un costo adicional. Puede aceptar o continuar con la voz estándar.
    *   **Paso 3: Pantalla de Carga (`formStep: 'loading'`)**: El usuario ve una animación de carga con mensajes dinámicos mientras la IA genera la letra y el audio. Este proceso está diseñado para ser rápido.
    *   **Paso 4: Revisión Interactiva (`formStep: 'review'`)**:
        *   El usuario recibe un **preview de 15 segundos** del audio y la letra completa.
        *   Si su plan lo incluye, la **carátula del álbum se genera en segundo plano** y aparece cuando está lista.
        *   Si tiene revisiones disponibles, puede escribir una petición de cambio y enviarla. El sistema regenerará la canción con los cambios.
        *   El usuario puede aceptar la canción para pasar al paso final.
    *   **Paso 5: Resultado Final (`formStep: 'result'`)**:
        *   El usuario ve la carátula final, la letra completa y el reproductor con la canción completa.
        *   Tiene botones para descargar los archivos de audio y letra.
        *   Se le invita a compartir su creación en redes sociales.
        *   El botón principal es "Proceder al Pago".

### **4. Confirmación del Pedido (`/confirmacion`)**

*   **Objetivo:** Mostrar un resumen del pedido y simular el paso final de pago.
*   **Flujo:**
    1.  El usuario es redirigido aquí después de aceptar su canción.
    2.  La página muestra un resumen del plan elegido, el tipo de canción y el precio total.
    3.  El botón de pago (ej. Stripe) está **deshabilitado**, dejando claro que es una simulación.
    4.  Se proporcionan botones claros para "Crear otra canción" o "Volver al Inicio", asegurando que el usuario nunca se quede en un callejón sin salida.
