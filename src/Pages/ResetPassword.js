import React, { Component } from 'react'
import SubmitButton from '../Component/SubmitButton/SubmitButton';
import { Form, Message } from 'semantic-ui-react';
import '../Assets/Css/LoginForm.css'
import i18n from '../Component/i18n/i18n';

export class ResetPassword extends Component {
    constructor(props) {
		super(props);
		this.state = {
			token: props.match.params.token,
			password: '',
			isPasswordValid: true,
			errorMessage: "",
			successMessage: "",
			disableButton: false,
		}
	}
	resetEmailForm() {
		this.setState({
			password: '',
		})
	}
	setInputValue(property, val) {
		val = val.trim();
		if (val.length > 500) {
			return;
		}
		this.setState({
			[property]: val,
			isPasswordValid: true,
			errorMessage: "",
			successMessage: ""
		})
	}
    async resetPassword() {
		if (!this.state.password) {
			this.setState({
				isPasswordValid: this.state.password,
				errorMessage: i18n.t("resetPass.enterPassword")
			})
			return;
		}
		try {
			let res = await fetch('http://127.0.0.1:5000/resetpassword', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					password: this.state.password,
					token:this.state.token
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
			else if (result.message === 'Token Expired') {
				this.setState({
					errorMessage: i18n.t("resetPass.tokenExpired"),
				})
			}
			else if (result.message === 'Password has been chnaged') {
				this.setState({
					successMessage: i18n.t("resetPass.passwordChanged"),
					disableButton: true
				})
			}
		} catch (e) {
			this.setState({
				errorMessage: i18n.t("error"),
			})
		}

	}
    render() {
        return (
            <div className="wrapper">
				<div className="form-wrapper">
					<h1>{i18n.t("resetPass.reset")}</h1>
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
					<Form >
						<Form.Field error={this.state.isPasswordValid ? false : true}>
							<label>{i18n.t("resetPass.password")}</label>
							<input
								name="password"
								placeholder={i18n.t("resetPass.password")}
								type="password"
								value={this.state.password ? this.state.password : ''}
								onChange={e => this.setInputValue('password', e.target.value)}
								onKeyDown={(event) => { if (event.key === "Enter") { this.resetPassword() } }}
							/>
						</Form.Field>
					</Form>
					<SubmitButton
						text={i18n.t("resetPass.change")}
						onClick={() => this.resetPassword()}
						className="createAccount"
						disabled={this.state.disableButton}
					/>
				</div>
            </div>
        )
    }
}

export default ResetPassword
