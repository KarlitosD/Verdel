import { Router } from "express"
import postsRoutes from "./posts.routes.js"
import authRoutes from "./auth.routes.js"
const router = Router()

router.use("/auth", authRoutes)
router.use("/posts", postsRoutes)

export default router
