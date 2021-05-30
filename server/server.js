require("dotenv").config();
const express = require("express");
const next = require("next");
const path = require("path");

// next wrapper
const production = process.env.NODE_ENV === "production";
const app = next({ dev: !production });
const handler = app.getRequestHandler();

// middleware
const cors = require("cors");
const favicon = require("serve-favicon");

// get Apollo Server for GraphQL
const initApolloServer = require("../lib/apolloServer");

// connect to database
require("./startup/database");

// init app
app
	.prepare()
	.then(async () => {
		const server = express();
		// server.use(
		// 	cors({
		// 		origin: process.env.APP_HOST,
		// 		credentials: true,
		// 	})
		// );

		// favicon
		server.use(favicon(path.join(__dirname, "../public/img/favicon.ico")));

		// setup db
		require("./startup/database")();

		// setup auth middleware
		require("./startup/authMiddleware")(server);

		// setup routes
		require("./startup/routes")(server, handler);

		// setup apollo server
		// initApolloServer()
		// 	.applyMiddleware({ app: server })
		// 	.then((d) => console.log("apply apollo server middleware", d));
		// if (!production) {
		// 	console.log(
		// 		`GraphQL playground is available at ${apolloServer.graphqlPath}`
		// 	);
		// }

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
