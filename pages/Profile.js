import Layout from "../client/components/Layout";
import { Query } from "react-apollo";
import LoadingModule from "../client/components/LoadingModule";
import { GET_WATCHLIST, GET_FAVORITES } from "../queries";
import MovieRating from "../client/components/MovieRating";
import Link from "next/link";

const formatDate = date => {
	const newDate = new Date(date).toLocaleDateString("en-US");
	const newTime = new Date(date).toLocaleTimeString("en-US");
	return `${newDate} at ${newTime}`;
}

const Profile = (props) => {
	const user = props.session.getCurrentUser;
	const joinDate = parseInt(user.joinDate);
	return (
		<Layout session={props.session} title="Profile">
			<div>
				<h2>Hello, {user.firstName}!</h2>
				<hr/>
				<div className="row">
					<div className="col-xs-12 col-md-6">
						<div className="card border-secondary mb-3">
							<div className="card-header">My Details</div>
							<div className="card-body">
								<h4 className="card-title"></h4>
								<div className="card-text">
									<dl className="dl-horizontal">
										<dt>Name</dt>
										<dd>{user.firstName} {user.lastName}</dd>
										<dt>Email</dt>
										<dd>{user.email}</dd>
										<dt>Joined</dt>
										<dd>{formatDate(joinDate)}</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xs-12 col-md-6">
					</div>
				</div>
				<hr/>
				<div className="row">
					<div className="col-xs-12 col-md-6 watchlist">
						<h3>My Watchlist</h3>
						<Query query={GET_WATCHLIST} variables={{email: props.session.getCurrentUser.email}}>
							{({data, loading, error}) => {
								if (loading) return <LoadingModule />
								if (error) return <p className="text-danger">Error getting watchlist.</p>
								console.log(data);
								return data.getWatchlist.map((movie, idx) => (
									<div key={movie.id} className="card bg-light border-dark mb-3">
										<div className="card-header bg-dark">{movie.title}</div>
										<div className="card-body">
											<img src={movie.posterPath} alt={movie.title} className="border-secondary" />
											<small style={{marginTop: "30px"}}>Released: {new Date(movie.releaseDate).toLocaleDateString("en-US")}</small>
											<small>Genres:
												{movie.genres.map(genre => (
													<span key={genre.name} className="genre"><em>{genre.name}</em></span>
												))}
											</small>
											<small style={{marginBottom: "-14px"}}>Viewer Rating:</small>
											<MovieRating rating={movie.voteAverage} />
											<div className="btn-group d-block">
												<Link href={`/movie/${movie.id}`}><button className="btn btn-sm btn-info">Details</button></Link>
												<button className="btn btn-sm btn-danger">Remove</button>
											</div>
										</div>
									</div>
								));
							}}
						</Query>
					</div>
					<div className="col-xs-12 col-md-6 favorites">
						<h3>Favorites</h3>
						<Query query={GET_FAVORITES} variables={{email: props.session.getCurrentUser.email}}>
							{({data, loading, error}) => {
								if (loading) return <LoadingModule />
								if (error) return <p className="text-danger">Error getting favorites.</p>
								console.log(data);
								return data.getFavorites.map((movie, idx) => (
									<div key={movie.id} className="card bg-light border-dark mb-3">
										<div className="card-header bg-dark">{movie.title}</div>
										<div className="card-body">
											<img src={movie.posterPath} alt={movie.title} className="border-secondary" />
											<small style={{marginTop: "30px"}}>Released: {new Date(movie.releaseDate).toLocaleDateString("en-US")}</small>
											<small>Genres:
												{movie.genres.map(genre => (
													<span key={genre.name} className="genre"><em>{genre.name}</em></span>
												))}
											</small>
											<small style={{marginBottom: "-14px"}}>Viewer Rating:</small>
											<MovieRating rating={movie.voteAverage} />
											<div className="btn-group d-block">
												<Link href={`/movie/${movie.id}`}><button className="btn btn-sm btn-info">Details</button></Link>
												<button className="btn btn-sm btn-danger">Remove</button>
											</div>
										</div>
									</div>
								));
							}}
						</Query>
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
					.card-header {
						color: #fff;
						font-size: 20px;
					}
					.watchlist img, .favorites img {
						float: left;
						max-height: 200px;
						margin-right: 15px;
					}
					@media (min-width: 768px) and (max-width: 991px) {
						.watchlist img, .favorites img {
							display: block;
							float: none;
							max-height: 250px;
							margin: 0 auto -10px;
						}
					}
					.watchlist small, .favorites small {
						margin-top: 10px;
						display: block;
					}
					.watchlist small span, .favorites small span {
						margin: 0 4px;
					}
					.watchlist .btn-group, .favorites .btn-group {
						margin-top: 10px;
						
					}
					.watchlist .btn, .favorites .btn {
						margin-right: 10px;
						width: 90px;
					}
				`}</style>
			</div>
		</Layout>
	);
}

export default Profile;
