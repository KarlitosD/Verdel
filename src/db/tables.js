
// import { db } from "./db"

// CREATE TABLE IF NOT EXISTS Trades(
// 	id INT PRIMARY KEY AUTO_INCREMENT,
// 	post_main INT,
// 	post_offer INT,
// 	FOREIGN KEY (post_main, post_offer) REFERENCES Posts(id, id)
// )

// export const tables = `

// `

export async function createTables (db) {
	const createTable = async (tableName, createFunction) => {
		if (await db.schema.hasTable(tableName)) return
		return await db.schema.createTable(tableName, createFunction)
	}
	// CREATE TABLE IF NOT EXISTS Users (
	// 	id int PRIMARY KEY AUTO_INCREMENT,
	// 	name VARCHAR(100),
	// 	email VARCHAR(100),
	// 	password VARCHAR(200),
	// 	locate VARCHAR(50),
	// 	calification INT
	// );
	await createTable("Users", table => {
		table.text("id").primary()
		table.string("name")
		table.string("email")
		table.string("password")
		table.string("locate")
		table.integer("calification")
	})

	// CREATE TABLE IF NOT EXISTS Products (
	// 	id int PRIMARY KEY AUTO_INCREMENT,
	// 	title VARCHAR(200),
	// 	descripcion TEXT,
	// 	estimated_price INT,
	// 	tag_id INT,
	// 	user_id INT,
	// 	FOREIGN KEY user_id REFERENCES Users(id)
	// 	FOREIGN KEY tag_id REFERENCES Tags(id)
	// );

	await createTable("Products", table => {
		table.text("id").primary()
		table.string("title")
		table.text("description")
		table.integer("estimated_price")
		// table.string("")
		table.integer("user_id").references("id").inTable("Users").onDelete("CASCADE")
	})

	// CREATE TABLE IF NOT EXISTS Images (
	// 	id INT PRIMARY KEY AUTO_INCREMENT,
	// 	url TEXT,
	// 	post_id INT
	// 	FOREIGN KEY post_id REFERENCES Posts(id)
	// );
	await createTable("Images", table => {
		table.text("id").primary()
		table.string("url")
		table.string("product_id").references("id").inTable("Products").onDelete("CASCADE")
	})
	// CREATE TABLE IF NOT EXISTS Questions (
	// 	id int PRIMARY KEY AUTO_INCREMENT,
	// 	question TEXT,
	// 	post_id INT,
	// 	user_id INT,
	// 	FOREIGN KEY post_id REFERENCES Posts(id),
	// 	FOREIGN KEY user_id REFERENCES Users(id)
	// );

	await createTable("Questions", table => {
		table.text("id").primary()
		table.text("question")
		table.integer("user_id").references("id").inTable("Users").onDelete("CASCADE")
		table.string("product_id").references("id").inTable("Products").onDelete("CASCADE")
	})

	// CREATE TABLE IF NOT EXISTS HistorySearch(
	// 	id INT PRIMARY KEY AUTO_INCREMENT,
	// 	search_text TEXT,
	// 	user_id INT,
	// 	FOREIGN KEY user_id REFERENCES Users(id)
	// );

	await createTable("HistorySearch", table => {
		table.text("id").primary()
		table.varchar("search_text")
		table.integer("user_id").references("id").inTable("Users").onDelete("CASCADE")
	})
	return db
}
