const Footer = () => (
	<footer>
		<span>&copy; {new Date().getFullYear()} | Flick Finder</span>
		<style jsx>{`
			footer {
				background-color: #333;
				padding: 8px;
				text-align: center;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				height: 40px;
			}
			span {
				color: #fff;
				font-size: 13px;
			}
		`}</style>
	</footer>
);

export default Footer;
