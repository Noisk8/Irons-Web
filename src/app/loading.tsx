export default function Loading() {
  return (
    <div className="fixed inset-x-0 top-0 z-[100] h-1 overflow-hidden bg-irons-stone-gray" role="status" aria-label="Cargando página">
      <span className="loading-glint block h-full w-1/3 bg-gradient-to-r from-transparent via-irons-warm-gold to-transparent" />
    </div>
  );
}
