import Layout from "../client/components/Layout";
import Link from "next/link";

const Index = (props) => (
	<Layout session={props.session} title="Welcome">
		<div className="page-wrapper">
			<div id="banner" className="carousel" data-ride="carousel">
				<div className="carousel-inner">
					<div className="carousel-item active">
						<video
							className="d-block w-100"
							poster="https://ak9.picdn.net/shutterstock/videos/30171919/thumb/1.jpg"
							loop
							autoPlay
						>
							<source
								src="https://ak9.picdn.net/shutterstock/videos/30171919/preview/stock-footage-front-view-of-an-old-fashioned-antique-super-mm-film-projector-projecting-a-beam-of-light-in-a.webm"
								type="video/webm"
							/>
						</video>
					</div>
				</div>
			</div>
			<h2>Welcome to Flick Finder!</h2>
			<p className="lead">Now finding a movie to watch is easier than ever!</p>
			<div className="banner-spacer"></div>
			<div className="row">
				<div className="col-xs-12 col-md-6">
					<div className="about">
						<h3>About</h3>
						<p>
							Flick Finder helps you find even the most obscure films. With well
							over 400,000 titles to search through, there's no reason to not
							find what you're looking for.
						</p>
						<p>Why are you still sitting on your couch?</p>
						<Link href="/signup" as="signup">
							<a className="btn btn-success">Get Started!</a>
						</Link>
					</div>
				</div>
				<div className="col-xs-12 col-sm-6">
					<div className="features">
						<h3>Features</h3>
						<ul>
							<li>Search directly for movie titles.</li>
							<li>Browse current trending titles.</li>
							<li>Save your favorite movies</li>
							<li>Manage your own watchlist.</li>
						</ul>
					</div>
				</div>
			</div>
			<img
				src="/img/movie_db_green.jpg"
				alt="Powered by the Movie DB API"
				className="img-fluid"
			/>
			<style jsx>{`
				.page-wrapper {

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
				@media (min-width: 480px) { #banner { height: 270px; margin-top: -90px } }
				@media (min-width: 710px) { #banner { height: 400px; margin-top: -130px; } }
				video {
					opacity: 0.5;
				}
				.carousel-inner, .carousel-item {
					max-height: 400px;
					height: 100%;
				}
				h2 {
					text-align: center;
					margin: 0 0 20px;
					color: #fff;
				}
				@media (min-width: 480px) { h2 { margin-top: 80px; } }
				@media (min-width: 710px) { h2 { margin-top: 130px; } }
				p.lead {
					text-align: center;
					color: #fff;
				}
				.banner-spacer {
					height: 120px;
				}
				@media (min-width: 710px) { .banner-spacer { height: 200px; } }
				.about {
					text
				}
				h3 {
					margin: 0 0 20px;
				}
				.about {}
				.features {}
				ul {
					list-style-type: circle;
					margin: 0;
					padding-left: 20px;
				}
				ul li {
					padding: 8px 0;
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
