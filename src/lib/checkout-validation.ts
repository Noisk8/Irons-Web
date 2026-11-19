import { z } from 'zod';
import { isColombianLocation } from '@/lib/colombia-locations';

export const checkoutDetailsSchema = z.object({
  email: z.string().trim().min(1, 'Ingresa tu correo electrónico.').email('Ingresa un correo electrónico válido.').max(254, 'El correo es demasiado largo.'),
  phone: z.string().trim().regex(/^3\d{9}$/, 'Ingresa un celular colombiano de 10 dígitos que empiece por 3.'),
  shippingAddress: z.object({
    name: z.string().trim().min(1, 'Ingresa tu nombre completo.').max(200, 'El nombre es demasiado largo.'),
    address: z.string().trim().min(1, 'Ingresa la dirección de entrega.').max(300, 'La dirección es demasiado larga.'),
    department: z.string().trim().min(1, 'Selecciona un departamento.').max(100),
    city: z.string().trim().min(1, 'Selecciona un municipio o ciudad.').max(100),
    notes: z.string().trim().max(1000, 'Las indicaciones no pueden superar 1000 caracteres.').optional(),
  }).superRefine((address, context) => {
    if (address.department && address.city && !isColombianLocation(address.department, address.city)) {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['city'], message: 'El municipio no corresponde al departamento seleccionado.' });
    }
  }),
});

export type CheckoutField = 'name' | 'email' | 'phone' | 'address' | 'department' | 'city' | 'notes';
export type CheckoutErrors = Partial<Record<CheckoutField, string>>;

export function checkoutFieldErrors(error: z.ZodError): CheckoutErrors {
  const result: CheckoutErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] === 'shippingAddress' ? issue.path[1] : issue.path[0];
    if (typeof field === 'string' && ['name', 'email', 'phone', 'address', 'department', 'city', 'notes'].includes(field)) {
      const key = field as CheckoutField;
      result[key] ??= issue.message;
    }
  }
  return result;
}
