
"use server";

import { generateSongLyricsAndAudio } from "@/ai/flows/generate-song-lyrics-and-audio";
import { generateAlbumArt } from "@/ai/flows/generate-album-art";
import { incorporateUserRequestsIntoSong } from "@/ai/flows/incorporate-user-requests-into-song";
import { songCreationSchema, SongCreationFormValues } from "@/config/schemas";

import { z } from "zod";

/**
 * Creates a detailed error message string from an error object.
 * This is used to pass more context to the client for debugging.
 * @param error The error object caught.
 * @param context A string describing where the error occurred (e.g., "Song Creation").
 * @returns A detailed error string.
 */
function getDetailedError(error: any, context: string): string {
    console.error(`[${context.toUpperCase()}_ERROR]`, error);

    // Check for specific Genkit/Google AI related messages
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            return `Error de API: La clave de API de Google no es válida o no está configurada. Asegúrate de que la variable GOOGLE_API_KEY esté correctamente establecida en tu entorno.`;
        }
        if (error.message.includes('permission denied') || error.message.includes('IAM')) {
            return `Error de Permisos: La clave de API no tiene los permisos necesarios. Asegúrate de que la API "Vertex AI" esté habilitada en tu proyecto de Google Cloud.`;
        }
        if (error.message.includes('billing account')) {
            return `Error de Facturación: La cuenta de facturación no está configurada o no está activa en tu proyecto de Google Cloud.`;
        }
        const cause = (error as any).cause ? JSON.stringify((error as any).cause) : 'N/A';
        return `${context} Error: ${error.message}. Causa: ${cause}`;
    }

    return `Se produjo un error inesperado en ${context}: ${JSON.stringify(error)}`;
}


export async function createSongAction(data: SongCreationFormValues) {
  try {
    const validatedData = songCreationSchema.parse(data);
    const result = await generateSongLyricsAndAudio(validatedData);

    if (!result || !result.lyrics || !result.audio) {
      throw new Error("La generación de IA no pudo producir letra o audio.");
    }
    
    return {
      success: true,
      lyrics: result.lyrics,
      audio: result.audio,
      error: null,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, lyrics: null, audio: null, error: "Datos de entrada inválidos.", details: error.issues };
    }
    return { success: false, lyrics: null, audio: null, error: getDetailedError(error, "Creación de Canción") };
  }
}

const albumArtSchema = z.object({
  story: z.string().min(1, "The story for the album art is required."),
});

export async function createAlbumArtAction(data: z.infer<typeof albumArtSchema>) {
    try {
        const validatedData = albumArtSchema.parse(data);
        const result = await generateAlbumArt(validatedData);
        
        if (!result.imageUrl) {
            throw new Error("La IA no pudo generar la carátula del álbum.");
        }
        
        return { success: true, imageUrl: result.imageUrl, error: null };
    } catch (error) {
        if (error instanceof z.ZodError) {
          return { success: false, imageUrl: null, error: "Datos inválidos para la carátula.", details: error.issues };
        }
        return { success: false, imageUrl: null, error: getDetailedError(error, "Creación de Carátula") };
    }
}


const revisionSchema = z.object({
    lyricsDraft: z.string(),
    requests: z.string(),
    songDetails: songCreationSchema,
});


export async function reviseSongAction(data: z.infer<typeof revisionSchema>) {
    try {
        const validatedData = revisionSchema.parse(data);
        const result = await incorporateUserRequestsIntoSong(validatedData);

        if (!result.revisedLyrics || !result.revisedAudio) {
            throw new Error("La IA no pudo revisar la canción.");
        }
        
        return {
            success: true,
            lyrics: result.revisedLyrics,
            audio: result.revisedAudio,
            error: null,
        };

    } catch (error) {
         if (error instanceof z.ZodError) {
          return { success: false, lyrics: null, audio: null, error: "Datos inválidos para la revisión.", details: error.issues };
        }
        return { success: false, lyrics: null, audio: null, error: getDetailedError(error, "Revisión de Canción") };
    }
}
