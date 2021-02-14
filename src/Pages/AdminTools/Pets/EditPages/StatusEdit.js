import React, { Component } from 'react'
import { Button, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export class StatusEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			statusID: props.match.params.id,
			statuses: {},
			status: '',
			errorMessage: "",
			successMessage: "",
		}
	}
	componentDidMount() {
		this.statusInfo()
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
	async statusInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managepetstatus', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.statusID
				})
			});
			let result = await res.json();
			console.log(result)
			if (result.message === "Pet Status Has Been Returned") {
				this.setState({
					status: result.Status[0].status,
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	async updateStatusInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managepetstatus', {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.statusID,
					status: this.state.status,
				})
			});
			let result = await res.json();
			if (result.message === "Pet Status Updated") {
				console.log(result)
				this.setState({
					successMessage: "Status Has Been Updated!"
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
					<Button className="backButton" href="/manageStatus"> &#8592; Back to Manage Status </Button>
				</div>
				<h2>Status Edit</h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					<Form>
						<Form.Field >
							<label>Status Name</label>
							<input
								name="status"
								placeholder="Status Name"
								value={this.state.status}
								onChange={e => this.setInputValue('status', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Button
								style={{ width: "100%", }}
								content="Edit"
								onClick={this.updateStatusInfo.bind(this)}
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

export default StatusEdit