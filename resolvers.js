exports.resolvers = {
	Query: {
		getCurrentUser: async (root, args, { currentUser: User }) => {
			if (!currentUser) return null;
			const user = await User.findOne({username: currentUser.username})
				.populate({
					path: "profile"
				});
			return user;
		}
	},
	User: {}
};
