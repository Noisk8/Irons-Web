'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { DemoProduct } from '@/data/products';
import { ProductCard } from './ProductCard';

export function ShopCatalog({
  initialCategory = '',
  products,
}: {
  initialCategory?: string;
  products: DemoProduct[];
}) {
  const categories = Array.from(
    new Map(products.map((product) => [product.categorySlug, product.category])).entries()
  );
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('featured');
  const visible = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (!category || p.categorySlug === category) &&
            `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase())
        )
        .sort((a, b) =>
          sort === 'price-asc'
            ? a.price - b.price
            : sort === 'price-desc'
              ? b.price - a.price
              : Number(Boolean(b.featured)) - Number(Boolean(a.featured))
        ),
    [products, query, category, sort]
  );
  return (
    <>
      <div className="mb-8 grid gap-3 rounded-2xl border bg-white p-4 md:grid-cols-[1fr_220px_220px]">
        <label className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos"
            className="h-10 w-full rounded-md border pl-10 pr-3"
          />
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-10 rounded-md border px-3"
        >
          <option value="">Todas las categorías</option>
          {categories.map(([slug, name]) => (
            <option key={slug} value={slug}>
              {name}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="h-10 rounded-md border px-3"
        >
          <option value="featured">Destacados</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
      </div>
      <p className="mb-5 text-sm text-irons-metal-medium">{visible.length} productos</p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {!visible.length && (
        <p className="py-20 text-center">No encontramos productos con esos filtros.</p>
      )}
    </>
  );
}
