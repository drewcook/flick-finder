const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
	type Query {
		getCurrentUser: User
	}
	
	type User {
		firstName: String!
		lastName: String!
		password: String!
		email: String!
		joinDate: String
	}
`;
