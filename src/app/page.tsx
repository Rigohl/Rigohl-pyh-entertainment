
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Music, FileText, Send, CreditCard, Star, Quote, CheckCircle, Image as ImageIcon, Disc, Wand2, Edit, Gift } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState, ReactNode } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { planDetails, Plan } from '@/config/plans';


const processSteps = [
  {
    icon: FileText,
    title: "1. Cuéntanos tu historia",
    description: "Rellena nuestro formulario con los detalles que harán tu canción única: a quién va dedicada, vuestra relación, anécdotas y el estilo que prefieres.",
  },
  {
    icon: Music,
    title: "2. Hacemos la magia",
    description: "Nuestra inteligencia artificial compone una letra y melodía que capturan la esencia de tu relato, adaptada al género que elegiste.",
  },
  {
    icon: CreditCard,
    title: "3. Realiza el pago",
    description: "Elige tu plan de entrega y realiza el pago de forma segura. Tu canción estará en camino.",
  },
  {
    icon: Send,
    title: "4. Recibe tu canción",
    description: "Recibirás un enlace para descargar tu canción en alta calidad. ¡Lista para compartir y disfrutar!",
  },
];

const occasions = [
  { emoji: "🎂", title: "Cumpleaños", description: "Sorprende a quienes más quieres con una melodía llena de alegría y emoción." },
  { emoji: "💞", title: "Aniversarios y pareja", description: "Celebra su historia de amor con una canción personalizada repleta de recuerdos." },
  { emoji: "💍", title: "Boda y propuesta de matrimonio", description: "Sella el “sí” con una creación musical única que perdure para siempre." },
  { emoji: "👶", title: "Nacimiento", description: "Recibe a la nueva vida con notas tiernas y esperanzadoras." },
  { emoji: "🎁", title: "Regalo sorpresa", description: "Impacta con un obsequio original, personal y verdaderamente único." },
  { emoji: "🤩", title: "Momentos divertidos", description: "Añade chispa y risas con una composición fresca y desenfadada." },
  { emoji: "🙏", title: "Homenajes y agradecimientos", description: "Expresa tu gratitud de la forma más conmovedora." },
];

const guarantees = [
    { emoji: "🔒", title: "100 % personalizada y confidencial", description: "Cada canción nace de tus palabras y emociones, con total privacidad." },
    { emoji: "📜", title: "Tu canción es tuya", description: "Disfrútala toda la vida y compártela cuando quieras." },
];

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
];

const testimonials = [
  {
    name: "Ana Sofía V.",
    quote: "La canción para mi aniversario fue simplemente perfecta. Capturaron cada detalle de nuestra historia. ¡Lloré de la emoción! Mil gracias.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "woman portrait"
  },
  {
    name: "Carlos G. (Corrido)",
    quote: "Pedí un corrido para el cumpleaños de mi compadre y quedó increíble. Suena profesional y la letra está con todo. 100% recomendado.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "man portrait"
  },
   {
    name: "Laura M.",
    quote: "El servicio más original y rápido. En menos de 3 horas tenía un regalo súper especial para mi mejor amiga. Le encantó.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "smiling woman"
  },
  {
    name: "Gerardo 'El Fuerte' (Corrido)",
    quote: "El corrido narra la historia de mi negocio desde cero. Suena con poder y respeto. Justo lo que quería para contar mi legado. ¡Fierro!",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "serious man portrait"
  },
  {
    name: "Marketing Digital Co.",
    quote: "El jingle que crearon para nuestra startup es increíblemente pegadizo. Nuestras métricas de marca han subido. ¡Gran inversión!",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "company logo"
  },
  {
    name: "Familia Pérez",
    quote: "Le regalamos una canción a nuestra hija por su graduación, contando sus logros. Fue el momento más emotivo de la fiesta. Invaluable.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "happy family"
  },
  {
    name: "Familia Mendoza (Corrido)",
    quote: "Encargamos un corrido para mi padre, contando la historia de cómo sacó adelante a la familia. Se le salieron las lágrimas. Un trabajo de primera.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "older man smiling"
  },
  {
    name: "Ricardo S.",
    quote: "No sabía cómo pedir perdón, y una canción fue la mejor manera de expresar mis sentimientos. Gracias por ayudarme a reconectar.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "thoughtful man"
  },
  {
    name: "J.L. Guerrero (Corrido)",
    quote: "Necesitaba un corrido que sonara a los de antes, con una buena historia. Dieron en el clavo. La instrumentación y la voz, impecables.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "man cowboy hat"
  },
  {
    name: "Elena R.",
    quote: "Pedí una canción para recordar a mi abuelo. Usaron las historias que les conté y crearon un tesoro que guardaré para siempre.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "woman looking distance"
  },
  {
    name: "Los Novios Felices",
    quote: "Nuestra canción personalizada fue el primer baile en nuestra boda. No hubo un ojo seco en el lugar. Mágico es poco decir.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "couple dancing"
  },
  {
    name: "Mateo B.",
    quote: "No necesitaba una ocasión especial, solo quería decirle a mi pareja lo mucho que la quiero. La canción fue un detalle espectacular.",
    avatar: "https://placehold.co/100x100.png",
    avatarHint: "man smiling"
  },
];

