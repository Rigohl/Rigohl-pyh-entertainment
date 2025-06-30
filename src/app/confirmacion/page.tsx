
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get('plan') || 'Plan Personalizado';
  const price = searchParams.get('price') || 'XX.XX';
  const songType = searchParams.get('type') === 'corrido' ? 'Corrido' : 'Canción Emocional';

  const priceNumber = parseFloat(price);
  const iva = (priceNumber * 0.16).toFixed(2);
  const subtotal = (priceNumber / 1.16).toFixed(2);
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center p-8 bg-secondary/30 rounded-t-lg">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <CardTitle className="font-headline text-4xl font-bold mt-4">Resumen del Pedido</CardTitle>
            <CardDescription className="text-lg mt-2">
              Estás a un paso de tener tu canción. Revisa los detalles y completa el pago.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-bold text-lg">Detalles de la Canción</h3>
              <div className="flex justify-between"><span className="text-muted-foreground">Tipo:</span><span className="font-medium">{songType}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Plan:</span><span className="font-medium">{plan}</span></div>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-bold text-lg">Resumen de Pago</h3>
               <div className="flex justify-between"><span className="text-muted-foreground">Subtotal:</span><span>${subtotal}</span></div>
               <div className="flex justify-between"><span className="text-muted-foreground">IVA (16%):</span><span>${iva}</span></div>
               <div className="flex justify-between font-bold text-xl pt-2 border-t mt-2"><span className="text-foreground">Total (MXN):</span><span>${price}</span></div>
            </div>
            
            <div className="space-y-2 pt-4">
              <Button size="lg" className="w-full text-lg font-bold bg-accent-gold text-accent-foreground hover:bg-accent-gold/90" disabled>
                Pagar con Stripe (Simulación)
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                La función de pago aún no está implementada en esta simulación.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t">
              <Button variant="outline" asChild>
                <Link href="/formularios">Crear otra canción</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link href="/">Volver al Inicio</Link>
              </Button>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ConfirmationLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader2 className="h-12 w-12 animate-spin" />
    </div>
  );
}

export default function ConfirmacionPage() {
  return (
    <Suspense fallback={<ConfirmationLoader />}>
      <ConfirmationContent />
    </Suspense>
  );
}
