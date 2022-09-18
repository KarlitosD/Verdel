import { z } from "zod"

export const RegisterSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string()
	// location: string()
})

export const LoginSchema = z.object({
	email: z.string(),
	password: z.string()
	// location: string()
})
