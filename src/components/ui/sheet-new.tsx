'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type SheetContextValue = { open: boolean; setOpen: (open: boolean) => void };
const SheetContext = React.createContext<SheetContextValue>({ open: false, setOpen: () => undefined });

export function Sheet({ open = false, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }) {
  return <SheetContext.Provider value={{ open, setOpen: onOpenChange || (() => undefined) }}>{children}</SheetContext.Provider>;
}
export function SheetTrigger({ children }: { children: React.ReactElement; asChild?: boolean }) {
  const { setOpen } = React.useContext(SheetContext);
  return React.cloneElement(children, { onClick: () => setOpen(true) } as React.HTMLAttributes<HTMLElement>);
}
export function SheetClose({ children }: { children: React.ReactElement; asChild?: boolean }) {
  const { setOpen } = React.useContext(SheetContext);
  return React.cloneElement(children, { onClick: () => setOpen(false) } as React.HTMLAttributes<HTMLElement>);
}
export function SheetContent({ side = 'right', className, children }: React.HTMLAttributes<HTMLDivElement> & { side?: 'left' | 'right' }) {
  const { open, setOpen } = React.useContext(SheetContext);
  if (!open) return null;
  return <div className="fixed inset-0 z-50"><button className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} aria-label="Cerrar menú" /><div className={cn('absolute top-0 h-full w-80 max-w-[88vw] bg-irons-warm-white shadow-2xl', side === 'left' ? 'left-0' : 'right-0', className)}>{children}</div></div>;
}
export const SheetOverlay = () => null;
export const SheetHeader = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />;
export const SheetFooter = (props: React.HTMLAttributes<HTMLDivElement>) => <div {...props} />;
export const SheetTitle = (props: React.HTMLAttributes<HTMLHeadingElement>) => <h2 {...props} />;
export const SheetDescription = (props: React.HTMLAttributes<HTMLParagraphElement>) => <p {...props} />;
