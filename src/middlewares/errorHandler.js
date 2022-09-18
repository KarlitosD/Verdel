import { ZodError } from "zod"

export default (err, req, res, next) => {
	if (err instanceof ZodError) {
		// console.log("HOlaaa")
		return res.status(401).send(err.issues)
	}
	return res.status(err.status || 500).send({
		error: true,
		message: err.message || "Error en el servidor"
	})
}
