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
				if (loading) return <LoadingModule />
				if (error) return <p>Error getting movies</p>
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
			.errMsg {
				font-size: 14px;
				color: #F04124;
				margin: 15px 0;
			}
		`}</style>
	</Layout>
);

export default Browse;
