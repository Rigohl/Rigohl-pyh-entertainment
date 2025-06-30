# Blueprint del Proyecto: DualMuse

Este documento es una descripción exhaustiva y detallada de la plataforma web DualMuse. Sirve como un manual de referencia completo que cubre la arquitectura, el diseño, el contenido de texto, los efectos visuales y la lógica funcional de cada componente y página.

---

## 1. Diseño Global y Estructura Visual

Estos son los principios de diseño que aplican a toda la plataforma para mantener la coherencia.

### 1.1. Tema y Paleta de Colores
- **Ambiente General:** Moderno, oscuro, premium. El fondo principal es un gris muy oscuro (`hsl(240 10% 3.9%)`), evocando un estudio de grabación.
- **Tipografía Principal:**
  - **Titulares:** `Playfair Display` (Serif). Aporta elegancia y peso a los títulos.
  - **Cuerpo de Texto:** `Inter` (Sans-serif). Garantiza legibilidad y modernidad en párrafos y UI.
- **Colores de Acento:**
  - **Dorado (`accent-gold`):** Usado para los CTAs (Llamadas a la Acción) más importantes y para denotar lujo.
  - **Rosa (`emotional-pink`):** Identifica el universo de "Canciones Emocionales".
  - **Rojo (`corridos-red`):** Identifica el universo de "Corridos".

### 1.2. Efectos y Microinteracciones Globales
- **Transiciones:** Todos los cambios visuales (color, tamaño) son suaves y duran 0.2-0.3 segundos (`transition-all`, `duration-300`).
- **Efectos Hover (al pasar el ratón):**
  - **Botones/Tarjetas:** Se elevan sutilmente (`hover:-translate-y-2`) o escalan (`hover:scale-105`) con una sombra más pronunciada (`hover:shadow-2xl`) para dar retroalimentación visual.
- **Animaciones de Entrada:** Los elementos clave de las secciones se desvanecen hacia adentro (`fade-in`) y se deslizan sutilmente (`fade-in-down` o `fade-in-up`) para una aparición elegante.

---

## 2. Componentes Globales

Estos componentes aparecen en la mayoría de las páginas.

### 2.1. Header (Cabecera)
- **Comportamiento:** Fijo en la parte superior (`sticky`). Al hacer scroll, un efecto de desenfoque (`backdrop-blur`) se aplica al fondo de la cabecera.
- **Contenido Izquierda:**
  - **Icono:** Nota musical (`Music`) en color dorado.
  - **Texto:** "DualMuse" en `Playfair Display`, 20px, negrita.
- **Contenido Centro (Escritorio):**
  - **Menú:** "Cómo Funciona", "Ejemplos", "Quiénes Somos", "FAQ". Letra `Inter`, 14px. El enlace de la página activa es blanco y en negrita; los inactivos son de un gris tenue.
- **Contenido Derecha:**
  - **Botón:** "Crear Canción". Fondo dorado, texto negro, negrita.
- **Versión Móvil:**
  - El menú central se reemplaza por un **ícono de hamburguesa**. Al tocarlo, un panel (`Sheet`) se desliza desde la derecha, mostrando los enlaces de navegación y el botón "Crear Canción" apilados verticalmente.

### 2.2. Footer (Pie de Página)
- **Diseño:** Fondo gris oscuro (`secondary/30`), dividido en tres columnas en escritorio.
- **Columna 1:** Logo y texto de copyright: "© [Año actual] DualMuse. Todos los derechos reservados."
- **Columna 2 (Explora):** Enlaces a "Cómo Funciona", "Ejemplos", "Crear Canción".
- **Columna 3 (Nosotros):** Enlaces a "Quiénes Somos", "FAQ", "Términos de Servicio", "Política de Privacidad".

---

## 3. Desglose de Páginas

### 3.1. Página de Inicio (`/`)

#### a) Hero Section
- **Fondo:** Imagen de un músico en un estudio, oscurecida con opacidad al 20%. Un gradiente inferior la funde con el fondo.
- **Título Principal:** "Tu Historia Hecha Canción". `Playfair Display`, 72px en escritorio, centrado, animado con `fade-in-down`.
- **Subtítulo Dinámico:** Un párrafo que cambia cada 4 segundos con un efecto de `fade-in-up`. Las frases son:
  - "Creamos canciones únicas, desde baladas emotivas hasta corridos con fuerza."
  - "El regalo perfecto para un aniversario inolvidable."
  - "La banda sonora única para tu historia de amor."
  - (y otras 5 frases).
