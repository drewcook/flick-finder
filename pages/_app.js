import App from "next/app";
import { ApolloProvider } from "react-apollo";
import apolloClient from "../lib/apolloClient";
import withSession from "../client/components/withSession";

class FlickFinder extends App {
	render() {
		const { Component } = this.props;
		const Root = withSession(Component);
		return (
			<ApolloProvider client={apolloClient}>
				<Root {...this.props} />
			</ApolloProvider>
		);
	}
}

export default FlickFinder;
