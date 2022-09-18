// import mysql from "mysql"
// import { promisify } from "util"
// import { tables } from "./tables.js"

// const pool = mysql.createPool({
// 	connectionLimit: 100,
// 	host: "localhost",
// 	user: "root",
// 	password: "usbw",
// 	database: "berdel",
// 	port: 3307
// })

// export const query = promisify(pool.query).bind(pool)

// export const initDatabase = callback => {
// 	pool.query(tables, error => {
// 		if (error) throw error
// 		callback()
// 	})
// }

import knex from "knex"
import { createTables } from "./tables.js"

// console.log(process.env.MODE)
const filename = process.env.NODE_ENV === "dev" ? ":memory:" : process.env.DB_PATH
console.log({ filename })

export const db = knex({
	client: "better-sqlite3",
	connection: { filename },
	useNullAsDefault: true
})

export function initDatabase () {
	return createTables(db)
	// db.migrate.latest()
}
