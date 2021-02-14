import React, { Component } from 'react'
import { Button, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export class NewAnimalType extends Component {

	constructor(props) {
		super(props);
		this.state = {
			AnimalType: {},
			animal: '',
			errorMessage: "",
			successMessage: "",
		}
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
	
	async updateAnimalTypeInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/manageanimaltype', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					animal: this.state.animal,
				})
			});
			let result = await res.json();
			if (result.message === "New Animal Type Has been Added") {
				this.setState({
					successMessage: "New Animal Type Added"
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
					<Button className="backButton" href="/manageAnimalTypes"> &#8592; Back to Manage Animal Types </Button>
				</div>
				<h2>New Animal Type </h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					<Form>
						<Form.Field >
							<label>Animal Type Name</label>
							<input
								name="animal"
								placeholder="Animal Type Name"
								value={this.state.animal}
								onChange={e => this.setInputValue('animal', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Button
								style={{ width: "100%", }}
								content="Add New Animal Type"
								onClick={this.updateAnimalTypeInfo.bind(this)}
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

export default NewAnimalType