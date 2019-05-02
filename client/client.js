const ApolloBoost = require("apollo-boost");
const ApolloClient = ApolloBoost.default;

const dev = process.env.NODE_ENV !== "production";

const client = new ApolloClient({
	uri: dev ? "http://localhost:3000/graphql" : "http://localhost:5000/graphql"
});

exports.client = client;
