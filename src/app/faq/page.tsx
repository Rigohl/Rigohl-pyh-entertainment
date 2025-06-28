import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "¿Cómo funciona exactamente el proceso?",
    answer: "Es muy sencillo. Llenas un formulario contándonos tu historia y lo que quieres expresar. Nuestra IA, supervisada por músicos, compone la letra y la música. Tras una revisión de calidad, te enviamos la canción lista para que la disfrutes. Todo el proceso puede tardar desde 1 a 6 horas, según tu elección."
  },
  {
    question: "¿Qué derechos tengo sobre la canción que compro?",
    answer: "Al comprar tu canción, adquieres una licencia de uso personal. Esto significa que puedes compartirla con amigos, en tus redes sociales, dedicarla y usarla para fines no comerciales. Los derechos comerciales (para usarla en anuncios, películas, etc.) se pueden negociar por separado."
  },
  {
    question: "¿Puedo pedir cambios si algo no me gusta?",
    answer: "Actualmente, nuestro proceso está optimizado para generar una versión final de alta calidad basada en la información que nos proporcionas. Estamos trabajando en una función de revisiones para el futuro. Por eso, te recomendamos ser lo más detallado posible en el formulario."
  },
  {
    question: "¿En qué formato y calidad recibiré mi canción?",
    answer: "Recibirás tu canción en formato MP3 de alta calidad (320 kbps), que es ideal para escuchar en cualquier dispositivo y compartir. La recibirás a través de un enlace de descarga seguro."
  },
  {
    question: "¿Y si no me gusta el resultado final?",
    answer: "Nuestra IA está entrenada para capturar la esencia de tu historia. Debido a la naturaleza personalizada del producto, no podemos ofrecer reembolsos una vez que la canción ha sido generada. Sin embargo, si hay un error técnico o algo no funciona, contacta a nuestro soporte y lo solucionaremos."
  },
  {
    question: "¿Es seguro el proceso de pago?",
    answer: "Totalmente. Utilizamos Stripe, una de las plataformas de pago más seguras y reconocidas del mundo. Nosotros no almacenamos los datos de tu tarjeta de crédito."
  },
  {
    question: "¿Pueden crear una canción en cualquier género musical?",
    answer: "Nuestros modelos están especializados en una amplia variedad de géneros populares, desde baladas y pop hasta corridos y rock. En el formulario, puedes especificar el género que deseas. Si es algo muy específico, haremos nuestro mejor esfuerzo para acercarnos al estilo."
  }
];

export default function FaqPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <HelpCircle className="mx-auto h-16 w-16 text-accent-gold" />
        <h1 className="font-headline text-5xl font-bold mt-4">Preguntas Frecuentes</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Resolvemos tus dudas para que solo te preocupes por disfrutar tu canción.
        </p>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
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
  );
}
