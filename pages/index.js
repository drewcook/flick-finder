import Layout from "../client/components/Layout";
import Link from "next/link";

const Index = props => (
	<Layout session={props.session} title="Welcome">
		<div className="page-wrapper">
			<div id="banner" className="carousel" data-ride="carousel">
				<div className="carousel-inner">
					<div className="carousel-item active">
						<video className="d-block w-100" poster="https://ak9.picdn.net/shutterstock/videos/30171919/thumb/1.jpg" loop autoPlay>
							<source src="https://ak9.picdn.net/shutterstock/videos/30171919/preview/stock-footage-front-view-of-an-old-fashioned-antique-super-mm-film-projector-projecting-a-beam-of-light-in-a.webm" type="video/webm" />
						</video>
					</div>
				</div>
			</div>
			<h2>Welcome to Flick Finder!</h2>
			<p className="lead">Now finding a movie to watch is easier than ever!</p>
			<div className="banner-spacer"></div>
			<div className="about">
				<h3>About</h3>
				<p>Flick Finder helps you find even the most obscure films. With well over 400,000 titles to search through, there's no reason to not find what you're looking for.</p>
				<p>Sign in to view your flicks or sign up as a new user.</p>
			</div>
			<Link href="/SignUp" as="signup"><a className="btn btn-success">Get Started</a></Link>
			<img src="/static/img/movie_db_green.jpg" alt="Powered by the Movie DB API" className="img-fluid" />
			<style jsx>{`
				.page-wrapper {
					text-align: center;
				}
				#banner {
					position: absolute;
					margin-top: -50px;
					left: 0;
					right: 0;
					z-index: -1;
					max-height: 400px;
					background: #000;
				}
				video {
					opacity: 0.5;
				}
				.carousel-inner, .carousel-item {
					max-height: 400px;
					height: 100%;
				}
				h2 {
					margin: 0 0 30px;
					color: #fff;
				}
				.banner-spacer {
					height: 300px;
				}
				p.lead {
					color: #fff;
				}
				.about h3 {
					margin: 0 0 20px;
				}
				img {
					max-width: 150px;
					width: 100%;
					float: right;
					position: absolute;
					bottom: 50px;
					right: 30px;
				}
			`}</style>
		</div>
	</Layout>
);

export default Index;
