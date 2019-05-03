// type can be 'success', 'info', 'warning', or 'danger'
const MovieRating = ({rating}) => {
	const percent = rating * 10;
	let type;
	if (percent > 66) {
		type = "success";
	} else if (percent > 33) {
		type = "warning";
	} else {
		type = "danger";
	}
	return (
		<div className="progress">
			<div className={`progress-bar bg-${type}`} role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100"></div>
			<style jsx>{`
				.progress {
					margin: 15px 0;
				}
				.progress-bar {
					width: ${percent}%;
				}
			`}</style>
		</div>
	);
}

export default MovieRating;
