
'use server';
/**
 * @fileOverview An AI agent that generates song lyrics and audio using a pipeline of models:
 * Gemini for lyrics and Gemini TTS for audio.
 *
 * - generateSongLyricsAndAudio - A function that handles the song generation process.
 * - GenerateSongLyricsAndAudioInput - The input type for the generateSongLyricsAndAudio function.
 * - GenerateSongLyricsAndAudioOutput - The return type for the generateSongLyricsAndAudio function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/googleai';
import {z} from 'zod';
import {toWav} from '@/lib/audio';
import { songCreationSchema } from '@/config/schemas';

// Use the centralized schema as the single source of truth for the input.
export type GenerateSongLyricsAndAudioInput = z.infer<typeof songCreationSchema>;

const GenerateSongLyricsAndAudioOutputSchema = z.object({
  lyrics: z.string().describe('The generated lyrics of the song.'),
  audio: z.string().describe('The URL or data URI of the generated audio.'),
});
export type GenerateSongLyricsAndAudioOutput = z.infer<typeof GenerateSongLyricsAndAudioOutputSchema>;


export async function generateSongLyricsAndAudio(input: GenerateSongLyricsAndAudioInput): Promise<GenerateSongLyricsAndAudioOutput> {
  return generateSongLyricsAndAudioFlow(input);
}

const commonPromptConfig = {
  input: {schema: songCreationSchema},
  output: {schema: z.object({lyrics: z.string()})},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT' as const, threshold: 'BLOCK_ONLY_HIGH' as const },
      { category: 'HARM_CATEGORY_HATE_SPEECH' as const, threshold: 'BLOCK_MEDIUM_AND_ABOVE' as const },
      { category: 'HARM_CATEGORY_HARASSMENT' as const, threshold: 'BLOCK_MEDIUM_AND_ABOVE' as const },
    ],
  },
  prompt: `Eres un experto en la declamación poética y la interpretación de "Spoken Word". Tu tarea es escribir la letra de una canción y luego prepararla para una interpretación vocal dramatizada y rítmica usando SSML (Speech Synthesis Markup Language).
El objetivo NO es cantar, sino recitar la letra con el máximo impacto emocional, como si fuera un poema intenso o una canción de rap melódico. La voz debe tener ritmo, sentimiento y pausas teatrales.

PARÁMETROS DE LA CANCIÓN:
- Tipo: {{songType}}
- Género: {{genre}}{{#if genre2}}, fusionado con {{genre2}}{{/if}}
- Dedicada a: {{dedicatedTo}}{{#if nickname}} ({{nickname}}){{/if}}
- De parte de: {{requester}}
- Relación: {{relationship}}
- Historia central: {{{story}}}
{{#if includeNames}}- Debe incluir los nombres "{{dedicatedTo}}" y "{{requester}}".{{/if}}
{{#if keywords}}- Debe incorporar estas palabras clave: {{{keywords}}}.{{/if}}
{{#if famousCollaboration}}- Colaboración especial con un estilo inspirado en: {{styleVoice}}.{{/if}}

PARÁMETROS AVANZADOS (Si se proveen):
{{#if inspirationalArtist}}- Estilo Inspiracional: Modela la estructura musical, instrumentación y ambiente general al estilo de {{inspirationalArtist}}, sin imitar la voz.{{/if}}
{{#if instrumentation}}- Detalles de Instrumentación: {{{instrumentation}}}{{/if}}
{{#if mood}}- Ambiente (Mood): {{{mood}}}{{/if}}
{{#if tempo}}- Tempo: {{tempo}}{{/if}}
{{#if structure}}- Estructura de la canción: {{structure}}{{/if}}
{{#if ending}}- Tipo de final: {{ending}}{{/if}}

INSTRUCCIONES DE FORMATO SSML:
1.  Escribe la letra de la canción, estructurada con marcadores de sección como (Verso 1), (Coro), (Puente), etc.
2.  Envuelve la letra completa en una única etiqueta <speak>.
3.  **Uso de Pausas (<break>):** Sé generoso con las pausas para un efecto dramático. Usa <break time="750ms" /> entre versos y <break time="1.5s" /> entre estrofas (e.g., entre un verso y un coro).
4.  **Uso de Ritmo y Tono (<prosody>):** Varía el ritmo y el tono para crear un contraste dinámico.
    *   **Versos:** Usa un ritmo más lento y conversacional (ej: rate="medium").
    *   **Coro:** Aumenta la intensidad. Usa un ritmo más rápido (ej: rate="fast") y un tono ligeramente más alto (ej: pitch="+2st") para que destaque.
    *   **Puente/Final:** Considera un ritmo lento (ej: rate="slow") para crear tensión o un final emotivo.

INSTRUCCIONES DE SALIDA:
Tu respuesta final DEBE SER un objeto JSON válido con una única clave llamada "lyrics". El valor de esta clave debe ser una cadena de texto que contenga la letra completa en formato SSML, incluyendo los marcadores de sección como (Verso 1).

Ejemplo de salida JSON:
{
  "lyrics": "<speak><prosody rate=\\"medium\\" pitch=\\"0st\\">(Verso 1) En la oficina, bajo luz de neón,<break time=\\"750ms\\" />nació una alianza, más fuerte que el montón.</prosody><break time=\\"1.5s\\" /><prosody rate=\\"fast\\" pitch=\\"+2st\\">(Coro) ¡Y aquí estamos! Conquistando el plan,<break time=\\"750ms\\" />el mejor equipo, el amigo y su fan.</prosody></speak>"
}`,
};

const flashLyricsPrompt = ai.definePrompt({
  ...commonPromptConfig,
  name: 'flashLyricsPrompt',
  model: googleAI.model('gemini-1.5-flash-latest'),
});

const proLyricsPrompt = ai.definePrompt({
  ...commonPromptConfig,
  name: 'proLyricsPrompt',
  model: googleAI.model('gemini-1.5-pro-latest'),
});


const generateSongLyricsAndAudioFlow = ai.defineFlow(
  {
    name: 'generateSongLyricsAndAudioFlow',
    inputSchema: songCreationSchema,
    outputSchema: GenerateSongLyricsAndAudioOutputSchema,
  },
  async (input) => {
    // 1. Generate Lyrics with the selected Gemini model
    const promptToUse = input.aiModel === 'gemini-1.5-pro-latest' ? proLyricsPrompt : flashLyricsPrompt;
    const lyricsResponse = await promptToUse(input);
    const lyricsSSML = lyricsResponse.output?.lyrics;

    if (!lyricsSSML) {
      throw new Error('Failed to generate lyrics with Gemini Pro.');
    }

    // 2. Prepare SSML for TTS (remove structural markers) and text for display
    const ssmlForTts = lyricsSSML.replace(/\([^)]+\)\s*/g, '');
    const lyricsForDisplay = lyricsSSML.replace(/<\/?[^>]+(>|$)/g, "");

    // 3. Generate audio with Gemini TTS
    const voiceMap: { [key: string]: string } = {
      'male-deep': 'rasalgethi',
      'male-standard': 'algenib',
      'male-youthful': 'puck',
      'female-soft': 'laomedeia',
      'female-standard': 'achernar',
      'female-energetic': 'schedar',
    };
    const voiceName = voiceMap[input.voice] || 'algenib';

    const {media} = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: {voiceName},
          },
        },
      },
      prompt: ssmlForTts,
    });

    if (!media) {
      throw new Error('No media returned from TTS model');
    }

    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavBase64 = await toWav(audioBuffer);

    return {
      lyrics: lyricsForDisplay,
      audio: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);
