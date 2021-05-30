import { useState } from "react";
import Layout from "../client/components/Layout";
import { useMutation } from "@apollo/client";
import { SIGN_IN_USER } from "../mutations";
import Router from "next/router";

const SignIn = (props) => {
	const { session, refetch } = props;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signInUser, { data, loading, error }] = useMutation(SIGN_IN_USER);

	const handleSubmit = (e) => {
		e.preventDefault();

		signInUser({ variables: { email, password } }).then(async ({ data }) => {
			// store token and redirect after sign in
			localStorage.setItem("userToken", data.signInUser.token);
			await refetch();
			clearForm();
			Router.push("/Profile", "/profile");
		});
	};

	const clearForm = () => {
		setEmail("");
		setPassword("");
	};

	const validateForm = () => {
		const isInvalid = !email || !password;
		return isInvalid;
	};

	return (
		<Layout session={session} title="Sign In">
			<div className="signin-wrapper">
				<h2>Sign In</h2>
				<hr />

				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label htmlFor="#signinEmail">Email Address</label>
						<input
							type="email"
							className="form-control"
							id="signinEmail"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email Address"
						/>
					</div>
					<div className="form-group">
						<label htmlFor="#signinPassword">Password</label>
						<input
							type="password"
							className="form-control"
							id="signinPassword"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
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
					color: #f04124;
					margin: 15px 0;
				}
			`}</style>
		</Layout>
	);
};

export default SignIn;
