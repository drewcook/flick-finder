import Layout from "../client/components/Layout";
import LoadingModule from "../client/components/LoadingModule";
import MovieRating from "../client/components/MovieRating";
import { Query, Mutation } from "react-apollo";
import { GET_MOVIE_BY_ID } from "../queries";
import { ADD_TO_WATCHLIST, REMOVE_FROM_WATCHLIST, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../mutations";
import Link from "next/link";
import { NotificationManager } from 'react-notifications';


class Movie extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isWatchlisted: props.session.getCurrentUser.watchlist.includes(parseInt(props.pageProps.movie.id)),
			isFavorited: props.session.getCurrentUser.favorites.includes(parseInt(props.pageProps.movie.id))
		};
	}

	toggleWatchlist = (callback, didAdd) => callback()
		.then(() => {
			this.setState({ isWatchlisted: !this.state.isWatchlisted });
			NotificationManager.success(`You've ${didAdd ? "added and item to" : "removed an item from"} your watchlist.`, "Success!");
		})
		.catch(() => NotificationManager.error("Something went wrong.", "Uh oh!"));

	toggleFavorite = (callback, didAdd) => callback()
		.then(() => {
			this.setState({ isFavorited: !this.state.isFavorited });
			NotificationManager.success(`You've ${didAdd ? "added and item to" : "removed an item from"} your favorites.`, "Success!");
		})
		.catch(() => NotificationManager.error("Something went wrong.", "Uh oh!"));

	render() {
		const { isWatchlisted, isFavorited } = this.state;
		const user = this.props.session.getCurrentUser;
		return (
			<Layout session={this.props.session} title="Movie Details">
				<Link href="/Browse" as="browse">
					<button className="btn btn-success">&lt; Back to list</button>
				</Link>
				<h2>Movie Details</h2>
				<hr/>
				<Query query={GET_MOVIE_BY_ID} variables={{id: parseInt(this.props.pageProps.movie.id)}}>
					{({data, loading, error}) => {
						if (loading) return <LoadingModule/>
						if (error) return <div className="errMsg">Error getting movies</div>
						const details = data.getMovieById;
						const dateFormatted = new Date(details.releaseDate).toLocaleDateString("en-US");
						return (
							<div className="row">
								<div className="col-xs-12 col-md-6">
									<img src={details.posterPath} alt={details.title} className="img-fluid"/>
								</div>
								<div className="col-xs-12 col-md-6">
									<h3>{details.title}</h3>
									<p className="lead">{details.overview}</p>
									<div><strong>Viewer Rating: {details.voteAverage * 10}%</strong>
										<MovieRating rating={details.voteAverage}/>
									</div>
									<p><strong>Released:</strong> {dateFormatted}</p>
									<p><strong>Genres:</strong>
										{details.genres.map(genre => (
											<span key={genre.name} className="genre"><em>{genre.name}</em></span>
										))}
									</p>
									<p><strong>Runtime:</strong> {details.runtime} minutes</p>
									<div className="btn-group">
										{!isWatchlisted ?
											<Mutation
												mutation={ADD_TO_WATCHLIST}
												variables={{email: user.email, movieId: details.id}}>
												{(addToWatchlist) => <button className="btn btn-dark" onClick={() => this.toggleWatchlist(addToWatchlist, true)}>Add To Watchlist</button>}
											</Mutation> :
											<Mutation
												mutation={REMOVE_FROM_WATCHLIST}
												variables={{email: user.email, movieId: details.id}}>
												{(removeFromWatchlist) => <button className="btn btn-dark" onClick={() => this.toggleWatchlist(removeFromWatchlist, false)}>Remove From Watchlist</button>}
											</Mutation>
										}
										{!isFavorited ?
											<Mutation
												mutation={ADD_TO_FAVORITES}
												variables={{email: user.email, movieId: details.id}}>
												{(addToFavorites) => <button className="btn btn-danger" onClick={() => this.toggleFavorite(addToFavorites, true)}>Add To Favorites</button>}
											</Mutation> :
											<Mutation
												mutation={REMOVE_FROM_FAVORITES}
												variables={{email: user.email, movieId: details.id}}>
												{(removeFromFavorites) => <button className="btn btn-danger" onClick={() => this.toggleFavorite(removeFromFavorites, false)}>Remove From Favorites</button>}
											</Mutation>
										}

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
		`}</style>
			</Layout>
		);
	}
}

Movie.getInitialProps = ({ query }) => {
	return {
		movie: query
	};
}

export default Movie;
