import { z } from "zod"

export const createPostSchema = z.object({
	title: z.string().max(100),
	description: z.string(),
	estimatedPrice: z.number(),
	tag: z.string(),
	user_id: z.string()
})

export const updatePostSchema = z.object({
	title: z.string().max(100),
	description: z.string(),
	estimatedPrice: z.number(),
	tag: z.string()
})
