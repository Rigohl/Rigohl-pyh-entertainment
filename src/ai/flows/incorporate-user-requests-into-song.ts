
'use server';
/**
 * @fileOverview A Genkit flow to incorporate user requests into a generated song and regenerate the audio
 * using Gemini TTS.
 *
 * - incorporateUserRequestsIntoSong - A function that handles the incorporation of user requests into a song.
 * - IncorporateUserRequestsIntoSongInput - The input type for the incorporateUserRequestsIntoSong function.
 * - IncorporateUserRequestsIntoSongOutput - The return type for the incorporateUserRequestsIntoSong function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'zod';
import {toWav} from '@/lib/audio';
import { songCreationSchema } from '@/config/schemas';


const IncorporateUserRequestsIntoSongInputSchema = z.object({
  lyricsDraft: z.string().describe('The initial draft of the song lyrics.'),
  requests: z.string().describe('Specific requests from the user for changing the song.'),
  songDetails: songCreationSchema.describe("The original parameters of the song for context."),
});
export type IncorporateUserRequestsIntoSongInput = z.infer<typeof IncorporateUserRequestsIntoSongInputSchema>;

const IncorporateUserRequestsIntoSongOutputSchema = z.object({
  revisedLyrics: z.string().describe('The revised song lyrics incorporating user requests.'),
  revisedAudio: z.string().describe('The re-generated audio for the revised song as a URL or data URI.'),
});
export type IncorporateUserRequestsIntoSongOutput = z.infer<typeof IncorporateUserRequestsIntoSongOutputSchema>;

export async function incorporateUserRequestsIntoSong(input: IncorporateUserRequestsIntoSongInput): Promise<IncorporateUserRequestsIntoSongOutput> {
  return incorporateUserRequestsIntoSongFlow(input);
}

const revisionPrompt = ai.definePrompt({
  name: 'reviseLyricsPrompt',
  model: googleAI.model('gemini-1.5-flash-latest'),
  input: {schema: IncorporateUserRequestsIntoSongInputSchema},
  output: {schema: z.object({ revisedLyrics: z.string() })},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  },
  prompt: `Eres un experto en la declamación poética y la interpretación de "Spoken Word". Tu tarea es revisar la letra de una canción basándote en las peticiones de un cliente y luego reformatearla para una interpretación vocal dramatizada y rítmica usando SSML (Speech Synthesis Markup Language).
El objetivo NO es cantar, sino recitar la letra con el máximo impacto emocional. La voz debe tener ritmo, sentimiento y pausas teatrales.

Contexto original de la canción:
- Género: {{songDetails.genre}}{{#if songDetails.genre2}}, fusionado con {{songDetails.genre2}}{{/if}}
- Historia: {{{songDetails.story}}}
- Voz: {{songDetails.voice}}
{{#if songDetails.inspirationalArtist}}- Estilo Inspiracional: Se modeló la estructura musical al estilo de {{songDetails.inspirationalArtist}}.{{/if}}
{{#if songDetails.instrumentation}}- Detalles de Instrumentación: {{{songDetails.instrumentation}}}{{/if}}
{{#if songDetails.mood}}- Ambiente (Mood): {{{songDetails.mood}}}{{/if}}
{{#if songDetails.tempo}}- Tempo: {{songDetails.tempo}}{{/if}}
{{#if songDetails.structure}}- Estructura: {{songDetails.structure}}{{/if}}
{{#if songDetails.ending}}- Final: {{songDetails.ending}}{{/if}}

Borrador actual de la letra (ignora las etiquetas SSML para la revisión del contenido, pero mantenlas en el formato final):
--- BORRADOR DE LETRA ---
{{{lyricsDraft}}}
--- FIN DEL BORRADOR ---

Solicitudes de revisión del cliente:
--- SOLICITUDES DEL CLIENTE ---
{{{requests}}}
--- FIN DE SOLICITUDES ---

INSTRUCCIONES DE FORMATO SSML:
1.  Revisa la letra para incorporar los cambios solicitados. Mantén los marcadores de sección como (Verso 1).
2.  Envuelve la letra final y revisada en una única etiqueta <speak>.
3.  **Uso de Pausas (<break>):** Sé generoso con las pausas para un efecto dramático. Usa <break time="750ms" /> entre versos y <break time="1.5s" /> entre estrofas.
4.  **Uso de Ritmo y Tono (<prosody>):** Varía el ritmo y el tono para crear contraste. Usa un ritmo más rápido y un tono más alto para los coros.
5.  Mantén el tono y estilo originales definidos por el contexto de la canción.

INSTRUCCIONES DE SALIDA:
Tu respuesta final DEBE SER un objeto JSON válido con una única clave llamada "revisedLyrics". El valor de esta clave debe ser una cadena de texto que contenga la letra revisada completa en formato SSML, incluyendo los marcadores de sección.

Ejemplo de salida JSON:
{
  "revisedLyrics": "<speak><prosody rate=\\"medium\\" pitch=\\"0st\\">(Verso 1) Tu revisión del verso uno, ahora con más sentimiento.<break time=\\"750ms\\" />Manteniendo la esencia, pero con nuevo aliento.</prosody><break time=\\"1.5s\\" /><prosody rate=\\"fast\\" pitch=\\"+2st\\">(Coro) ¡Y el coro cambiado! Como pediste, con más pasión,<break time=\\"750ms\\" />el mejor equipo, cumpliendo la misión.</prosody></speak>"
}`,
});


const incorporateUserRequestsIntoSongFlow = ai.defineFlow(
  {
    name: 'incorporateUserRequestsIntoSongFlow',
    inputSchema: IncorporateUserRequestsIntoSongInputSchema,
    outputSchema: IncorporateUserRequestsIntoSongOutputSchema,
  },
  async (input) => {
    // 1. Generate revised lyrics with Gemini Pro
    const revisionResponse = await revisionPrompt(input);
    const revisedLyricsSSML = revisionResponse.output?.revisedLyrics;

    if (!revisedLyricsSSML) {
      throw new Error('Failed to generate revised lyrics.');
    }

    // 2. Prepare SSML for TTS (remove structural markers) and text for display
    const ssmlForTts = revisedLyricsSSML.replace(/\([^)]+\)\s*/g, '');
    const lyricsForDisplay = revisedLyricsSSML.replace(/<\/?[^>]+(>|$)/g, "");

    // 3. Generate new audio with Gemini TTS using the revised lyrics
    const voiceMap: { [key: string]: string } = {
      'male-deep': 'rasalgethi',
      'male-standard': 'algenib',
      'male-youthful': 'puck',
      'female-soft': 'laomedeia',
      'female-standard': 'achernar',
      'female-energetic': 'schedar',
    };
    const voiceName = voiceMap[input.songDetails.voice] || 'algenib';

    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
      prompt: ssmlForTts,
    });

    if (!media) {
      throw new Error('No media returned from TTS model during revision');
    }
    
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavBase64 = await toWav(audioBuffer);

    return {
      revisedLyrics: lyricsForDisplay,
      revisedAudio: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);
