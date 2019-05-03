const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
	type Query {
		getCurrentUser: User
		getTrendingMovies: [Movie]
		getMovieById(id: Int!): Movie
	}
	
	type Mutation {
		signUpUser(firstName: String!, lastName: String!, email: String!, password: String!): Token
		signInUser(email: String!, password: String!): Token
		addToWatchlist(userId: Int!, movieId: Int!): Boolean
		addToFavorites(movieId: Int!): Boolean
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
		watchlist: [Movie]
		favorites: [Movie]
	}
`;
