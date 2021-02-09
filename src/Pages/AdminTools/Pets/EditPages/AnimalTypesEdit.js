import React, { Component } from 'react'
import { Button, Dropdown, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export class AnimalTypeEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			animalTypeID: props.match.params.id,
			animalType: {},
			animal: '',
			errorMessage: "",
			successMessage: "",
		}
	}
	componentDidMount() {
		this.animalInfo()
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
	async animalInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/manageanimaltype', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.animalTypeID
				})
			});
			let result = await res.json();
			console.log(result)
			if (result.message === "Single Animal Types Have Been Returned") {
				this.setState({
					animal: result.AnimalTypes[0].animal,
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	async updateAnimalInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/manageanimaltype', {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.animalTypeID,
					animal: this.state.animal,
				})
			});
			let result = await res.json();
			if (result.message === "Animal Type Updated") {
				console.log(result)
				this.setState({
					successMessage: "Animal Type Has Been Updated!"
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
				<h2>Animal Type Edit</h2>
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
								content="Edit"
								onClick={this.updateAnimalInfo.bind(this)}
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

export default AnimalTypeEdit