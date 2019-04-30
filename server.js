const express = require("express");
const mongoose = require("mongoose");

// middleware
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// allow env vars
require("dotenv").config({path: "variables.env"});

// init app
const app = express();
app.use(cors);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`App is listening on port: ${PORT}`);
	}
})