- **Botón CTA:** "Crear mi Canción".

#### b) Sección "El detalle perfecto para cada ocasión"
- **Diseño:** Dos columnas. Izquierda: Imagen vertical de una mujer sonriendo. Derecha: Contenido de texto.
- **Título:** "El detalle perfecto para cada ocasión".
- **Subtítulo:** "Convierte tus sentimientos en un recuerdo único 🎶".
- **Listas de Ocasiones y Garantías:** Listas verticales con un emoji a la izquierda, título en negrita y descripción.
  - **Ocasiones:** "Cumpleaños", "Aniversarios", "Boda", "Nacimiento", etc.
  - **Garantías:** "100 % personalizada y confidencial", "Tu canción es tuya".

#### c) Sección "De tu Idea a una Canción en 4 Pasos"
- **Título:** "De tu Idea a una Canción en 4 Pasos".
- **Subtítulo:** "Crear una canción personalizada nunca fue tan fácil."
- **Contenido:** Cuatro columnas, cada una con:
  - Un círculo dorado con un ícono (`FileText`, `Music`, `CreditCard`, `Send`).
  - Un título como "1. Cuéntanos tu historia".
  - Una descripción como "Rellena nuestro formulario con los detalles...".

#### d) Sección "Galería de Éxitos"
- **Título:** "Galería de Éxitos".
- **Contenido:** Dos tarjetas de ejemplo, mostrando:
  - Carátula, título ("Rosas de Acero", "El Patrón de Culiacán").
  - Descripción breve y etiqueta de género (rosa o rojo).
  - Un reproductor de audio HTML5.
- **Botón:** "Ver más ejemplos".

#### e) Sección "Planes a tu Medida"
- **Selector:** Pestañas para "Canciones Emocionales" y "Corridos". La pestaña activa tiene un fondo claro.
- **Tarjetas de Planes:** Tres tarjetas por categoría.
  - **Efecto de Destaque:** La tarjeta central (Artista/Leyenda) tiene un borde de color y una etiqueta "Recomendado".
  - **Efecto Hover:** Se levantan y su sombra se intensifica.
  - **Contenido por Tarjeta (Ej. Plan Artista):**
    - **Título:** "Plan Artista"
    - **Precio:** "$399"
    - **Lista de Beneficios:** Con íconos de check verde. Ej: "Todo lo del Plan Creador +", "2 Revisiones de letra y melodía", "Control de Composición (Instrumentos, Tempo)", "Carátula de Álbum Digital con IA".

#### f) Sección "Lo que Dicen Nuestros Clientes"
- **Diseño:** Un carrusel horizontal con scroll oculto.
- **Tarjetas de Testimonio:** Cada tarjeta contiene:
  - Avatar, nombre del cliente ("Ana Sofía V.").
  - Cinco estrellas doradas.
  - Una cita entre comillas: `"La canción para mi aniversario fue simplemente perfecta..."`.

#### g) Sección Final CTA
- **Título:** "¿Listo para crear tu obra maestra?".
- **Párrafo:** "No esperes más para darle vida a tu historia...".
- **Botón:** "Empezar ahora" (botón dorado principal).

### 3.2. Página de Formularios de Selección (`/formularios`)
- **Título:** "Elige Tu Estilo".
- **Contenido:** Dos tarjetas grandes lado a lado.
  - **Tarjeta 1 (Canciones Emocionales):** Borde rosa, ícono de corazón, descripción sobre aniversarios y momentos emotivos. Botón "Crear Canción Emocional".
  - **Tarjeta 2 (Corridos Bélicos):** Borde rojo, ícono de calavera, descripción sobre hazañas y lealtad. Botón "Crear Corrido".

### 3.3. El Flujo de Creación (`/test-pago`)

