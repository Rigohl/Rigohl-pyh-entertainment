import { z } from "zod";

export const songCreationSchema = z.object({
  songType: z.enum(["emotional", "corrido"]),
  email: z.string().email("Por favor, introduce un correo electrónico válido."),
  dedicatedTo: z.string().min(1, "Este campo es requerido."),
  requester: z.string().min(1, "Este campo es requerido."),
  nickname: z.string().optional(),
  relationship: z.string().min(1, "Este campo es requerido."),
  story: z.string().min(20, "Cuéntanos más de la historia (mínimo 20 caracteres)."),
  genre: z.string().min(1, "El género es requerido."),
  genre2: z.string().optional(),
  voice: z.string({ required_error: "Debes seleccionar un tipo de voz." }),
  includeNames: z.boolean().default(false).optional(),
  keywords: z.string().optional(),
  referenceSong: z.string().optional(),
  instrumentation: z.string().optional(),
  mood: z.string().optional(),
  tempo: z.string().optional(),
  structure: z.string().optional(),
  ending: z.string().optional(),
  plan: z.enum(["creator", "artist", "master"]),
  inspirationalArtist: z.string().optional(),
  famousCollaboration: z.boolean().optional(),
  styleVoice: z.string().optional(),
  aiModel: z.string().optional().default('gemini-1.5-flash-latest'),
});
export type SongCreationFormValues = z.infer<typeof songCreationSchema>;
