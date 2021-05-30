import Link from "next/link";

const NavbarWithAuth = () => (
	<nav className="navbar navbar-expand-sm navbar-dark bg-primary">
		<Link href="/">
			<a className="navbar-brand">FLICK FINDER</a>
		</Link>
		<button
			className="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#authNavbar"
			aria-controls="authNavbar"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span className="navbar-toggler-icon" />
		</button>
		<div className="collapse navbar-collapse" id="authNavbar">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<Link href="/">
						<a className="nav-link" title="Home">
							Home
						</a>
					</Link>
				</li>
				<li className="nav-item">
					<Link href="/browse" as="/browse">
						<a className="nav-link" title="Browse">
							Trending
						</a>
					</Link>
				</li>
				<li className="nav-item">
					<Link href="/search" as="search">
						<a className="nav-link" title="Search">
							Search
						</a>
					</Link>
				</li>
			</ul>
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link href="/profile" as="/profile">
						<a className="nav-link" title="Profile">
							Profile
						</a>
					</Link>
				</li>
				<li className="nav-item">
					<Link href="/signout" as="/signout">
						<a className="nav-link" title="Sign Out">
							Sign Out
						</a>
					</Link>
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
	<nav className="navbar navbar-expand-sm navbar-dark bg-primary">
		<Link href="/">
			<a className="navbar-brand">FLICK FINDER</a>
		</Link>
		<button
			className="navbar-toggler"
			type="button"
			data-toggle="collapse"
			data-target="#unauthNavbar"
			aria-controls="unauthNavbar"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span className="navbar-toggler-icon" />
		</button>
		<div className="collapse navbar-collapse" id="unauthNavbar">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<Link href="/">
						<a className="nav-link" title="Home">
							Home
						</a>
					</Link>
				</li>
			</ul>
			<ul className="navbar-nav">
				<li className="nav-item">
					<Link href="/signin" as="/signin">
						<a className="nav-link" title="Sign In">
							Sign In
						</a>
					</Link>
				</li>
				<li className="nav-item">
					<Link href="/signup" as="signup">
						<a className="nav-link" title="Sign Up">
							Sign Up
						</a>
					</Link>
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
	return props.session && props.session.getCurrentUser ? (
		<NavbarWithAuth />
	) : (
		<NavbarWithOutAuth />
	);
};

export default Navbar;
