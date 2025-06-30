import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Skull } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function FormulariosPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">Elige Tu Estilo</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          Cada historia tiene su propio ritmo. ¿Cuál es el tuyo? Selecciona el tipo de canción que mejor represente tu relato para comenzar a crear.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="group text-center shadow-lg border-2 border-emotional-pink/50 transition-all duration-300 hover:border-emotional-pink hover:shadow-2xl hover:-translate-y-2 hover:bg-emotional-pink/10">
          <CardHeader>
            <Heart className="mx-auto h-12 w-12 text-emotional-pink mb-4 transition-transform duration-300 group-hover:scale-110" />
            <CardTitle className="font-headline text-3xl">Canciones Emocionales</CardTitle>
            <CardDescription className="pt-2">
              Para aniversarios, dedicatorias, recuerdos y momentos que merecen una melodía inolvidable. Transforma tus sentimientos en una balada, pop o el género que prefieras.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link 
              href="/test-pago?type=emotional"
              className={cn(buttonVariants({ size: 'lg' }), "bg-emotional-pink text-primary-foreground hover:bg-emotional-pink/90")}
            >
              Crear Canción Emocional
            </Link>
          </CardContent>
        </Card>

        <Card className="group text-center shadow-lg border-2 border-corridos-red/50 bg-secondary text-foreground transition-all duration-300 hover:border-corridos-red hover:shadow-2xl hover:-translate-y-2 hover:bg-corridos-red/10">
          <CardHeader>
            <Skull className="mx-auto h-12 w-12 text-corridos-red mb-4 transition-transform duration-300 group-hover:scale-110" />
            <CardTitle className="font-headline text-3xl">Corridos Bélicos</CardTitle>
            <CardDescription className="pt-2 text-muted-foreground group-hover:text-foreground/80 transition-colors">
              Para narrar hazañas, celebrar la lealtad y contar historias de poder con el ritmo y la fuerza de los corridos tumbados. Tu vida, tu corrido.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link 
              href="/test-pago?type=corrido"
              className={cn(buttonVariants({ size: 'lg' }), "bg-corridos-red text-white hover:bg-corridos-red/90")}
            >
              Crear Corrido
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
