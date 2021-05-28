import Layout from "../client/components/Layout";
import LoadingModule from "../client/components/LoadingModule";
import MovieRating from "../client/components/MovieRating";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client";
import { GET_WATCHLIST, GET_FAVORITES } from "../queries";
import { REMOVE_FROM_WATCHLIST, REMOVE_FROM_FAVORITES } from "../mutations";
import { NotificationManager } from "react-notifications";

const Profile = (props) => {
	const user = props.session.getCurrentUser;
	const joinDate = parseInt(user.joinDate);
	const { data, loading, error } = useQuery(GET_WATCHLIST, {
		variables: { email: user.email },
	});
	const {
		data: favoritesData,
		loading: favoritesLoading,
		error: favoritesError,
	} = useQuery(GET_FAVORITES, {
		variables: { email: user.email },
	});

	const formatDate = (date) => {
		const newDate = new Date(date).toLocaleDateString("en-US");
		const newTime = new Date(date).toLocaleTimeString("en-US");
		return `${newDate} at ${newTime}`;
	};

	const removeWatchlist = (callback) =>
		callback()
			.then(() =>
				NotificationManager.success(
					"You've removed an item from your watchlist.",
					"Success!"
				)
			)
			.catch(() =>
				NotificationManager.error("Something went wrong.", "Uh oh!")
			);

	const removeFavorite = (callback) =>
		callback()
			.then(() =>
				NotificationManager.success(
					"You've removed an item from your favorites.",
					"Success!"
				)
			)
			.catch(() =>
				NotificationManager.error("Something went wrong.", "Uh oh!")
			);

	return (
		<Layout session={props.session} title="Profile">
			<div>
				<h2>Hello, {user.firstName}!</h2>
				<hr />
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<div className="card border-secondary mb-3">
							<div className="card-header">
								<h3>
									<i className="fas fa-user"></i> My Details
								</h3>
							</div>
							<div className="card-body">
								<h4 className="card-title"></h4>
								<div className="card-text">
									<dl className="dl-horizontal">
										<dt>Name</dt>
										<dd>
											{user.firstName} {user.lastName}
										</dd>
										<dt>Email</dt>
										<dd>{user.email}</dd>
										<dt>Joined</dt>
										<dd>{formatDate(joinDate)}</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6"></div>
				</div>
				<hr />
				<div className="row">
					<div className="col-xs-12 col-md-6 watchlist">
						<h3>My Watchlist</h3>
						{loading && <LoadingModule />}
						{error && <p className="text-danger">Error getting watchlist.</p>}
						{data && data.getWatchlist.length ? (
							data.getWatchlist.map((movie, idx) => (
								<div key={movie.id} className="card bg-light border-dark mb-3">
									<div className="card-header bg-dark">
										<h4>{movie.title}</h4>
									</div>
									<div className="card-body">
										<img
											src={movie.posterPath}
											alt={movie.title}
											className="border-secondary"
										/>
										<small style={{ marginTop: "30px" }}>
											Released:{" "}
											{new Date(movie.releaseDate).toLocaleDateString("en-US")}
										</small>
										<small>
											Genres:
											{movie.genres.map((genre) => (
												<span key={genre.name} className="genre">
													<em>{genre.name}</em>
												</span>
											))}
										</small>
										<small style={{ marginBottom: "-14px" }}>
											Viewer Rating:
										</small>
										<MovieRating rating={movie.voteAverage} />
										<div className="btn-group d-block">
											<Link href={`/movie/${movie.id}`}>
												<button className="btn btn-sm btn-info">Details</button>
											</Link>
											<Mutation
												mutation={REMOVE_FROM_WATCHLIST}
												variables={{
													email: user.email,
													movieId: movie.id,
												}}
												refetchQueries={[
													{
														query: GET_WATCHLIST,
														variables: { email: user.email },
													},
												]}
											>
												{(removeFromWatchlist) => (
													<button
														className="btn btn-sm btn-danger"
														onClick={() => removeWatchlist(removeFromWatchlist)}
													>
														Remove <i className="fas fa-times"></i>
													</button>
												)}
											</Mutation>
										</div>
									</div>
								</div>
							))
						) : (
							<p>There are currently no items in your watchlist.</p>
						)}
					</div>
					<div className="col-xs-12 col-md-6 favorites">
						<h3>Favorites</h3>
						{favoritesLoading && <LoadingModule />}
						{favoritesError && (
							<p className="text-danger">Error getting watchlist.</p>
						)}
						{favoritesData && favoritesData.getFavorites.length ? (
							favoritesData.getFavorites.map((movie, idx) => (
								<div key={movie.id} className="card bg-light border-dark mb-3">
									<div className="card-header bg-dark">
										<h4>{movie.title}</h4>
									</div>
									<div className="card-body">
										<img
											src={movie.posterPath}
											alt={movie.title}
											className="border-secondary"
										/>
										<small style={{ marginTop: "30px" }}>
											Released:{" "}
											{new Date(movie.releaseDate).toLocaleDateString("en-US")}
										</small>
										<small>
											Genres:
											{movie.genres.map((genre) => (
												<span key={genre.name} className="genre">
													<em>{genre.name}</em>
												</span>
											))}
										</small>
										<small style={{ marginBottom: "-14px" }}>
											Viewer Rating:
										</small>
										<MovieRating rating={movie.voteAverage} />
										<div className="btn-group d-block">
											<Link href={`/movie/${movie.id}`}>
												<button className="btn btn-sm btn-info">
													Details <i className="fas fa-info-circle"></i>
												</button>
											</Link>
											<Mutation
												mutation={REMOVE_FROM_FAVORITES}
												variables={{ email: user.email, movieId: movie.id }}
												refetchQueries={[
													{
														query: GET_FAVORITES,
														variables: { email: user.email },
													},
												]}
											>
												{(removeFromFavorites) => (
													<button
														className="btn btn-sm btn-danger"
														onClick={() => removeFavorite(removeFromFavorites)}
													>
														Remove <i className="fas fa-times"></i>
													</button>
												)}
											</Mutation>
										</div>
									</div>
								</div>
							))
						) : (
							<p>There are currently no favorited items to show.</p>
						)}
					</div>
				</div>
				<style jsx>{`
					h2 {
						margin: 0;
					}
					h3 {
						margin-bottom: 30px;
					}
					hr {
						margin-bottom: 40px;
					}
					.row {
						margin-bottom: 30px;
					}
					.card-header h3 {
						color: #000;
						font-size: 22px;
						margin: 0;
					}
					.card-header h4 {
						color: #fff;
						font-size: 18px;
						margin: 0;
					}
					.watchlist img,
					.favorites img {
						float: left;
						max-height: 200px;
						margin-right: 15px;
					}
					@media (min-width: 768px) and (max-width: 991px) {
						.watchlist img,
						.favorites img {
							display: block;
							float: none;
							max-height: 250px;
							margin: 0 auto -10px;
						}
					}
					.watchlist small,
					.favorites small {
						margin-top: 10px;
						display: block;
					}
					.watchlist small span,
					.favorites small span {
						margin: 0 4px;
					}
					.watchlist .btn-group,
					.favorites .btn-group {
						margin-top: 10px;
					}
					.watchlist .btn,
					.favorites .btn {
						margin-right: 10px;
						width: 90px;
					}
				`}</style>
			</div>
		</Layout>
	);
};

export default Profile;
