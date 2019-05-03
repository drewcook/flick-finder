import Link from "next/link";

const NavbarWithAuth = () => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
		<Link href="/"><a className="navbar-brand">FLICK FINDER</a></Link>
		<div className="collapse navbar-collapse" id="navbarColor01">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<Link href="/"><a className="nav-link" title="Home">Home</a></Link>
				</li>
				<li className="nav-item">
					<Link href="/Browse" as="/browse"><a className="nav-link" title="Browse">Browse</a></Link>
				</li>
				<li className="nav-item">
					<Link href="/Profile" as="/profile"><a className="nav-link" title="Profile">Profile</a></Link>
				</li>
				<li className="nav-item">
					<Link href="/SignOut" as="/signout"><a className="nav-link" title="Sign Out">Sign Out</a></Link>
				</li>
			</ul>
		</div>
		<style jsx>{`
			nav {
				margin-bottom: 50px;
			}
			.navbar-brand {
				font-size: 22px;
				margin-right: 40px;
			}
			li a {
				font-size: 16px;
			}
		`}</style>
	</nav>
);

const NavbarWithOutAuth = () => (
	<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
		<Link href="/"><a className="navbar-brand">FLICK FINDER</a></Link>
		<div className="collapse navbar-collapse" id="navbarColor01">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<Link href="/"><a className="nav-link" title="Home">Home</a></Link>
				</li>
				<li className="nav-item">
					<Link href="/SignIn" as="/signin"><a className="nav-link" title="Sign In">Sign In</a></Link>
				</li>
				<li className="nav-item">
					<Link href="/SignUp" as="signup"><a className="nav-link" title="Sign Up">Sign Up</a></Link>
				</li>
			</ul>
		</div>
		<style jsx>{`
			nav {
				margin-bottom: 50px;
			}
			.navbar-brand {
				font-size: 22px;
				margin-right: 40px;
			}
			li a {
				font-size: 16px;
			}
		`}</style>
	</nav>
);

const Navbar = (props) => {
	return props.session.getCurrentUser === null ?
		<NavbarWithOutAuth/> :
		<NavbarWithAuth/>;
}

export default Navbar;
