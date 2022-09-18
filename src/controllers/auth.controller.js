import jwt from "jsonwebtoken"
import cuid from "cuid"
import bcrypt from "bcrypt"
import { omit } from "rambda"
import createError from "http-errors"
import { db } from "../db/db.js"

export const registerController = async (req, res, next) => {
	try {
		const { password: passwordRaw, ...restBody } = req.body
		// const emailExists = (await db.raw("SELECT id FROM Users WHERE email = ?", req.body.email))[0]
		const emailExists = await db("Users").select("id").where({ email: req.body.email }).first()
		if (emailExists) throw createError(401, "El email ya existe")

		const passwordHash = await bcrypt.hash(passwordRaw, 10)

		const newUser = {
			id: cuid(),
			...restBody,
			password: passwordHash,
			locate: "Buenos Aires",
			calification: 0
		}
		await db("Users").insert(newUser)

		const userToToken = omit(["password"], newUser)
		const token = jwt.sign(userToToken, process.env.TOKEN_SECRET, { expiresIn: "15d" })

		res.send({ ...userToToken, token })
	} catch (error) {
		next(error)
	}
}

export const loginController = async (req, res, next) => {
	try {
		const { password: passwordRaw, email } = req.body
		const user = await db("Users").where({ email }).first()
		if (!user) throw createError(401, "Usuario no existe")
		console.log({ user })
		const matchPassword = await bcrypt.compare(passwordRaw, user.password)
		if (!matchPassword) throw createError(401, "Contraseña incorrecta")

		const userToToken = omit(["password"], user)
		const token = jwt.sign(userToToken, process.env.TOKEN_SECRET, { expiresIn: "15d" })

		res.send({ ...userToToken, token })
	} catch (error) {
		next(error)
	}
}
