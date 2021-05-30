require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

// models
const User = require("../models/User");
const Movie = require("../models/Movie");

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({
		User,
		Movie,
		currentUser: req.currentUser,
		token: req.headers.authorization || "",
	}),
	engine: {
		apiKey: process.env.ENGINE_API_KEY,
	},
});

module.exports = server;
