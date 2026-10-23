import { z } from 'zod';

const input = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z
    .string()
    .trim()
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  description: z.string().trim().max(2000).optional().nullable(),
  parentId: z.string().max(50).optional().nullable(),
  isActive: z.boolean(),
});