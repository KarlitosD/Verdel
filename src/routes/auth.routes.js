import { Router } from "express"
import checkSchema from "../middlewares/checkSchema.js"
import { LoginSchema, RegisterSchema } from "../schemas/auth.schema.js"
import { loginController, registerController } from "../controllers/auth.controller.js"

const router = Router()

router.post("/register", checkSchema(RegisterSchema, "body"), registerController)
router.post("/login", checkSchema(LoginSchema, "body"), loginController)

export default router
