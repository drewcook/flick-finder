const jwt = require("jsonwebtoken");

// Set current user if token exists to header
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
