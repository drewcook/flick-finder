import Layout from "../client/components/Layout";
import { Mutation } from "react-apollo";
import { SIGN_UP_USER } from "../mutations";
import Router from "next/router";

class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirm: ""
		};
	}

	handleChange = e => {
		const {name, value} = e.target;
		this.setState({
			[name]: value,
		});
	}

	handleSubmit = (e, signUpUser) => {
		e.preventDefault();
		const {firstName, lastName, email, password} = this.state;
		signUpUser(firstName, lastName, email, password).then(async ({data}) => {
			// store token and redirect after sign up
			localStorage.setItem("userToken", data.signUpUser.token);
			await this.props.refetch();
			this.clearForm();
			Router.push("/Profile", "/profile");
		});
	}

	clearForm = () => {
		this.setState({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			passwordConfirm: ""
		})
	}

	validateForm = () => {
		const {firstName, lastName, email, password, passwordConfirm} = this.state;
		const isInvalid = !firstName || !lastName || !email  || !password || password !== passwordConfirm;
		return isInvalid;
	};

	render () {
		const {firstName, lastName, email, password, passwordConfirm} = this.state;
		return (
			<Layout session={this.props.session} title="Sign Up">
				<h2>Sign Up</h2>
				<hr/>
				<Mutation mutation={SIGN_UP_USER} variables={{firstName, lastName, email, password}}>
					{(signUpUser, {data, loading, error}) => {
						return (
							<form onSubmit={e=>this.handleSubmit(e, signUpUser)}>
								<div className="form-group">
									<label htmlFor="#signupFirstName">First Name</label>
									<input type="text" className="form-control" id="signupFirstName" name="firstName" value={firstName} onChange={this.handleChange} placeholder="First Name" />
								</div>
								<div className="form-group">
									<label htmlFor="#signupLastName">Last Name</label>
									<input type="text" className="form-control" id="signupLastName" name="lastName" value={lastName} onChange={this.handleChange} placeholder="Last Name" />
								</div>
								<div className="form-group">
									<label htmlFor="#signupEmail">Email Address</label>
									<input type="email" className="form-control" id="signupEmail" name="email" value={email} onChange={this.handleChange} placeholder="Email Address" />
								</div>
								<div className="form-group">
									<label htmlFor="#signupPassword">Password</label>
									<input type="password" className="form-control" id="signupPassword" name="password" value={password} onChange={this.handleChange} placeholder="Password" />
								</div>
								<div className="form-group">
									<label htmlFor="#signupPasswordConfirm">Confirm Password</label>
									<input type="password" className="form-control" id="signupPasswordConfirm" name="passwordConfirm" value={passwordConfirm} onChange={this.handleChange} placeholder="Confirm Password" />
								</div>
								<button type="submit" className="btn btn-primary" disabled={loading || this.validateForm()}>Sign In</button>
								{error && <div className="errMsg">{error.message}</div>}
							</form>
						);
					}}
				</Mutation>
				<style jsx>{`
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

export default SignUp;
