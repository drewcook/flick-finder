module.exports = {
	publicRuntimeConfig: {
		// Will be available on both server and client
		APP_HOST: process.env.APP_HOST,
		ENGINE_API_KEY: process.env.ENGINE_API_KEY,
		MONGO_URI: process.env.MONGO_URI,
		MOVIEDB_APIKEY: process.env.MOVIEDB_APIKEY,
		MOVIEDB_BASEURL: process.env.MOVIEDB_BASEURL,
		MOVIEDB_IMG_BASE: process.env.MOVIEDB_IMG_BASE,
		PORT: process.env.PORT,
		STATIC_FOLDER: "/public",
		USER_SECRET: process.env.USER_SECRET,
	},
};
