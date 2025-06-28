
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy } from "lucide-react";

const helpSections = {
  "Llenando el Formulario": [
    {
      question: "¿Cómo describo mi historia para obtener el mejor resultado?",
      answer: "Sé específico y personal. Menciona nombres, lugares, fechas, chistes internos, olores, sentimientos... Cualquier detalle único que nos des, por pequeño que parezca, enriquece la letra. Piensa en ello como contarle la historia a tu mejor amigo, sin omitir las partes que la hacen vuestra."
    },
    {
      question: "¿Qué hago si no sé qué género elegir?",
      answer: "No te preocupes. Primero, te recomendamos escuchar nuestros ejemplos para darte una idea. Si aún tienes dudas, piensa en tu artista favorito o en la música que suele escuchar la persona a la que le dedicas la canción. Con los planes 'Artista' y 'Maestro', puedes darnos una canción de referencia o un artista inspiracional y nosotros nos encargaremos del resto."
    },
    {
      question: "¿Qué son y cómo uso las 'Palabras Clave'?",
      answer: "Son palabras o frases cortas que la IA tiene la obligación de incluir en la letra. Úsalas para elementos que no pueden faltar bajo ningún concepto. Por ejemplo: el apodo 'Mi Chispita', el lugar 'la cabaña del lago' o la frase 'promesa de meñique'."
    }
  ],
  "Proceso de IA y Revisiones": [
    {
      question: "¿Cómo funcionan exactamente las revisiones?",
      answer: "En la pantalla de revisión, tendrás un cuadro de texto para escribir tus cambios. Sé claro y directo. En lugar de decir 'no me gusta el coro', intenta ser más específico: 'En el coro, me gustaría que mencionaras nuestro viaje a la playa en lugar de la montaña'. La IA reescribirá esa parte, respetando el resto de la canción."
    },
    {
      question: "¿Por qué la carátula no es un retrato exacto de mi historia?",
      answer: "La IA de imágenes funciona como un artista conceptual. No creará un retrato fotorrealista, sino una pieza de arte que interpreta la emoción, los temas y la atmósfera de tu relato. Es una representación simbólica, no literal."
    }
  ],
  "Problemas y Soluciones": [
    {
      question: "La página se quedó cargando y nunca recibí mi canción. ¿Qué hago?",
      answer: "Lamentamos mucho el inconveniente. A veces, por una alta demanda o un problema de conexión, el proceso puede fallar. Por favor, refresca la página e inténtalo de nuevo. Si el problema persiste, contáctanos indicando el correo electrónico que usaste y lo investigaremos. No te preocupes, no se realiza ningún cobro hasta que aceptas la versión final de la canción."
    },
    {
      question: "No me gusta la voz generada. ¿Puedo cambiarla?",
      answer: "Sí. El tipo de voz se elige en el formulario, pero si el resultado no es de tu agrado, puedes usar una de tus revisiones (si tu plan las incluye) para solicitar un cambio. Simplemente especifica en el cuadro de revisión: 'Por favor, regenera la canción con una voz femenina más suave' y nuestro sistema lo hará."
    },
    {
      question: "¿Qué derechos tengo sobre la canción?",
      answer: "Adquieres una licencia de uso personal y no comercial. Puedes compartirla en redes, dedicarla, usarla en videos familiares, etc. Para usarla en anuncios, películas o cualquier fin comercial, por favor contáctanos para discutir una licencia extendida."
    }
  ]
};

export default function AyudaPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <LifeBuoy className="mx-auto h-16 w-16 text-accent-gold" />
        <h1 className="font-headline text-5xl font-bold mt-4">Centro de Ayuda</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Todo lo que necesitas saber para crear tu canción perfecta.
        </p>
      </div>

      <div className="space-y-8">
        {Object.entries(helpSections).map(([sectionTitle, items]) => (
          <div key={sectionTitle}>
            <h2 className="font-headline text-3xl font-bold mb-4 border-b pb-2">{sectionTitle}</h2>
            <Accordion type="single" collapsible className="w-full">
              {items.map((item, index) => (
                <AccordionItem key={index} value={`item-${sectionTitle}-${index}`}>
                  <AccordionTrigger className="font-headline text-xl text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}
      </div>
    </div>
  );
}
