import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { NotificationContainer } from "react-notifications";

const Layout = (props) => (
	<div>
		<Head>
			<title>Flick Finder | {props.title}</title>
		</Head>
		<header>
			<Navbar session={props.session} />
		</header>
		<div className="container">{props.children}</div>
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
