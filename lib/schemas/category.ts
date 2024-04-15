import { z } from 'zod'

const categorySchema = z.object({ id: z.optional(z.string()), name: z.string().min(3, 'Name must be at least 3 characters') })

export default categorySchema
