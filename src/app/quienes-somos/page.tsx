import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Music, Cpu } from 'lucide-react';
import Image from 'next/image';

const teamMembers = [
  {
    name: "AI Composer",
    role: "El Alma Creativa",
    avatar: "https://placehold.co/150x150.png",
    avatarHint: "abstract sound waves",
    description: "Nuestra IA de vanguardia, entrenada por expertos músicos y letristas. Es el corazón de DualMuse, capaz de convertir cualquier historia en una composición única y emocionante.",
  },
  {
    name: "Sofía Martínez",
    role: "Supervisora de Letras",
    avatar: "https://placehold.co/150x150.png",
    avatarHint: "woman writing journal",
    description: "Poeta y compositora con años de experiencia. Sofía se asegura de que cada letra tenga la métrica, rima y, sobre todo, el sentimiento que tu historia merece.",
  },
  {
    name: "Javier Reyes",
    role: "Productor Musical",
    avatar: "https://placehold.co/150x150.png",
    avatarHint: "producer mixing board",
    description: "Músico y productor experto en múltiples géneros. Javier se encarga de que la calidad de audio sea impecable y que cada arreglo musical potencie la emoción de la canción.",
  },
];

export default function QuienesSomosPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-16">
        <h1 className="font-headline text-5xl font-bold">Nuestra Historia</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          DualMuse nació de la fusión de dos pasiones: la música como lenguaje universal y la tecnología como herramienta para crear lo imposible.
        </p>
      </div>

      <Card className="mb-16 shadow-lg bg-secondary/30">
        <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="font-headline text-3xl font-bold mb-4">La Chispa Creativa</h2>
                    <div className="text-muted-foreground space-y-4">
                        <p>Creemos que cada persona tiene una historia que merece ser contada y cantada. Sin embargo, no todos tenemos las herramientas para convertir esas vivencias en una canción. Ahí es donde entramos nosotros.</p>
                        <p>Combinamos la sensibilidad de artistas humanos con el poder de la inteligencia artificial más avanzada para ofrecerte una experiencia única: canciones personalizadas que suenan profesionales, cargadas de emoción y creadas exclusivamente para ti en tiempo récord.</p>
                        <p>Ya sea un corrido que narre tus hazañas o una balada que selle un amor eterno, nuestra misión es ser la voz de tus emociones.</p>
                    </div>
                </div>
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                     <Image src="https://placehold.co/600x400.png" alt="Equipo de DualMuse trabajando" fill={true} style={{objectFit: 'cover'}} data-ai-hint="music studio" />
                </div>
            </div>
        </CardContent>
      </Card>

      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-bold">El Equipo Detrás de la Música</h2>
        <p className="text-lg text-muted-foreground mt-2">Humanos y IA, en perfecta armonía.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <Card key={index} className="text-center bg-secondary/30 flex flex-col items-center p-6">
            <Image 
                src={member.avatar} 
                alt={member.name} 
                width={120} 
                height={120} 
                className="rounded-full mb-4 border-4 border-accent-gold/50"
                data-ai-hint={member.avatarHint}
            />
            <CardHeader className="p-2">
                <CardTitle className="font-headline text-2xl">{member.name}</CardTitle>
                <p className="text-accent-gold font-semibold">{member.role}</p>
            </CardHeader>
            <CardContent className="p-2 flex-grow">
                <p className="text-muted-foreground text-sm">{member.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
