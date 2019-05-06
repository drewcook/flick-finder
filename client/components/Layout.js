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
			<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />
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
