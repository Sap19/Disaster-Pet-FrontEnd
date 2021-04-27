import React, { Component } from 'react'
import _ from "lodash";
import { Dropdown, Card, Image, Form, Input, Loader } from 'semantic-ui-react'
import "../Assets/Css/PetMatchingPage.css"
import i18n from '../Component/i18n/i18n';

export class PetMatching extends Component {
	constructor(props) {
		super(props);
		this.state = {
			primary_breedOption: [],
			genderOptions: [],
			alteredOptions: [],
			animalOptions: [],
			statusOptions: [],
			partOptions: [],
			colorOptions: [],
			featureOptions: [],
			positionOptions: [],
			RightPets: [],
			LeftPets: [],
			DefualtPets: [],
			searchRight: '',
			searchLeft: '',
			gender: '',
			altered_status: '',
			animal_type: '',
			coat_color: '',
			primary_breed: '',
			loaded: true,
			rightFeatures: [],
			leftFeatures: [],
			accept: null,
			deny: false
		}
	}
	componentDidMount() {
		this.MatchingInit();
		this.getDropdownInfo();
	}
	handleSearchChange(event) {

		this.setState({
			[event.target.name]: event.target.value.substr(0, 20),
		})
	}
	setDropDownInputValue = (event, data) => {
		let optionText = event.target.textContent;

		const newList = this.state.RightPets.filter((pet) => pet[data.name] === optionText)
		if (this.state[data.name] === '') {
			this.setState({
				RightPets: newList
			})
		}
		this.setState({
			[data.name]: data.value,
		})
		if (this.state[data.name] !== '') {
			this.setState({
				RightPets: this.state.LeftPets
			})
		}
	}
	setRightDropDownInputValue = (event, data) => {
		let optionText = event.target.textContent;

		const newList = this.state.LeftPets.filter((pet) => pet[data.name] === optionText)
		if (this.state[data.name] === '') {
			this.setState({
				LeftPets: newList
			})
		}
		this.setState({
			[data.name]: data.value,
		})
		if (this.state[data.name] !== '') {
			this.setState({
				LeftPets: this.state.RightPets
			})
		}
	}
	addFilter = (event, data) => {
		let optionText = event.target.textContent;

		const newList = this.state.RightPets.filter((pet) => pet[data.name] === optionText)
		this.setState({
			RightPets: newList
		})
	}
	LeftAddFilter = (event, data) => {
		let optionText = event.target.textContent;

		const newList = this.state.LeftPets.filter((pet) => pet[data.name] === optionText)
		this.setState({
			LeftPets: newList
		})
	}
	leftSelectPet(event) {
		const NewRightPet = this.state.RightPets.filter((pet) => pet.pet_id.toString() == event.target.getAttribute('value'))
		const newLeftPet = this.state.RightPets.filter((pet) =>
			pet.altered_status === NewRightPet[0].altered_status &&
			pet.animal_type === NewRightPet[0].animal_type &&
			pet.gender === NewRightPet[0].gender &&
			pet.primary_breed === NewRightPet[0].primary_breed
		)
		this.setState({
			RightPets: NewRightPet,
			//gender: NewRightPet[0].gender,
			//altered_status: NewRightPet[0].altered_status,
			//pet_type: NewRightPet[0].animal_type,
			//breed: NewRightPet[0].primary_breed,
			//LeftPets: newLeftPet
		})
	}
	rightSelectPet(event) {
		const newLeftPet = this.state.LeftPets.filter((pet) => pet.pet_id.toString() == event.target.getAttribute('value'))
		this.setState({
			LeftPets: newLeftPet
		})
	}
	resetSearch(event) {
		this.setState({
			[event.target.name]: this.state.DefualtPets
		})
	}
	addRightFeatureGroup(event) {
		this.setState({
			arr: this.state.rightFeatures.push({
				'colorid': '', 'partid': '', 'featureid': '', 'positionid': ''
			})
		})
	}

	rightFeatureGroupChange(event, data) {
		var tempFeature = this.state.rightFeatures
		tempFeature[data.noResultsMessage][data.name] = data.value
		this.setState({
			rightFeatures: tempFeature,
		})
	}
	addLeftFeatureGroup(event) {
		this.setState({
			arr: this.state.leftFeatures.push({
				'colorid': '', 'partid': '', 'featureid': '', 'positionid': ''
			})
		})
	}

