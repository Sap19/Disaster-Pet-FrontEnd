import React, { Component } from 'react'
import { Form, Select, Message, Tab, FormField, List, Header, Icon, Segment } from 'semantic-ui-react'
import Footer from "../Component/Footer/Footer";
import addPetBanner from "../Assets/Images/addPetBanner.jpg"
import "../Assets/Css/AddPet.css"
import i18n from '../Component/i18n/i18n';

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
			status: '',
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
			primary_breedOption: [],
			genderOptions: [],
			alteredOptions: [],
			animalOptions: [],
			statusOptions: [],
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

	componentDidMount() {
		this.addPetInit();
	}

	async addPetInit() {
		try {
			let res = await fetch('http://127.0.0.1:5000/addpet', {
				method: 'GET',
				headers: {
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
			});
			let result = await res.json();
			console.log(result)
			if (result.msg === "Token has expired") {
				this.props.history.push('/login')
			}
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
		} catch (e) {
			this.setState({
				errorMessage: i18n.t("error")
			})
		}
		
	}
	async addPet() {
		if (!this.state.petName || !this.state.animalType_id || !this.state.altered_id
			|| !this.state.primaryBreed_id) {
			this.setState({
				isPetNameValid: this.state.petName,
				isAnimalTypeValid: this.state.animalType_id,
				isPrimaryBreedVaild: this.state.primaryBreed_id,
				isAlteredValid: this.state.altered_id,
				errorMessage: i18n.t("login.pleaseFillOut")
			})
			return;
		}
		const formData = new FormData()
		this.state.selectedFiles.forEach((file, i) => {
			formData.append(i, file)
		})
		let imageUrl = '';
		try {
			let res = await fetch('http://127.0.0.1:5000/uploadimage', {
				method: 'POST',
				headers: {
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: formData
			});
			let result = await res.json();
			imageUrl = result.url;
			if (result.msg === "Token has expired") {
				this.props.history.push('/login')
			}
		} catch (e) {
			this.setState({
				errorMessage: i18n.t("error")
			})
		}
		try {
			let res = await fetch('http://127.0.0.1:5000/addpet', {
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
					secondary_breed: this.state.secondaryBreed_id,
					gender: this.state.gender,
					altered_status: this.state.altered_id,
					trapper_id: 1,
					street_name: this.state.address,
					state: this.state.state,
					city: this.state.city,
					zipcode: this.state.zipcode,
					pet_status: this.state.status,
					image_url: imageUrl
				})
			});
			let result = await res.json();
			console.log(result)
			if (result.message === "successfully added pet") {
				this.setState({
					isEmailValid: false,
					successMessage: i18n.t("addPet.petWasAdded")
				})
			}
			else if (result.msg === "Token has expired") {
				this.props.history.push('/login')
			}

		} catch (e) {
			this.setState({
				errorMessage: i18n.t("error")
			})
		}
		
	}
	handleRangeChange = e => this.setState({ activeIndex: e.target.value });
	handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex });
	render() {
		const panes = [
			{
				menuItem: i18n.t("addPet.animalInfo"), render: () =>
					<Tab.Pane>
						<div className="formRow">
							<div className="column-form ">
								<Form style={{ paddingTop: "40px" }}>
									<Form.Field error={this.state.isPetNameValid ? false : true}>
										<label>{i18n.t("addPet.petName")}</label>
										<input
											name="petName"
											placeholder={i18n.t("addPet.petName")}
											value={this.state.petName ? this.state.petName : ''}
											onChange={e => this.setInputValue('petName', e.target.value)}
										/>
									</Form.Field>
									<Form.Field error={this.state.isAnimalTypeValid ? false : true}>
										<label>{i18n.t("addPet.animalType")}</label>
										<Select
											fluid
											clearable
											name="animalType_id"
											onChange={this.setSelectInputValue}
											label={i18n.t("addPet.animalType")}
											options={this.state.animalOptions}
											placeholder={i18n.t("addPet.animalType")}>
										</Select>
									</Form.Field>
									{this.state.breedDisabled ?
										<Form.Field>
											<label>{i18n.t("addPet.primary")}</label>
											<Select
												fluid
												disabled
												options={this.state.primary_breedOption}
												placeholder={i18n.t("addPet.primary")}>
											</Select>
										</Form.Field> :
										<Form.Field error={this.state.isPrimaryBreedVaild ? false : true}>
											<label>{i18n.t("addPet.primary")}</label>
											<Select
												fluid
												clearable
												name="primaryBreed_id"
												onChange={this.setSelectInputValue}
												options={this.state.primary_breedOption}
												placeholder={i18n.t("addPet.primary")}>
											</Select>
										</Form.Field>}

									{this.state.breedDisabled ?
										<Form.Field>
											<label>{i18n.t("addPet.secondary")}</label>
											<Select
												fluid
												disabled
												options={this.state.primary_breedOption}
												placeholder={i18n.t("addPet.secondary")}>
											</Select>
										</Form.Field> :
										<Form.Field>
											<label>{i18n.t("addPet.secondary")}</label>
											<Select
												fluid
												clearable
												name="secondaryBreed_id"
												onChange={this.setSelectInputValue}
												options={this.state.primary_breedOption}
												placeholder={i18n.t("addPet.secondary")}>
											</Select>
										</Form.Field>}
									<Form.Field>
										<label>{i18n.t("addPet.gender")}</label>
										<Select
											fluid
											clearable
											name="gender"
											onChange={this.setSelectInputValue}
											options={this.state.genderOptions}
											placeholder={i18n.t("addPet.gender")}>
										</Select>
									</Form.Field>
									<Form.Field error={this.state.isAlteredValid ? false : true}>
										<label>{i18n.t("addPet.alteredStatus")}</label>
										<Select
											fluid
											clearable
											name="altered_id"
											onChange={this.setSelectInputValue}
											options={this.state.alteredOptions}
											placeholder={i18n.t("addPet.alteredStatus")}>
										</Select>
									</Form.Field>
									<Form.Field>
										<label>{i18n.t("addPet.status")}</label>
										<Select
											fluid
											clearable
											name="status"
											onChange={this.setSelectInputValue}
											options={this.state.statusOptions}
											placeholder={i18n.t("addPet.status")}>
										</Select>
									</Form.Field>
								</Form>
							</div>
							<div className="column-form ">
								<Form style={{ padding: "40px" }}>
									<Segment placeholder>
										<Header icon>
											<Icon name='images' />
											<h3>{i18n.t("addPet.upload")}</h3>
										</Header>
										<input type="file" onChange={this.fileSelectedHandler} multiple />
										<List>
											{this.state.selectedFiles.map((file) =>
												<List.Item key={file.name} onClick={() => this.removeImage(file.name)}>{file.name} <Icon name='x' /></List.Item>
											)}
										</List>
									</Segment>
									<FormField style={{ paddingLeft: "60%" }}>
										<Form.Button
											style={{ width: "100%", }}
											content={i18n.t("addPet.next")}
											onClick={this.handleRangeChange}
											value={1}></Form.Button>
									</FormField>
								</Form>
							</div>
						</div>
					</Tab.Pane>
			},
			{
				menuItem: i18n.t("addPet.petLocation"), render: () =>
					<Tab.Pane>
						<div className="formRow">
							<div className="column-contact-form">
								<Form className="contact-form" >
									<Form.Field>
										<label>{i18n.t("addPet.address")} {i18n.t("addPet.optional")}</label>
										<input
											name="address"
											placeholder={i18n.t("addPet.address")}
											value={this.state.address ? this.state.address : ''}
											onChange={e => this.setInputValue('address', e.target.value)}
										/>
									</Form.Field>
									<Form.Field>
										<label>{i18n.t("addPet.state")} {i18n.t("addPet.optional")}</label>
										<input
											name="state"
											placeholder={i18n.t("addPet.state")}
											value={this.state.state ? this.state.state : ''}
											onChange={e => this.setInputValue('state', e.target.value)}
										/>
									</Form.Field>
									<Form.Field>
										<label>{i18n.t("addPet.city")} {i18n.t("addPet.optional")}</label>
										<input
											name="city"
											placeholder={i18n.t("addPet.city")}
											value={this.state.city ? this.state.city : ''}
											onChange={e => this.setInputValue('city', e.target.value)}
										/>
									</Form.Field>
									<Form.Field >
										<label>{i18n.t("addPet.zip")} {i18n.t("addPet.optional")}</label>
										<input
											name="zipcode"
											placeholder={i18n.t("addPet.zip")}
											value={this.state.zipcode ? this.state.zipcode : ''}
											onChange={e => this.setInputValue('zipcode', e.target.value)}
										/>
									</Form.Field>
									<Form.Field style={{ paddingLeft: "70%" }}>
										<Form.Button
											style={{ width: "100%", }}
											content={i18n.t("addPet.next")}
											onClick={this.handleRangeChange}
											value={0}></Form.Button>
									</Form.Field>
									<Form.Button onClick={() => this.addPet()} style={{ background: "#17a3b8" }}>{i18n.t("addPet.title")}</Form.Button>
								</Form>
							</div>
						</div>
					</Tab.Pane >
			},
		]
		return (
			<div>
				<h1 style={{ paddingTop: "60px" }}>{i18n.t("addPet.title")}</h1>
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
