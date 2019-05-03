import Layout from "../client/components/Layout";
import { Query } from "react-apollo";
import { GET_MOVIE_BY_ID } from "../queries";
import LoadingModule from "../client/components/LoadingModule";
import Link from "next/link";

const Movie = props => (
	<Layout session={props.session} title="Movie Details">
		<Link href="/Browse" as="browse"><button className="btn btn-success">&lt; Back to list</button></Link>
		<h2>Movie Details</h2>
		<hr/>
		<Query query={GET_MOVIE_BY_ID} variables={{id: parseInt(props.pageProps.movie.id)}}>
			{({data, loading, error}) => {
				if (loading) return <LoadingModule />
				if (error) return <div className="errMsg">Error getting movies</div>
				const details = data.getMovieById;
				console.log(details);
				return (
					<div className="row">
						<div className="col-xs-12 col-md-6">
							<img src={details.posterPath} alt={details.title} />
						</div>
						<div className="col-xs-12 col-md-6">
							<h3>{details.title}</h3>
							<p className="lead">{details.overview}</p>
							<p><strong>Released:</strong> {details.releaseDate}</p>
							<p><strong>Genres:</strong>
								{details.genres.map(genre => (
									<span key={genre.name} className="genre"><em>{genre.name}</em></span>
								))}
							</p>
							<p><strong>Runtime:</strong> {details.runtime} minutes</p>
						</div>
					</div>
				);
			}}
		</Query>
		<style jsx>{`
			button {
				margin-bottom: 30px;
			}
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
			.genre {
				margin: 0 7px;
				color: #666;
				font-weight: normal;
			}
		`}</style>
	</Layout>
);

Movie.getInitialProps = ({ query }) => {
	return {
		movie: query
	};
}

export default Movie;
