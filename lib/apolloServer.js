const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const getConfig = require("next/config");

const {
	publicServerConfig: { ENGINE_API_KEY },
} = getConfig();

const dev = process.env.NODE_ENV !== "production";

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({
		User,
		Movie,
		currentUser: req.currentUser,
	}),
	engine: {
		apiKey: ENGINE_API_KEY,
	},
	introspection: true,
	playground: dev,
	debug: dev,
});

export default server;
