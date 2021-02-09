import React, { Component } from 'react'
import { Button, Dropdown, Form, Message, } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export class BreedEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			BreedID: props.match.params.id,
			Breed: {},
			breed: '',
			errorMessage: "",
			successMessage: "",
		}
	}
	componentDidMount() {
		this.BreedInfo()
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
	async BreedInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managebreeds', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.BreedID
				})
			});
			let result = await res.json();
			console.log(result)
			if (result.message === "Breed Has Been Returned") {
				this.setState({
					breed: result.Breed[0].breed,
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	async updateBreedInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managebreeds', {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.BreedID,
					breed: this.state.breed,
				})
			});
			let result = await res.json();
			if (result.message === "Breed Updated") {
				console.log(result)
				this.setState({
					successMessage: "Breed Has Been Updated!"
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
					<Button className="backButton" href="/manageBreeds"> &#8592; Back to Manage Breeds </Button>
				</div>
				<h2>Breed Edit</h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					<Form>
						<Form.Field >
							<label>Breed Name</label>
							<input
								name="breed"
								placeholder="Breed Name"
								value={this.state.breed}
								onChange={e => this.setInputValue('breed', e.target.value)}
							/>
						</Form.Field>
						<Form.Field>
							<Form.Button
								style={{ width: "100%", }}
								content="Edit"
								onClick={this.updateBreedInfo.bind(this)}
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

export default BreedEdit