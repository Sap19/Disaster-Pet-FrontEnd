import React, { Component } from 'react'
import { Form, Select, Message, Tab, FormField, List, Header, Icon, Segment } from 'semantic-ui-react'
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
			activeIndex: 0,
			name: "",
			PhoneNumber1: "",
			PhoneNumber2: "",
			email: "",
			address: "",
			state: "",
			city: "",
			zipcode: "",
			isEmailValid: true,
			isPhoneValid: true,
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
			],
			selectedFiles: []
		}
	}

	removeImage(filename) {
		console.log(filename);
		const newList = this.state.selectedFiles.filter((file) => file.name !== filename);
		this.setState({
			selectedFiles: newList
		})
		console.log(this.state.selectedFiles)
	}
	fileSelectedHandler = (event) => {
		this.setState({
			arr: this.state.selectedFiles.push(event.target.files[0])
		})
		console.log(this.state.selectedFiles);
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
		})
	}
	async addPet() {
		const formData = new FormData()
		this.state.selectedFiles.forEach((file, i) => {
			formData.append(i, file)
		})
		try {
			let res = await fetch('http://127.0.0.1:5000/uploadimage', {
				method: 'POST',
				headers: {
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: formData
			});
			let result = await res.json();
			if (result.msg === "Token has expired") {
				this.props.history.push('/login')
			}
		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
		if (!this.state.petName || !this.state.animalType_id || !this.state.altered_id
			|| !this.state.primaryBreed_id || !this.state.PhoneNumber1) {
			this.setState({
				isPetNameValid: this.state.petName,
				isAnimalTypeValid: this.state.animalType_id,
				isPrimaryBreedVaild: this.state.primaryBreed_id,
				isAlteredValid: this.state.altered_id,
				isPhoneValid: this.state.PhoneNumber1,
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
			if (result.message === "successfully added pet") {
				this.setState({
					isEmailValid: false,
					successMessage: "Pet Was Added!"
				})
			}
			else if (result.msg === "Token has expired") {
				this.props.history.push('/login')
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	handleRangeChange = e => this.setState({ activeIndex: e.target.value });
	handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });
	render() {
		const listItems = []
		const panes = [
			{
				menuItem: 'Animal Information', render: () =>
					<Tab.Pane>
						<div className="formRow">
							<div className="column-form ">
								<Form style={{ paddingTop: "40px" }}>
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
								</Form>
							</div>
							<div className="column-form ">
								<Form style={{ padding: "40px" }}>
									<Segment placeholder>
										<Header icon>
											<Icon name='images' />
											<h3>No photos are listed for this pet.</h3>
										</Header>
										<input type="file" onChange={this.fileSelectedHandler} />
										<List>
											{this.state.selectedFiles.map((file) =>
												<List.Item key={file.name} onClick={() => this.removeImage(file.name)}>{file.name} <Icon name='x' /></List.Item>
											)}
										</List>
									</Segment>
									<FormField style={{ paddingLeft: "60%" }}>
										<Form.Button
											style={{ width: "100%", }}
											content="Next Tab"
											onClick={this.handleRangeChange}
											value={1}></Form.Button>
									</FormField>
								</Form>
							</div>
						</div>
					</Tab.Pane>
			},
			{
				menuItem: 'Contact Information', render: () =>
					<Tab.Pane>
						<div className="formRow">
							<div className="column-contact-form">
								<Form className="contact-form" >
									<Form.Field>
										<label>Name (Optional)</label>
										<input
											name="name"
											placeholder="Name"
											value={this.state.name ? this.state.name : ''}
											onChange={e => this.setInputValue('name', e.target.value)}
										/>
									</Form.Field>
									<Form.Field error={this.state.isPhoneValid ? false : true}>
										<label>Primary Phone Number</label>
										<input
											name="PhoneNumber1"
											maxLength="10"
											placeholder="Primary Phone Number"
											value={this.state.PhoneNumber1 ? this.state.PhoneNumber1 : ''}
											onChange={e => this.setInputValue('PhoneNumber1', e.target.value)}
										/>
									</Form.Field>
									<Form.Field>
										<label>Secondary Phone Number (Optional)</label>
										<input
											name="PhoneNumber2"
											placeholder="Secondary Phone Number"
											maxLength="10"
											value={this.state.PhoneNumber2 ? this.state.PhoneNumber2 : ''}
											onChange={e => this.setInputValue('PhoneNumber2', e.target.value)}
										/>
									</Form.Field>
									<Form.Field error={this.state.isEmailValid ? false : true}>
										<label>Email</label>
										<input
											name="email"
											placeholder="Email"
											value={this.state.email ? this.state.email : ''}
											onChange={e => this.setInputValue('email', e.target.value)}
										/>
									</Form.Field>
									<FormField style={{ paddingLeft: "70%" }}>
										<Form.Button
											style={{ width: "100%", }}
											content="Next Tab"
											onClick={this.handleRangeChange}
											value={2}></Form.Button>
									</FormField>
								</Form>
							</div>
						</div>
					</Tab.Pane>
			},
			{
				menuItem: 'Pet Location', render: () =>
					<Tab.Pane>
						<div className="formRow">
							<div className="column-contact-form">
								<Form className="contact-form" >
									<Form.Field>
										<label>Address (Optional)</label>
										<input
											name="address"
											placeholder="Address 1"
											value={this.state.address ? this.state.address : ''}
											onChange={e => this.setInputValue('address', e.target.value)}
										/>
									</Form.Field>
									<Form.Field>
										<label>State (Optional)</label>
										<Select
											fluid
											clearable
											name="state"
											onChange={this.setSelectInputValue}
											options={this.state.genderOptions}
											placeholder="State">
										</Select>
									</Form.Field>
									<Form.Field>
										<label>City (Optional)</label>
										<input
											name="city"
											placeholder="City"
											value={this.state.city ? this.state.city : ''}
											onChange={e => this.setInputValue('city', e.target.value)}
										/>
									</Form.Field>
									<Form.Field >
										<label>Zip Code (Optional)</label>
										<input
											name="zipcode"
											placeholder="Zip Code"
											value={this.state.zipcode ? this.state.zipcode : ''}
											onChange={e => this.setInputValue('zipcode', e.target.value)}
										/>
									</Form.Field>
									<FormField style={{ paddingLeft: "70%" }}>
										<Form.Button
											style={{ width: "100%", }}
											content="Next Tab"
											onClick={this.handleRangeChange}
											value={0}></Form.Button>
									</FormField>
									<Form.Button onClick={() => this.addPet()} style={{ background: "#17a3b8" }}>Add Pet</Form.Button>
								</Form>
							</div>
						</div>
					</Tab.Pane >
			},
		]
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
				<div style={{ padding: "2rem" }}>
					<Tab panes={panes} activeIndex={this.state.activeIndex} onTabChange={this.handleTabChange} />
				</div>
				<Footer />
			</div >
		);
	}
}

export default AddPetForm