const inspiringPhrases = [
  "Creamos canciones únicas, desde baladas emotivas hasta corridos con fuerza.",
  "El regalo perfecto para un aniversario inolvidable.",
  "La banda sonora única para tu historia de amor.",
  "Un corrido legendario que narre tu legado y tus hazañas.",
  "La balada que siempre quisiste dedicar, ahora es posible.",
  "Convierte esa anécdota especial en un éxito que todos recordarán.",
  "El himno perfecto para celebrar una gran amistad.",
  "Transforma tus momentos más importantes en música inolvidable."
];

const getIconForFeature = (feature: string): ReactNode => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('revisión') || lowerFeature.includes('revisiones')) return <Edit className="w-5 h-5 text-green-500 mt-1 shrink-0" />;
    if (lowerFeature.includes('carátula')) return <ImageIcon className="w-5 h-5 text-green-500 mt-1 shrink-0" />;
    if (lowerFeature.includes('pista')) return <Disc className="w-5 h-5 text-green-500 mt-1 shrink-0" />;
    if (lowerFeature.includes('control') || lowerFeature.includes('personalizados') || lowerFeature.includes('inspiración')) return <Wand2 className="w-5 h-5 text-green-500 mt-1 shrink-0" />;
    return <CheckCircle className="w-5 h-5 text-green-500 mt-1 shrink-0" />;
};

const formatFeature = (feature: string): ReactNode => {
    const boldRegex = /(\d+ Revisiones? de letra(?: y melodía)?)/i;
    const parts = feature.split(boldRegex);

    return parts.map((part, index) => {
        if (index % 2 === 1) {
            return <span key={index} className="font-bold text-foreground">{part}</span>;
        }
        return part;
    });
};


