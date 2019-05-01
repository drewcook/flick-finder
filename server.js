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
const jwt = require("jsonwebtoken");

// models
const User = require("./models/User");

// apollo/graphQL setup & bind mongoose models
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const aplServer = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		User
	},
	playground: dev,
	debug: dev,
});

// connect to database
const mongoose = require("mongoose");
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => console.log("Mongo DB connected"))
	.catch(err => console.log(err));

// init app
const PORT = process.env.PORT || 3000;
app
	.prepare()
	.then(() => {
		// initial setup
		const server = express();
		// apply apollo server middleware
		aplServer.applyMiddleware({
			app: server,
			//path: "/api",
			//cors,
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
