import App from "../client/components/App";
import { GET_TRENDING_MOVIES } from "../queries";
import { Query } from "react-apollo";
import MovieCard from "../client/components/MovieCard";

const Browse = () => (
	<App title="Browse">
		<h2>Trending Movies</h2>
		<hr/>
		<Query query={GET_TRENDING_MOVIES}>
			{({data, loading, error}) => {
				if (loading) return <div>Loading...</div>
				if (error) return <div>Error getting movies</div>
				console.log(data);
				return (
					<div className="row">
						{data.getTrendingMovies.map((movie, idx) => <MovieCard key={movie.id} movie={movie} />)}
					</div>
				);
			}}
		</Query>
		<style jsx>{`
			h2 {
				margin: 0;
			}
			hr {
				margin-bottom: 40px;
			}
		`}</style>
	</App>
);

export default Browse;
