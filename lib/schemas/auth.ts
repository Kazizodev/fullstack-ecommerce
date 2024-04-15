import { z } from 'zod'

export const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) })

export const registerSchema = z.object({
    firstName: z.string().min(2, 'Must be at least 2 characters'),
    lastName: z.string().min(2, 'Must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})
