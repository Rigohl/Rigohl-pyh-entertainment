# ¿Cómo Funciona la Creación de Música con IA?

Este documento desglosa el proceso técnico y creativo que ocurre "tras bambalinas" cuando un usuario genera una canción en DualMuse.

---

El sistema se basa en una serie de "flujos" de IA orquestados por Genkit. Cada flujo es una tarea especializada.

### **Paso 1: Generación de Letra y Voz (Spoken Word)**

Este es el núcleo del proceso de creación inicial.

*   **Archivo responsable:** `src/ai/flows/generate-song-lyrics-and-audio.ts`
*   **Entrada:** Todos los datos del formulario que el usuario ha rellenado (`SongCreationFormValues`).
*   **Proceso Detallado:**
    1.  **Prompt Inteligente:** Se construye un "prompt" (un conjunto de instrucciones) muy detallado para el modelo de lenguaje de IA (Google Gemini). Este prompt le ordena a la IA actuar como un **experto en declamación poética y "Spoken Word"**.
    2.  **Contexto Creativo:** El prompt incluye toda la información del formulario: el tipo de canción (emocional/corrido), la historia, las personas involucradas, el género, el tempo, el ambiente y las palabras clave.
    3.  **Generación de Letra con SSML:** La IA escribe la letra de la canción. Crucialmente, no solo escribe el texto, sino que lo envuelve en **SSML (Speech Synthesis Markup Language)**. Esto significa que añade "instrucciones de actuación" directamente en el texto, como:
        *   `<break time="1.5s" />` para crear pausas dramáticas entre estrofas.
        *   `<prosody rate="fast" pitch="+2st">` para hacer que el coro suene más rápido y con un tono más alto, generando contraste y emoción.
    4.  **Interpretación Vocal (TTS):** El texto formateado con SSML se pasa a un segundo modelo de IA, el de **Texto-a-Voz (TTS)**. Este modelo no "lee" el texto, sino que "interpreta" las etiquetas SSML, resultando en una declamación con ritmo y sentimiento, en lugar de una lectura plana. Los marcadores de estructura como `(Coro)` se eliminan antes de este paso para que no sean leídos en voz alta.
    5.  **Conversión de Audio:** La voz generada se recibe en formato PCM y se convierte a un archivo `.wav` utilizando una librería en el servidor.
*   **Salida:** Un objeto que contiene la letra en texto plano (`lyrics`) y el audio en formato de data URI base64 (`audio`).

### **Paso 2: Generación de Carátula (Proceso en Paralelo)**

Este flujo se ejecuta en segundo plano mientras el usuario está en la pantalla de revisión.

*   **Archivo responsable:** `src/ai/flows/generate-album-art.ts`
*   **Entrada:** La historia completa de la canción.
*   **Proceso Detallado:**
    1.  **Resumen Inteligente:** Para evitar darle a la IA de imágenes un texto demasiado largo y confuso, primero se le pide a un modelo de lenguaje que **resuma la historia en una frase corta (5-10 palabras)**, visualmente evocadora y poética.
    2.  **Prompt de Imagen:** Este resumen se inserta en un prompt diseñado para arte de álbumes: `Professional digital painting, album cover art. Cinematic, dramatic lighting. No text... Theme: [resumen]`.
    3.  **Generación de Imagen:** El prompt final se envía al modelo de generación de imágenes de Gemini para crear la carátula.
*   **Salida:** La URL de la imagen generada en formato data URI.

### **Paso 3: Revisión de la Canción (Bucle Interactivo)**

Este flujo se activa cada vez que un usuario con un plan compatible solicita un cambio.

*   **Archivo responsable:** `src/ai/flows/incorporate-user-requests-into-song.ts`
*   **Entrada:** La letra original, la petición de cambio del usuario (ej: "haz el coro más feliz") y todos los detalles originales de la canción para mantener el contexto.
*   **Proceso Detallado:**
    1.  La IA recibe la letra existente y las nuevas instrucciones.
    2.  Reescribe **únicamente las secciones solicitadas**, respetando el resto de la canción.
    3.  Al igual que en el paso 1, formatea la nueva letra con SSML para darle emoción y la envía al generador de voz para crear el nuevo archivo de audio.
*   **Salida:** Un objeto con la letra revisada (`revisedLyrics`) y el audio revisado (`revisedAudio`).
