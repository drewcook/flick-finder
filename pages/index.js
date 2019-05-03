import Layout from "../client/components/Layout";

const Index = props => (
	<Layout session={props.session} title="Welcome">
		<div>
			<h1>Welcome to Flick Finder!</h1>
			<p>This is an application that helps you find movies and TV shows to watch.  Sign in to view your flicks or sign up as a new user.</p>
		</div>
	</Layout>
);

export default Index;
