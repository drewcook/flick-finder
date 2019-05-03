import App from "next/app";
import { ApolloProvider } from "react-apollo";
import { client } from "../client/client.js";
import withSession from "../client/components/withSession";

class FlickFinder extends App {
	render() {
		const { Component } = this.props;
		const Root = withSession(Component);
		return (
			<ApolloProvider client={client}>
				<Root {...this.props} />
			</ApolloProvider>
		);
	}
}

export default FlickFinder;
