import React, { Component } from 'react'
import SubmitButton from '../Component/SubmitButton/SubmitButton';
import '../Assets/Css/SignUpForm.css';
import { Form, Message } from 'semantic-ui-react'

export class SignUpForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			email: '',
			first_name: '',
			last_name: '',
			phone: '',
			password: '',
			isEmailValid: true,
			isFNameValid: true,
			isLNameValid: true,
			isPhoneValid: true,
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
			isFNameValid: true,
			isLNameValid: true,
			isPhoneValid: true,
			isPasswordValid: true,

		})
	}

	resetForm() {
		this.setState({
			email: '',
			first_name: '',
			last_name: '',
			phone: '',
			password: '',
			buttonDisabled: false
		})
	}

	async signUp() {
		if (!this.state.email || !this.state.first_name || !this.state.last_name ||
			!this.state.phone || !this.state.password) {
			this.setState({
				isEmailValid: this.state.email,
				isPasswordValid: this.state.password,
				isFNameValid: this.state.first_name,
				isLNameValid: this.state.last_name,
				isPhoneValid: this.state.phone,
				errorMessage: "Please fill out missing areas"
			})
			return;
		}

		try {
			let res = await fetch('http://0.0.0.0:5000/register', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: this.state.email,
					fname: this.state.first_name,
					lname: this.state.last_name,
					phone: this.state.phone,
					password: this.state.password,
					role_id: 1
				})
			});
			let result = await res.json();
			if (result.message === "User already exists") {
				this.resetForm()
				this.setState({
					errorMessage: "User with that email already exists"
				})

			}
			else if (result.message === "something went wrong try again") {
				this.resetPasswordForm()
				this.setState({
					isEmailValid: false,
					errorMessage: "Server Error. Please Refresh Page"
				})
			}
			else {
				this.props.history.push('/login')
			}
		} catch (e) {
			this.setState({
				isEmailValid: false,
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}

	render() {
		return (
			<div className="wrapper">
				<div className="form-wrapper">
					<h1>Sign Up</h1>
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					<Form >
						<Form.Field error={this.state.isEmailValid ? false : true}>
							<label>Email</label>
							<input
								name="email"
								placeholder="Email"
								value={this.state.email ? this.state.email : ''}
								onChange={e => this.setInputValue('email', e.target.value)}
							/>
						</Form.Field>
						<Form.Field error={this.state.isFNameValid ? false : true}>
							<label>First Name</label>
							<input
								name="first_name"
								placeholder="First Name"
								value={this.state.first_name ? this.state.first_name : ''}
								onChange={e => this.setInputValue('first_name', e.target.value)}
							/>
						</Form.Field>
						<Form.Field error={this.state.isLNameValid ? false : true}>
							<label>Last Name</label>
							<input
								name="last_name"
								placeholder="Last Name"
								value={this.state.last_name ? this.state.last_name : ''}
								onChange={e => this.setInputValue('last_name', e.target.value)}
							/>
						</Form.Field>
						<Form.Field error={this.state.isPhoneValid ? false : true}>
							<label>Phone Number</label>
							<input
								name="phone"
								placeholder="Phone Number"
								value={this.state.phone ? this.state.phone : ''}
								onChange={e => this.setInputValue('phone', e.target.value)}
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
							/>
						</Form.Field>
					</Form>

					<SubmitButton
						text='Sign Up'
						disabled={this.state.buttonDisabled}
						onClick={() => this.signUp()}
						className="createAccount"
					/>
					<a className="haveAccount" href="/login"><small>Already Have an Account?</small></a>
				</div>
			</div>
		)
	}
}

export default SignUpForm
