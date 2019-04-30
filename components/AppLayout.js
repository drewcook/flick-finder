import Head from "next/head";
import Navbar from "./Navbar";

const AppLayout = (props) => (
	<div>
		<Head>
			<title>Flick Finder | Welcome</title>
			<link rel="stylesheet" href="/static/css/bootstrap.min.css" />
		</Head>
		<Navbar/>
		<div className="container">
			{props.children}
		</div>
	</div>
);

export default AppLayout;
