const ApolloBoost = require("apollo-boost");
const ApolloClient = ApolloBoost.default;
const fetch = require("isomorphic-unfetch");

const dev = process.env.NODE_ENV !== "production";

const client = new ApolloClient({
	uri: dev
		? "http://localhost:3000/graphql"
		: "https://flickfinder.herokuapp.com/graphql",
	request: (operation) => {
		// pass along token with every http request to server for authentication
		const token = localStorage.getItem("userToken");
		operation.setContext({
			fetchOptions: {
				credentials: "include",
			},
			headers: {
				authorization: token ? token : null,
			},
		});
	},
	onError: ({ networkError }) => {
		if (networkError) console.log("Network Error -", networkError);
	},
});

exports.client = client;
