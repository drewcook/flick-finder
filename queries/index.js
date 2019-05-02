const { gql } = require("apollo-boost");

/* Users */
export const GET_CURRENT_USER = gql`
	query {
		getCurrentUser {
			firstName
			lastName
			email
			joinDate
		}
	}
`;

/* Movies */
export const GET_TRENDING_MOVIES = gql`
	query {
		getTrendingMovies {
			id
			title
			overview
			popularity
			genres {
				id
				name
			}
			posterPath
			releaseDate
			runtime
		}
	}
`;
