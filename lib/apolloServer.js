require("dotenv").config();
const { ApolloServer } = require("apollo-server-micro");
const resolvers = require("./resolvers");
const typeDefs = require("./typeDefs");

// models
const User = require("../models/User");
const Movie = require("../models/Movie");

const dev = process.env.NODE_ENV !== "production";

const initApolloServer = () => {
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
		introspection: true,
		playground: dev,
		debug: dev,
	});

	return server;
};

export default initApolloServer;
