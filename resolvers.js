const fetch = require("isomorphic-unfetch");

// bring in env vars
require("dotenv").config({path: "variables.env"});


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
	User: {}
};
