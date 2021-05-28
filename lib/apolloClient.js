const ApolloBoost = require("apollo-boost");
const ApolloClient = ApolloBoost.default;
const fetch = require("isomorphic-unfetch");
import getConfig from "next/config";

const {
	publicRuntimeConfig: { APP_HOST },
} = getConfig();

console.log({ APP_HOST });

const client = new ApolloClient({
	uri: `${APP_HOST}/graphql`,
	fetchOptions: {
		credentials: "include",
	},
	fetch,
	request: (operation) => {
		// pass along token with every http request to server for authentication
		const token = process.browser ? localStorage.getItem("userToken") : null;
		operation.setContext({
			headers: {
				authorization: token,
			},
		});
	},
	onError: ({ networkError }) => {
		if (networkError) console.log("Network Error -", networkError);
	},
});

export default client;
