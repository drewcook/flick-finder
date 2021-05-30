import App from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../client/apollo-client/apolloClient";
import withSession from "../client/components/withSession";

const FlickFinder = (props) => {
	const { Component, pageProps } = props;
	const Root = withSession(Component);
	const apolloClient = useApollo(pageProps);

	return (
		<ApolloProvider client={apolloClient}>
			<Root {...pageProps} />
		</ApolloProvider>
	);
};

export default FlickFinder;
