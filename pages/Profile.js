import Layout from "../client/components/Layout";

const Profile = (props) => (
	<Layout session={props.session} title="Profile">
		<div>
			<h2>Profile</h2>
			<p>Here are some details of the user.</p>
		</div>
	</Layout>
);

export default Profile;
