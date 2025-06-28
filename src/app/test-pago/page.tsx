"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SongCreationForm } from "@/components/SongCreationForm";
import { Loader2 } from 'lucide-react';

function TestPagoFormLoader() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4 text-center">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <h2 className="font-headline text-3xl font-bold">Cargando el estudio...</h2>
                <p className="text-muted-foreground">Afinando los instrumentos para tu creación.</p>
            </div>
        </div>
    )
}

function TestPagoContent() {
  const searchParams = useSearchParams();
  const songType = searchParams.get("type");
  const plan = searchParams.get("plan");

  return (
    <div className="container mx-auto py-12 px-4">
        <SongCreationForm songTypeParam={songType} planParam={plan} />
    </div>
  );
}

export default function TestPagoPage() {
  return (
    <Suspense fallback={<TestPagoFormLoader />}>
      <TestPagoContent />
    </Suspense>
  );
}

    