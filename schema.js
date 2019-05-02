const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
	type Query {
		getCurrentUser: User
		getTrendingMovies: [Movie]
	}
	
	type Movie {
		id: Int
		genres: [MovieGenre]
		overview: String
		popularity: Float
		posterPath: String
		releaseDate: String
		runtime: Int
		title: String
	}
	
	type MovieGenre {
		id: Int
		name: String
	}
	
	type User {
		firstName: String!
		lastName: String!
		password: String!
		email: String!
		joinDate: String
	}
`;
