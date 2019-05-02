const { gql } = require("apollo-boost");

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
