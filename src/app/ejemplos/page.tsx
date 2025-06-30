import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function EjemplosPage() {
  const examples = [
    {
      title: 'El Faro de Tu Mirada',
      description: 'Una balada acústica para el aniversario de nuestros padres, celebrando 30 años de amor incondicional.',
      type: 'Emocional',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      imageSrc: 'https://placehold.co/400x400.png',
      imageHint: 'lighthouse couple',
    },
    {
      title: 'La RAM del 7.3',
      description: 'Un corrido progresivo sobre la lealtad y el camino recorrido junto a mi socio. Pura fuerza y respeto.',
      type: 'Corrido',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      imageSrc: 'https://placehold.co/400x400.png',
      imageHint: 'custom truck',
    },
    {
      title: 'Canción de Cuna para Mateo',
      description: 'Una melodía suave y tierna para dar la bienvenida a nuestro recién nacido, llena de sueños y promesas.',
      type: 'Emocional',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      imageSrc: 'https://placehold.co/400x400.png',
      imageHint: 'baby sleeping',
    },
    {
      title: 'El Silencio de la Sierra',
      description: 'Un corrido sierreño que narra la historia de un hombre que se hizo a sí mismo con trabajo y palabra.',
      type: 'Corrido',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      imageSrc: 'https://placehold.co/400x400.png',
      imageHint: 'mountains silhouette',
    },
     {
      title: 'Nuestro Primer Baile',
      description: 'La canción que sonó en nuestra boda, creada para ese momento mágico y único. Un recuerdo para siempre.',
      type: 'Emocional',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      imageSrc: 'https://placehold.co/400x400.png',
      imageHint: 'wedding dance',
    },
     {
      title: 'El Joven de la Capital',
      description: 'Un trap-corrido que cuenta cómo un joven con ambición se abrió paso en la gran ciudad.',
      type: 'Corrido',
      audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      imageSrc: 'https://placehold.co/400x400.png',
      imageHint: 'city skyline',
    },
  ];

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="font-headline text-5xl font-bold">Galería de Éxitos</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Escucha algunas de las canciones que hemos creado con nuestra IA. Cada una cuenta una historia única, como la tuya.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {examples.map((example, index) => (
          <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
             <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4 md:p-6">
               <Image 
                src={example.imageSrc} 
                alt={`Carátula de ${example.title}`} 
                width={100} 
                height={100} 
                className="rounded-lg aspect-square object-cover" 
                data-ai-hint={example.imageHint}
                loading="lazy"
              />
              <div className="flex-1">
                <CardTitle className="font-headline text-2xl">{example.title}</CardTitle>
                <CardDescription className="mt-1">{example.description}</CardDescription>
                <span className={`mt-2 inline-block px-2 py-1 text-xs rounded-full ${example.type === 'Emocional' ? 'bg-emotional-pink text-primary-foreground' : 'bg-corridos-red text-white'}`}>
                  {example.type}
                </span>
              </div>
            </CardHeader>
            <CardContent className="px-4 md:px-6 pb-4 md:pb-6">
              <audio controls className="w-full">
                <source src={example.audioSrc} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
