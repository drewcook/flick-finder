import App from "../client/components/App";

class SignIn extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
	}

	handleChange = e => {
		const {name, value} = e.target;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit = e => {
		e.preventDefault();
		const {email, password} = this.state;
		console.log(email, password);
	}

	validateForm = () => {
		const {email, password} = this.state;
		const isInvalid = !email || !password;
		return isInvalid;
	};

	render() {
		const {email, password} = this.state;

		return (
			<App title="Sign In">
				<h2>Sign In</h2>
				<hr/>
				<form onSubmit={e=>this.handleSubmit(e)}>
					<div className="form-group">
						<label htmlFor="#signinEmail">Email Address</label>
						<input type="email" className="form-control" id="signinEmail" name="email" value={email} onChange={this.handleChange} placeholder="Email Address" />
					</div>
					<div className="form-group">
						<label htmlFor="#signinPassword">Password</label>
						<input type="password" className="form-control" id="signinPassword" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
					</div>
					<button type="submit" className="btn btn-primary" disabled={this.validateForm()}>Sign In</button>
				</form>
				<style jsx>{`
					h2 {
						margin: 0;
					}
					hr {
						margin-bottom: 40px;
					}
				`}</style>
			</App>
		);
	}
}

export default SignIn;
