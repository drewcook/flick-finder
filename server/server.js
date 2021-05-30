require("dotenv").config();
const express = require("express");
const favicon = require("serve-favicon");
const next = require("next");
const path = require("path");

// next wrapper
const production = process.env.NODE_ENV === "production";
const app = next({
	dev: !production,
	dir: path.join(__dirname, "../"),
});
const handler = app.getRequestHandler();

// connect to database
require("./startup/database");

// init app
app
	.prepare()
	.then(() => {
		// init express
		const server = express();

		// setup apollo server
		const apolloServer = require("./apollo-server/apolloServer");
		apolloServer.applyMiddleware({ app: server });
		if (!production) {
			console.log(
				`GraphQL playground is available at ${apolloServer.graphqlPath}`
			);
		}

		// favicon
		server.use(favicon(path.join(__dirname, "../public/img/favicon.ico")));

		// setup db
		require("./startup/database")();

		// setup auth middleware
		// require("./startup/authMiddleware")(server); see comments on this file as to why it is commented out

		// setup routes
		require("./startup/routes")(server, handler);

		// apply production middleware
		if (production) require("./startup/productionMiddleware")(server);

		// listen on provided port (Heroku) or 3000 by default
		const port = process.env.PORT || 3000;
		server.listen(port, (err) => {
			if (err) throw err;
			console.log(`App is listening on port: ${port}`);
		});
	})
	.catch((ex) => {
		console.log(ex.stack);
		process.exit(1);
	});