const PlanCard = ({ plan, songType }: { plan: Plan; songType: 'emotional' | 'corrido' }) => {
    const isRecommended = plan.isRecommended;
    const borderColor = songType === 'emotional' ? 'border-primary' : 'border-corridos-red';
    const buttonBg = songType === 'emotional' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-corridos-red text-white hover:bg-corridos-red/90';
    const recommendedTextColor = songType === 'emotional' ? 'text-primary' : 'text-corridos-red';

    return (
        <Card className={cn(
            "flex flex-col border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2",
            isRecommended ? `relative shadow-xl hover:${borderColor}` : "border-transparent hover:border-accent-gold/50"
        )}>
            {isRecommended && (
                <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                    <div className={cn("px-4 py-1 rounded-full font-bold text-sm shadow-lg", buttonBg)}>
                        Recomendado
                    </div>
                </div>
            )}
            <CardHeader className="text-center pt-8">
                <CardTitle className="font-headline text-3xl">{plan.label}</CardTitle>
                <CardDescription className={cn("text-lg", isRecommended ? recommendedTextColor : "")}>
                  {songType === 'emotional' ?
                    (plan.value === 'creator' ? 'Para dar vida a tu idea.' : plan.value === 'artist' ? 'El más popular para un resultado increíble.' : 'La experiencia prémium definitiva.')
                    : (plan.value === 'creator' ? 'Tu historia contada con fuerza.' : plan.value === 'artist' ? 'Para forjar un corrido memorable.' : 'La experiencia definitiva para un legado.')
                  }
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow space-y-4 text-left p-6">
                <p className="font-bold text-4xl text-center mb-4">${plan.price}</p>
                <Separator />
                <ul className="space-y-3 text-muted-foreground pt-4">
                    {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                            {getIconForFeature(feature)}
                            <span>{formatFeature(feature)}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter className="flex-col gap-4 p-6">
                 <Button asChild className={cn("w-full shadow-lg", isRecommended ? buttonBg : "bg-transparent border border-input hover:bg-accent hover:text-accent-foreground")} variant={isRecommended ? 'default' : 'outline'}>
                    <Link href={`/test-pago?type=${songType}&plan=${plan.value}`}>
                      {isRecommended ? 'Empezar ahora' : 'Empezar'}
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};


export default function Home() {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % inspiringPhrases.length);
    }, 4000); // Change phrase every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col text-foreground bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Músico componiendo en un estudio oscuro"
          fill
          className="object-cover opacity-20"
          data-ai-hint="musician studio dark"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative z-10 p-4 max-w-4xl mx-auto">
          <h1 className="font-headline text-5xl md:text-7xl font-bold mb-4 animate-fade-in-down">
            Tu Historia Hecha Canción
          </h1>
          <p
            key={currentPhraseIndex}
            className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-fade-in-up"
          >
            {inspiringPhrases[currentPhraseIndex]}
          </p>
          <Link href="/formularios" passHref>
            <Button size="lg" className="bg-accent-gold text-accent-foreground font-bold hover:bg-accent-gold/90 transition-transform duration-300 hover:scale-105 shadow-lg animate-fade-in">
                Descubrir mi Preview Gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* Occasions Section */}
      <section id="occasions" className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-full min-h-[500px] rounded-lg overflow-hidden shadow-2xl">
                    <Image src="https://placehold.co/600x800.png" alt="Mujer feliz recibiendo un regalo musical" fill={true} style={{objectFit: 'cover'}} data-ai-hint="woman gift music" />
                </div>
                <div>
                    <h2 className="font-headline text-4xl font-bold mb-4">
                        El detalle perfecto para cada ocasión
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Convierte tus sentimientos en un recuerdo único 🎶
                    </p>
                    <div className="space-y-6">
                        {occasions.map((item) => (
                            <div key={item.title} className="flex items-start gap-4">
                                <div className="text-2xl pt-1">{item.emoji}</div>
                                <div>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Separator className="my-8 bg-border/50" />
                    <div className="space-y-6">
                        {guarantees.map((item) => (
                            <div key={item.title} className="flex items-start gap-4">
                                <div className="text-2xl pt-1">{item.emoji}</div>
                                <div>
                                    <h3 className="font-semibold text-lg">{item.title}</h3>
                                    <p className="text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* How it works Section */}
      <section id="proceso" className="py-20 sm:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-headline text-4xl font-bold">De tu Idea a una Canción en 4 Pasos</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Crear una canción personalizada nunca fue tan fácil.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent-gold/20 text-accent-gold mb-4 border-2 border-accent-gold/50">
                     <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-headline text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      
      {/* Free Preview Section */}
      <section className="py-20 sm:py-24 bg-gradient-to-r from-primary/10 via-background to-corridos-red/10">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <Gift className="mx-auto h-12 w-12 text-accent-gold mb-4" />
          <h2 className="font-headline text-4xl font-bold">¿La Mejor Parte? Obtén un Adelanto Gratis</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Queremos que sientas la magia antes de tomar cualquier decisión. Por el simple hecho de contarnos tu historia, te regalamos una muestra sin compromiso:
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-lg mx-auto">
              <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-green-500 mt-1 shrink-0" />
                  <div>
                      <h3 className="font-semibold text-lg">Preview de 15 Segundos</h3>
                      <p className="text-muted-foreground">Escucha el tono, la voz y el estilo de tu futura canción.</p>
                  </div>
              </div>
              <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 text-green-500 mt-1 shrink-0" />
                  <div>
                      <h3 className="font-semibold text-lg">Carátula Conceptual</h3>
                      <p className="text-muted-foreground">Visualiza el arte que representa la esencia de tu relato.</p>
                  </div>
              </div>
          </div>
          <div className="mt-12">
            <Link href="/formularios" passHref>
              <Button size="lg" className="bg-accent-gold text-accent-foreground font-bold hover:bg-accent-gold/90 transition-transform duration-300 hover:scale-105 shadow-lg">
                  Descubrir mi Preview Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Examples Section */}
       <section id="ejemplos" className="py-20 sm:py-24">
        <div className="container mx-auto px-4">
           <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-headline text-4xl font-bold">Galería de Éxitos</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Escucha algunas de las canciones que hemos creado. Cada una cuenta una historia única, como la tuya.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {examples.map((example, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-secondary/50 border-border/50">
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
          <div className="text-center mt-12">
            <Link href="/ejemplos" passHref>
                <Button variant="outline" size="lg">Ver más ejemplos</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
        <section id="precios" className="py-20 sm:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-headline text-4xl font-bold">Planes a tu Medida</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Elige el universo sonoro para tu historia. Misma calidad, dos experiencias únicas.
                    </p>
                </div>
                <Tabs defaultValue="emotional" className="max-w-6xl mx-auto">
                    <TabsList className="grid w-full grid-cols-2 h-auto">
                        <TabsTrigger value="emotional" className="py-2 text-base">Canciones Emocionales</TabsTrigger>
                        <TabsTrigger value="corrido" className="py-2 text-base">Corridos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="emotional" className="mt-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                            {planDetails.emotional.map(plan => (
                                <PlanCard key={plan.value} plan={plan} songType="emotional" />
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="corrido" className="mt-8">
                         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                             {planDetails.corrido.map(plan => (
                                <PlanCard key={plan.value} plan={plan} songType="corrido" />
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </section>


      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 sm:py-24 bg-secondary/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-headline text-4xl font-bold">Lo que Dicen Nuestros Clientes</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Historias reales, emociones reales.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 snap-x snap-mandatory scrollbar-hide">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="snap-start flex-shrink-0 w-[90vw] sm:w-[380px]">
                <Card className="bg-background/80 border-border/50 flex flex-col justify-between h-full min-h-[240px]">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                       <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="rounded-full"
                          data-ai-hint={testimonial.avatarHint}
                        />
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <div className="flex text-accent-gold">
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                              <Star className="w-4 h-4 fill-current" />
                          </div>
                        </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                      <Quote className="w-8 h-8 text-muted-foreground/50 mb-2" />
                      <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-secondary/30 to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-secondary/30 to-transparent pointer-events-none"></div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-4">
           <h2 className="font-headline text-4xl font-bold">¿Listo para crear tu obra maestra?</h2>
           <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto mb-8">
            No esperes más para darle vida a tu historia. El proceso es rápido, fácil y el resultado te emocionará.
           </p>
           <Link href="/formularios" passHref>
            <Button size="lg" className="bg-accent-gold text-accent-foreground font-bold hover:bg-accent-gold/90 transition-transform duration-300 hover:scale-105 shadow-lg">
                Empezar ahora
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
