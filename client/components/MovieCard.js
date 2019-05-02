import Link from "next/link";

const MovieCard = ({movie}) => (
	<div className="col-6 col-md-4 col-xl-3">
		<div className="card">
			<img className="card-img-top" src={movie.posterPath} alt={movie.title} className="img-fluid" />
			<div className="card-body">
				<h4 className="card-title">{movie.title}</h4>
				<p>Released: {movie.releaseDate}</p>
				<Link href=""><a className="btn btn-primary">View Details</a></Link>
			</div>
			<style jsx>{`
				.card {
					margin-bottom: 30px;
				}
			`}</style>
		</div>
	</div>
);

export default MovieCard;
