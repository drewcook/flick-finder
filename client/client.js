const ApolloBoost = require("apollo-boost");
const ApolloClient = ApolloBoost.default;

const client = new ApolloClient({
	uri: `${process.env.APP_HOST}/graphql`,
	fetchOptions: {
		credentials: "include",
	},
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
