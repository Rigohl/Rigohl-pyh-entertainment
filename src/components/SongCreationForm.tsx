
"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, Star, Mic2, Users, Heart, Skull, ChevronsUpDown, Check, ImageIcon, Disc, Info, Twitter, Share2, Facebook, Download, Music, ArrowLeft, Sparkles, AlertCircle, Cpu } from "lucide-react";
import { createSongAction, createAlbumArtAction, reviseSongAction } from "@/app/test-pago/actions";
import { songCreationSchema, SongCreationFormValues } from "@/config/schemas";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { planDetails, revisionCounts, Plan } from "@/config/plans";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type SongResult = { lyrics: string; audio: string; };
type FormStep = "filling" | "upsell" | "loading" | "review" | "result";
type PlanValue = "creator" | "artist" | "master";


const famousArtistSuggestions = {
    emotional: ["Ed Sheeran", "Adele", "Luis Miguel", "Coldplay", "Taylor Swift", "Sam Smith"],
    corrido: [
        "Peso Pluma", 
        "Natanael Cano", 
        "Gerardo Ortiz", 
        "El Komander",
        "El de la Guitarra (Voz y Guitarra)",
        "Chalino Sánchez",
        "Junior H",
        "Fuerza Regida",
    ],
};

const experienceThemes = {
    emotional: {
        Icon: Heart,
        cardClass: "border-emotional-pink/50",
        title: "Crea una Canción Emocional",
        description: "Transforma tus sentimientos en una melodía que tocará el corazón.",
        dedicatedToLabel: "¿Para quién es la canción?",
        dedicatedToPlaceholder: "Ej: Mi madre, Ana, mi futuro esposo...",
        requesterLabel: "¿De parte de quién?",
        relationshipLabel: "Vuestra relación",
        relationshipPlaceholder: "Ej: Novia, mejor amigo, hijo...",
        storyLabel: "Vierte aquí tus recuerdos y emociones",
        storyPlaceholder: "Describe vuestra historia, momentos especiales, anécdotas, lo que sientes...",
        genrePlaceholder: "Ej: Balada Pop, Acústico, R&B...",
        moods: [
            { value: "melancolico", label: "Melancólico" },
            { value: "alegre", label: "Alegre" },
            { value: "apasionado", label: "Apasionado" },
            { value: "sonador", label: "Soñador" },
            { value: "inspirador", label: "Inspirador" },
        ],
        tooltips: {
            instrumentation: "Impacto: Pocos instrumentos (ej: piano solo) crean un ambiente íntimo. Muchos (ej: orquesta) dan un toque épico. Mini-guía: Para una balada triste, menos es más. Para una canción alegre, ¡añade más ritmo!",
            mood: "Define la emoción principal. Esto guía la melodía y la armonía. Mini-guía: 'Apasionado' usa acordes intensos, 'Soñador' usa sonidos más suaves y etéreos.",
            tempo: "Marca el pulso de tu canción. Mini-guía: Lento = Balada introspectiva. Medio = Ritmo pop para bailar. Rápido = Canción enérgica y llena de vida.",
            structure: "Define el viaje musical. Mini-guía: 'Clásica (verso-coro)' es ideal para un estribillo pegadizo. 'Narrativa' es perfecta para contar una historia de principio a fin.",
            ending: "Decide el adiós de la canción. Mini-guía: 'Fade out' para un final suave y reflexivo. 'Épico instrumental' para un clímax emocional inolvidable.",
        }
    },
    corrido: {
        Icon: Skull,
        cardClass: "border-corridos-red/50",
        title: "Forja tu Corrido",
        description: "Convierte hazañas y relatos de poder en una leyenda que resonará.",
        dedicatedToLabel: "Protagonista del Corrido",
        dedicatedToPlaceholder: "Ej: El Compa Juan, El Jefe, mi padre...",
        requesterLabel: "¿Quién encarga el corrido?",
        relationshipLabel: "Relación con el protagonista",
        relationshipPlaceholder: "Ej: Socio, admirador, familiar...",
        storyLabel: "Forja la leyenda. ¿Cuál es la hazaña?",
        storyPlaceholder: "Narra la historia de superación, lealtad, poder o el evento clave que define al protagonista.",
        genrePlaceholder: "Ej: Corrido Tumbado, Sierreño...",
        moods: [
            { value: "desafiante", label: "Desafiante" },
            { value: "triunfal", label: "Triunfal" },
            { value: "nostalgico", label: "Nostálgico" },
            { value: "leal", label: "Leal" },
            { value: "de-respeto", label: "De Respeto" },
        ],
        tooltips: {
            instrumentation: "Impacto: Un solo instrumento (ej: guitarra) da un toque crudo y personal. Una banda completa da poder. Mini-guía: Requinto y Tololoche para un sonido clásico. Charchetas y Trombón para un estilo bélico moderno.",
            mood: "Elige el tono de la historia. Esto define si sonará como una advertencia, una celebración o un recuerdo. Mini-guía: 'Desafiante' usa tonos menores. 'Triunfal' usa fanfarrias y tonos mayores.",
            tempo: "Define el ritmo del corrido. Mini-guía: Lento para un tono narrativo y pesado. Medio para un paso firme y seguro. Rápido para una sensación de acción y balacera.",
            structure: "Define cómo se contará la hazaña. Mini-guía: 'Clásica' es ideal para un mensaje central que se repite. 'Narrativa' cuenta la historia cronológica, como una leyenda de película.",
            ending: "Elige cómo termina la leyenda. Mini-guía: 'Final abrupto' para un remate impactante. 'Épico instrumental' para una demostración de poder con acordeón y tuba.",
        }
    }
};

const emotionalGenres = ["Balada Pop", "Acústico", "R&B", "Cumbia Romántica", "Rock Pop"];
const corridoGenres = ["Corrido Tumbado", "Corrido Bélico", "Corrido Alterado", "Corrido Progresivo", "Sierreño", "Trap Corrido", "Norteño-Corrido", "Banda-Corrido"];

const emotionalArtists = ["Ed Sheeran", "Adele", "Luis Miguel", "Coldplay", "Taylor Swift", "Sam Smith"];
const corridoArtists = ["Peso Pluma", "Natanael Cano", "Gerardo Ortiz", "El Komander", "Chalino Sánchez", "Junior H", "Fuerza Regida"];

