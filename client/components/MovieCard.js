import Link from "next/link";

const MovieCard = ({movie}) => (
	<div className="col-6 col-md-4 col-xl-3">
		<div className="card">
			<img className="card-img-top" src={movie.posterPath} alt={movie.title} className="img-fluid" />
			<div className="card-body">
				<h4 className="card-title">{movie.title}</h4>
				<p>Released: {new Date(movie.releaseDate).toLocaleDateString("en-US")}</p>
				<Link href={`/Movie?id=${movie.id}`} as={`/movie/${movie.id}`}><a className="btn btn-primary">View Details <i className="fas fa-info-circle"></i></a></Link>
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
