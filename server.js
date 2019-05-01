const express = require("express");
const next = require("next");
const mongoose = require("mongoose");

const dev = process.env.NODE_ENV !== "production";
const app = next({dev});
const handle = app.getRequestHandler();

// middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// allow env vars
//require("dotenv").config({path: "variables.env"});

// init app
const PORT = process.env.PORT || 5000;
app
	.prepare()
	.then(() => {
		const server = express();
		//server.use(cors);

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
