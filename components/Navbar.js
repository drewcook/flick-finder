import Link from "next/link";

const Navbar = () => (
	<div>
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<Link href="/"><a className="navbar-brand"></a></Link>
			<div className="collapse navbar-collapse" id="navbarColor01">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link href=""><button className="nav-link" title="Home">Home</button></Link>
					</li>
					<li className="nav-item">
						<Link href="/browse"><a className="nav-link" title="Browse">Browse</a></Link>
					</li>
					<li className="nav-item">
						<Link href="/signin"><a className="nav-link" title="Sign In">Sign In</a></Link>
					</li>
					<li className="nav-item">
						<Link href="/signup"><a className="nav-link" title="Sign Up">Sign Up</a></Link>
					</li>
				</ul>
			</div>
		</nav>
		<style jsx>{`
			nav {
				background: #000,
				color: #fff
			}	
		`}</style>
	</div>
);

export default Navbar;
