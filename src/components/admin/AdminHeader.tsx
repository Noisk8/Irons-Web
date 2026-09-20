import Link from 'next/link';
export function AdminHeader({ title }: { title: string }) {
  return (
    <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div>
        <Link href="/admin" className="text-xs uppercase tracking-[.25em] text-amber-700">
          ← Panel Irons
        </Link>
        <h1 className="mt-2 text-3xl font-bold">{title}</h1>
      </div>
      <form action="/api/admin/logout" method="post">
        <button className="rounded-lg border bg-white px-4 py-2 text-sm">Cerrar sesión</button>
      </form>
    </header>
  );
}
