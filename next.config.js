module.exports = {
	serverRuntimeConfig: {
		// Will only be available on the server side
		APP_HOST: process.env.APP_HOST,
		ENGINE_API_KEY: process.env.ENGINE_API_KEY,
		MONGO_URI: process.env.MONGO_URI,
		PORT: process.env.PORT,
		USER_SECRET: process.env.USER_SECRET,
	},
	publicRuntimeConfig: {
		// Will be available on both server and client
		STATIC_FOLDER: "/public",
		MOVIEDB_APIKEY: process.env.MOVIEDB_APIKEY,
		MOVIEDB_BASEURL: process.env.MOVIEDB_BASEURL,
		MOVIEDB_IMG_BASE: process.env.MOVIEDB_IMG_BASE,
		USER_SECRET: process.env.USER_SECRET,
	},
};