	leftFeatureGroupChange(event, data) {
		var tempFeature = this.state.leftFeatures
		tempFeature[data.noResultsMessage][data.name] = data.value
		this.setState({
			leftFeatures: tempFeature,
		})
	}
	removeRightFeature(event) {
		var i = parseInt(event.target.name)
		const values = this.state.rightFeatures
		values.splice(i, 1)
		this.setState({
			rightFeatures: values
		})
	}
	removeLeftFeature(event) {
		var i = parseInt(event.target.name)
		const values = this.state.leftFeatures
		values.splice(i, 1)
		this.setState({
			leftFeatures: values
		})
	}
	async searchLeftFeatures() {
		var vm = this
		var temp4IDs = []
		var temp3IDs = []
		var temp2IDs = []
		var temp1IDs = []
		this.state.leftFeatures.forEach((feature, index) => {
			vm.state.DefualtPets.forEach((pet, i) => {
				var counter = 0;
				if(pet.featureID[0]) {
					if(pet.featureID[0][0].colurid == feature.colorid) {
						counter += 1
					}
					if(pet.featureID[0][0].featureid == feature.featureid) {
						counter += 1
					}
					if(pet.featureID[0][0].positionid == feature.positionid) {
						counter += 1
					}
					if(pet.featureID[0][0].bodyPartid == feature.partid) {
						counter += 1
					}
					if(counter == 1) {
						temp1IDs.push(pet)
					} else if (counter == 2) {
						temp2IDs.push(pet)
					} else if (counter == 3) {
						temp3IDs.push(pet)
					} else if (counter == 4) {
						temp4IDs.push(pet)
					}
				}
			})
		})
		temp4IDs = temp4IDs.concat(temp3IDs)
		temp4IDs = temp4IDs.concat(temp2IDs)
		temp4IDs = temp4IDs.concat(temp1IDs)
		if(temp4IDs.length == 0) {
			alert("No matches found with those features on the Left Side")
			return;
		}
		this.setState({
			RightPets: temp4IDs
		})
	}
	async searchRightFeatures() {
		var vm = this
		var temp4IDs = []
		var temp3IDs = []
		var temp2IDs = []
		var temp1IDs = []
		this.state.rightFeatures.forEach((feature, index) => {
			vm.state.DefualtPets.forEach((pet, i) => {
				var counter = 0;
				if(pet.featureID[0]) {
					if(pet.featureID[0][0].colurid == feature.colorid) {
						counter += 1
					}
					if(pet.featureID[0][0].featureid == feature.featureid) {
						counter += 1
					}
					if(pet.featureID[0][0].positionid == feature.positionid) {
						counter += 1
					}
					if(pet.featureID[0][0].bodyPartid == feature.partid) {
						counter += 1
					}
					if(counter == 1) {
						temp1IDs.push(pet)
					} else if (counter == 2) {
						temp2IDs.push(pet)
					} else if (counter == 3) {
						temp3IDs.push(pet)
					} else if (counter == 4) {
						temp4IDs.push(pet)
					}
				}
			})
		})
		temp4IDs = temp4IDs.concat(temp3IDs)
		temp4IDs = temp4IDs.concat(temp2IDs)
		temp4IDs = temp4IDs.concat(temp1IDs)
		if(temp4IDs.length == 0) {
			alert("No matches found with those features on the Right Side")
			return;
		}
		this.setState({
			LeftPets: temp4IDs
		})
	}
	async accept() {
		this.PotentialMatch(this.state.accept);

	}
	async deny() {
		this.PotentialMatch(this.state.deny);
	}
	async getDropdownInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/uniquefeaturesinfo', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
			});
			let result = await res.json();

			result.BodyPart.forEach((bodyPart, i) => {
				this.setState({
					arr: this.state.partOptions.push({ 'key': bodyPart.id, 'value': bodyPart.id, 'text': bodyPart.bodypart })
				})
			})

			result.color.forEach((color, i) => {
				this.setState({
					arr: this.state.colorOptions.push({ 'key': color.id, 'value': color.id, 'text': color.color })
				})
			})
			result.feature.forEach((feature, i) => {
				this.setState({
					arr: this.state.featureOptions.push({ 'key': feature.id, 'value': feature.id, 'text': feature.feature })
				})
			})
			result.position.forEach((position, i) => {
				this.setState({
					arr: this.state.positionOptions.push({ 'key': position.id, 'value': position.id, 'text': position.position })
				})
			})
			this.setState({
				loaded: false
			})
		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	async MatchingInit() {
		try {
			let res = await fetch('http://127.0.0.1:5000/petmatching', {
				method: 'GET',
			});
			let result = await res.json();
			if (result.message === "successfully Pulled!") {
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
					RightPets: result.pets,
					LeftPets: result.pets,
					DefualtPets: result.pets,
					loaded: false
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	async PotentialMatch(selection) {
		if(this.state.RightPets.length != 1 || this.state.LeftPets.length != 1) {
			alert("Please make sure you have one pet selected on both sides!")
			return;
		}
		try {
			let res = await fetch('http://127.0.0.1:5000/managepetmatch', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: this.state.RightPets[0].pet_id,
					potentialid: this.state.LeftPets[0].pet_id,
					match: selection
				})
			});
			let result = await res.json();
			if (result.message === "New Match Has been Added") {
				alert("Match has been Sent")
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	render() {
		let rightFilteredPets = this.state.RightPets.filter(
			(pet) => {
				return pet.pet_id.toString().indexOf(this.state.searchRight) !== -1
			}
		)
		let leftFilteredPets = this.state.LeftPets.filter(
			(pet) => {
				return pet.pet_id.toString().indexOf(this.state.searchLeft) !== -1
			}
		)
		return (
			<div style={{ paddingTop: "60px" }}>
				<h1>{i18n.t("matchPet.title")}</h1>
				<Form.Field style={{ paddingBottom: "10px", paddingRight: "20%", paddingLeft: "20%" }}>
					<Form.Button
						style={{ width: "100%", }}
						name="accept"
						content={i18n.t("matchPet.accept")}
						onClick={this.accept.bind(this)}
					></Form.Button>
				</Form.Field>
				<Form.Field style={{ paddingBottom: "10px", paddingRight: "20%", paddingLeft: "20%" }}>
					<Form.Button
						style={{ width: "100%", }}
						name="deny"
						content={i18n.t("matchPet.deny")}
						onClick={this.deny.bind(this)}
					></Form.Button>
				</Form.Field>
				<div className="row">
					<div className="sidenav">
						<Form.Field style={{ padding: "10px" }}>
							<Input
								className="searchInput"
								type="text"
								name="searchRight"
								value={this.state.searchRight}
								onChange={this.handleSearchChange.bind(this)}
								placeholder={i18n.t("matchPet.search")}
							/>
						</Form.Field>
						<Form.Field style={{ padding: "10px" }}>
							<Dropdown
								placeholder={i18n.t("matchPet.gender")}
								name="gender"
								fluid
								search
								clearable
								selection
								onChange={this.setDropDownInputValue}
								options={this.state.genderOptions}
							/>
						</Form.Field>
						<Form.Field style={{ padding: "10px" }}>
							<Dropdown
								placeholder={i18n.t("matchPet.alterStatus")}
								name="altered_status"
								fluid
								clearable
								search
								selection
								onChange={this.setDropDownInputValue}
								options={this.state.alteredOptions}
							/>
						</Form.Field>
						<Form.Field style={{ padding: "10px" }}>
							<Dropdown
								placeholder={i18n.t("matchPet.petType")}
								name="animal_type"
								fluid
								clearable
								search
								selection
								onChange={this.setDropDownInputValue}
								options={this.state.animalOptions}
							/>
						</Form.Field>
						<Form.Field style={{ padding: "10px" }}>
							<Dropdown
								placeholder={i18n.t("matchPet.coat")}
								name="coat_color"
								fluid
								clearable
								search
								selection
								onChange={this.setDropDownInputValue}
								options={[]}
							/>
						</Form.Field>
						<Form.Field style={{ padding: "10px" }}>
							<Dropdown
								placeholder={i18n.t("matchPet.breed")}
								name="primary_breed"
								fluid
								clearable
								search
								selection
								onChange={this.setDropDownInputValue}
								options={this.state.primary_breedOption}
							/>
						</Form.Field>
						<Form.Field style={{ paddingBottom: "10px", paddingRight: "20%", paddingLeft: "20%" }}>
							<Form.Button
								style={{ width: "100%", }}
								name="LeftSearchFeatures"
								content={i18n.t("matchPet.searchBtn")}
								onClick={this.searchLeftFeatures.bind(this)}
							></Form.Button>
						</Form.Field>
						<Form.Field style={{ paddingRight: "20%", paddingLeft: "20%" }}>
							<Form.Button
								style={{ width: "100%", }}
								name="RightPets"
								content={i18n.t("matchPet.reset")}
								onClick={this.resetSearch.bind(this)}
							></Form.Button>
						</Form.Field>
						{this.state.leftFeatures.map((feature, index) =>
							<div key={index}>
								<div className="flex-container" style={{ paddingTop: "10px" }}>
									<h1 style={{ color: "White", paddingTop: "15px" }}>{i18n.t("matchPet.feature")} {index + 1}</h1>
									<Form.Button
										style={{ color: "Red", paddingTop: "10px", paddingLeft: "10px" }}
										content="x"
										name={index}
										onClick={this.removeLeftFeature.bind(this)}
									></Form.Button>
								</div>
								<Form.Field style={{ padding: "10px" }}>
									<Dropdown
										placeholder={i18n.t("matchPet.position")}
										name="positionid"
										fluid
										clearable
										search
										selection
										noResultsMessage={index}
										onChange={this.leftFeatureGroupChange.bind(this)}
										options={this.state.positionOptions}
									/>
								</Form.Field>
								<Form.Field style={{ padding: "10px" }}>
									<Dropdown
										placeholder={i18n.t("matchPet.part")}
										name="partid"
										fluid
										clearable
										search
										selection
										noResultsMessage={index}
										onChange={this.leftFeatureGroupChange.bind(this)}
										options={this.state.partOptions}
									/>
								</Form.Field>
								<Form.Field style={{ padding: "10px" }}>
									<Dropdown
										placeholder={i18n.t("matchPet.feature")}
										name="featureid"
										fluid
										clearable
										search
										selection
										noResultsMessage={index}
										onChange={this.leftFeatureGroupChange.bind(this)}
										options={this.state.featureOptions}
									/>
								</Form.Field>
								<Form.Field style={{ padding: "10px" }}>
									<Dropdown
										placeholder={i18n.t("matchPet.color")}
										name="colorid"
										fluid
										clearable
										search
										selection
										noResultsMessage={index}
										onChange={this.leftFeatureGroupChange.bind(this)}
										options={this.state.colorOptions}
									/>
								</Form.Field>
							</div>
						)}
						<Form.Field style={{ paddingTop: "10px", paddingRight: "20%", paddingLeft: "20%" }}>
							<Form.Button
								style={{ width: "100%", paddingBottom: "10px" }}
								name="LeftPets"
								content={i18n.t("matchPet.addFeature")}
								onClick={this.addLeftFeatureGroup.bind(this)}
							></Form.Button>
						</Form.Field>
					</div>
					<div className="rightsidenav">
						<Form.Field style={{ padding: "10px" }}>
							<Input
								className="searchInput"
								type="text"
								name="searchLeft"
								value={this.state.searchLeft}
								onChange={this.handleSearchChange.bind(this)}
								placeholder={i18n.t("matchPet.search")}
							/>
						</Form.Field>
						<Form.Field style={{ padding: "10px" }}>
							<Dropdown
								placeholder={i18n.t("matchPet.gender")}
								name="gender"
								fluid
								search
								clearable
								selection
								onChange={this.setRightDropDownInputValue}
								options={this.state.genderOptions}
							/>
						</Form.Field>
						<Form.Field style={{ padding: "10px" }}>
							<Dropdown
								placeholder={i18n.t("matchPet.alterStatus")}
								name="altered_status"
								fluid
								clearable
								search
								selection
								onChange={this.setRightDropDownInputValue}
								options={this.state.alteredOptions}
							/>
						</Form.Field>
						<Form.Field style={{ padding: "10px" }}>
							<Dropdown
								placeholder={i18n.t("matchPet.petType")}
								name="animal_type"
								fluid
								clearable
								search
								selection
								onChange={this.setRightDropDownInputValue}
								options={this.state.animalOptions}
							/>
						</Form.Field>
						<Form.Field style={{ padding: "10px" }}>
							<Dropdown
								placeholder={i18n.t("matchPet.coat")}
								name="coat_color"
								fluid
								clearable
								search
								selection
								onChange={this.setRightDropDownInputValue}
								options={[]}
							/>
						</Form.Field>
						<Form.Field style={{ padding: "10px" }}>
							<Dropdown
								placeholder={i18n.t("matchPet.breed")}
								name="primary_breed"
								fluid
								clearable
								search
								selection
								onChange={this.setRightDropDownInputValue}
								options={this.state.primary_breedOption}
							/>
						</Form.Field>
						<Form.Field style={{ paddingBottom: "10px", paddingRight: "20%", paddingLeft: "20%" }}>
							<Form.Button
								style={{ width: "100%", }}
								name="RightSearchFeatures"
								content={i18n.t("matchPet.searchBtn")}
								onClick={this.searchRightFeatures.bind(this)}
							></Form.Button>
						</Form.Field>
						<Form.Field style={{ paddingRight: "20%", paddingLeft: "20%" }}>
							<Form.Button
								style={{ width: "100%", }}
								name="LeftPets"
								content={i18n.t("matchPet.reset")}
								onClick={this.resetSearch.bind(this)}
							></Form.Button>
						</Form.Field>
						{this.state.rightFeatures.map((feature, index) =>
							<div key={index}>
								<div className="flex-container" style={{ paddingTop: "10px" }}>
									<h1 style={{ color: "White", paddingTop: "15px" }}>{i18n.t("matchPet.feature")} {index + 1}</h1>
									<Form.Button
										style={{ color: "Red", paddingTop: "10px", paddingLeft: "10px" }}
										content="x"
										name={index}
										onClick={this.removeRightFeature.bind(this)}
									></Form.Button>
								</div>

								<Form.Field style={{ padding: "10px" }}>
									<Dropdown
										placeholder={i18n.t("matchPet.position")}
										name="positionid"
										fluid
										clearable
										search
										selection
										noResultsMessage={index}
										onChange={this.rightFeatureGroupChange.bind(this)}
										options={this.state.positionOptions}
									/>
								</Form.Field>
								<Form.Field style={{ padding: "10px" }}>
									<Dropdown
										placeholder={i18n.t("matchPet.part")}
										name="partid"
										fluid
										clearable
										search
										selection
										noResultsMessage={index}
										onChange={this.rightFeatureGroupChange.bind(this)}
										options={this.state.partOptions}
									/>
								</Form.Field>
								<Form.Field style={{ padding: "10px" }}>
									<Dropdown
										placeholder={i18n.t("matchPet.feature")}
										name="featureid"
										fluid
										clearable
										search
										selection
										noResultsMessage={index}
										onChange={this.rightFeatureGroupChange.bind(this)}
										options={this.state.featureOptions}
									/>
								</Form.Field>
								<Form.Field style={{ padding: "10px" }}>
									<Dropdown
										placeholder={i18n.t("matchPet.color")}
										name="colorid"
										fluid
										clearable
										search
										selection
										noResultsMessage={index}
										onChange={this.rightFeatureGroupChange.bind(this)}
										options={this.state.colorOptions}
									/>
								</Form.Field>
							</div>
						)}
						<Form.Field style={{ paddingTop: "10px", paddingRight: "20%", paddingLeft: "20%" }}>
							<Form.Button
								style={{ width: "100%", paddingBottom: "10px" }}
								name="LeftPets"
								content={i18n.t("matchPet.addFeature")}
								onClick={this.addRightFeatureGroup.bind(this)}
							></Form.Button>
						</Form.Field>
					</div>
					<div className="petMatchingRow" >
						<div className="petMatchingColumn">
							{this.state.loaded ?
								<Loader active inline='centered' /> :
								rightFilteredPets ? rightFilteredPets.map((pet, i) =>
									<div className="petMatchingColumn" key={i}>
										<Card onClick={this.leftSelectPet.bind(this)} name="LeftPets" value={pet.pet_id}>
											<Image name="LeftPets" value={pet.pet_id} src={pet.pet_image} ui={false} style={{ height: "400px" }} />
											<Card.Content name="LeftPets" value={pet.pet_id}>
												<Card.Header name="LeftPets" value={pet.pet_id}>{pet.pet_name}</Card.Header>
												<Card.Meta name="LeftPets" value={pet.pet_id}>
													<span name="LeftPets" value={pet.pet_id} className='date'>{i18n.t("matchPet.breed")}: {pet.primary_breed}</span>
												</Card.Meta>
												<Card.Meta name="LeftPets" value={pet.pet_id}>
													<span name="LeftPets" value={pet.pet_id} className='date'>{i18n.t("matchPet.gender")}: {pet.gender}</span>
												</Card.Meta>
												<Card.Meta name="LeftPets" value={pet.pet_id}>
													<span name="LeftPets" value={pet.pet_id} className='date'>{i18n.t("matchPet.altered")}: {pet.altered_status}</span>
												</Card.Meta>
												<Card.Meta name="LeftPets" value={pet.pet_id}>
													<span name="LeftPets" value={pet.pet_id} className='date'>{i18n.t("matchPet.status")}: {pet.pet_status}</span>
												</Card.Meta>
												<Card.Description name="LeftPets" value={pet.pet_id}>
													{pet.animal_type}
												</Card.Description>
												<Card.Description name="LeftPets" value={pet.pet_id}>
													<span name="LeftPets" value={pet.pet_id} className='date'>ID: {pet.pet_id}</span>
												</Card.Description>
											</Card.Content>
										</Card>
									</div>
								) : this.state.LeftPets.map((pet, i) =>
									<div key={i}>

									</div>
								)}
						</div>

						<div className="petMatchingColumn">
							{this.state.loaded ?
								<Loader active inline='centered' /> :
								leftFilteredPets ? leftFilteredPets.map((pet, i) =>
									<div className="petMatchingColumn" key={i}>
										<Card onClick={this.rightSelectPet.bind(this)} value={pet.pet_id} >
											<Image value={pet.pet_id} src={pet.pet_image} ui={false} style={{ height: "400px" }} />
											<Card.Content value={pet.pet_id}>
												<Card.Header value={pet.pet_id}>{pet.pet_name}</Card.Header>
												<Card.Meta value={pet.pet_id}>
													<span value={pet.pet_id} className='date'>{i18n.t("matchPet.breed")}: {pet.primary_breed}</span>
												</Card.Meta>
												<Card.Meta value={pet.pet_id}>
													<span value={pet.pet_id} className='date'>{i18n.t("matchPet.gender")}: {pet.gender}</span>
												</Card.Meta>
												<Card.Meta value={pet.pet_id}>
													<span value={pet.pet_id} className='date'>{i18n.t("matchPet.altered")}: {pet.altered_status}</span>
												</Card.Meta>
												<Card.Meta value={pet.pet_id}>
													<span value={pet.pet_id} className='date'>{i18n.t("matchPet.status")}: {pet.pet_status}</span>
												</Card.Meta>
												<Card.Description value={pet.pet_id}>
													{pet.animal_type}
												</Card.Description>
												<Card.Description value={pet.pet_id}>
													<span value={pet.pet_id} className='date'>ID: {pet.pet_id}</span>
												</Card.Description>
											</Card.Content>
										</Card>
									</div>
								) : this.state.RightPets.map((pet, i) =>
									<div className="petMatchingColumn" key={i}>
										<Card onClick={this.selectPet.bind(this)} value={pet.pet_id}>
											<Image value={pet.pet_id} src={pet.pet_image} ui={false} style={{ height: "400px" }} />
											<Card.Content>
												<Card.Header value={pet.pet_id}>{pet.pet_name}</Card.Header>
												<Card.Meta value={pet.pet_id}>
													<span value={pet.pet_id} className='date'>{i18n.t("matchPet.breed")}: {pet.primary_breed}</span>
												</Card.Meta>
												<Card.Meta value={pet.pet_id}>
													<span value={pet.pet_id} className='date'>{i18n.t("matchPet.gender")}: {pet.gender}</span>
												</Card.Meta>
												<Card.Meta value={pet.pet_id}>
													<span value={pet.pet_id} className='date'>{i18n.t("matchPet.altered")}: {pet.altered_status}</span>
												</Card.Meta>
												<Card.Meta value={pet.pet_id}>
													<span value={pet.pet_id} className='date'>{i18n.t("matchPet.status")}: {pet.pet_status}</span>
												</Card.Meta>
												<Card.Description value={pet.pet_id}>
													{pet.animal_type}
												</Card.Description>
												<Card.Description value={pet.pet_id}>
													<span value={pet.pet_id} className='date'>ID: {pet.pet_id}</span>
												</Card.Description>
											</Card.Content>
										</Card>
									</div>
								)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default PetMatching