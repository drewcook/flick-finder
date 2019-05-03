import Layout from "../client/components/Layout";

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
					<div className="col-xs-12 col-md-6">
						<h3>My Watchlist</h3>
					</div>
					<div className="col-xs-12 col-md-6">
						<h3>Favorites</h3>
					</div>
				</div>
				<style jsx>{`
					h2 {
						margin: 0;
					}
					hr {
						margin-bottom: 40px;
					}
					.row {
						margin-bottom: 30px;
					}
				`}</style>
			</div>
		</Layout>
	);
}

export default Profile;
