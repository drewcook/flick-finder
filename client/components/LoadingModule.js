const LoadingModule = () => (
	<div>
		<img src="/static/img/loading.gif" />
		<style jsx>{`
			div {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100vh;
				width: 100vw;
			}
			h4 {
				font-weight: normal;
			}
		`}</style>
	</div>
);

export default LoadingModule;
