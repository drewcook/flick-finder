require("dotenv").config();
const fetch = require("isomorphic-unfetch");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// utilize jwt to work with creating a user
// returns a jwt token string
const createToken = (user, secret, expiresIn) => {
	const { firstName, lastName, email } = user;
	return jwt.sign({ firstName, lastName, email }, secret, { expiresIn });
};

function movieDbPath(endpoint) {
	return `${MOVIEDB_BASEURL + endpoint}?api_key=${MOVIEDB_APIKEY}`;
}

function movieDbSearch(endpoint, queryString) {
	return `${
		MOVIEDB_BASEURL + endpoint
	}?api_key=${MOVIEDB_APIKEY}&${queryString}`;
}

module.exports = {
	Query: {
		// Users
		getCurrentUser: async (root, args, { currentUser, User }) => {
			if (!currentUser) return null;
			// find user based on context we've assign at server
			// redirect to profile page
			const user = await User.findOne({ email: currentUser.email }).populate({
				path: "profile",
				//model: "Profile"
			});
			return user;
		},
		getWatchlist: async (root, { userEmail }, { User }) => {
			const user = await User.findOne({ email: userEmail });
			if (!user) throw new Error("User not found");
			return user.watchlist.map(async (id) => {
				const movie = await fetch(movieDbPath(`/movie/${id}`));
				const movieData = await movie.json();
				return {
					id: movieData.id,
					title: movieData.title,
					overview: movieData.overview,
					genres: movieData.genres,
					releaseDate: movieData.release_date,
					posterPath: MOVIEDB_IMG_BASE + movieData.poster_path,
					popularity: movieData.popularity,
					runtime: movieData.runtime,
					voteAverage: movieData.vote_average,
				};
			});
		},
		getFavorites: async (root, { userEmail }, { User }) => {
			const user = await User.findOne({ email: userEmail });
			if (!user) throw new Error("User not found");
			return user.favorites.map(async (id) => {
				const movie = await fetch(movieDbPath(`/movie/${id}`));
				const movieData = await movie.json();
				return {
					id: movieData.id,
					title: movieData.title,
					overview: movieData.overview,
					genres: movieData.genres,
					releaseDate: movieData.release_date,
					posterPath: MOVIEDB_IMG_BASE + movieData.poster_path,
					popularity: movieData.popularity,
					runtime: movieData.runtime,
					voteAverage: movieData.vote_average,
				};
			});
		},
		// Movies
		getTrendingMovies: async (root, args, { Movie }) => {
			const trending = await fetch(movieDbPath("/trending/movie/week"));
			const trendingData = await trending.json();
			const genres = await fetch(movieDbPath("/genre/movie/list"));
			const genreData = await genres.json();
			return trendingData.results.map((item) => ({
				id: item.id,
				genres: item.genre_ids.map((genre) => ({
					id: genre,
					name: genreData.genres.filter((item) => item.id === genre)[0].name,
				})),
				overview: item.overview,
				popularity: item.popularity,
				posterPath: MOVIEDB_IMG_BASE + item.poster_path,
				releaseDate: item.release_date,
				title: item.title,
			}));
		},
		getMovieById: async (root, { id }, { Movie }) => {
			const movie = await fetch(movieDbPath(`/movie/${id}`));
			if (!movie) throw new Error("Movie not found");
			const movieData = await movie.json();
			return {
				id: movieData.id,
				title: movieData.title,
				overview: movieData.overview,
				genres: movieData.genres,
				releaseDate: movieData.release_date,
				posterPath: MOVIEDB_IMG_BASE + movieData.poster_path,
				popularity: movieData.popularity,
				runtime: movieData.runtime,
				voteAverage: movieData.vote_average,
			};
		},
		searchByTitle: async (root, { searchTerm, page }, { Movie }) => {
			if (!searchTerm) return { page: 1, totalPages: 1, total: 0, results: [] };
			const res = await fetch(
				movieDbSearch(
					"/search/movie",
					`language=en-US&query=${searchTerm}&page=${page}&include_adult=false`
				)
			);
			const resultsData = await res.json();
			const results = resultsData.results.map((movie) => ({
				id: movie.id,
				popularity: movie.popularity,
				posterPath: MOVIEDB_IMG_BASE + movie.poster_path,
				releaseDate: movie.release_date,
				title: movie.title,
			}));
			return {
				page: resultsData.page,
				totalPages: resultsData.total_pages,
				total: resultsData.total_results,
				results,
			};
		},
	},
	Mutation: {
		// Users
		signUpUser: async (
			root,
			{ firstName, lastName, email, password },
			{ User }
		) => {
			// don't allow duplicate user (based off email)
			const user = await User.findOne({ email });
			if (user) throw new Error("User already exists");
			// save to db
			const newUser = await new User({
				firstName,
				lastName,
				email,
				password,
			}).save();
			// return the jwt (valid only for an hour for this app's purposes)
			return { token: createToken(newUser, process.env.USER_SECRET, "4hr") };
		},
		signInUser: async (root, { email, password }, { User }) => {
			const user = await User.findOne({ email });
			if (!user) throw new Error("User not found");
			// check if valid pw
			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) throw new Error("Invalid password");
			// return the jwt (valid only for an hour for this app's purposes)
			return { token: createToken(user, process.env.USER_SECRET, "4hr") };
		},
		addToWatchlist: async (root, { userEmail, movieId }, { User }) => {
			const user = await User.findOne({ email: userEmail });
			if (!user) throw new Error("User not found");
			if (user.watchlist.includes(movieId))
				throw new Error("Movie already on watchlist");
			user.watchlist = [...user.watchlist, movieId];
			user.save();
			return true;
		},
		removeFromWatchlist: async (root, { userEmail, movieId }, { User }) => {
			const user = await User.findOne({ email: userEmail });
			if (!user) throw new Error("User not found");
			if (!user.watchlist.includes(movieId))
				throw new Error("Movie not on watchlist");
			user.watchlist = user.watchlist.filter((id) => id !== movieId);
			user.save();
			return true;
		},
		addToFavorites: async (root, { userEmail, movieId }, { User }) => {
			const user = await User.findOne({ email: userEmail });
			if (!user) throw new Error("User not found");
			if (user.favorites.includes(movieId))
				throw new Error("Movie already on favorites list");
			user.favorites = [...user.favorites, movieId];
			user.save();
			return true;
		},
		removeFromFavorites: async (root, { userEmail, movieId }, { User }) => {
			const user = await User.findOne({ email: userEmail });
			if (!user) throw new Error("User not found");
			if (!user.favorites.includes(movieId))
				throw new Error("Movie not on favorites list");
			user.favorites = user.favorites.filter((id) => id !== movieId);
			user.save();
			return true;
		},
	},
	User: {},
};
