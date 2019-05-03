import Layout from "../client/components/Layout";

const Movie = props => (
	<Layout session={props.session} title="Movie Details">
		<div>Movie!</div>
	</Layout>
);

Movie.getInitialProps = ({ query }) => {
	return {
		movie: query
	};
}

export default Movie;
