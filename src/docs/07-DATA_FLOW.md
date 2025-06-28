# Mapa de Flujo de Datos: El Viaje de la Idea a la Canción

Este documento traza el camino exacto que sigue la información desde que el usuario la introduce en el formulario hasta que recibe su canción generada. Es el mapa de carreteras de la lógica de la aplicación.

---

### **Flujo Principal: Creación de la Canción**

Este es el proceso paso a paso cuando un usuario hace clic en "Obtener mi Preview Gratis".

**1. El Cliente (Navegador del Usuario)**

*   **Punto de Partida:** El componente `SongCreationForm.tsx`.
*   **Recopilación:** El usuario rellena el formulario. La librería **React Hook Form** gestiona el estado de los campos en tiempo real.
*   **Validación Front-end:** Al hacer clic en el botón, el esquema definido en `src/config/schemas.ts` (usando **Zod**) valida que todos los datos sean correctos (ej. que el email sea válido, que la historia tenga un mínimo de caracteres, etc.).
*   **Llamada a la Acción:** Si la validación es exitosa, el formulario llama a la "Server Action" llamada `createSongAction`, que se encuentra en `src/app/test-pago/actions.ts`. Los datos del formulario se envían al servidor.

**2. El Servidor (La Lógica de Next.js)**

*   **Recepción:** La función `createSongAction` en `actions.ts` recibe los datos del cliente.
*   **Orquestación:** Esta función actúa como un director de orquesta. Su única misión es llamar al flujo de IA correspondiente, en este caso, `generateSongLyricsAndAudio` que vive en `src/ai/flows/generate-song-lyrics-and-audio.ts`, pasándole los datos.

**3. El Cerebro de IA (Genkit y Google Gemini)**

*   **Activación del Flujo:** Se ejecuta el `generateSongLyricsAndAudioFlow`.
*   **Construcción del Prompt:** El flujo toma los datos del usuario (historia, género, nombres, etc.) y los inserta en una plantilla de instrucciones muy detallada (el "prompt").
*   **Llamada a Gemini (Letra):** Envía el prompt al modelo de lenguaje de Gemini, pidiéndole que escriba la letra y la formatee con etiquetas **SSML** para darle emoción (pausas, ritmo, etc.).
*   **Llamada a Gemini (Voz):** El flujo toma la letra con SSML, le quita los marcadores de estructura como `(Coro)`, y la envía al modelo de **Texto-a-Voz (TTS)**.
*   **Procesamiento de Audio:** El audio se recibe en un formato crudo y se convierte a un archivo `.wav` usando una librería del servidor.
*   **Respuesta del Flujo:** El flujo termina y devuelve un objeto `{ lyrics, audio }` a la función que lo llamó en el paso 2.

**4. El Viaje de Vuelta al Cliente**

*   **Retorno del Servidor:** La "Server Action" (`createSongAction`) recibe el objeto `{ lyrics, audio }` y se lo devuelve al navegador del usuario como resultado de la llamada original.
*   **Actualización de la Interfaz:** El componente `SongCreationForm.tsx` recibe la respuesta.
*   **Cambio de Estado:** Actualiza su estado interno (`setFormStep('review')`) y muestra la pantalla de revisión, renderizando la letra (`lyrics`) y el reproductor de audio con la canción (`audio`).

---

### **Flujo Paralelo: Creación de la Carátula**

Este proceso se inicia **después** de que el usuario llega a la pantalla de revisión, para no bloquear el flujo principal.

*   **Activación:** Desde `SongCreationForm.tsx`, cuando se entra en el modo de revisión, se llama a la "Server Action" `createAlbumArtAction`.
*   **Resumen Inteligente:** El flujo de IA `generateAlbumArt` primero pide a Gemini que resuma la historia del usuario en una frase corta y visual.
*   **Generación de Imagen:** Usa esa frase para generar la carátula con el modelo de imágenes de Gemini.
*   **Retorno y Actualización:** Devuelve la URL de la imagen al cliente, que la muestra en la pantalla en cuanto está lista, sin haber detenido nunca el proceso principal.
