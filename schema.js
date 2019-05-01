exports.typeDefs = `

	type User {
		name: String! @unique
		password: String!
		email: String!
		joinDate: String
	}

`;
