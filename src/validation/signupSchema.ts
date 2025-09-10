import { z } from 'zod'

export const signupSchema = z.object({
    name: z.string().min(3,"Name must be at least 3 characters"),
    email: z.email("Inavlid email address"), 
    password: z.string().min(6, "Password must be at least 6 characters")
})

export type SignupForm = z.infer<typeof signupSchema>