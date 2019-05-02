import Head from "next/head";
import Navbar from "./Navbar";

const Layout = (props) => (
	<div>
		<Head>
			<title>Flick Finder | {props.title}</title>
			<link rel="stylesheet" href="/static/css/bootstrap.min.css" />
		</Head>
		<Navbar/>
		<div className="container">
			{props.children}
		</div>
	</div>
);

export default Layout;
