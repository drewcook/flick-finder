import Head from "next/head";
import Navbar from "./Navbar";

const Layout = props => (
	<div>
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta charSet="utf-8" />
			<title>Flick Finder | {props.title}</title>
			<link rel="stylesheet" href="/static/css/bootstrap.min.css" />
		</Head>
		<Navbar session={props.session} />
		<div className="container">
			{props.children}
		</div>
		<style jsx global>{`
			/* global styles go here */
		`}</style>
	</div>
);

export default Layout;
