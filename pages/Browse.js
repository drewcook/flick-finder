import Layout from "../client/components/Layout";
import { GET_TRENDING_MOVIES } from "../queries";
import { Query } from "react-apollo";
import MovieCard from "../client/components/MovieCard";
import LoadingModule from "../client/components/LoadingModule";

const Browse = props => (
	<Layout session={props.session} title="Browse">
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
	</Layout>
);

export default Browse;
