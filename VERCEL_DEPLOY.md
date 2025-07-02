# Vercel Deployment Guide for DualMuse

Este archivo te ayudará a subir y desplegar tu proyecto en Vercel de forma óptima.

## 1. Requisitos previos
- Tener una cuenta en https://vercel.com
- Tener el código en un repositorio (GitHub, GitLab, Bitbucket)

## 2. Pasos para desplegar

1. **Sube tu código a un repositorio.**
2. **Entra a Vercel y haz click en "New Project".**
3. **Importa tu repositorio.**
4. **Configura las variables de entorno:**
   - Ve a "Settings" > "Environment Variables" y agrega:
     - `GOOGLE_API_KEY` (tu clave de Google AI)
     - Cualquier otra variable que uses en `.env.local`
5. **Build & Output:**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Framework: Next.js (Vercel lo detecta automáticamente)
6. **Haz deploy!**

## 3. Recomendaciones
- Si usas imágenes externas, revisa la sección `images` en `next.config.ts`.
- Si quieres endpoints ultra rápidos, usa Edge API Routes (`export const runtime = 'edge'`).
- Mantén tus dependencias actualizadas.
- Elimina cualquier referencia a Firebase si no la usas.

---

¿Dudas? Consulta la documentación oficial: https://vercel.com/docs y https://nextjs.org/docs/app/guides
