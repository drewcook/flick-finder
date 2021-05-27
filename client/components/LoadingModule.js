const LoadingModule = (props) => (
	<div>
		<img src="/img/loading.gif" width={400} height={400} />
		<style jsx>{`
			div {
				display: flex;
				justify-content: center;
				align-items: center;
				width: ${props.style && props.style.width ? props.style.width : "100%"};
				height: ${props.style && props.style.height
					? props.style.height
					: "100%"};
			}
			h4 {
				font-weight: normal;
			}
		`}</style>
	</div>
);

export default LoadingModule;
