'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Layout } from '@/components/layout';
const projects = [
  {
    title: 'Baño esencial',
    cat: 'Baños',
    image: '/productos/Repisa dispensadora mural.png',
    meta: 'Acero · Medellín · 2026',
  },
  {
    title: 'Árbol de Luz',
    cat: 'Iluminación',
    image: '/productos/Panel decorativo “Árbol de Luz”.png',
    meta: 'Panel calado · Bogotá · 2026',
  },
  {
    title: 'Rincón Vinyl',
    cat: 'Mobiliario',
    image: '/productos/Mesa auxiliar - “Vinyl Stand”.png',
    meta: 'Acero y madera · Envigado · 2026',
  },
  {
    title: 'Orden exterior',
    cat: 'Exterior',
    image: '/productos/Organizador mural para herramientas de jardín.png',
    meta: 'Acero galvanizado · Rionegro · 2026',
  },
];
export default function ProjectsPage() {
  const [cat, setCat] = useState('Todos');
  const cats = ['Todos', ...Array.from(new Set(projects.map((p) => p.cat)))];
  return (
    <Layout>
      <section className="container px-4 py-16">
        <p className="text-xs uppercase tracking-[.3em] text-irons-warm-gold">
          Portafolio demostrativo
        </p>
        <h1 className="mt-4 text-5xl font-bold">Espacios con carácter</h1>
        <div className="my-10 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-4 py-2 text-sm ${cat === c ? 'bg-irons-charcoal text-white' : 'border'}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {projects
            .filter((p) => cat === 'Todos' || p.cat === cat)
            .map((p) => (
              <article key={p.title} className="overflow-hidden rounded-2xl border">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest text-gray-500">{p.cat}</p>
                  <h2 className="mt-2 text-2xl font-bold">{p.title}</h2>
                  <p className="mt-2 text-sm text-gray-500">{p.meta}</p>
                </div>
              </article>
            ))}
        </div>
      </section>
    </Layout>
  );
}
