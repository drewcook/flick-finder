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
