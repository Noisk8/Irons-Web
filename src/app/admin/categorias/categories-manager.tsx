'use client';
import { useEffect, useState, type FormEvent } from 'react';
type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  isActive: boolean;
  _count: { products: number };
};
const empty = { name: '', slug: '', description: '', parentId: '', isActive: true };
const slugify = (v: string) =>
  v
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
export function CategoriesManager() {
  const [items, setItems] = useState<Category[]>([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  async function load() {
    const res = await fetch('/api/admin/categories');
    if (res.ok) setItems(await res.json());
  }
  useEffect(() => {
    // La carga inicial sincroniza este cliente con el API administrativo.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, []);
  async function save(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(
      editing ? `/api/admin/categories/${editing}` : '/api/admin/categories',
      {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, parentId: form.parentId || null }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error);
      return;
    }
    setMessage(editing ? 'Categoría actualizada.' : 'Categoría creada.');
    setEditing(null);
    setForm(empty);
    await load();
  }
  function edit(c: Category) {
    setEditing(c.id);
    setForm({
      name: c.name,
      slug: c.slug,
      description: c.description || '',
      parentId: c.parentId || '',
      isActive: c.isActive,
    });
  }
  async function remove(id: string) {
    if (!confirm('¿Eliminar esta categoría?')) return;
    const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    const data = await res.json();
    setMessage(res.ok ? 'Categoría eliminada.' : data.error);
    if (res.ok) await load();
  }
  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <form onSubmit={save} className="h-fit rounded-2xl border bg-white p-5">
        <h2 className="text-xl font-semibold">
          {editing ? 'Editar categoría' : 'Nueva categoría'}
        </h2>
        {message && <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm">{message}</p>}
        <label className="mt-5 block text-sm font-medium">
          Nombre
          <input
            required
            value={form.name}
            onChange={(e) =>
              setForm((v) => ({
                ...v,
                name: e.target.value,
                slug: editing ? v.slug : slugify(e.target.value),
              }))
            }
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Slug
          <input
            required
            value={form.slug}
            onChange={(e) => setForm((v) => ({ ...v, slug: e.target.value }))}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <label className="mt-4 block text-sm font-medium">
          Subcategoría de
          <select
            value={form.parentId}
            onChange={(e) => setForm((v) => ({ ...v, parentId: e.target.value }))}
            className="mt-1 w-full rounded-lg border bg-white px-3 py-2"
          >
            <option value="">Categoría principal</option>
            {items
              .filter((c) => c.id !== editing)
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </select>
        </label>
        <label className="mt-4 block text-sm font-medium">
          Descripción
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm((v) => ({ ...v, description: e.target.value }))}
            className="mt-1 w-full rounded-lg border px-3 py-2"
          />
        </label>
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm((v) => ({ ...v, isActive: e.target.checked }))}
          />
          Visible en la tienda
        </label>
        <div className="mt-5 flex gap-3">
          <button className="rounded-lg bg-stone-900 px-5 py-2.5 font-semibold text-white">
            Guardar
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setForm(empty);
              }}
              className="rounded-lg border px-4"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
      <section className="overflow-hidden rounded-2xl border bg-white">
        <div className="border-b p-5">
          <h2 className="text-xl font-semibold">Categorías ({items.length})</h2>
        </div>
        {items.map((c) => (
          <div
            key={c.id}
            className="flex items-center justify-between gap-4 border-b p-4 last:border-0"
          >
            <div>
              <p className="font-medium">
                {c.name} {!c.isActive && <span className="text-xs text-stone-400">(oculta)</span>}
              </p>
              <p className="text-xs text-stone-500">
                /{c.slug} · {c._count.products} productos
              </p>
            </div>
            <div className="space-x-3 text-sm">
              <button onClick={() => edit(c)} className="text-amber-700">
                Editar
              </button>
              <button onClick={() => void remove(c.id)} className="text-red-700">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