#### a) Paso 1: El Formulario
- **Encabezado:** Título e ícono cambian (Corazón/Calavera) según el `songType`.
- **Campos de Texto:**
  - **Correo Electrónico:** Campo para que el usuario reciba la canción.
  - **Para quién es:** Placeholder "Ej: Mi madre, Ana..." (Emocional) vs. "Ej: El Compa Juan..." (Corrido).
  - **De parte de quién:** Placeholder "Tu nombre".
  - **Apodo (opcional):** Placeholder "Ej: Chuy, La Güera...".
  - **Vuestra relación:** Placeholder "Ej: Novia..." vs. "Ej: Socio...".
  - **La historia:** Textarea grande con placeholder adaptado.
- **Campo de Género (Combobox):**
  - **Visual:** Botón que muestra el género actual.
  - **Funcionalidad:** Al hacer clic, abre un popover con buscador. Filtra en tiempo real. Si el plan es "Maestro"/"Patriarca", permite crear géneros nuevos si no se encuentran en la lista.
- **Detalles Avanzados (Acordeón):**
  - **Bloqueo Visual:** La sección entera tiene opacidad reducida y no es interactiva si el plan es "Creador"/"El Relato".
  - **Tooltips de Información (`i`):** Al lado de cada campo, un ícono de info muestra una caja de ayuda al hacer hover.
    - **Instrumentación:** "Describe los instrumentos que imaginas..."
    - **Ambiente (Mood):** "Define la emoción principal..."
    - **Tempo:** "Marca el pulso de tu canción..."
    - **Estilo Inspiracional (Solo Plan Maestro):** "Escribe un artista. Nos inspiraremos en su estilo musical, no en su voz."
    - (y así para cada campo, con texto adaptado al género).
- **Selector de Planes (Radio Group):** Tres tarjetas que funcionan como botones de radio. La tarjeta seleccionada tiene un borde de color más grueso.

#### b) Paso 2: Upsell de Voz
- **Título:** "Añade una Voz de Famoso (Opcional)".
- **Descripción:** "Por un costo adicional de $299, podemos usar un modelo avanzado para inspirarnos en el estilo vocal de un artista famoso..."
- **Contenido:** Botones con sugerencias ("Estilo Peso Pluma", etc.) y un campo de texto para escribir cualquier artista.
- **Botones de Acción:** "No, gracias. Usar la voz estándar" y "Sí, agregar Estilo de Voz por $299".

#### c) Paso 3: Pantalla de Carga
- **Visual:** Un ícono de loader que gira (`animate-spin`).
- **Texto Dinámico:** Un `<h2>` que cambia cada 2.5 segundos con frases como "Analizando tu historia...", "Escribiendo la letra...", "Afinando los instrumentos...", etc.

#### d) Paso 4: Revisión Interactiva
- **Título:** "Paso de Revisión (Cambio X/Y)". Muestra el número de revisiones restantes según el plan.
- **Carátula:** Si el plan lo incluye, se muestra una imagen generada.
- **Audio:** Un reproductor de audio HTML5. El audio se detiene a los 15 segundos.
- **Letra:** Un recuadro con la letra generada, con scroll si es muy larga.
- **Formulario de Revisión:** Un `Textarea` con el placeholder "Ej: 'Cambia el coro para que mencione nuestro primer viaje...'" y un botón "Enviar Revisión". Esta sección se oculta si ya no quedan revisiones.

#### e) Paso 5: Resultado Final
- **Título:** "¡Tu Obra Maestra Final!".
- **Contenido:** Carátula, reproductor de audio completo, y letra completa.
- **Botones de Acción:**
  - **Descarga:** "Descargar Audio (.wav)" y "Descargar Letra (.txt)".
  - **Compartir:** Iconos para Twitter, Facebook, WhatsApp.
  - **Pago:** Botón dorado "Proceder al Pago".
  - **Reset:** Botón "Crear otra canción".

### 3.4. Páginas Estáticas (FAQ, Quiénes Somos, etc.)
- Todas siguen una estructura similar: un título grande con `Playfair Display`, un subtítulo con `Inter`, y el contenido principal dentro de tarjetas o componentes de acordeón para mantener la consistencia del diseño.
- **FAQ:** Usa un componente `Accordion` para mostrar preguntas y respuestas de forma compacta.
- **Quienes Somos:** Usa tarjetas para presentar a los miembros del equipo (ficticios).
- **Ejemplos:** Una cuadrícula de tarjetas, cada una con un ejemplo de canción y su reproductor.
