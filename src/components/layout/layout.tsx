import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';

export function Layout({ children }: { children: ReactNode }) {
  return <div className="flex min-h-screen flex-col bg-irons-warm-white text-irons-charcoal antialiased"><Header /><main id="main-content" className="flex-1 pt-16">{children}</main><Footer /></div>;
}
