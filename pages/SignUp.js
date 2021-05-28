import { useState } from "react";
import Layout from "../client/components/Layout";
import { useMutation } from "@apollo/client";
import { SIGN_UP_USER } from "../mutations";
import Router from "next/router";

const SignUpPage = ({ session, refetch }) => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [signUpUser, { data, loading, error }] = useMutation(SIGN_UP_USER);

	const clearForm = () => {
		setFirstName("");
		setLastName("");
		setEmail("");
		setPassword("");
		setPasswordConfirm("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		signUpUser({ variables: { firstName, lastName, email, password } }).then(
			async ({ data }) => {
				// store token and redirect after sign up
				localStorage.setItem("userToken", data.signUpUser.token);
				await refetch();
				clearForm();
				Router.push("/Profile", "/profile");
			}
		);
	};

	const validateForm = () => {
		const isInvalid =
			!firstName ||
			!lastName ||
			!email ||
			!password ||
			password !== passwordConfirm;
		return isInvalid;
	};

	return (
		<Layout session={session} title="Sign Up">
			<div className="signup-wrapper">
				<h2>Sign Up</h2>
				<hr />
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="#signupFirstName">First Name</label>
						<input
							type="text"
							className="form-control"
							id="signupFirstName"
							name="firstName"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="First Name"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="#signupLastName">Last Name</label>
						<input
							type="text"
							className="form-control"
							id="signupLastName"
							name="lastName"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Last Name"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="#signupEmail">Email Address</label>
						<input
							type="email"
							className="form-control"
							id="signupEmail"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email Address"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="#signupPassword">Password</label>
						<input
							type="password"
							className="form-control"
							id="signupPassword"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="#signupPasswordConfirm">Confirm Password</label>
						<input
							type="password"
							className="form-control"
							id="signupPasswordConfirm"
							name="passwordConfirm"
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
							placeholder="Confirm Password"
						/>
					</div>
					<button
						type="submit"
						className="btn btn-primary"
						disabled={loading || validateForm()}
					>
						Sign In
					</button>
					{error && <div className="errMsg">{error.message}</div>}
				</form>
			</div>
			<style jsx>{`
				.signup-wrapper {
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
					color: #f04124;
					margin: 15px 0;
				}
			`}</style>
		</Layout>
	);
};

export default SignUpPage;
