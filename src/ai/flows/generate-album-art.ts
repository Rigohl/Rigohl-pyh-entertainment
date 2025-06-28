
'use server';
/**
 * @fileOverview A Genkit flow to generate album art for a song using Gemini.
 * It first summarizes the story into a visual prompt, then generates the image.
 *
 * - generateAlbumArt - A function that handles the generation of album art.
 * - GenerateAlbumArtInput - The input type for the generateAlbumArt function.
 * - GenerateAlbumArtOutput - The return type for the generateAlbumArt function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateAlbumArtInputSchema = z.object({
  story: z.string().describe('The full story of the song to be summarized for the album art.'),
});
export type GenerateAlbumArtInput = z.infer<typeof GenerateAlbumArtInputSchema>;

const GenerateAlbumArtOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image from Gemini.'),
});
export type GenerateAlbumArtOutput = z.infer<typeof GenerateAlbumArtOutputSchema>;


export async function generateAlbumArt(input: GenerateAlbumArtInput): Promise<GenerateAlbumArtOutput> {
  return generateAlbumArtFlow(input);
}


const generateAlbumArtFlow = ai.defineFlow(
  {
    name: 'generateAlbumArtFlow',
    inputSchema: GenerateAlbumArtInputSchema,
    outputSchema: GenerateAlbumArtOutputSchema,
  },
  async (input) => {
    // Step 1: Summarize the story into a concise visual prompt.
    const summarizationResponse = await ai.generate({
      prompt: `Summarize the following story into a short, evocative phrase (5-10 words) suitable for an AI image generator. Focus on the core visual elements and emotions. Do not include character names. Story: "${input.story}"`,
      model: 'googleai/gemini-1.5-flash-latest',
      output: { format: 'text' },
    });
    
    const visualPrompt = summarizationResponse.text;

    if (!visualPrompt) {
      throw new Error('Failed to summarize the story for album art.');
    }

    // Step 2: Generate the image using the summarized prompt.
    const imageGenerationPrompt = `Professional digital painting, album cover art. Cinematic, dramatic lighting. No text, no words. Theme: ${visualPrompt}`;
    
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: imageGenerationPrompt,
        config: {
            responseModalities: ['TEXT', 'IMAGE'],
        },
    });
    
    if (!media?.url) {
        throw new Error('Image generation with Gemini failed.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
