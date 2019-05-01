const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

// models
const User = require("./models/User");

// graphQL setup
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const schema = makeExecutableSchema({
	typeDefs,
	resolvers
});

// middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// connect to db
const mongoose = require("mongoose");
require("dotenv").config({path: "variables.env"});
mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("Mongo DB connected"))
	.catch(err => console.log(err));

// init app
const PORT = process.env.PORT || 5000;
app
	.prepare()
	.then(() => {
		// initial setup
		const server = express();
		//server.use(cors);
		// connect schemas with graphQL
		server.use("/graphiql", graphiqlExpress({ endpoint: "/graphql" }));
		server.use("/graphql", bodyParser.json(), graphqlExpress({
			schema,
			context: {
				User
			}
		}))

		// routes
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
