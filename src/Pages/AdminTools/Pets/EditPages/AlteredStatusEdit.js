import React, { Component } from 'react'
import { Button, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export class AlterdStatusEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			alteredStatusID: props.match.params.id,
			alteredStatus: {},
			status: '',
			errorMessage: "",
			successMessage: "",
		}
	}
	componentDidMount() {
		this.roleInfo()
	}
	setInputValue(property, val) {
		val = val.trim();
		if (val.length > 500) {
			return;
		}
		this.setState({
			[property]: val,
		})
	}
	async roleInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managealteredstatus', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.alteredStatusID
				})
			});
			let result = await res.json();
			console.log(result)
			if (result.message === "Single Altered Status Have Been Returned") {
				this.setState({
					status: result.AlteredStatus[0].status,
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	async updateAlteredInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managealteredstatus', {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.alteredStatusID,
					status: this.state.status,
				})
			});
			let result = await res.json();
			if (result.message === "Altured Status Updated") {
				console.log(result)
				this.setState({
					successMessage: "Altured Status Has Been Updated!"
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
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/manageAlteredStatus"> &#8592; Back to Manage Altered Status </Button>
				</div>
				<h2>AlteredStatus Edit</h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					<Form>
						<Form.Field >
							<label>Altered Status Name</label>
							<input
								name="status"
								placeholder="Altered Status Name"
								value={this.state.status}
								onChange={e => this.setInputValue('status', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Button
								style={{ width: "100%", }}
								content="Edit"
								onClick={this.updateAlteredInfo.bind(this)}
							//value={0}
							>
							</Form.Button>
						</Form.Field>
					</Form>
				</div>
			</div>
		)
	}
}

export default AlterdStatusEdit