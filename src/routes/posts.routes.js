import { Router } from "express"
import authToken from "../middlewares/authToken.js"
import checkSchema from "../middlewares/checkSchema.js"
import { createPost, deletePost, listPosts, updatePost, searchPosts } from "../controllers/posts.controller.js"
import { createPostSchema, updatePostSchema } from "../schemas/posts.schema.js"

const router = Router()

router.get("/", authToken, listPosts)
router.post("/", authToken, checkSchema(createPostSchema), createPost)
router.put("/:id", authToken, checkSchema(updatePostSchema), updatePost)
router.delete("/:id", authToken, deletePost)

router.get("/search", authToken, searchPosts)

export default router
