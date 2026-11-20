'use client';
import { useEffect, useState, type FormEvent } from 'react';
import Image from 'next/image';
import { slugify } from '@/lib/utils';
type Category = { id: string; name: string };
type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string | null;
  price: string;
  compareAtPrice: string | null;
  categoryId: string;
  material: string | null;
  finish: string | null;
  color: string | null;
  dimensions: string | null;
  usage: string | null;
  productionTime: string | null;
  stock: number;
  isCustomizable: boolean;
  requiresQuote: boolean;
  featured: boolean;
  status: string;
  category: Category;
  images: { url: string; isPrimary: boolean }[];
};
const empty = {
  name: '',
  slug: '',
  description: '',
  shortDescription: '',
  price: '0',
  compareAtPrice: '',
  categoryId: '',
  material: '',
  finish: '',
  color: '',
  dimensions: '',
  usage: 'Interior',
  productionTime: '',
  stock: '0',
  isCustomizable: true,
  requiresQuote: false,
  featured: false,
  status: 'DRAFT',
  imageUrl: '',
  imageUrls: [] as string[],
};
const copFormatter = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });
const parseCop = (value: string) => Number(value.replace(/\D/g, '') || '0');
const formatCopInput = (value: string) => {
  const digits = value.replace(/\D/g, '');
  return digits ? copFormatter.format(Number(digits)) : '';
};
const validationHelp: Record<string, string> = {
  name: 'Nombre: escribe entre 2 y 100 caracteres.',
  slug: 'Slug: usa solo minúsculas, números y guiones; por ejemplo: repisa-metalica-negra.',
  description: 'Descripción: escribe al menos 10 caracteres.',
  shortDescription: 'Descripción corta: máximo 500 caracteres.',
  price: 'Precio: ingresa un valor en pesos colombianos igual o mayor que 0.',
  compareAtPrice: 'Precio anterior: ingresa un valor en pesos colombianos igual o mayor que 0, o déjalo vacío.',
  categoryId: 'Categoría: selecciona una categoría antes de guardar.',
  stock: 'Inventario: ingresa un número entero igual o mayor que 0.',
  material: 'Material: máximo 100 caracteres.',
  finish: 'Acabado: máximo 100 caracteres.',
  color: 'Color: máximo 100 caracteres.',
  dimensions: 'Dimensiones: máximo 200 caracteres.',
  usage: 'Uso: máximo 100 caracteres.',
  productionTime: 'Tiempo de fabricación: máximo 100 caracteres.',
  status: 'Estado: selecciona una opción válida.',
  imageUrl: 'Imagen: la dirección de la imagen no es válida.',
  imageUrls: 'Fotos de detalle: cada imagen debe haberse subido correctamente.',
};
export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [publishing, setPublishing] = useState<string | null>(null);
  const [publishMessage, setPublishMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<'list' | 'grid'>('list');
  async function load() {
    const [p, c] = await Promise.all([
      fetch('/api/admin/products'),
      fetch('/api/admin/categories'),
    ]);
    if (p.ok) setProducts(await p.json());
    if (c.ok) setCategories(await c.json());
  }
  useEffect(() => {
    // La carga inicial sincroniza este cliente con el API administrativo.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);
  function openNew() {
    setEditing(null);
    setForm({ ...empty, categoryId: categories[0]?.id || '' });
    setMessage('');
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function closeForm() {
    setEditing(null);
    setForm({ ...empty, categoryId: categories[0]?.id || '' });
    setShowForm(false);
  }
  function edit(p: Product) {
    setEditing(p.id);
    setShowForm(true);
    setMessage('');
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      shortDescription: p.shortDescription || '',
      price: formatCopInput(String(p.price)),
      compareAtPrice: p.compareAtPrice ? formatCopInput(String(p.compareAtPrice)) : '',
      categoryId: p.categoryId,
      material: p.material || '',
      finish: p.finish || '',
      color: p.color || '',
      dimensions: p.dimensions || '',
      usage: p.usage || '',
      productionTime: p.productionTime || '',
      stock: String(p.stock),
      isCustomizable: p.isCustomizable,
      requiresQuote: p.requiresQuote,
      featured: p.featured,
      status: p.status,
      imageUrl: p.images.find((i) => i.isPrimary)?.url || p.images[0]?.url || '',
      imageUrls: p.images.filter((i) => !i.isPrimary).map((i) => i.url),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  async function upload(file: File, kind: 'primary' | 'detail') {
    setBusy(true);
    const body = new FormData();
    body.append('file', file);
    const res = await fetch('/api/admin/upload', { method: 'POST', body });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setMessage(data.error);
      return;
    }
    setForm((v) => kind === 'primary'
      ? { ...v, imageUrl: data.url }
      : { ...v, imageUrls: [...v.imageUrls, data.url] });
  }
  async function uploadDetails(files: FileList | null) {
    if (!files) return;
    for (const file of Array.from(files)) await upload(file, 'detail');
  }
  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    const payload = {
      ...form,
      price: parseCop(form.price),
      compareAtPrice: form.compareAtPrice ? parseCop(form.compareAtPrice) : null,
      stock: Number(form.stock),
    };
    const res = await fetch(editing ? `/api/admin/products/${editing}` : '/api/admin/products', {
      method: editing ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      const fields = Object.keys(data.details?.fieldErrors || {})
        .map((field) => validationHelp[field] || `${field}: revisa este valor.`)
        .join(' · ');
      setMessage(fields || data.error || 'Ocurrió un error.');
      return;
    }
    setForm({ ...empty, categoryId: categories[0]?.id || '' });
    setEditing(null);
    setShowForm(false);
    setMessage(editing ? 'Producto actualizado.' : 'Producto creado.');
    await load();
  }
  async function publish(product: Product) {
    setPublishing(product.id);
    setPublishMessage('');
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, { method: 'PATCH' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No fue posible publicar el producto.');
      setPublishMessage(`${product.name}: publicado${data.status === 'REQUIRES_QUOTE' ? ' para cotización' : data.status === 'OUT_OF_STOCK' ? ' como agotado' : ''}.`);
      await load();
    } catch (error) {
      setPublishMessage(error instanceof Error ? error.message : 'No fue posible publicar el producto.');
    } finally {
      setPublishing(null);
    }
  }
  async function remove(id: string) {
    if (!confirm('¿Eliminar este producto definitivamente?')) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    const data = await res.json();
    setMessage(res.ok ? 'Producto eliminado.' : data.error);
    if (res.ok) await load();
  }
  const actions = (p: Product) => (
    <>
      {p.status === 'DRAFT' && <button type="button" disabled={publishing !== null} onClick={() => void publish(p)} className="font-medium text-green-700 disabled:opacity-50" aria-label={`Publicar ${p.name}`}>
        {publishing === p.id ? 'Publicando…' : 'Publicar'}
      </button>}
      <button onClick={() => edit(p)} className="text-amber-700">
        Editar
      </button>
      <button onClick={() => void remove(p.id)} className="text-red-700">
        Eliminar
      </button>
    </>
  );
  const field = (key: keyof typeof form, label: string, type = 'text') => (
    <label className="block text-sm font-medium">
      {label}
      <input
        type={type}
        value={String(form[key])}
        onChange={(e) => setForm((v) => ({ ...v, [key]: e.target.value }))}
        className="mt-1 w-full rounded-lg border bg-white px-3 py-2"
      />
    </label>
  );
  const currencyField = (key: 'price' | 'compareAtPrice', label: string, required = false) => (
    <label className="block text-sm font-medium">
      {label}
      <div className="relative mt-1">
        <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-stone-500">$</span>
        <input
          required={required}
          type="text"
          inputMode="numeric"
          value={form[key]}
          onChange={(e) => setForm((v) => ({ ...v, [key]: formatCopInput(e.target.value) }))}
          className="w-full rounded-lg border bg-white py-2 pl-7 pr-12"
          placeholder="0"
        />
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-stone-500">COP</span>
      </div>
      <span className="mt-1 block text-xs font-normal text-stone-500">Se formatea automáticamente en pesos colombianos.</span>
    </label>
  );
  return (
    <div className="space-y-8">
      {showForm && (
      <form onSubmit={save} className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">
            {editing ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          <button
            type="button"
            onClick={closeForm}
            className="text-sm underline"
          >
            Cancelar
          </button>
        </div>
        {message && (
          <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{message}</p>
        )}
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <label className="block text-sm font-medium">
            Nombre
            <input
              required
              value={form.name}
              onChange={(e) => setForm((v) => ({
                ...v,
                name: e.target.value,
                slug: !editing && (!v.slug || v.slug === slugify(v.name)) ? slugify(e.target.value) : v.slug,
              }))}
              className="mt-1 w-full rounded-lg border bg-white px-3 py-2"
            />
          </label>
          <label className="block text-sm font-medium">
            Slug
            <input
              required
              value={form.slug}
              onChange={(e) => setForm((v) => ({ ...v, slug: slugify(e.target.value) }))}
              className="mt-1 w-full rounded-lg border bg-white px-3 py-2"
            />
            <span className="mt-1 block text-xs font-normal text-stone-500">Se genera desde el nombre; solo minúsculas, números y guiones.</span>
          </label>
          <label className="block text-sm font-medium">
            Categoría
            <select
              required
              value={form.categoryId}
              onChange={(e) => setForm((v) => ({ ...v, categoryId: e.target.value }))}
              className="mt-1 w-full rounded-lg border bg-white px-3 py-2"
            >
              <option value="">Selecciona</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          {currencyField('price', 'Precio', true)}
          {currencyField('compareAtPrice', 'Precio anterior')}
          {field('stock', 'Inventario', 'number')}
          {field('material', 'Material')}
          {field('finish', 'Acabado')}
          {field('color', 'Color')}
          {field('dimensions', 'Dimensiones')}
          {field('usage', 'Uso')}
          {field('productionTime', 'Tiempo de fabricación')}
          <label className="block text-sm font-medium">
            Estado
            <select
              value={form.status}
              onChange={(e) => setForm((v) => ({ ...v, status: e.target.value }))}
              className="mt-1 w-full rounded-lg border px-3 py-2"
            >
              <option value="DRAFT">Borrador</option>
              <option value="ACTIVE">Activo</option>
              <option value="MADE_TO_ORDER">Bajo pedido</option>
              <option value="REQUIRES_QUOTE">Requiere cotización</option>
              <option value="OUT_OF_STOCK">Agotado</option>
              <option value="ARCHIVED">Archivado</option>
            </select>
          </label>
          <div className="block text-sm font-medium">
            <span>Foto principal</span>
            <input id="primary-image" type="file" accept="image/png,image/jpeg,image/webp,image/avif" onChange={(e) => e.target.files?.[0] && void upload(e.target.files[0], 'primary')} className="sr-only" />
            <label htmlFor="primary-image" className="mt-2 inline-flex cursor-pointer rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-800 shadow-sm hover:bg-stone-50">Examinar archivo</label>
            <span className="mt-1 block text-xs font-normal text-stone-500">Esta será la imagen de portada.</span>
            {form.imageUrl && <span className="mt-1 block truncate text-xs font-normal text-green-700">Foto principal lista ✓</span>}
          </div>
          <div className="block text-sm font-medium">
            <span>Fotos de detalle</span>
            <input id="detail-images" type="file" multiple accept="image/png,image/jpeg,image/webp,image/avif" onChange={(e) => void uploadDetails(e.target.files)} className="sr-only" />
            <label htmlFor="detail-images" className="mt-2 inline-flex cursor-pointer rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-800 shadow-sm hover:bg-stone-50">Examinar archivos</label>
            <span className="mt-1 block text-xs font-normal text-stone-500">Puedes seleccionar hasta 10 fotos de la pieza.</span>
            {form.imageUrls.length > 0 && <div className="mt-2 flex flex-wrap gap-2">{form.imageUrls.map((url, index) => <button key={url} type="button" onClick={() => setForm((v) => ({ ...v, imageUrls: v.imageUrls.filter((_, itemIndex) => itemIndex !== index) }))} className="rounded bg-stone-100 px-2 py-1 text-xs font-normal text-stone-700 hover:bg-red-50 hover:text-red-700">Detalle {index + 1} ×</button>)}</div>}
          </div>
        </div>
        <label className="mt-4 block text-sm font-medium">
          Descripción corta
          <input
            value={form.shortDescription}
            onChange={(e) => setForm((v) => ({ ...v, shortDescription: e.target.value }))}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Descripción
          <textarea
            required
            minLength={10}
            rows={4}
            value={form.description}
            onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-5 text-sm">
          {(['isCustomizable', 'requiresQuote', 'featured'] as const).map((k, i) => (
            <label key={k} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form[k]}
                onChange={(e) => setForm((v) => ({ ...v, [k]: e.target.checked }))}
              />
              {['Personalizable', 'Requiere cotización', 'Destacado'][i]}
            </label>
          ))}
        </div>
        <button
          disabled={busy}
          className="mt-6 min-h-12 rounded-lg bg-stone-900 px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {busy ? 'Guardando…' : editing ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </form>
      )}
      {message && !showForm && (
        <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{message}</p>
      )}
      <section className="overflow-hidden rounded-2xl border bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
          <div>
            <h2 className="text-xl font-semibold">Catálogo ({products.length})</h2>
            {publishMessage && <p role="status" className="mt-2 text-sm text-stone-700">{publishMessage}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex rounded-lg border bg-white p-1 text-sm">
              {(['list', 'grid'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setView(mode)}
                  aria-pressed={view === mode}
                  className={`rounded-md px-3 py-1.5 font-medium ${view === mode ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-100'}`}
                >
                  {mode === 'list' ? 'Lista' : 'Cuadrícula'}
                </button>
              ))}
            </div>
            {!showForm && (
              <button
                type="button"
                onClick={openNew}
                className="min-h-10 rounded-lg bg-stone-900 px-4 py-2 font-semibold text-white"
              >
                Nuevo producto
              </button>
            )}
          </div>
        </div>
        {view === 'list' ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-stone-50 text-stone-500">
              <tr>
                <th className="p-4">Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-4 font-medium">
                    {p.name}
                    <span className="block text-xs font-normal text-stone-400">/{p.slug}</span>
                  </td>
                  <td>{p.category.name}</td>
                  <td>${Number(p.price).toLocaleString('es-CO')}</td>
                  <td>{p.stock}</td>
                  <td>{p.status}</td>
                  <td className="space-x-3 text-right">{actions(p)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        ) : (
        <div className="grid gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p) => {
            const image = p.images.find((i) => i.isPrimary)?.url || p.images[0]?.url;
            return (
              <article key={p.id} className="flex flex-col overflow-hidden rounded-xl border">
                <div className="relative aspect-square bg-stone-100">
                  {image ? (
                    <Image src={image} alt={p.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-stone-400">Sin foto</div>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-1 p-4 text-sm">
                  <h3 className="font-medium">{p.name}</h3>
                  <span className="text-xs text-stone-400">/{p.slug} · {p.category.name}</span>
                  <span>${Number(p.price).toLocaleString('es-CO')} · Stock {p.stock}</span>
                  <span className="text-xs text-stone-500">{p.status}</span>
                  <div className="mt-auto flex flex-wrap gap-3 pt-3">{actions(p)}</div>
                </div>
              </article>
            );
          })}
        </div>
        )}
      </section>
    </div>
  );
}
