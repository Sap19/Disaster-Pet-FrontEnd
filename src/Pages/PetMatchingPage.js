import React, { Component } from 'react'
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
			loaded: true
		}
	}
	componentDidMount() {
		this.MatchingInit();
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
	addFilter = (event, data) => {
		let optionText = event.target.textContent;

		const newList = this.state.RightPets.filter((pet) => pet[data.name] === optionText)
		this.setState({
			RightPets: newList
		})
	}
	leftSelectPet(event) {
		console.log(event.target)
		const NewRightPet = this.state.RightPets.filter((pet) => pet.pet_id.toString().indexOf(event.target.getAttribute('value')) !== -1)
		console.log(NewRightPet);
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
			LeftPets: newLeftPet
		})
	}
	rightSelectPet(event) {
		console.log(event.target)
		const newLeftPet = this.state.LeftPets.filter((pet) => pet.pet_id.toString().indexOf(event.target.getAttribute('value')) !== -1)
		this.setState({
			LeftPets: newLeftPet
		})
	}
	resetSearch(event) {
		this.setState({
			[event.target.name]: this.state.DefualtPets
		})
	}
	async MatchingInit() {
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
					RightPets: result.pets,
					LeftPets: result.pets,
					DefualtPets: result.pets,
					loaded: false
				})
				console.log(this.state.RightPets)
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
						<Form.Field style={{ paddingRight: "20%", paddingLeft: "20%" }}>
							<Form.Button
								style={{ width: "100%", }}
								name="RightPets"
								content={i18n.t("matchPet.reset")}
								onClick={this.resetSearch.bind(this)}
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
						<Form.Field style={{ paddingRight: "20%", paddingLeft: "20%" }}>
							<Form.Button
								style={{ width: "100%", }}
								name="LeftPets"
								content={i18n.t("matchPet.reset")}
								onClick={this.resetSearch.bind(this)}
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
										<Image name="LeftPets" value={pet.pet_id} src={pet.pet_image} ui={false} />
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
									<Card onClick={this.rightSelectPet.bind(this)} value={pet.pet_id}>
										<Image value={pet.pet_id} src={pet.pet_image} ui={false} />
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
										<Image value={pet.pet_id} src={pet.pet_image} ui={false} />
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