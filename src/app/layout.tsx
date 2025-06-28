import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'DualMuse - Canciones Personalizadas',
  description: 'Creamos canciones emocionales y corridos bélicos únicos para ti, con el poder de la inteligencia artificial.',
  openGraph: {
    title: 'DualMuse - Canciones Personalizadas',
    description: 'Creamos canciones emocionales y corridos bélicos únicos para ti, con el poder de la inteligencia artificial.',
    url: 'https://dualmuse-demo.web.app', // Replace with actual domain
    siteName: 'DualMuse',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Replace with a real OG image
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@400;500;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased flex flex-col min-h-screen")}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
