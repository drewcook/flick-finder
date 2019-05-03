const { gql } = require("apollo-boost");

/* Users */
export const SIGN_UP_USER = gql`
	mutation($firstName: String!, $lastName: String!, $email: String!, $password: String!){
		signUpUser(
			firstName: $firstName
			lastName: $lastName
			email: $email
			password: $password
		) {
			token
		}
	}
`;

export const SIGN_IN_USER = gql`
	mutation($email: String!, $password: String!){
		signInUser(
			email: $email
			password: $password
		) {
			token
		}
	}
`;

/* Movies */
export const ADD_TO_WATCHLIST = gql`
	mutation($email: String!, $movieId: Int!) {
		addToWatchlist(userEmail: $email, movieId: $movieId)
	}
`;

export const REMOVE_FROM_WATCHLIST = gql`
	mutation($email: String!, $movieId: Int!) {
		removeFromWatchlist(userEmail: $email, movieId: $movieId)
	}
`;

export const ADD_TO_FAVORITES = gql`
	mutation($email: String!, $movieId: Int!) {
		addToFavorites(userEmail: $email, movieId: $movieId)
	}
`;

export const REMOVE_FROM_FAVORITES = gql`
	mutation($email: String!, $movieId: Int!) {
		removeFromFavorites(userEmail: $email, movieId: $movieId)
	}
`;
