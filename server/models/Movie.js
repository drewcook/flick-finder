const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieGenreSchema = new Schema({
	id: {
		type: Number
	},
	name: {
		type: String
	}
});

const MovieSchema = new Schema({
	id: {
		type: Number,
		required: true
	},
	genres: {
		type: [MovieGenreSchema]
	},
	overview: {
		type: String
	},
	popularity: {
		type: Number
	},
	posterPath: {
		type: String
	},
	releaseDate: {
		type: Date
	},
	runtime: {
		type: Number
	},
	title: {
		type: String
	}
});

module.exports = mongoose.model("Movie", MovieSchema);
