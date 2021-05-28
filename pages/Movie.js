import { Component } from "react";
import Layout from "../client/components/Layout";
import LoadingModule from "../client/components/LoadingModule";
import MovieRating from "../client/components/MovieRating";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MOVIE_BY_ID } from "../queries";
import {
	ADD_TO_WATCHLIST,
	REMOVE_FROM_WATCHLIST,
	ADD_TO_FAVORITES,
	REMOVE_FROM_FAVORITES,
} from "../mutations";
import Link from "next/link";
import { NotificationManager } from "react-notifications";

const Movie = (props) => {
	const { session, pageProps, refetch } = props;
	const user = session.getCurrentUser;
	const movieId = parseInt(pageProps.movie.id);
	const [isWatchlisted, setIsWatchListed] = useState(
		session.getCurrentUser.watchlist.includes(movieId)
	);
	const [isFavorited, setIsFavorited] = useState(
		session.getCurrentUser.favorites.includes(movieId)
	);
	const { data, loading, error } = useQuery(GET_MOVIE_BY_ID, {
		variables: { id: movieId },
	});

	const toggleWatchlist = (callback, didAdd) =>
		callback()
			.then(() => {
				setIsWatchListed(!isWatchlisted);
				refetch();
				NotificationManager.success(
					`You've ${
						didAdd ? "added and item to" : "removed an item from"
					} your watchlist.`,
					"Success!"
				);
			})
			.catch(() =>
				NotificationManager.error("Something went wrong.", "Uh oh!")
			);

	const toggleFavorite = (callback, didAdd) =>
		callback()
			.then(() => {
				setIsFavorited(!isFavorited);
				refetch();
				NotificationManager.success(
					`You've ${
						didAdd ? "added and item to" : "removed an item from"
					} your favorites.`,
					"Success!"
				);
			})
			.catch(() =>
				NotificationManager.error("Something went wrong.", "Uh oh!")
			);

	return (
		<Layout session={session} title="Movie Details">
			<Link href="/browse" as="browse">
				<button className="btn btn-success">
					<i className="fas fa-angle-left"></i> Back to list
				</button>
			</Link>
			<h2>Movie Details</h2>
			<hr />

			{loading && <LoadingModule />}
			{error && <div className="errMsg">Error getting movies</div>}

			{data && (
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<img
							src={details.posterPath}
							alt={details.title}
							className="img-fluid"
						/>
					</div>
					<div className="col-xs-12 col-md-6">
						<h3>{details.title}</h3>
						<p className="lead">{details.overview}</p>
						<div>
							<strong>Viewer Rating: {details.voteAverage * 10}%</strong>
							<MovieRating rating={details.voteAverage} />
						</div>
						<p>
							<strong>Released:</strong> {dateFormatted}
						</p>
						<p>
							<strong>Genres:</strong>
							{details.genres.map((genre) => (
								<span key={genre.name} className="genre">
									<em>{genre.name}</em>
								</span>
							))}
						</p>
						<p>
							<strong>Runtime:</strong>{" "}
							{details.runtime ? `${details.runtime} minutes` : "N/A"}
						</p>
						<div className="btn-group">
							{!isWatchlisted ? (
								<Mutation
									mutation={ADD_TO_WATCHLIST}
									variables={{ email: user.email, movieId: details.id }}
								>
									{(addToWatchlist) => (
										<button
											className="btn btn-dark"
											onClick={() => toggleWatchlist(addToWatchlist, true)}
										>
											Add To Watchlist <i className="far fa-eye"></i>
										</button>
									)}
								</Mutation>
							) : (
								<Mutation
									mutation={REMOVE_FROM_WATCHLIST}
									variables={{ email: user.email, movieId: details.id }}
								>
									{(removeFromWatchlist) => (
										<button
											className="btn btn-dark"
											onClick={() =>
												toggleWatchlist(removeFromWatchlist, false)
											}
										>
											Remove From Watchlist <i className="far fa-eye-slash"></i>
										</button>
									)}
								</Mutation>
							)}
							{!isFavorited ? (
								<Mutation
									mutation={ADD_TO_FAVORITES}
									variables={{ email: user.email, movieId: details.id }}
								>
									{(addToFavorites) => (
										<button
											className="btn btn-danger"
											onClick={() => toggleFavorite(addToFavorites, true)}
										>
											Add To Favorites <i className="far fa-heart"></i>
										</button>
									)}
								</Mutation>
							) : (
								<Mutation
									mutation={REMOVE_FROM_FAVORITES}
									variables={{ email: user.email, movieId: details.id }}
								>
									{(removeFromFavorites) => (
										<button
											className="btn btn-danger"
											onClick={() => toggleFavorite(removeFromFavorites, false)}
										>
											Remove From Favorites <i className="fas fa-heart"></i>
										</button>
									)}
								</Mutation>
							)}
						</div>
					</div>
				</div>
			)}

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
					color: #f04124;
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
};

export const getInitialProps = async ({ query }) => {
	return {
		movie: query,
	};
};

export default Movie;
