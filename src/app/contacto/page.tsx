
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function ContactoPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="text-center mb-12">
        <Mail className="mx-auto h-16 w-16 text-accent-gold" />
        <h1 className="font-headline text-5xl font-bold mt-4">Contacto</h1>
        <p className="text-lg text-muted-foreground mt-2">
          ¿Tienes preguntas o necesitas ayuda? Estamos aquí para escucharte.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <Facebook className="mx-auto h-12 w-12 text-blue-500 mb-4" />
            <CardTitle className="font-headline text-2xl">Síguenos en Facebook</CardTitle>
            <CardDescription>
              Mantente al día con nuestras últimas creaciones, noticias y promociones especiales.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                Ir a Facebook
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <Mail className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="font-headline text-2xl">Soporte por Correo</CardTitle>
            <CardDescription>
              Para preguntas sobre tu pedido, colaboraciones o soporte técnico, envíanos un email.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="mailto:soporte@dualmuse.com">
                Enviar un Correo
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
