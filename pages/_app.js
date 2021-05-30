import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../client/apollo-client/apolloClient";
import withSession from "../client/components/withSession";

const FlickFinder = (props) => {
	const { Component, pageProps } = props;
	const Root = withSession(Component);
	const apolloClient = useApollo(pageProps);

	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
			</Head>
			<ApolloProvider client={apolloClient}>
				<Root {...pageProps} />
			</ApolloProvider>
		</>
	);
};

export default FlickFinder;
