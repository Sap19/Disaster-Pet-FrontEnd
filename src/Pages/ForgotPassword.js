import React, { Component } from 'react'
import SubmitButton from '../Component/SubmitButton/SubmitButton';
import { Form, Message } from 'semantic-ui-react';
import '../Assets/Css/LoginForm.css'
import i18n from '../Component/i18n/i18n';

export class ForgotPassword extends Component {
    constructor(props) {
		super(props);
		this.state = {
			email: '',
			isEmailValid: true,
			errorMessage: "",
			successMessage: "",
		}
	}
	resetEmailForm() {
		this.setState({
			email: '',
		})
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
			errorMessage: "",
			successMessage: ""
		})
	}
    async forgotPassword() {
		if (!this.state.email) {
			this.setState({
				isEmailValid: this.state.email,
				errorMessage: i18n.t("emailValidation.pleaseEnterValid")
			})
			return;
		}
		if (!this.state.email.includes('.') || !this.state.email.includes('@')) {
			this.setState({
				isEmailValid: this.state.email,
				errorMessage: i18n.t("emailValidation.invalid")
			})
			return;
		}
		try {
			let res = await fetch('http://127.0.0.1:5000/forgotpassword', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: this.state.email,
				})
			});
			let result = await res.json();

			if (result.message === "User does not exists") {
				this.resetEmailForm()
				this.setState({
					isEmailValid: false,
					errorMessage: i18n.t("forgot.userEmailDoesntExisit")
				})
			}
			if (result.message === 'Email has been sent') {
				this.setState({
					successMessage: i18n.t("forgot.emailSent")
				})
			}
		} catch (e) {
			this.setState({
				errorMessage: i18n.t("error")
			})
		}

	}
    render() {
        return (
            <div className="wrapper">
				<div className="form-wrapper">
					<h1>{i18n.t("forgot.forgot")}</h1>
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
					<Form >
						<Form.Field error={this.state.isEmailValid ? false : true}>
							<label>{i18n.t("forgot.email")}</label>
							<input
								name="email"
								placeholder={i18n.t("forgot.email")}
								value={this.state.email ? this.state.email : ''}
								onKeyDown={(event) => { if (event.key === "Enter") { this.forgotPassword() } }}
								onChange={e => this.setInputValue('email', e.target.value)}
							/>
						</Form.Field>
					</Form>
					<SubmitButton
						text={i18n.t("forgot.send")}
						onClick={() => this.forgotPassword()}
						className="createAccount"
					/>
				</div>
            </div>
        )
    }
}

export default ForgotPassword
