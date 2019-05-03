const { gql } = require("apollo-boost");

/* Users */
export const GET_CURRENT_USER = gql`
	query {
		getCurrentUser {
			firstName
			lastName
			email
			joinDate
			watchlist
			favorites
		}
	}
`;

export const GET_WATCHLIST = gql`
	query($email: String!) {
		getWatchlist(userEmail: $email) {
			id
			title
			genres {
				name
			}
			posterPath
			releaseDate
			voteAverage
		}
	}
`;

export const GET_FAVORITES = gql`
	query {
		null
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

export const GET_MOVIE_BY_ID = gql`
	query($id: Int!) {
		getMovieById(id: $id) {
			id
			title
			overview
			genres {
				id
				name
			}
			posterPath
			popularity
			releaseDate
			runtime
			voteAverage
		}
	}
`;
