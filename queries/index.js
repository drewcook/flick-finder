const { gql } = require("apollo-boost");

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
