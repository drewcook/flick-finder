const { gql } = require("apollo-server-micro");

exports.typeDefs = gql`
	type Query {
		getCurrentUser: User
		getTrendingMovies: [Movie]
		getMovieById(id: Int!): Movie
		getWatchlist(userEmail: String!): [Movie]
		getFavorites(userEmail: String!): [Movie]
		searchByTitle(searchTerm: String, page: Int): SearchResults
	}

	type SearchResults {
		page: Int!
		totalPages: Int!
		total: Int!
		results: [Movie]
	}

	type Mutation {
		signUpUser(
			firstName: String!
			lastName: String!
			email: String!
			password: String!
		): Token
		signInUser(email: String!, password: String!): Token
		addToWatchlist(userEmail: String!, movieId: Int!): Boolean
		addToFavorites(userEmail: String!, movieId: Int!): Boolean
		removeFromWatchlist(userEmail: String!, movieId: Int!): Boolean
		removeFromFavorites(userEmail: String!, movieId: Int!): Boolean
	}

	type Movie {
		id: Int!
		genres: [MovieGenre]
		overview: String
		popularity: Float
		posterPath: String
		releaseDate: String
		runtime: Int
		title: String
		voteAverage: Float
	}

	type MovieGenre {
		id: Int
		name: String
	}

	type Token {
		token: String!
	}

	type User {
		_id: Int
		firstName: String!
		lastName: String!
		password: String!
		email: String!
		joinDate: String
		watchlist: [Int]
		favorites: [Int]
	}
`;
