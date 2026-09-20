'use client';
import { useEffect, useState, type FormEvent } from 'react';
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
};
export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [form, setForm] = useState({ ...empty });
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
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
  function edit(p: Product) {
    setEditing(p.id);
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      shortDescription: p.shortDescription || '',
      price: String(p.price),
      compareAtPrice: p.compareAtPrice ? String(p.compareAtPrice) : '',
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
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  async function upload(file: File) {
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
    setForm((v) => ({ ...v, imageUrl: data.url }));
  }
  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    const payload = {
      ...form,
      price: Number(form.price),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
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
      setMessage(data.error || 'Ocurrió un error.');
      return;
    }
    setForm({ ...empty, categoryId: categories[0]?.id || '' });
    setEditing(null);
    setMessage(editing ? 'Producto actualizado.' : 'Producto creado.');
    await load();
  }
  async function remove(id: string) {
    if (!confirm('¿Eliminar este producto definitivamente?')) return;
    const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    const data = await res.json();
    setMessage(res.ok ? 'Producto eliminado.' : data.error);
    if (res.ok) await load();
  }
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
  return (
    <div className="space-y-8">
      <form onSubmit={save} className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {editing ? 'Editar producto' : 'Nuevo producto'}
          </h2>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm({ ...empty, categoryId: categories[0]?.id || '' });
              }}
              className="text-sm underline"
            >
              Cancelar
            </button>
          )}
        </div>
        {message && (
          <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{message}</p>
        )}
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {field('name', 'Nombre')}
          {field('slug', 'Slug')}
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
          {field('price', 'Precio', 'number')}
          {field('compareAtPrice', 'Precio anterior', 'number')}
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
          <label className="block text-sm font-medium">
            Imagen
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/avif"
              onChange={(e) => e.target.files?.[0] && void upload(e.target.files[0])}
              className="mt-1 block w-full text-sm"
            />
            {form.imageUrl && (
              <span className="mt-1 block truncate text-xs text-green-700">
                Imagen lista: {form.imageUrl}
              </span>
            )}
          </label>
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
          className="mt-6 rounded-lg bg-stone-900 px-6 py-3 font-semibold text-white disabled:opacity-50"
        >
          {busy ? 'Guardando…' : editing ? 'Guardar cambios' : 'Crear producto'}
        </button>
      </form>
      <section className="overflow-hidden rounded-2xl border bg-white">
        <div className="border-b p-5">
          <h2 className="text-xl font-semibold">Catálogo ({products.length})</h2>
        </div>
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
                  <td className="space-x-3 text-right">
                    <button onClick={() => edit(p)} className="text-amber-700">
                      Editar
                    </button>
                    <button onClick={() => void remove(p.id)} className="text-red-700">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
