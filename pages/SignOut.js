import { ApolloConsumer } from "@apollo/client";
import Router from "next/router";
import Layout from "../client/components/Layout";

const handleSignout = (client) => {
	// clear token
	localStorage.removeItem("userToken");
	// reset provider store
	client.resetStore();
	// redirect
	Router.push("/");
};

const SignOut = (props) => (
	<ApolloConsumer>
		{(client) => {
			return (
				<Layout session={props.session} title="Sign Out">
					<div>
						<h2>We'll see you soon!</h2>
						<button
							className="btn btn-primary"
							onClick={() => handleSignout(client)}
						>
							Sign Out
						</button>
					</div>
					<style jsx>{`
						div {
							text-align: center;
						}
						h2 {
							margin: 0 0 40px;
						}
					`}</style>
				</Layout>
			);
		}}
	</ApolloConsumer>
);

export default SignOut;
