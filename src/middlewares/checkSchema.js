// import { assert } from "zod"

export default function checkSchema (schema, data) {
	console.log("Hola")
	return (req, _res, next) => {
		try {
			schema.parse(req[data])
			next()
		} catch (error) {
			next(error)
		}
	}
}
