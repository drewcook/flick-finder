import Layout from "../client/components/Layout";
import LoadingModule from "../client/components/LoadingModule";
import MovieRating from "../client/components/MovieRating";
import { Query, Mutation } from "react-apollo";
import { GET_MOVIE_BY_ID } from "../queries";
import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../mutations";
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
				const dateFormatted = new Date(details.releaseDate).toLocaleDateString();
				return (
					<div className="row">
						<div className="col-xs-12 col-md-6">
							<img src={details.posterPath} alt={details.title} className="img-fluid" />
						</div>
						<div className="col-xs-12 col-md-6">
							<h3>{details.title}</h3>
							<p className="lead">{details.overview}</p>
							<div><strong>Viewer Rating: {details.voteAverage * 10}%</strong>
								<MovieRating rating={details.voteAverage} />
							</div>
							<p><strong>Released:</strong> {dateFormatted}</p>
							<p><strong>Genres:</strong>
								{details.genres.map(genre => (
									<span key={genre.name} className="genre"><em>{genre.name}</em></span>
								))}
							</p>
							<p><strong>Runtime:</strong> {details.runtime} minutes</p>
							<div className="btn-group">
								<Mutation mutation={ADD_TO_WATCHLIST} variables={{email: props.session.getCurrentUser.email, movieId: details.id}}>
									{(addToWatchlist, {data, loading, error}) => {
										console.log(data);
										return (
											<React.Fragment>
												<button className="btn btn-dark" onClick={addToWatchlist}>Add To Watchlist</button>
												{data && <div className="successMsg text-success">Successfully added to watchlist.</div>}
												{error && <div className="errMsg text-danger">{error.message}</div>}
											</React.Fragment>
										);
									}}
								</Mutation>
								<Mutation mutation={ADD_TO_FAVORITES} variables={{email: props.session.getCurrentUser.email, movieId: details.id}}>
									{(addToFavorites, {data, loading, error}) => {
										console.log(data);
										return (
											<React.Fragment>
												<button className="btn btn-danger" onClick={addToFavorites}>Add To Favorites</button>
												{data && <div className="successMsg text-success">Successfully added to favorites list.</div>}
												{error && <div className="errMsg text-danger">{error.message}</div>}
											</React.Fragment>
										);
									}}
								</Mutation>
							</div>
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
			img {
				width: 100%;
				max-width: 500px;
				margin: 0 auto 30px;
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
			.btn-group {
				display: flex;
				flex-direction: column;
			}
			.btn-group button.btn {
				display: block;
				margin-bottom: 5px;
				margin-top: 10px;
			}
			.successMsg, .errMsg {
				font-size: 12px;
				margin: 0 0 5px;
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
