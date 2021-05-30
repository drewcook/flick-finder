import Document, { Html, Head, Main, NextScript } from "next/document";
import getConfig from "next/config";

const {
	publicRuntimeConfig: { GA_TAG },
} = getConfig();

class FlickFinderDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link rel="stylesheet" href="/css/bootstrap.min.css" />
					<link
						rel="stylesheet"
						href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
						integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
						crossOrigin="anonymous"
					/>
					<link rel="stylesheet" href="/css/notifications.min.css" />
					<link rel="icon" href="/img/favicon.ico" type="image/x-icon" />
					{process.env.NODE_ENV === "production" && (
						<>
							{/* Google Analytics */}
							<script
								async
								src={`https://www.googletagmanager.com/gtag/js?id=${GA_TAG}`}
							></script>
							<script
								dangerouslySetInnerHTML={{
									__html: `
										window.dataLayer = window.dataLayer || [];
										function gtag(){dataLayer.push(arguments);}
										gtag('js', new Date());
										gtag('config', '${GA_TAG}');
									`,
								}}
							/>
						</>
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
					<script
						src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
						integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
						crossOrigin="anonymous"
					></script>
					<script
						src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
						integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
						crossOrigin="anonymous"
					></script>
					<script
						src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.min.js"
						integrity="sha384-+YQ4JLhjyBLPDQt//I+STsc9iw4uQqACwlvpslubQzn4u2UU2UFM80nGisd026JF"
						crossOrigin="anonymous"
					></script>
				</body>
			</Html>
		);
	}
}

export default FlickFinderDocument;
