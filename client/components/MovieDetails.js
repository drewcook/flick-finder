import Link from "next/link";

const MovieDetails = ({details}) => (
	<div className="card">
		<img className="card-img-top" src={details.posterPath} alt={details.title} className="img-fluid" />
		<div className="card-body">
			<h3 className="card-title">{details.title}</h3>
			<p>{details.overview}</p>
			<p>Released: {details.releaseDate}</p>
			<Link href=""><a className="btn btn-primary">View Details</a></Link>
		</div>
		<style jsx>{`
			
		`}</style>
	</div>
);

export default MovieDetails;
