import React, { Component } from 'react'
import { Form, Select, Message } from 'semantic-ui-react'
import Footer from "../Component/Footer/Footer";
import addPetBanner from "../Assets/Images/addPetBanner.jpg"
import "../Assets/Css/AddPet.css"

class AddPetForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			primaryBreed_id: "",
			secondaryBreed_id: "",
			gender: "",
			petName: "",
			altered_id: "",
			animalType_id: "",
			breedDisabled: true,
			isPetNameValid: true,
			isAlteredValid: true,
			isAnimalTypeValid: true,
			isPrimaryBreedVaild: true,
			breedOption: false,
			errorMessage: "",
			successMessage: "",
			dogBreedOptions: [
				{ key: '1', value: '1', text: 'Bulldog' },
				{ key: '2', value: '2', text: 'German Shephed' },
				{ key: '3', value: '3', text: 'Beagle' },
				{ key: '4', value: '4', text: 'Dachshund' },
			],
			genderOptions: [
				{ key: '1', value: 'Male', text: 'Male' },
				{ key: '2', value: 'Female', text: 'Female' },
			],
			animalOptions: [
				{ key: '1', value: '1', text: 'Dog' },
			],
			alteredOptions: [
				{ key: '1', value: '1', text: 'Neutered' },
				{ key: '2', value: '2', text: 'Spayed' },
				{ key: '3', value: '3', text: 'Unaltered' },
			]
		}
	}
	setInputValue(property, val) {
		this.setState({
			[property]: val,
			isPetNameValid: true,
			errorMessage: ""
		})
	}
	setSelectInputValue = (event, data) => {
		this.setState({
			[data.name]: data.value,
			breedDisabled: false,
			isAnimalTypeValid: true,
			isAlteredValid: true,
			isPrimaryBreedVaild: true
		})
	}
	async addPet() {
		if (!this.state.petName || !this.state.animalType_id || !this.state.altered_id
			|| !this.state.primaryBreed_id) {
			this.setState({
				isPetNameValid: this.state.petName,
				isAnimalTypeValid: this.state.animalType_id,
				isPrimaryBreedVaild: this.state.primaryBreed_id,
				isAlteredValid: this.state.altered_id,
				errorMessage: "Please fill out missing areas "
			})
			return;
		}
		try {
			let res = await fetch('http://0.0.0.0:5000/addpet', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					pet_name: this.state.petName,
					animal_type: this.state.animalType_id,
					primary_breed: this.state.primaryBreed_id,
					secondary_breed: this.secondaryBreed_id,
					gender: this.state.gender,
					altered_status: this.state.altered_id,
					trapper_id: 1
				})
			});
			let result = await res.json();
			console.log(result);
			if (result.message === "successfully added pet") {
				this.setState({
					isEmailValid: false,
					successMessage: "Pet Was Added!"
				})
			}
			else if (result.msg === "Token has expired")
			{
				this.props.history.push('/login')
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	render() {
		return (
			<div>
				<h1 style={{ paddingTop: "60px" }}>Add Pet</h1>
				<img className="add-pet-image" src={addPetBanner} alt="Add Pet Banner"></img>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div className="row">
					<div className="column-form ">
						<Form style={{ padding: "40px" }}>
							<Form.Field error={this.state.isPetNameValid ? false : true}>
								<label>Pet Name</label>
								<input
									name="petName"
									placeholder="Pet Name"
									value={this.state.petName ? this.state.petName : ''}
									onChange={e => this.setInputValue('petName', e.target.value)}
								/>
							</Form.Field>
							<Form.Field error={this.state.isAnimalTypeValid ? false : true}>
								<label>Animal Type</label>
								<Select
									fluid
									clearable
									name="animalType_id"
									onChange={this.setSelectInputValue}
									label="Animal Type"
									options={this.state.animalOptions}
									placeholder="Animal Type">
								</Select>
							</Form.Field>
							{this.state.breedDisabled ?
								<Form.Field>
									<label>Primary Breed</label>
									<Select
										fluid
										disabled
										options={this.state.dogBreedOptions}
										placeholder="Primary Breed">
									</Select>
								</Form.Field> :
								<Form.Field error={this.state.isPrimaryBreedVaild ? false : true}>
									<label>Primary Breed</label>
									<Select
										fluid
										clearable
										name="primaryBreed_id"
										onChange={this.setSelectInputValue}
										options={this.state.dogBreedOptions}
										placeholder="Primary Breed">
									</Select>
								</Form.Field>}

							{this.state.breedDisabled ?
								<Form.Field>
									<label>Secondary Breed</label>
									<Select
										fluid
										disabled
										options={this.state.dogBreedOptions}
										placeholder="Primary Breed">
									</Select>
								</Form.Field> :
								<Form.Field>
									<label>Secondary Breed</label>
									<Select
										fluid
										clearable
										name="secondaryBreed_id"
										onChange={this.setSelectInputValue}
										options={this.state.dogBreedOptions}
										placeholder="Primary Breed">
									</Select>
								</Form.Field>}
						</Form>
					</div>
					<div className="column-form ">
						<Form style={{ padding: "40px" }}>
							<Form.Field>
								<label>Gender</label>
								<Select
									fluid
									clearable
									name="gender"
									onChange={this.setSelectInputValue}
									options={this.state.genderOptions}
									placeholder="Gender">
								</Select>
							</Form.Field>
							<Form.Field error={this.state.isAlteredValid ? false : true}>
								<label>Altered Status</label>
								<Select
									fluid
									clearable
									name="altered_id"
									onChange={this.setSelectInputValue}
									options={this.state.alteredOptions}
									placeholder="Altered Status">
								</Select>
							</Form.Field>
							<Form.Button onClick={() => this.addPet()} style={{ background: "#17a3b8" }}>Add Pet</Form.Button>
						</Form>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default AddPetForm
