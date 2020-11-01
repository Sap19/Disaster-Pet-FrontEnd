import React from 'react';
import SubmitButton from '../Component/SubmitButton/SubmitButton';
import { Form, Message } from 'semantic-ui-react';
import '../Assets/Css/LoginForm.css'
import auth from "../Component/Auth/auth";

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			buttonDisabled: false,
			isEmailValid: true,
			isPasswordValid: true,
			errorMessage: "",
		}
	}

	setInputValue(property, val) {
		val = val.trim();
		if (val.length > 500) {
			return;
		}
		this.setState({
			[property]: val,
			isEmailValid: true,
			isPasswordValid: true,
			errorMessage: ""
		})
	}

	resetPasswordForm() {
		this.setState({
			password: '',
		})
	}

	async doLogin() {
		if (!this.state.email || !this.state.password) {
			this.setState({
				isEmailValid: this.state.email,
				isPasswordValid: this.state.password,
				errorMessage: "Please fill out missing areas"
			})
			return;
		}
		if (!this.state.email.includes('.') || !this.state.email.includes('@')) {
			this.setState({
				isEmailValid: this.state.email,
				errorMessage: "Email is Invalid"
			})
			return;
		}
		try {
			let res = await fetch('http://127.0.0.1:5000/login', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password
				})
			});
			let result = await res.json();

			if (result.message === "Email or Password Inncorect") {
				this.resetPasswordForm()
				this.setState({
					isEmailValid: false,
					isPasswordValid: false,
					errorMessage: "Email or Password Inncorect."
				})

			}
			else if (result.message === "user does not exist") {
				this.resetPasswordForm()
				this.setState({
					isEmailValid: false,
					errorMessage: "User with that email does not exist."
				})
			}
			else {
				localStorage.setItem('token', result.auth_token)
				auth.login(() => {
					this.props.history.push('/dashboard')
				})
			}
		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}

	}
	render() {
		return (
			<div className="wrapper">
				<div className="form-wrapper">
					<h1>Log in</h1>
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					<Form >
						<Form.Field error={this.state.isEmailValid ? false : true}>
							<label>Email</label>
							<input
								name="email"
								placeholder="Email"
								value={this.state.email ? this.state.email : ''}
								onKeyDown={(event) => { if (event.key === "Enter") { this.doLogin() } }}
								onChange={e => this.setInputValue('email', e.target.value)}
							/>
						</Form.Field>
						<Form.Field error={this.state.isPasswordValid ? false : true}>
							<label>Password</label>
							<input
								name="password"
								placeholder="Password"
								type="password"
								value={this.state.password ? this.state.password : ''}
								onChange={e => this.setInputValue('password', e.target.value)}
								onKeyDown={(event) => { if (event.key === "Enter") { this.doLogin() } }}
								error={this.state.isValid ? false : {
									content: 'Please enter a valid email address.',
									pointing: 'below'
								}}
							/>
						</Form.Field>
					</Form>
					<SubmitButton
						text='Log in'
						disabled={this.state.buttonDisabled}
						onClick={() => this.doLogin()}
						className="createAccount"
					/>
					<a className="forgotPassword" href="/forgotPassword"><small>Forgot Password?</small></a>
				</div>
			</div>
		);
	}
}

export default LoginForm;
