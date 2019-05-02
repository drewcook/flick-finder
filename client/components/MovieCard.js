const MovieCard = ({movie}) => (
	<div>
		<h3>{movie.title}</h3>
		<img src={movie.posterPath} alt={movie.title} />
		<p>{movie.overview}</p>
		<small>Released: {movie.releaseDate}</small>
		<style jsx>{`
			
		`}</style>
	</div>
);

export default MovieCard;