const voiceOptions = [
  { value: "male-deep", label: "Masculina - Profunda" },
  { value: "male-standard", label: "Masculina - Estándar" },
  { value: "male-youthful", label: "Masculina - Juvenil" },
  { value: "female-soft", label: "Femenina - Suave" },
  { value: "female-standard", label: "Femenina - Estándar" },
  { value: "female-energetic", label: "Femenina - Enérgica" },
];

const loadingMessages = [
    "Analizando tu historia...",
    "Consultando a los compositores de IA...",
    "Escribiendo la letra...",
    "Afinando los instrumentos virtuales...",
    "Grabando las voces...",
    "Mezclando la pista...",
    "Aplicando los toques finales...",
];

const getIconForFeature = (feature: string): ReactNode => {
    const lowerFeature = feature.toLowerCase();
    if (lowerFeature.includes('personalizados') || lowerFeature.includes('fusiones') || lowerFeature.includes('inspiración')) return <Wand2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />;
    if (lowerFeature.includes('revisión') || lowerFeature.includes('revisiones')) return <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />;
    if (lowerFeature.includes('carátula')) return <ImageIcon className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />;
    if (lowerFeature.includes('pista')) return <Disc className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />;
    return <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />;
};

const isValidPlan = (plan: any): plan is PlanValue => ["creator", "artist", "master"].includes(plan);

