
import Link from "next/link";
import { Music } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-4 text-center md:text-left">
        <div>
          <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <Music className="h-6 w-6 text-primary" />
            <span className="font-headline text-xl font-bold">DualMuse</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Tu historia hecha canción. © {new Date().getFullYear()} DualMuse. Todos los derechos reservados.
          </p>
        </div>
        <div>
          <h3 className="font-headline text-lg font-semibold mb-3">Explora</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/proceso" className="text-muted-foreground hover:text-foreground">Cómo Funciona</Link></li>
            <li><Link href="/ejemplos" className="text-muted-foreground hover:text-foreground">Ejemplos</Link></li>
            <li><Link href="/formularios" className="text-muted-foreground hover:text-foreground">Crear Canción</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-headline text-lg font-semibold mb-3">Nosotros</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/quienes-somos" className="text-muted-foreground hover:text-foreground">Quiénes Somos</Link></li>
            <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">Preguntas Frecuentes</Link></li>
            <li><Link href="/ayuda" className="text-muted-foreground hover:text-foreground">Ayuda</Link></li>
            <li><Link href="/contacto" className="text-muted-foreground hover:text-foreground">Contacto</Link></li>
            <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Términos de Servicio</Link></li>
            <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Política de Privacidad</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
