import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Frown } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto flex h-[calc(100vh-10rem)] items-center justify-center text-center px-4">
      <div>
        <Frown className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="mt-8 font-headline text-6xl font-bold">404</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ups. La página que buscas se perdió en la mezcla.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Volver al Inicio</Link>
        </Button>
      </div>
    </div>
  );
}
