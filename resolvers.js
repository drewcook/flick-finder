const fetch = require("isomorphic-unfetch");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// bring in env vars
require("dotenv").config({path: "variables.env"});

// utilize jwt to work with creating a user
// returns a jwt token string
const createToken = (user, secret, expiresIn) => {
	const { firstName, lastName, email } = user;
	return jwt.sign({ firstName, lastName, email }, secret, { expiresIn });
}

function movieDbPath(endpoint) {
	return `${process.env.MOVIEDB_BASEURL + endpoint}?api_key=${process.env.MOVIEDB_APIKEY}`;
}

exports.resolvers = {
	Query: {
		getCurrentUser: async (root, args, { currentUser: User }) => {
			if (!currentUser) return null;
			const user = await User.findOne({username: currentUser.username})
				.populate({
					path: "profile"
				});
			return user;
		},
		// Movies
		getTrendingMovies: async (root, args, { Movie }) => {
			const trending = await fetch(movieDbPath("/trending/movie/week"));
			const trendingData = await trending.json();
			const genres = await fetch(movieDbPath("/genre/movie/list"));
			const genreData = await genres.json();
			return trendingData.results.map(item => ({
				id: item.id,
				genres: item.genre_ids.map(genre => ({
					id: genre,
					name: genreData.genres.filter(item => item.id === genre)[0].name
				})),
				overview: item.overview,
				popularity: item.popularity,
				posterPath: process.env.MOVIEDB_IMG_BASE + item.poster_path,
				releaseDate: item.release_date,
				title: item.title
			}));
		}
	},
	Mutation: {
		// Users
		signUpUser: async (root, {firstName, lastName, email, password}, { User }) => {
			// don't allow duplicate user (based off email)
			const user = await User.findOne({ email });
			if (user) throw new Error("User already exists");
			// save to db
			const newUser = await new User({
				firstName,
				lastName,
				email,
				password
			}).save();
			// return the jwt (valid only for an hour for this app's purposes)
			return { token: createToken(newUser, process.env.USER_SECRET, "1hr") };
		},
		signInUser: async (root, {email, password}, { User }) => {
			const user = await User.findOne({ email });
			if (!user) throw new Error("User not found");
			// check if valid pw
			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) throw new Error("Invalid password");
			// return the jwt (valid only for an hour for this app's purposes)
			return { token: createToken(user, process.env.USER_SECRET, "1hr") };
		}
	},
	User: {}
};
