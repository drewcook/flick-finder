require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");
const jwt = require("jsonwebtoken");

// models
const User = require("../models/User");
const Movie = require("../models/Movie");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const token = req.headers.authorization?.split(" ")[1];

		// // get current user based off token
		let currentUser;
		if (token !== undefined && token !== null) {
			currentUser = await jwt.verify(token, process.env.USER_SECRET);
		}
		return {
			User,
			Movie,
			currentUser,
			token,
		};
	},
	engine: {
		apiKey: process.env.ENGINE_API_KEY,
	},
	playground: {
		settings: {
			"schema.polling.enable": false,
		},
	},
});

module.exports = server;
