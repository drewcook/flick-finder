require("dotenv").config();
const express = require("express");
const next = require("next");
const path = require("path");

// next wrapper
const dev = process.env.NODE_ENV !== "production";
// require("dotenv").config({ path: dev ? ".env" : "variables.env" });
const app = next({ dev });
const handle = app.getRequestHandler();

// middleware
const cors = require("cors");
const compression = require("compression");
const jwt = require("jsonwebtoken");
const favicon = require("serve-favicon");

// get Apollo Server for GraphQL
const initApolloServer = require("./lib/apolloServer");

// connect to database
const mongoose = require("mongoose");
mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("Mongo DB connected"))
	.catch((err) => console.log(err));

// init app
app
	.prepare()
	.then(async () => {
		// initial setup
		const server = express();
		server.use(
			cors({
				origin: process.env.APP_HOST,
				credentials: true,
			})
		);
		server.use(favicon(path.join(__dirname, "/img/favicon.ico")));

		if (!dev) server.use(compression);

		// apply JWT authentication middleware
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

		// apply apollo server middleware
		initApolloServer()
			.applyMiddleware({ app: server })
			.then((d) => console.log("apply apollo server middleware", d));

		if (dev) {
			console.log(
				`GraphQL playground is available at ${apolloServer.graphqlPath}`
			);
		}

		// route handlers
		server.get("/browse", (req, res) => {
			const actualPage = "/Browse";
			const queryParams = {};
			app.render(req, res, actualPage, queryParams);
		});

		server.get("/search", (req, res) => {
			const actualPage = "/Search";
			const queryParams = {};
			app.render(req, res, actualPage, queryParams);
		});

		server.get("/signin", (req, res) => {
			const actualPage = "/SignIn";
			const queryParams = {};
			app.render(req, res, actualPage, queryParams);
		});

		server.get("/signup", (req, res) => {
			const actualPage = "/SignUp";
			const queryParams = {};
			app.render(req, res, actualPage, queryParams);
		});

		server.get("/signout", (req, res) => {
			const actualPage = "/SignOut";
			const queryParams = {};
			app.render(req, res, actualPage, queryParams);
		});

		server.get("/profile", (req, res) => {
			const actualPage = "/Profile";
			const queryParams = {};
			app.render(req, res, actualPage, queryParams);
		});

		server.get("/movie/:id", (req, res) => {
			const actualPage = "/Movie";
			const queryParams = { id: req.params.id };
			app.render(req, res, actualPage, queryParams);
		});

		server.get("*", (req, res) => {
			return handle(req, res);
		});

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
