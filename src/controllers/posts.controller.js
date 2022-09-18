import { db } from "../db/db.js"

export const listPosts = async (req, res, next) => {
	try {
		const posts = await db.raw("SELECT * FROM posts")
		res.send(posts || [])
	} catch (error) {
		next(error)
	}
}

export const createPost = async (req, res, next) => {
	try {
		res.send("Created")
	} catch (error) {
		next(error)
	}
}

export const updatePost = async (req, res, next) => {
	try {
		res.send("Updated")
	} catch (error) {
		next(error)
	}
}

export const deletePost = async (req, res, next) => {
	try {
		res.send("Deleted")
	} catch (error) {
		next(error)
	}
}

export const searchPosts = async (req, res, next) => {
	try {
		const { params } = req
		console.log(params)
		res.send("Searched")
	} catch (error) {
		next(error)
	}
}
