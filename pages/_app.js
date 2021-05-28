import App from "next/app";
import { ApolloProvider } from "@apollo/client";
import { initializeApollo } from "../lib/apolloClient";
import withSession from "../client/components/withSession";

class FlickFinder extends App {
	render() {
		const { Component } = this.props;
		const Root = withSession(Component);
		const apolloClient = initializeApollo();

		return (
			<ApolloProvider client={apolloClient}>
				<Root {...this.props} />
			</ApolloProvider>
		);
	}
}

export default FlickFinder;
