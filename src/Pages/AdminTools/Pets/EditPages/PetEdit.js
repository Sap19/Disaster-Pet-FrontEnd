import React, { Component } from 'react'
import { Button, Dropdown, Form, Message, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

export class UserEdit extends Component {

	constructor(props) {
		super(props);
		this.state = {
			petID: props.match.params.id,
			pet: {},
			altered_status: "",
			animal_type: "",
			gender: "",
			pet_name: "",
			pet_status: '',
			primary_breed: "",
			secondary_breed: "",
			errorMessage: "",
			successMessage: "",
			primary_breedOption: [],
			genderOptions: [],
			alteredOptions: [],
			animalOptions: [],
			statusOptions: [],
			loaded: true
		}
	}
	componentDidMount() {
		this.petInfo()
	}
	
	newDropDownValue = (event, data) => {
		console.log(event, data)
		let newSelectedID = data.options.filter((option) => option.value == data.value)
		console.log(newSelectedID)
		this.setState({
			[data.name]: newSelectedID[0].key,
		})
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
	async petInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managepets', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.petID
				})
			});
			let result = await res.json();
			console.log(result)
			if (result.message === "Pet Returned") {
				this.setState({
					pet: result.Pet[0],
					altered_status: result.Pet[0].altered_status,
					animal_type: result.Pet[0].animal_type,
					gender: result.Pet[0].gender,
					pet_name: result.Pet[0].pet_name,
					pet_status: result.Pet[0].pet_status,
					primary_breed: result.Pet[0].primary_breed,
					secondary_breed: result.Pet[0].secondary_breed,
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
		try {
			let res = await fetch('http://127.0.0.1:5000/petmatching', {
				method: 'GET',
			});
			let result = await res.json();
			if (result.message === "successfully Pulled!") {
				console.log(result)
				result.breeds.forEach((breed, i) => {
					this.setState({
						arr: this.state.primary_breedOption.push({ 'key': breed.id, 'value': breed.id, 'text': breed.breed })
					})
				})

				result.genders.forEach((gender, i) => {
					this.setState({
						arr: this.state.genderOptions.push({ 'key': gender.id, 'value': gender.id, 'text': gender.gender })
					})
				})

				result.altered.forEach((altered, i) => {
					this.setState({
						arr: this.state.alteredOptions.push({ 'key': altered.id, 'value': altered.id, 'text': altered.status })
					})
				})
				result.animal.forEach((animal, i) => {
					this.setState({
						arr: this.state.animalOptions.push({ 'key': animal.id, 'value': animal.id, 'text': animal.animal })
					})
				})
				result.status.forEach((status, i) => {
					this.setState({
						arr: this.state.statusOptions.push({ 'key': status.id, 'value': status.id, 'text': status.status })
					})
				})
				this.setState({
					loaded: false
				})
			}
		} catch (e) {
			console.log("Server Error. Please Refresh Page")
		}
	}
	async updatePetInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managepets', {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: parseInt(this.state.petID),
					altered_status: this.state.altered_status,
					animal_type: this.state.animal_type,
					gender: this.state.gender,
					pet_name: this.state.pet_name,
					pet_status: this.state.pet_status,
					primary_breed: this.state.primary_breed,
					secondary_breed: this.state.secondary_breed,
					trapper_id: null
				})
			});
			let result = await res.json();
			if (result.message === "Pet updated") {
				this.setState({
					successMessage: "Pet Has Been Updated!"
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
					<Button className="backButton" href="/managePets"> &#8592; Back to Manage Pets </Button>
				</div>
				<h2>Pet</h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					{this.state.loaded ? <Loader active /> :
						<Form>
							<Form.Field >
								<label>Name</label>
								<input
									placeholder="Name"
									name="pet_name"
									value={this.state.pet_name}
									onChange={e => this.setInputValue('pet_name', e.target.value)}
								/>
							</Form.Field>
							<Form.Field>
								<label>Animal Type</label>
								{this.state.animal_type != '' ?
									<Dropdown
										placeholder='Animal Type'
										name="animal_type"
										fluid
										defaultValue={this.state.animal_type}
										selection
										onChange={this.newDropDownValue}
										options={this.state.animalOptions}
									/> :
									<div></div>}
							</Form.Field>
							<Form.Field>
								<label>Gender</label>
								{this.state.gender != '' ?
									<Dropdown
										placeholder='Gender'
										name="gender"
										fluid
										defaultValue={this.state.gender}
										selection
										onChange={this.newDropDownValue}
										options={this.state.genderOptions}
									/> :
									<div></div>}
							</Form.Field>
							<Form.Field>
								<label>Status</label>
								{this.state.pet_status != '' ?
									<Dropdown
										placeholder='Status'
										name="pet_status"
										fluid
										defaultValue={this.state.pet_status}
										selection
										onChange={this.newDropDownValue}
										options={this.state.statusOptions}
									/> :
									<div></div>}
							</Form.Field>
							<Form.Field>
								<label>Primary Breed</label>
								{this.state.primary_breed != '' ?
									<Dropdown
										placeholder='Primary Breed'
										name="primary_breed"
										fluid
										defaultValue={this.state.primary_breed}
										selection
										onChange={this.newDropDownValue}
										options={this.state.primary_breedOption}
									/> :
									<div></div>}
							</Form.Field>
							<Form.Field>
								<label>Secondary Breed</label>
								{this.state.secondary_breed != '' ?
									<Dropdown
										placeholder='Secondary Breed'
										name="secondary_breed"
										fluid
										defaultValue={this.state.secondary_breed}
										selection
										onChange={this.newDropDownValue}
										options={this.state.primary_breedOption}
									/> :
									<div></div>}
							</Form.Field>
							<Form.Field>
								<label>Altered Status</label>
								{this.state.altered_status != '' ?
									<Dropdown
										placeholder='Altered Status'
										name="altered_status"
										fluid
										defaultValue={this.state.altered_status}
										selection
										onChange={this.newDropDownValue}
										options={this.state.alteredOptions}
									/> :
									<div></div>}
							</Form.Field>
							<Form.Field>
								<Form.Button
									style={{ width: "100%", }}
									content="Edit"
									onClick={this.updatePetInfo.bind(this)}
								//value={0}
								>
								</Form.Button>
							</Form.Field>
						</Form>}
				</div>
			</div>
		)
	}
}

export default UserEdit