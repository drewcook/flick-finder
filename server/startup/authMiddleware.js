const jwt = require("jsonwebtoken");

// Sets a request header 'currentUser' which contains the info stored in the JWT stored in localStorage after authenticated
// The purpose of this middleware was to pass it in as a request header, so that ApolloServer can intercept that and store
// it in the Apollo context.
//
// This can happen in two places though, here as an express middleware, or directly within the ApolloServer constructor.
// The token will already be available in req.headers, so it's as simple as calling jwt.verify at that level rather than here.
// Currently, it is implemented within the ApolloServer constructor though, so I have this middleware commented out in server.js.
const auth = (server) =>
	server.use(async (req, res, next) => {
		const token = req.headers["authorization"];
		// only verify token if we are given one from local storage
		// get current user it is tied to
		if (token !== "null" && token !== undefined) {
			try {
				const currentUser = await jwt.verify(token, process.env.USER_SECRET);
				// add to request
				req.currentUser = currentUser;
			} catch (err) {
				console.error(err);
			}
		}
		next();
	});

module.exports = auth;
