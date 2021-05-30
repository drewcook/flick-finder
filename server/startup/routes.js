const setupRoutes = (server, handler) => {
	server.get("*", (req, res) => {
		return handler(req, res);
	});
};

module.exports = setupRoutes;
