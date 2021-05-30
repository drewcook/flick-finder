require("dotenv").config();
const mongoose = require("mongoose");

const setupDb = () => {
	const db = process.env.MONGO_URI;
	mongoose
		.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log(`Connected to MongoDB: ${db}...`))
		.catch((err) => console.log(err));
};

module.exports = setupDb;
