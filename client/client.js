const ApolloBoost = require("apollo-boost");
const ApolloClient = ApolloBoost.default;
const InMemoryCache = ApolloBoost.InMemoryCache;

const dev = process.env.NODE_ENV !== "production";

const client = new ApolloClient({
	uri: dev ? "http://localhost:3000/graphql" : "http://localhost:5000/graphql",
	cache: new InMemoryCache(),
	fetchOptions: {
		credentials: "include"
	},
	request: operation => {
		const token = localStorage.getItem("userToken");
		operation.setContext({
			headers: {
				authorization: token
			}
		})
	},
	onError: ({ networkError }) => {
		if (networkError) console.log("Network Error -", networkError);
		//if (networkError.statusCode === 401) localStorage.removeItem("userToken");
	}
});

exports.client = client;
