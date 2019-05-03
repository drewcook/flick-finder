const express = require("express");
const next = require("next");

// next wrapper
require("dotenv").config({path: "variables.env"});
const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

// middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const jwt = require("jsonwebtoken");

// models
const User = require("./models/User");
const Movie = require("./models/Movie");

// apollo/graphQL setup & bind mongoose models
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const aplServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({
		User,
		Movie,
		currentUser: req.currentUser
	}),
	playground: dev,
	debug: dev,
});
// setup apollo client
require("./client/client");


// connect to database
const mongoose = require("mongoose");
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log("Mongo DB connected"))
	.catch(err => console.log(err));

// init app
const PORT = process.env.PORT || dev ? 3000 : 5000;
app
	.prepare()
	.then(() => {
		// initial setup
		const server = express();
		server.use(cors({
			origin: dev ? "http://localhost:3000" : "http://localhost:5000",
			credentials: true
		}));
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
		})

		// apply apollo server middleware
		aplServer.applyMiddleware({
			app: server,
			//path: "/api",
			/*cors: {
				origin: dev ? "http://localhost:3000" : "http://localhost:5000",
				credentials: true
			},*/
			//bodyParserConfig: true
		});
		if (dev) {
			console.log(`GraphQL playground is available at ${aplServer.graphqlPath}`);
		}

		// route handlers
		server.get("/browse", (req, res) => {
			const actualPage = "/Browse";
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

		// listen
		server.listen(PORT, (err) => {
			if (err) throw err;
			console.log(`App is listening on port: ${PORT}`);
		});
	})
	.catch(ex => {
		console.log(ex.stack);
		process.exit(1);
	});
