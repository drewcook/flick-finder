import Layout from "../client/components/Layout";
import { GET_TRENDING_MOVIES } from "../queries";
import { useQuery } from "@apollo/client";
import MovieCard from "../client/components/MovieCard";
import LoadingModule from "../client/components/LoadingModule";

const Browse = (props) => {
	const { session } = props;
	const { data, loading, error } = useQuery(GET_TRENDING_MOVIES);

	return (
		<Layout session={session} title="Browse">
			<h2>Trending Movies</h2>
			<hr />
			{loading && <LoadingModule />}
			{error && <p>Error getting movies</p>}
			{data && (
				<div className="row">
					{data.getTrendingMovies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
				</div>
			)}
			<style jsx>{`
				h2 {
					margin: 0;
				}
				hr {
					margin-bottom: 40px;
				}
				.errMsg {
					font-size: 14px;
					color: #f04124;
					margin: 15px 0;
				}
			`}</style>
		</Layout>
	);
};

export default Browse;
