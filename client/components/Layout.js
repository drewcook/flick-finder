import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { NotificationContainer } from 'react-notifications';

const Layout = props => (
	<div>
		<Head>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<meta charSet="utf-8" />
			<title>Flick Finder | {props.title}</title>
			<link rel="stylesheet" href="/static/css/bootstrap.min.css" />
			<link rel="stylesheet" href="/static/css/notifications.min.css" />
		</Head>
		<header>
			<Navbar session={props.session} />
		</header>
		<div className="container">
			{props.children}
		</div>
		<Footer />
		<NotificationContainer />
		<style jsx global>{`
			/* global styles go here */
			body {
				padding-bottom: 50px;
				min-height: 100vh;
				position: relative;
			}
		`}</style>
	</div>
);

export default Layout;
