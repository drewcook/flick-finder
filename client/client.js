const ApolloBoost = require("apollo-boost");
const ApolloClient = ApolloBoost.default;
const fetch = require("isomorphic-unfetch");

const client = new ApolloClient({
	uri: "/graphql",
	fetchOptions: {
		credentials: "include",
	},
	fetch,
	request: (operation) => {
		// pass along token with every http request to server for authentication
		const token = localStorage.getItem("userToken");
		operation.setContext({
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
