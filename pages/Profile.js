import Layout from "../client/components/Layout";

const Profile = (props) => {
	const user = props.session.getCurrentUser;
	return (
		<Layout session={props.session} title="Profile">
			<div>
				<h2>Profile</h2>
				<h5>Hello {user.firstName + " " + user.lastName}!</h5>
				<ul className="list-group">
					<li className="list-group-item d-flex justify-content-between align-items-center">
						Email: {user.email}
					</li>
					<li className="list-group-item d-flex justify-content-between align-items-center">
						Joined {user.joinDate}
					</li>
				</ul>
			</div>
		</Layout>
	);
}

export default Profile;
