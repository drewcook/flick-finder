import { createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import _get from "lodash/get";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";

const {
	publicRuntimeConfig: { APP_HOST },
} = getConfig();

console.log({ APP_HOST });

const authLink = setContext((request, ctx) => {
	// get the token from localstorage for client-side requests
	// not supporting server authenticated requests ATM
	const token = process.browser ? localStorage.getItem("userToken") : null;
	return {
		headers: {
			...ctx.headers,
			authorization: token ? `Bearer ${token}` : "",
			"client-name": "Flick Finder",
			"client-version": "1.0.0",
		},
	};
});

export default function createFetchLink(ctx) {
	const BASE_URL = process.browser === false ? APP_HOST : "";

	const defaultLink = createHttpLink({
		uri: `${BASE_URL}/api/graphql`,
		fetch,
		headers: _get(ctx, "req.headers"), // Pass headers through on server -> server calls
	});

	return authLink.concat(defaultLink);
}
