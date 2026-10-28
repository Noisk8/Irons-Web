import Link from 'next/link';
import { ArrowLeft, ArrowRight, Compass, Search, Sparkles } from 'lucide-react';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Layout>
      <section className="relative isolate overflow-hidden bg-irons-charcoal px-4 py-16 text-irons-warm-white sm:py-24 lg:py-32">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(201,168,108,0.22),transparent_28%),radial-gradient(circle_at_86%_78%,rgba(255,255,255,0.1),transparent_26%),linear-gradient(135deg,#1a1a1a_0%,#2d2d2d_48%,#1a1a1a_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-5 top-1/2 -z-10 -translate-y-1/2 select-none font-display text-[12rem] font-bold leading-none tracking-tighter text-white/[0.045] sm:text-[18rem] lg:text-[28rem]"
        >
          404
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-irons-warm-gold to-transparent" />

        <div className="container relative mx-auto max-w-5xl">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-20">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-irons-warm-gold/40 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-irons-warm-gold">
                <Compass className="h-4 w-4" aria-hidden="true" />
                Error 404
              </div>
              <p className="mt-8 font-display text-7xl font-bold leading-none text-irons-warm-gold sm:text-8xl">404</p>
              <h1 className="mt-5 max-w-2xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Esta pieza no está en el taller.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-stone-300 sm:text-lg">
                La página que buscas pudo haber cambiado de lugar, estar en fabricación o no existir.
                Te ayudamos a volver a encontrar algo con carácter.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button variant="irons-gold" size="xl" asChild className="w-full sm:w-auto">
                  <Link href="/">
                    <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
                    Volver al inicio
                  </Link>
                </Button>
                <Button
                  variant="irons-outline"
                  size="xl"
                  asChild
                  className="w-full border-irons-stone-gray bg-transparent text-irons-warm-white hover:border-irons-warm-gold hover:bg-irons-warm-gold hover:text-irons-charcoal sm:w-auto"
                >
                  <Link href="/tienda">
                    Ver catálogo
                    <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
            </div>

            <aside className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm sm:p-8">
              <Sparkles className="h-8 w-8 text-irons-warm-gold" aria-hidden="true" />
              <h2 className="mt-5 font-display text-2xl font-bold">¿Buscabas una pieza?</h2>
              <p className="mt-3 text-sm leading-6 text-stone-300">
                Explora el catálogo o cuéntanos qué necesitas y la diseñamos contigo.
              </p>
              <div className="mt-6 space-y-3">
                <Link
                  href="/buscar"
                  className="flex min-h-11 items-center justify-between rounded-lg border border-white/15 px-4 text-sm font-medium transition-colors hover:border-irons-warm-gold hover:bg-white/10"
                >
                  Buscar productos
                  <Search className="h-4 w-4 text-irons-warm-gold" aria-hidden="true" />
                </Link>
                <Link
                  href="/disena-tu-pieza"
                  className="flex min-h-11 items-center justify-between rounded-lg border border-white/15 px-4 text-sm font-medium transition-colors hover:border-irons-warm-gold hover:bg-white/10"
                >
                  Diseñar una pieza
                  <ArrowRight className="h-4 w-4 text-irons-warm-gold" aria-hidden="true" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
}
