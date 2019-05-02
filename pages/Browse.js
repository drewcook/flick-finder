import App from "../client/components/App";
import { GET_TRENDING_MOVIES } from "../queries";
import { Query } from "react-apollo";
import MovieCard from "../client/components/MovieCard";

const Browse = () => (
	<App title="Browse">
		<div>
			<h2>Browse Movies and TV Shows</h2>
			stuff goes here
		</div>
		<Query query={GET_TRENDING_MOVIES}>
			{({data, loading, error}) => {
				if (loading) return <div>Loading...</div>
				if (error) return <div>Error getting movies</div>
				console.log(data);
				return data.getTrendingMovies.map(movie => <MovieCard key={movie.id} movie={movie} />);
			}}
		</Query>
		<style jsx>{`
			h2 {
				margin: 0 0 20px;
			}
		`}</style>
	</App>
);

export default Browse;