export function SongCreationForm({ songTypeParam, planParam }: { songTypeParam: string | null, planParam: string | null }) {
  const { toast } = useToast();
  const [formStep, setFormStep] = useState<FormStep>("filling");
  const [formData, setFormData] = useState<SongCreationFormValues | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentLoadingMessage, setCurrentLoadingMessage] = useState(loadingMessages[0]);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<SongResult | null>(null);
  const [albumArtUrl, setAlbumArtUrl] = useState<string | null>(null);
  const [revisionsRemaining, setRevisionsRemaining] = useState(0);
  const [revisionRequest, setRevisionRequest] = useState("");
  const [isRevising, setIsRevising] = useState(false);
  const [collaborationChoice, setCollaborationChoice] = useState<string>("");
  const [clientError, setClientError] = useState<string | null>(null);
  
  const [genrePopoverOpen, setGenrePopoverOpen] = useState(false);
  const [genreSearch, setGenreSearch] = useState("");

  const [genre2PopoverOpen, setGenre2PopoverOpen] = useState(false);
  const [genre2Search, setGenre2Search] = useState("");

  const [artistPopoverOpen, setArtistPopoverOpen] = useState(false);
  const [artistSearch, setArtistSearch] = useState("");
  
  const [currentPopover, setCurrentPopover] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement>(null);

  const songType = songTypeParam === 'corrido' ? 'corrido' : 'emotional';
  const theme = experienceThemes[songType];
  const genres = songType === 'corrido' ? corridoGenres : emotionalGenres;
  const artists = songType === 'corrido' ? corridoArtists : emotionalArtists;
  const currentPlanOptions = planDetails[songType];

  const form = useForm<SongCreationFormValues>({
    resolver: zodResolver(songCreationSchema),
    defaultValues: {
      songType: songType,
      plan: isValidPlan(planParam) ? planParam : "artist",
      email: "",
      dedicatedTo: "",
      requester: "",
      nickname: "",
      relationship: "",
      story: "",
      genre: songType === 'corrido' ? "Corrido Tumbado" : "Balada Pop",
      genre2: "",
      voice: "male-standard",
      includeNames: false,
      keywords: "",
      referenceSong: "",
      instrumentation: "",
      mood: "",
      tempo: "",
      structure: "",
      ending: "",
      inspirationalArtist: "",
      famousCollaboration: false,
      styleVoice: "",
      aiModel: 'gemini-1.5-flash-latest',
    },
  });

  const plan = form.watch("plan");
  const inspirationalArtistValue = form.watch("inspirationalArtist");
  const areAdvancedFieldsDisabled = plan === 'master' && !!inspirationalArtistValue;

  useEffect(() => {
    const newSongType = songTypeParam === "corrido" ? "corrido" : "emotional";
    const newPlan = isValidPlan(planParam) ? planParam : "artist";
    if (form.getValues("songType") !== newSongType || form.getValues("plan") !== newPlan) {
        form.reset({
            ...form.getValues(),
            songType: newSongType,
            genre: newSongType === 'corrido' ? "Corrido Tumbado" : "Balada Pop",
            plan: newPlan,
        });
    }
  }, [songTypeParam, planParam, form]);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
        if (formStep === 'review' && audio.currentTime > 15) {
            audio.pause();
            audio.currentTime = 0;
        }
    };
    
    const handlePlay = () => {
        if (formStep === 'review') {
            audio.currentTime = 0;
        }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
        audio.removeEventListener('play', handlePlay);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [result, formStep]);


   useEffect(() => {
      if (formStep === 'loading') {
        let i = 0;
        setProgress(10);
        setCurrentLoadingMessage(loadingMessages[i]);
        const interval = setInterval(() => {
          i++;
          if (i < loadingMessages.length) {
            setCurrentLoadingMessage(loadingMessages[i]);
            setProgress(10 + (i * (85 / loadingMessages.length)));
          }
        }, 2500);
        return () => clearInterval(interval);
      }
    }, [formStep]);

  useEffect(() => {
    // When we enter the review step, and if the plan is premium, generate the album art.
    if (formStep === 'review' && formData && (formData.plan === 'artist' || formData.plan === 'master') && !albumArtUrl) {
      createAlbumArtAction({ story: formData.story })
        .then(artResult => {
            if (artResult.success && artResult.imageUrl) {
                setAlbumArtUrl(artResult.imageUrl);
                toast({
                  title: "¡Carátula generada!",
                  description: "El arte para tu álbum ha llegado.",
                })
            } else {
                console.warn("Album art generation failed but continuing...", artResult.error);
                toast({ 
                  title: "Aviso: No se pudo crear la carátula.", 
                  description: "La IA de imágenes está ocupada. Puedes continuar sin ella.", 
                  variant: "default" 
                });
            }
        });
    }
  }, [formStep, formData, albumArtUrl, toast]);

  const onSubmit = (data: SongCreationFormValues) => {
    setFormData(data);
    setClientError(null); // Clear previous errors
    setFormStep("upsell");
  };

  const handleCreateSong = async (collaboration: string | null) => {
    if (!formData) return;
    
    setLoading(true);
    setResult(null);
    setAlbumArtUrl(null);
    setClientError(null);

    const finalData = {
        ...formData,
        famousCollaboration: !!collaboration,
        styleVoice: collaboration || "",
    };
    setFormData(finalData);
    
    setRevisionsRemaining(revisionCounts[finalData.plan]);
    setFormStep("loading");

    try {
      const res = await createSongAction(finalData);
      if (res.success && res.lyrics && res.audio) {
        setProgress(100);
        setTimeout(() => {
            setResult(res as SongResult);
            setFormStep("review");
            toast({
                title: "¡Tu canción está lista para revisión!",
                description: "Escúchala y solicita cambios si es necesario.",
            });
        }, 500);
      } else {
        const errorMessage = res.error || "Ocurrió un error inesperado al crear la canción.";
        if (errorMessage.includes('net::ERR_BLOCKED_BY_CLIENT')) {
          setClientError("Una extensión de tu navegador (como un bloqueador de anuncios) está impidiendo la comunicación con nuestros servidores. Por favor, desactívala para este sitio o prueba en modo incógnito.");
        } else if (errorMessage.includes('API key not valid') || errorMessage.includes('permission denied') || errorMessage.includes('billing account')) {
          setClientError(`Se produjo un error de configuración de la API de Google: "${errorMessage}" Por favor, verifica tu clave de API, permisos y facturación en Google Cloud.`);
        } else {
          setClientError(errorMessage);
        }
        setFormStep("filling");
      }
    } catch (error: any) {
        console.error("Caught error in handleCreateSong:", error);
        setClientError(`Se recibió una respuesta inesperada del servidor. Esto puede ocurrir por un problema con la API de Google (clave inválida, facturación no activa, API no habilitada) o por un error interno. Revisa la consola del servidor (si aplica) para más detalles. Error: ${error.message}`);
        setFormStep("filling");
    } finally {
      setLoading(false);
    }
  };

  const handleRevisionSubmit = async () => {
    if (!formData || !result || !revisionRequest) return;
    
    setIsRevising(true);

    try {
      const res = await reviseSongAction({
        lyricsDraft: result.lyrics,
        requests: revisionRequest,
        songDetails: formData,
      });

      if (res.lyrics && res.audio) {
        setResult(res);
        setRevisionsRemaining(prev => prev - 1);
        setRevisionRequest("");
        toast({ title: "¡Revisión completada!", description: "Aquí tienes la nueva versión de tu canción." });
      } else {
        throw new Error(res.error || "La respuesta del servidor no fue la esperada.");
      }
    } catch (error) {
      console.error(error);
      toast({ title: "Error al revisar la canción", description: String(error), variant: "destructive" });
    } finally {
      setIsRevising(false);
    }
  };

  const handleDownloadLyrics = () => {
    if (!result) return;
    const blob = new Blob([result.lyrics], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'letra-cancion.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const fillWithTestData = () => {
    const emotionalTestData: Partial<SongCreationFormValues> = {
        email: 'test.emotional@dualmuse.com',
        dedicatedTo: 'Mi Amor Eterno',
        requester: 'Tu Admirador Secreto',
        nickname: 'Lucero',
        relationship: 'Compañeros de vida',
        story: 'Una historia de amor que comenzó con una mirada en un café bajo la lluvia. Han pasado diez años y cada día es una nueva aventura. Celebramos nuestro aniversario, recordando el día que nos prometimos un para siempre. Queremos una canción que capture esa magia.',
        genre: 'Balada Pop',
        voice: 'female-standard',
        includeNames: true,
        keywords: 'lluvia, café, aniversario, para siempre',
    };

    const corridoTestData: Partial<SongCreationFormValues> = {
        email: 'test.corrido@dualmuse.com',
        dedicatedTo: 'El Jefe de la Sierra',
        requester: 'Su Gente de Confianza',
        nickname: 'El Halcón',
        relationship: 'Líder y amigo',
        story: 'Este corrido es para un hombre de palabra, que empezó desde abajo y con puro esfuerzo y lealtad se ganó el respeto de todos en la región. Nunca se olvida de sus raíces y siempre ayuda a su gente. La historia debe hablar de su troca nueva, de su rancho y de cómo superó las adversidades.',
        genre: 'Corrido Tumbado',
        voice: 'male-deep',
        includeNames: true,
        keywords: 'palabra, respeto, rancho, lealtad',
    };

    const testData = songType === 'corrido' ? corridoTestData : emotionalTestData;
    
    form.reset({
        ...form.getValues(),
        ...testData,
    });

    toast({
        title: "¡Formulario autocompletado!",
        description: "Se han añadido datos de prueba.",
    });
};

  if (formStep === 'loading' || loading) {
    return (
      <Card className={cn("max-w-4xl mx-auto shadow-2xl", theme.cardClass)}>
        <CardContent className="p-8">
            <div className="text-center p-16 flex flex-col items-center justify-center space-y-6 h-[50vh]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <h2 className="font-headline text-3xl font-bold">{currentLoadingMessage}</h2>
                <div className="w-full max-w-md">
                   <Progress value={progress} className="w-full" />
                   <p className="text-sm text-muted-foreground mt-2">{Math.round(progress)}% completado</p>
                </div>
                <p className="text-muted-foreground">La magia toma su tiempo. Estamos creando algo único para ti.</p>
            </div>
        </CardContent>
      </Card>
    );
  }

  if (formStep === 'review' && result && formData) {
    const totalRevisions = revisionCounts[formData.plan as PlanValue];
    const hasRevisionsLeft = revisionsRemaining > 0;
    const revisionsUsed = totalRevisions - revisionsRemaining;


    return (
        <Card className={cn("max-w-4xl mx-auto shadow-2xl", theme.cardClass)}>
            <CardHeader className="text-center bg-secondary/30 p-8 rounded-t-lg">
                <theme.Icon className="mx-auto h-12 w-12 text-primary" />
                <CardTitle className="font-headline text-4xl font-bold mt-4">Paso de Revisión (Cambio {revisionsUsed + 1}/{totalRevisions})</CardTitle>
                <CardDescription className="text-muted-foreground mt-2">Escucha un preview de 15 segundos y solicita cambios si lo necesitas.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
                {albumArtUrl ? (
                    <div className="flex justify-center">
                        <Image src={albumArtUrl} alt="Carátula del álbum" width={200} height={200} className="rounded-lg shadow-lg" />
                    </div>
                ) : formData.plan !== 'creator' && (
                    <div className="flex flex-col items-center justify-center bg-secondary/50 p-6 rounded-lg space-y-3">
                         <Loader2 className="h-8 w-8 animate-spin text-primary" />
                         <p className="font-semibold">Generando carátula del álbum...</p>
                         <p className="text-xs text-muted-foreground">Esto puede tardar un momento.</p>
                    </div>
                )}
                <div className="bg-secondary/50 p-6 rounded-lg">
                    <h3 className="font-headline text-2xl mb-4">Preview de Audio (15 seg)</h3>
                    <audio ref={audioRef} controls src={result.audio} className="w-full">
                        Tu navegador no soporta el audio.
                    </audio>
                     <p className="text-xs text-muted-foreground mt-2">El audio se detendrá a los 15 segundos. La versión final no tendrá esta limitación.</p>
                </div>
                <div className="bg-secondary/50 p-6 rounded-lg">
                    <h3 className="font-headline text-2xl mb-4">Letra Generada</h3>
                    <pre className="whitespace-pre-wrap font-body text-sm leading-relaxed max-h-60 overflow-y-auto">{result.lyrics || "No se pudo generar la letra. Por favor, intenta de nuevo o modifica tu historia."}</pre>
                </div>

                {hasRevisionsLeft ? (
                    <div className="bg-secondary/50 p-6 rounded-lg space-y-4">
                        <h3 className="font-headline text-2xl">Solicitar Cambios ({revisionsRemaining} restantes)</h3>
                        <Textarea 
                            placeholder="Ej: 'Cambia el coro para que mencione nuestro primer viaje.' o 'Haz el segundo verso más lento y nostálgico.'"
                            value={revisionRequest}
                            onChange={(e) => setRevisionRequest(e.target.value)}
                            rows={4}
                        />
                        <Button onClick={handleRevisionSubmit} disabled={!revisionRequest || isRevising}>
                            {isRevising && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Enviar Revisión
                        </Button>
                    </div>
                ) : (
                    <div className="text-center p-4 bg-yellow-900/20 rounded-md">
                        <p className="font-semibold text-yellow-300">Has utilizado todas tus revisiones.</p>
                    </div>
                )}
                
                <div className="flex flex-col items-center gap-4 pt-4 border-t sm:flex-row sm:justify-center">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline">Empezar de nuevo</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro de que quieres empezar de nuevo?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Perderás la canción y la carátula actuales. Esta acción no se puede deshacer.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => { setResult(null); setFormStep('filling'); form.reset(); }}>Sí, empezar de nuevo</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="lg" className="bg-accent-gold text-accent-foreground hover:bg-accent-gold/90 text-lg">
                                ¡Me encanta! Aceptar y Continuar
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {revisionsRemaining > 0 ? `Si aceptas la canción ahora, perderás las ${revisionsRemaining} revisiones restantes. ¿Deseas continuar?` : 'Estás a punto de aceptar la versión final de tu canción.'}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={() => setFormStep('result')}>Sí, continuar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
  }

  if (formStep === 'result' && result && formData) {
    const shareUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const shareText = `¡He creado una canción personalizada con IA en DualMuse! Escucha mi creación: ${shareUrl}`;
    const planInfo = currentPlanOptions.find(p => p.value === formData.plan);
    const price = planInfo ? planInfo.price : 0;
    const planName = planInfo ? planInfo.label : 'N/A';
    
    return (
     <Card className={cn("max-w-4xl mx-auto shadow-2xl", theme.cardClass)}>
        <CardHeader className="text-center bg-secondary/30 p-8 rounded-t-lg">
            <theme.Icon className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="font-headline text-4xl font-bold mt-4">¡Tu Obra Maestra Final!</CardTitle>
            <CardDescription className="text-muted-foreground mt-2">Aquí está la versión final de tu canción. ¡Lista para el mundo!</CardDescription>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
            {albumArtUrl && (
                <div className="flex justify-center">
                    <Image src={albumArtUrl} alt="Carátula final del álbum" width={250} height={250} className="rounded-lg shadow-2xl" />
                </div>
            )}
            <div className="bg-secondary/50 p-6 rounded-lg space-y-4">
                <h3 className="font-headline text-2xl">Audio Final</h3>
                <audio controls src={result.audio} className="w-full">
                    Tu navegador no soporta el audio.
                </audio>
                <div className="flex gap-4">
                     <Button asChild variant="outline" className="w-full">
                        <a href={result.audio} download={`dualmuse-${formData.songType}.wav`}>
                            <Download className="mr-2" />
                            Descargar Audio (.wav)
                        </a>
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleDownloadLyrics}>
                        <Download className="mr-2" />
                        Descargar Letra (.txt)
                    </Button>
                </div>
            </div>
            <div className="bg-secondary/50 p-6 rounded-lg">
                <h3 className="font-headline text-2xl mb-4">Letra Final</h3>
                <pre className="whitespace-pre-wrap font-body text-sm leading-relaxed max-h-60 overflow-y-auto">{result.lyrics}</pre>
            </div>
            <div className="text-center space-y-6">
                <div>
                    <h3 className="font-headline text-xl mb-3">Comparte tu creación</h3>
                    <div className="flex justify-center gap-4">
                        <Button asChild variant="outline" size="icon">
                            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </a>
                        </Button>
                         <Button asChild variant="outline" size="icon">
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                        </Button>
                         <Button asChild variant="outline" size="icon">
                            <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noopener noreferrer" data-action="share/whatsapp/share">
                                <Share2 className="h-5 w-5" />
                                <span className="sr-only">WhatsApp</span>
                            </a>
                        </Button>
                    </div>
                </div>
                <Link href={`/confirmacion?plan=${encodeURIComponent(planName)}&price=${price}&type=${formData.songType}`} passHref>
                    <Button size="lg" className="bg-accent-gold text-accent-foreground hover:bg-accent-gold/90 text-lg">Proceder al Pago</Button>
                </Link>
                <Button variant="outline" onClick={() => { setResult(null); setFormStep('filling'); form.reset(); }}>Crear otra canción</Button>
            </div>
        </CardContent>
     </Card>
    );
  }

  if (formStep === 'upsell') {
    const suggestions = formData?.songType === 'corrido' ? famousArtistSuggestions.corrido : famousArtistSuggestions.emotional;
    return (
      <Card className={cn("max-w-4xl mx-auto shadow-2xl", theme.cardClass)}>
        <CardContent className="p-8">
            <div className="space-y-8 text-center animate-fade-in">
                <Button 
                    variant="ghost" 
                    size="sm"
                    className="absolute top-6 left-6"
                    onClick={() => setFormStep('filling')}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver al formulario
                </Button>
                <Star className="mx-auto h-12 w-12 text-accent-gold" />
                <h2 className="font-headline text-4xl font-bold">¿Quieres que un Famoso Ayude?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Por un costo adicional de <span className="font-bold text-foreground">$299</span>, podemos usar un modelo avanzado para inspirarnos en el estilo vocal de un artista famoso, dándole a tu canción ese toque distintivo y profesional.
                </p>
                
                <Card className="max-w-lg mx-auto text-left">
                    <CardHeader>
                        <CardTitle>¿Qué famoso te gustaría escuchar?</CardTitle>
                        <CardDescription>Selecciona una sugerencia o escribe el nombre de un artista.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-2">
                            {suggestions.map(artist => (
                                <Button key={artist} variant="outline" size="sm" onClick={() => setCollaborationChoice(artist)}>
                                    {artist}
                                </Button>
                            ))}
                        </div>
                        <Input 
                            placeholder="O escribe el nombre de un artista..."
                            value={collaborationChoice}
                            onChange={(e) => setCollaborationChoice(e.target.value)}
                        />
                         <p className="text-xs text-muted-foreground">Nos inspiraremos en el estilo vocal del artista.</p>
                    </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button variant="ghost" size="lg" onClick={() => handleCreateSong(null)}>
                        <Users className="mr-2 h-5 w-5" />
                        No, gracias. Usar la voz estándar.
                    </Button>
                    <Button size="lg" className="bg-accent-gold text-accent-foreground hover:bg-accent-gold/90" onClick={() => handleCreateSong(collaborationChoice)} disabled={!collaborationChoice}>
                        <Mic2 className="mr-2 h-5 w-5" />
                        {collaborationChoice ? `Sí, invitar a ${collaborationChoice} por $299` : 'Sí, invitar a la colaboración por $299'}
                    </Button>
                </div>
            </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("max-w-4xl mx-auto shadow-2xl border-2", theme.cardClass)}>
        <CardHeader className="text-center bg-secondary/30 p-8 rounded-t-lg relative">
            <Button 
                type="button"
                variant="ghost" 
                size="sm"
                onClick={fillWithTestData}
                className="absolute top-4 right-4 text-xs"
            >
                <Sparkles className="mr-2 h-4 w-4" />
                Rellenar Datos de Prueba
            </Button>
            <theme.Icon className="mx-auto h-12 w-12 text-primary" />
            <CardTitle className="font-headline text-4xl md:text-5xl font-bold mt-4">{theme.title}</CardTitle>
            <CardDescription className="text-lg mt-2">
                {theme.description}
            </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-8">
            <TooltipProvider>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {clientError && (
                      <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error al Crear Canción</AlertTitle>
                          <AlertDescription>{clientError}</AlertDescription>
                      </Alert>
                    )}
                    <FormField control={form.control} name="songType" render={({ field }) => ( <FormItem className="hidden"><FormControl><Input {...field} /></FormControl></FormItem> )}/>
                     <FormField control={form.control} name="famousCollaboration" render={({ field }) => ( <FormItem className="hidden"><FormControl><Input {...field} /></FormControl></FormItem> )}/>
                    <FormField control={form.control} name="styleVoice" render={({ field }) => ( <FormItem className="hidden"><FormControl><Input {...field} /></FormControl></FormItem> )}/>
                    <FormField control={form.control} name="aiModel" render={({ field }) => ( <FormItem className="hidden"><FormControl><Input {...field} /></FormControl></FormItem> )}/>


                    {songType === 'corrido' ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FormField control={form.control} name="dedicatedTo" render={({ field }) => ( <FormItem><FormLabel>{theme.dedicatedToLabel}</FormLabel><FormControl><Input placeholder={theme.dedicatedToPlaceholder} {...field} /></FormControl><FormMessage /></FormItem> )}/>
                          <FormField control={form.control} name="requester" render={({ field }) => ( <FormItem><FormLabel>{theme.requesterLabel}</FormLabel><FormControl><Input placeholder="Tu nombre" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                        </div>
                        <FormField control={form.control} name="story" render={({ field }) => ( <FormItem><FormLabel>{theme.storyLabel}</FormLabel><FormControl><Textarea rows={5} placeholder={theme.storyPlaceholder} {...field} /></FormControl><FormDescription>Sé lo más detallado posible para un mejor resultado.</FormDescription><FormMessage /></FormItem> )}/>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Tu Correo Electrónico</FormLabel><FormControl><Input type="email" placeholder="Para enviarte la canción final" {...field} /></FormControl><FormDescription>No lo compartiremos con nadie.</FormDescription><FormMessage /></FormItem> )}/>
                          <FormField control={form.control} name="nickname" render={({ field }) => ( <FormItem><FormLabel>Apodo (opcional)</FormLabel><FormControl><Input placeholder="Ej: Chuy, La Güera, Mi Sol" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                        </div>
                         <FormField control={form.control} name="relationship" render={({ field }) => ( <FormItem><FormLabel>{theme.relationshipLabel}</FormLabel><FormControl><Input placeholder={theme.relationshipPlaceholder} {...field} /></FormControl><FormMessage /></FormItem> )}/>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField control={form.control} name="dedicatedTo" render={({ field }) => ( <FormItem><FormLabel>{theme.dedicatedToLabel}</FormLabel><FormControl><Input placeholder={theme.dedicatedToPlaceholder} {...field} /></FormControl><FormMessage /></FormItem> )}/>
                            <FormField control={form.control} name="requester" render={({ field }) => ( <FormItem><FormLabel>{theme.requesterLabel}</FormLabel><FormControl><Input placeholder="Tu nombre" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <FormField control={form.control} name="email" render={({ field }) => ( <FormItem><FormLabel>Tu Correo Electrónico</FormLabel><FormControl><Input type="email" placeholder="Para enviarte la canción final" {...field} /></FormControl><FormDescription>No lo compartiremos con nadie.</FormDescription><FormMessage /></FormItem> )}/>
                            <FormField control={form.control} name="nickname" render={({ field }) => ( <FormItem><FormLabel>Apodo (opcional)</FormLabel><FormControl><Input placeholder="Ej: Chuy, La Güera, Mi Sol" {...field} /></FormControl><FormMessage /></FormItem> )}/>
                        </div>
                        <FormField control={form.control} name="relationship" render={({ field }) => ( <FormItem><FormLabel>{theme.relationshipLabel}</FormLabel><FormControl><Input placeholder={theme.relationshipPlaceholder} {...field} /></FormControl><FormMessage /></FormItem> )}/>
                        <FormField control={form.control} name="story" render={({ field }) => ( <FormItem><FormLabel>{theme.storyLabel}</FormLabel><FormControl><Textarea rows={5} placeholder={theme.storyPlaceholder} {...field} /></FormControl><FormDescription>Sé lo más detallado posible para un mejor resultado.</FormDescription><FormMessage /></FormItem> )}/>
                      </>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                       <FormField
                          control={form.control}
                          name="genre"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Género Musical Principal</FormLabel>
                                <Popover open={currentPopover === 'genre'} onOpenChange={(open) => setCurrentPopover(open ? 'genre' : null)}>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <Button variant="outline" role="combobox" className={cn("w-full justify-between font-normal",!field.value && "text-muted-foreground")}>
                                        {field.value ? field.value : "Selecciona un género..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
                                    <Command shouldFilter={false}>
                                        <CommandInput 
                                            placeholder={plan === 'master' ? "Busca o crea un género..." : "Busca un género..."} 
                                            value={genreSearch}
                                            onValueChange={setGenreSearch}
                                        />
                                        <CommandList>
                                            <CommandEmpty>
                                                 {'No se encontraron resultados.'}
                                            </CommandEmpty>
                                            <CommandGroup>
                                                {genres.filter(g => g.toLowerCase().includes(genreSearch.toLowerCase())).map((genre) => (
                                                <CommandItem
                                                    value={genre}
                                                    key={genre}
                                                    onSelect={() => {
                                                        form.setValue("genre", genre);
                                                        setGenreSearch("");
                                                        setCurrentPopover(null);
                                                    }}
                                                >
                                                    <Check className={cn("mr-2 h-4 w-4", genre === field.value ? "opacity-100" : "opacity-0")}/>
                                                    {genre}
                                                </CommandItem>
                                                ))}
                                            </CommandGroup>
                                            {plan === 'master' && genreSearch && !genres.some(g => g.toLowerCase() === genreSearch.toLowerCase()) && (
                                                <CommandGroup heading="Crear Nuevo">
                                                     <CommandItem
                                                        value={genreSearch}
                                                        onSelect={() => {
                                                            form.setValue("genre", genreSearch);
                                                            setGenreSearch("");
                                                            setCurrentPopover(null);
                                                        }}
                                                    >
                                                        <span className="mr-2 h-4 w-4" />
                                                        <span>Crear: "{genreSearch}"</span>
                                                    </CommandItem>
                                                </CommandGroup>
                                            )}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                                </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                         {plan === 'master' ? (
                            <FormField
                                control={form.control}
                                name="genre2"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel className="flex items-center gap-2">
                                        Género de Fusión (Opcional)
                                        <Wand2 className="h-4 w-4 text-accent-gold" />
                                    </FormLabel>
                                    <Popover open={currentPopover === 'genre2'} onOpenChange={(open) => setCurrentPopover(open ? 'genre2' : null)}>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant="outline" role="combobox" className={cn("w-full justify-between font-normal", !field.value && "text-muted-foreground")}>
                                                {field.value ? field.value : "Selecciona para fusionar..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
                                             <Command shouldFilter={false}>
                                                <CommandInput 
                                                    placeholder="Busca o crea un género..."
                                                    value={genre2Search}
                                                    onValueChange={setGenre2Search}
                                                />
                                                <CommandList>
                                                    <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                                                    <CommandGroup>
                                                        {genres.filter(g => g.toLowerCase().includes(genre2Search.toLowerCase())).map((genre) => (
                                                        <CommandItem
                                                            value={genre}
                                                            key={genre}
                                                            onSelect={() => {
                                                                form.setValue("genre2", genre);
                                                                setGenre2Search("");
                                                                setCurrentPopover(null);
                                                            }}
                                                        >
                                                            <Check className={cn("mr-2 h-4 w-4", genre === field.value ? "opacity-100" : "opacity-0")}/>
                                                            {genre}
                                                        </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                     {genre2Search && !genres.some(g => g.toLowerCase() === genre2Search.toLowerCase()) && (
                                                        <CommandGroup heading="Crear Nuevo">
                                                            <CommandItem
                                                                value={genre2Search}
                                                                onSelect={() => {
                                                                    form.setValue("genre2", genre2Search);
                                                                    setGenre2Search("");
                                                                    setCurrentPopover(null);
                                                                }}
                                                            >
                                                                <span className="mr-2 h-4 w-4" />
                                                                <span>Crear: "{genre2Search}"</span>
                                                            </CommandItem>
                                                        </CommandGroup>
                                                    )}
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>Crea fusiones exóticas (ej: Cumbia-Metal).</FormDescription>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ) : (
                            <FormField control={form.control} name="voice" render={({ field }) => (
                                <FormItem><FormLabel>Tipo de Voz Principal</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>
                                    {voiceOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                                </SelectContent></Select><FormMessage /></FormItem>
                            )}/>
                        )}
                    </div>
                    {plan === 'master' && (
                         <FormField control={form.control} name="voice" render={({ field }) => (
                            <FormItem><FormLabel>Tipo de Voz Principal</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl><SelectContent>
                                {voiceOptions.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
                            </SelectContent></Select><FormMessage /></FormItem>
                        )}
                    />
                    )}


                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" disabled={plan === 'creator'} className={cn(plan === 'creator' && 'opacity-60 cursor-not-allowed')}>
                            <AccordionTrigger className="font-headline text-lg hover:no-underline">
                              <div className="flex items-center gap-2">
                                <Music className="h-5 w-5 text-accent-gold" />
                                <span>Detalles Avanzados</span>
                                {plan !== 'creator' ? null : <span className="text-xs font-normal bg-muted text-muted-foreground px-2 py-1 rounded-full">Planes Artista y Maestro</span>}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-8 pt-4">
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <FormField control={form.control} name="instrumentation" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                Instrumentación
                                                <Tooltip><TooltipTrigger asChild><button type="button" onClick={(e) => e.preventDefault()}><Info className="h-4 w-4 text-muted-foreground cursor-help" /></button></TooltipTrigger><TooltipContent><p className="max-w-xs">{theme.tooltips.instrumentation}</p></TooltipContent></Tooltip>
                                            </FormLabel>
                                            <FormControl><Input placeholder="Ej: Piano y cuerdas" {...field} disabled={plan === 'creator' || areAdvancedFieldsDisabled} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField control={form.control} name="mood" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                Ambiente (Mood)
                                                <Tooltip><TooltipTrigger asChild><button type="button" onClick={(e) => e.preventDefault()}><Info className="h-4 w-4 text-muted-foreground cursor-help" /></button></TooltipTrigger><TooltipContent><p className="max-w-xs">{theme.tooltips.mood}</p></TooltipContent></Tooltip>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={plan === 'creator' || areAdvancedFieldsDisabled}><FormControl><SelectTrigger><SelectValue placeholder="Selecciona un ambiente" /></SelectTrigger></FormControl><SelectContent>
                                                {theme.moods.map(mood => <SelectItem key={mood.value} value={mood.value}>{mood.label}</SelectItem>)}
                                            </SelectContent></Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField control={form.control} name="tempo" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                Tempo
                                                <Tooltip><TooltipTrigger asChild><button type="button" onClick={(e) => e.preventDefault()}><Info className="h-4 w-4 text-muted-foreground cursor-help" /></button></TooltipTrigger><TooltipContent><p className="max-w-xs">{theme.tooltips.tempo}</p></TooltipContent></Tooltip>
                                            </FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={plan === 'creator' || areAdvancedFieldsDisabled}><FormControl><SelectTrigger><SelectValue placeholder="Selecciona el tempo" /></SelectTrigger></FormControl><SelectContent><SelectItem value="lento">Lento</SelectItem><SelectItem value="medio">Medio</SelectItem><SelectItem value="rapido">Rápido</SelectItem></SelectContent></Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                                    <FormField control={form.control} name="keywords" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Palabras Clave</FormLabel>
                                            <FormControl><Input placeholder="Palabras o frases que DEBEN aparecer" {...field} disabled={plan === 'creator'} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}/>
                               </div>

                               <div className={cn("pt-4 border-t", plan !== 'master' && 'hidden')}>
                                   <p className="md:col-span-3 text-sm text-muted-foreground -mb-4 font-bold text-accent-gold">Exclusivo Plan Maestro</p>
                                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
                                        <FormField control={form.control} name="inspirationalArtist" render={({ field }) => (
                                            <FormItem className="md:col-span-3 flex flex-col">
                                                <FormLabel className="flex items-center gap-2">
                                                    Estilo Inspiracional
                                                    <Tooltip><TooltipTrigger asChild><button type="button" onClick={(e) => e.preventDefault()}><Info className="h-4 w-4 text-muted-foreground cursor-help" /></button></TooltipTrigger><TooltipContent><p className="max-w-xs">Escribe un artista. Nos inspiraremos en su estilo musical (instrumentación, arreglos, ambiente), no en su voz.</p></TooltipContent></Tooltip>
                                                </FormLabel>
                                                <Popover open={currentPopover === 'artist'} onOpenChange={(open) => setCurrentPopover(open ? 'artist' : null)}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                    <Button variant="outline" role="combobox" className={cn("w-full justify-between font-normal",!field.value && "text-muted-foreground")}>
                                                        {field.value ? field.value : "Ej: Bad Bunny, Ed Sheeran..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
                                                    <Command shouldFilter={false}>
                                                        <CommandInput 
                                                          placeholder="Busca o escribe un artista..."
                                                          value={artistSearch}
                                                          onValueChange={setArtistSearch}
                                                        />
                                                        <CommandList>
                                                            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
                                                            <CommandGroup>
                                                                {artists.filter(a => a.toLowerCase().includes(artistSearch.toLowerCase())).map((artist) => (
                                                                <CommandItem
                                                                    value={artist}
                                                                    key={artist}
                                                                    onSelect={() => {
                                                                        form.setValue("inspirationalArtist", artist);
                                                                        setArtistSearch("");
                                                                        setCurrentPopover(null);
                                                                    }}
                                                                >
                                                                    <Check className={cn("mr-2 h-4 w-4", artist === field.value ? "opacity-100" : "opacity-0")}/>
                                                                    {artist}
                                                                </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                             {artistSearch && !artists.some(a => a.toLowerCase() === artistSearch.toLowerCase()) && (
                                                                <CommandGroup heading="Crear Nuevo">
                                                                    <CommandItem
                                                                        value={artistSearch}
                                                                        onSelect={() => {
                                                                            form.setValue("inspirationalArtist", artistSearch);
                                                                            setArtistSearch("");
                                                                            setCurrentPopover(null);
                                                                        }}
                                                                    >
                                                                        <span className="mr-2 h-4 w-4" />
                                                                        <span>Usar: "{artistSearch}"</span>
                                                                    </CommandItem>
                                                                </CommandGroup>
                                                            )}
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                                </Popover>
                                                {areAdvancedFieldsDisabled && <FormDescription className="text-yellow-400">Cuando se usa un artista, la instrumentación, mood y tempo se infieren automáticamente para replicar su estilo.</FormDescription>}
                                                <FormMessage />
                                            </FormItem>
                                        )}/>
                                        <FormField control={form.control} name="structure" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    Estructura de la Canción
                                                    <Tooltip><TooltipTrigger asChild><button type="button" onClick={(e) => e.preventDefault()}><Info className="h-4 w-4 text-muted-foreground cursor-help" /></button></TooltipTrigger><TooltipContent><p className="max-w-xs">{theme.tooltips.structure}</p></TooltipContent></Tooltip>
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={plan !== 'master'}><FormControl><SelectTrigger><SelectValue placeholder="Define la estructura" /></SelectTrigger></FormControl><SelectContent><SelectItem value="clasica">Clásica (verso-coro-verso-coro)</SelectItem><SelectItem value="narrativa">Narrativa (historia lineal)</SelectItem><SelectItem value="progresiva">Progresiva (sin coro repetido)</SelectItem></SelectContent></Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}/>
                                        <FormField control={form.control} name="ending" render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="flex items-center gap-2">
                                                    Final de la Canción
                                                    <Tooltip><TooltipTrigger asChild><button type="button" onClick={(e) => e.preventDefault()}><Info className="h-4 w-4 text-muted-foreground cursor-help" /></button></TooltipTrigger><TooltipContent><p className="max-w-xs">{theme.tooltips.ending}</p></TooltipContent></Tooltip>
                                                </FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={plan !== 'master'}><FormControl><SelectTrigger><SelectValue placeholder="Elige un final" /></SelectTrigger></FormControl><SelectContent><SelectItem value="abrupto">Final abrupto</SelectItem><SelectItem value="fade-out">Fade out (desvanecido)</SelectItem><SelectItem value="epico-instrumental">Final épico con instrumentación</SelectItem></SelectContent></Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}/>
                                   </div>
                               </div>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t">
                                 <FormField control={form.control} name="referenceSong" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Canción de Referencia</FormLabel>
                                        <FormControl><Input placeholder="Una canción que te guste como inspiración" {...field} disabled={plan === 'creator'}/></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                 )}/>
                                  <FormField
                                    control={form.control}
                                    name="includeNames"
                                    render={({ field }) => (
                                        <FormItem className="flex items-center gap-x-3 space-y-0 rounded-md border p-4 h-full">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    disabled={plan === 'creator'}
                                                    id="includeNames-checkbox"
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel htmlFor="includeNames-checkbox" className="cursor-pointer">
                                                    Incluir nombres
                                                </FormLabel>
                                                <FormDescription>
                                                    Marcar si quieres que los nombres aparezcan en la letra.
                                                </FormDescription>
                                            </div>
                                        </FormItem>
                                    )}
                                  />
                               </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <FormField
                      control={form.control}
                      name="plan"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="font-headline text-lg">Elige tu Plan</FormLabel>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {currentPlanOptions.map(option => (
                                <FormItem key={option.value}>
                                  <FormControl>
                                    <RadioGroupItem value={option.value} id={option.value} className="sr-only peer" />
                                  </FormControl>
                                  <Label
                                    htmlFor={option.value}
                                    className={cn(
                                        "flex flex-col items-center justify-between rounded-md border-2 bg-popover p-4 cursor-pointer text-center relative h-full transition-all duration-300 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary hover:-translate-y-1 hover:shadow-xl",
                                        field.value === option.value ? "border-primary" : "border-muted"
                                    )}
                                  >
                                    {option.isRecommended && <span className={cn("text-xs text-primary-foreground px-2 py-0.5 rounded-full absolute -top-2.5", songType === 'emotional' ? 'bg-primary' : 'bg-corridos-red text-white')}>Recomendado</span>}
                                    <span className="font-bold text-lg">{option.label}</span>
                                    <span className="text-2xl text-foreground font-bold my-2">${option.price}</span>
                                    <ul className="space-y-2 text-xs text-muted-foreground text-left w-full">
                                        {option.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2">
                                                {getIconForFeature(feature)}
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                  </Label>
                                </FormItem>
                              ))}
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="aiModel"
                      render={({ field }) => (
                        <FormItem className="space-y-3 p-4 border rounded-lg bg-secondary/30">
                          <FormLabel className="font-headline text-lg flex items-center gap-2"><Cpu className="h-5 w-5 text-accent-gold" /> Motor Creativo de IA (Para tu Prueba)</FormLabel>
                          <FormDescription>
                            Elige qué modelo de IA quieres que escriba la letra. Esto afectará el estilo y la complejidad.
                          </FormDescription>
                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                              <FormItem>
                                  <FormControl>
                                  <RadioGroupItem value="gemini-1.5-flash-latest" id="flash-model" className="sr-only peer" />
                                  </FormControl>
                                  <Label htmlFor="flash-model" className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary">
                                    <div>
                                      <p className="font-bold">Flash</p>
                                      <p className="text-xs text-muted-foreground">Rápido y Creativo</p>
                                    </div>
                                    <Check className={cn("h-6 w-6 text-primary", field.value === 'gemini-1.5-flash-latest' ? 'opacity-100' : 'opacity-0')} />
                                  </Label>
                              </FormItem>
                              <FormItem>
                                  <FormControl>
                                  <RadioGroupItem value="gemini-1.5-pro-latest" id="pro-model" className="sr-only peer" />
                                  </FormControl>
                                  <Label htmlFor="pro-model" className="flex items-center justify-between rounded-md border-2 border-muted bg-popover p-4 cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary">
                                     <div>
                                      <p className="font-bold">Pro</p>
                                      <p className="text-xs text-muted-foreground">Avanzado y Potente</p>
                                    </div>
                                    <Check className={cn("h-6 w-6 text-primary", field.value === 'gemini-1.5-pro-latest' ? 'opacity-100' : 'opacity-0')} />
                                  </Label>
                              </FormItem>
                          </RadioGroup>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" size="lg" className="w-full font-bold text-lg bg-accent-gold text-accent-foreground hover:bg-accent-gold/90">
                      <Wand2 className="mr-2 h-5 w-5" />
                      Obtener mi Preview Gratis
                    </Button>
                </form>
                </Form>
            </TooltipProvider>
        </CardContent>
    </Card>
  );
}
