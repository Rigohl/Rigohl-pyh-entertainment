import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Cpu, CreditCard, Send } from "lucide-react";

export default function ProcesoPage() {
  const steps = [
    {
      icon: FileText,
      title: "1. Llena el Formulario",
      description: "Cuéntanos tu historia. Rellena nuestro formulario con los detalles que harán tu canción única: a quién va dedicada, vuestra relación, anécdotas y el estilo que prefieres.",
      color: "text-emotional-pink"
    },
    {
      icon: Cpu,
      title: "2. La Fusión Creativa",
      description: "Combinamos el talento de nuestros músicos con la potencia de la inteligencia artificial. Usando software con licencia y un toque humano, garantizamos que tu canción sea única y de calidad profesional.",
      color: "text-accent-gold"
    },
    {
      icon: CreditCard,
      title: "3. Realiza el Pago",
      description: "Una vez que la canción está lista para ser generada, eliges tu plan de entrega (1h, 3h, o 6h) y realizas el pago de forma segura a través de nuestra plataforma.",
       color: "text-emotional-mint"
    },
    {
      icon: Send,
      title: "4. Recibe tu Canción",
      description: "¡Tu obra maestra está lista! Recibirás un enlace para descargar tu canción en alta calidad. Lista para compartir, dedicar y disfrutar.",
       color: "text-corridos-red"
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="font-headline text-5xl font-bold">De tu Idea a una Canción</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Crear una canción personalizada nunca fue tan fácil. Sigue estos 4 sencillos pasos.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
        <div className="space-y-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                <div className="flex-1">
                  <Card className="shadow-lg hover:shadow-xl transition-shadow">
                    <CardHeader>
                      <CardTitle className="font-headline text-3xl">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-shrink-0 relative">
                   <div className="absolute -inset-2 bg-gradient-to-r from-emotional-pink to-emotional-mint rounded-full blur-lg opacity-30"></div>
                   <div className={`relative w-24 h-24 rounded-full flex items-center justify-center bg-background border-4 border-border`}>
                    <Icon className={`w-12 h-12 ${step.color}`} />
                  </div>
                </div>
                <div className="flex-1 hidden md:block"></div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
