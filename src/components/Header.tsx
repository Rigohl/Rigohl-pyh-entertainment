
"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, Music } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetClose, SheetTrigger } from "./ui/sheet";
import { Separator } from "@/components/ui/separator";

export function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/proceso", label: "Cómo Funciona" },
    { href: "/ejemplos", label: "Ejemplos" },
    { href: "/quienes-somos", label: "Quiénes Somos" },
    { href: "/faq", label: "FAQ" },
    { href: "/ayuda", label: "Ayuda" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Music className="h-6 w-6 text-primary" />
          <span className="font-headline text-xl font-bold">DualMuse</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href ? "text-foreground font-semibold" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
           <Link href="/formularios" passHref>
            <Button className="font-bold bg-accent-gold text-accent-foreground hover:bg-accent-gold/90 transition-transform duration-300 hover:scale-105 shadow-md hidden sm:flex">
                Crear Canción
            </Button>
          </Link>
          <div className="md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Abrir menú</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[240px]">
                    <div className="flex flex-col gap-4 py-8">
                         <Link href="/" className="flex items-center gap-2 mb-4">
                            <Music className="h-6 w-6 text-primary" />
                            <span className="font-headline text-xl font-bold">DualMuse</span>
                        </Link>
                        {navLinks.map((link) => (
                            <SheetClose asChild key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "text-lg",
                                        pathname === link.href ? "text-foreground font-bold" : "text-foreground/60"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            </SheetClose>
                        ))}
                         <Separator className="my-2" />
                         <SheetClose asChild>
                           <Link href="/formularios" passHref>
                            <Button className="font-bold bg-accent-gold text-accent-foreground hover:bg-accent-gold/90 w-full">
                                Crear Canción
                            </Button>
                          </Link>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
