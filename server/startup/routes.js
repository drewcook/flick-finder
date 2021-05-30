const setupRoutes = (server, handler) => {
	// server.get("/browse", (req, res) => {
	// 	const actualPage = "/Browse";
	// 	const queryParams = {};
	// 	app.render(req, res, actualPage, queryParams);
	// });

	// server.get("/search", (req, res) => {
	// 	const actualPage = "/Search";
	// 	const queryParams = {};
	// 	app.render(req, res, actualPage, queryParams);
	// });

	// server.get("/signin", (req, res) => {
	// 	const actualPage = "/SignIn";
	// 	const queryParams = {};
	// 	app.render(req, res, actualPage, queryParams);
	// });

	// server.get("/signup", (req, res) => {
	// 	const actualPage = "/SignUp";
	// 	const queryParams = {};
	// 	app.render(req, res, actualPage, queryParams);
	// });

	// server.get("/signout", (req, res) => {
	// 	const actualPage = "/SignOut";
	// 	const queryParams = {};
	// 	app.render(req, res, actualPage, queryParams);
	// });

	// server.get("/profile", (req, res) => {
	// 	const actualPage = "/Profile";
	// 	const queryParams = {};
	// 	app.render(req, res, actualPage, queryParams);
	// });

	// server.get("/movie/:id", (req, res) => {
	// 	const actualPage = "/Movie";
	// 	const queryParams = { id: req.params.id };
	// 	app.render(req, res, actualPage, queryParams);
	// });

	server.get("*", (req, res) => {
		return handler(req, res);
	});
};

module.exports = setupRoutes;
