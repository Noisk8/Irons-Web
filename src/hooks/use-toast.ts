export interface ToastOptions {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success';
  duration?: number;
}

export function useToast() {
  const toast = ({ title, description }: ToastOptions) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('irons-toast', { detail: { title, description } }));
    }
  };
  return { toast, dismiss: () => undefined, toasts: [] };
}
