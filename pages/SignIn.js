import Layout from "../client/components/Layout";
import { Mutation } from "react-apollo";
import { SIGN_IN_USER } from "../mutations";
import Router from "next/router";

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

	handleSubmit = (e, signInUser) => {
		e.preventDefault();
		const {email, password} = this.state;
		signInUser(email, password).then(async ({data}) => {
			// store token and redirect after sign in
			localStorage.setItem("userToken", data.signInUser.token);
			await this.props.refetch();
			this.clearForm();
			Router.push("/Profile", "/profile");
		});
	}

	clearForm = () => {
		this.setState({
			email: "",
			password: ""
		})
	}

	validateForm = () => {
		const {email, password} = this.state;
		const isInvalid = !email || !password;
		return isInvalid;
	};

	render() {
		const {email, password} = this.state;

		return (
			<Layout session={this.props.session} title="Sign In">
				<div className="signin-wrapper">
					<h2>Sign In</h2>
					<hr/>
					<Mutation mutation={SIGN_IN_USER} variables={{email, password}}>
						{(signInUser, {data, loading, error}) => {
							return (
								<form onSubmit={e=>this.handleSubmit(e, signInUser)}>
									<div className="form-group">
										<label htmlFor="#signinEmail">Email Address</label>
										<input type="email" className="form-control" id="signinEmail" name="email" value={email} onChange={this.handleChange} placeholder="Email Address" />
									</div>
									<div className="form-group">
										<label htmlFor="#signinPassword">Password</label>
										<input type="password" className="form-control" id="signinPassword" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
									</div>
									<button type="submit" className="btn btn-primary" disabled={loading || this.validateForm()}>Sign In</button>
									{error && <div className="errMsg">{error.message}</div>}
								</form>
							);
						}}
					</Mutation>
				</div>
				<style jsx>{`
					.signin-wrapper {
						width: 100%;
						max-width: 600px;
						margin: auto;
					}
					h2 {
						margin: 0;
					}
					hr {
						margin-bottom: 40px;
					}
					.errMsg {
						font-size: 14px;
						color: #F04124;
						margin: 15px 0;
					}
				`}</style>
			</Layout>
		);
	}
}

export default SignIn;
