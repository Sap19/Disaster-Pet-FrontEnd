import React, { Component } from 'react'
import _ from 'lodash'
import { Dropdown, Card, Icon, Image, Form, Input } from 'semantic-ui-react'
import "../Assets/Css/PetMatchingPage.css"
import Footer from "../Component/Footer/Footer"

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
			search: '',
			gender: '',
			altered_status: '',
			animal_type:'',
			coat_color: '',
			primary_breed: ''
		}
	}
	componentDidMount() {
		this.MatchingInit();
	}
	handleSearchChange(event) {
		this.setState({
			search: event.target.value.substr(0, 20)
		})
	}
	setDropDownInputValue = (event, data) => {
		let optionText = event.target.textContent;
		
		const newList = this.state.RightPets.filter((pet) => pet[data.name] === optionText)
		if(this.state[data.name] === '') {
			this.setState({
				RightPets: newList
			})
		}
		this.setState({
			[data.name]: data.value,
		})
		if(this.state[data.name] !== '') {
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
	selectPet(event) {
		const NewRightPet = this.state.RightPets.filter((pet) => pet.pet_id.toString().indexOf(event.target.getAttribute('value')) !== -1)
		console.log(NewRightPet);
		const newLeftPet = this.state.LeftPets.filter((pet) => 
			pet.altered_status === NewRightPet[0].altered_status &&
			pet.animal_type === NewRightPet[0].animal_type &&
			pet.gender === NewRightPet[0].gender &&
			pet.primary_breed === NewRightPet[0].primary_breed 
		)
		this.setState({
			RightPets: NewRightPet,
			gender: NewRightPet[0].gender,
			altered_status: NewRightPet[0].altered_status,
			pet_type: NewRightPet[0].animal_type,
			breed: NewRightPet[0].primary_breed,
			LeftPets: newLeftPet
		})
	}
	async MatchingInit() {
		try {
			let res = await fetch('http://127.0.0.1:5000/petmatching', {
				method: 'GET',
			});
			let result = await res.json();
			if (result.message == "successfully Pulled!") {
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
		let filteredPets = this.state.RightPets.filter(
			(pet) => {
				return pet.pet_id.toString().indexOf(this.state.search) !== -1
			}
		)
		return (
			<div style={{ paddingTop: "60px" }}>
				<h1 style={{ paddingLeft: "15%" }}>Pet Matching</h1>
				<div className="sidenav">
					<Form.Field style={{ padding: "10px" }}>
						<Input
							className="searchInput"
							type="text"
							value={this.state.search}
							onChange={this.handleSearchChange.bind(this)}
							placeholder="Pet ID Search"
						/>
					</Form.Field>
					<Form.Field style={{ padding: "10px" }}>
						<Dropdown
							placeholder='Gender'
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
							placeholder='AlterStatus'
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
							placeholder='Pet Type'
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
							placeholder='Coat Color'
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
							placeholder='Breed'
							name="primary_breed"
							fluid
							clearable
							search
							selection
							onChange={this.setDropDownInputValue}
							options={this.state.primary_breedOption}
						/>
					</Form.Field>
				</div>

				<div className="petMatchingRow" >
					<div className="petMatchingColumn">
						{filteredPets ? filteredPets.map((pet, i) =>
							<div className="petMatchingColumn" key={i}>
								<Card onClick={this.selectPet.bind(this)} value={pet.pet_id}>
									<Image value={pet.pet_id} src={pet.pet_image} ui={false} />
									<Card.Content>
										<Card.Header value={pet.pet_id}>{pet.pet_name}</Card.Header>
										<Card.Meta>
											<span value={pet.pet_id} className='date'>Breed: {pet.primary_breed}</span>
										</Card.Meta>
										<Card.Meta>
											<span value={pet.pet_id} className='date'>Gender: {pet.gender}</span>
										</Card.Meta>
										<Card.Meta>
											<span value={pet.pet_id} className='date'>Altered: {pet.altered_status}</span>
										</Card.Meta>
										<Card.Meta>
											<span value={pet.pet_id} className='date'>Status: {pet.pet_status}</span>
										</Card.Meta>
										<Card.Description value={pet.pet_id}>
											{pet.animal_type}
										</Card.Description>
										<Card.Description value={pet.pet_id}>
											<span className='date'>ID: {pet.pet_id}</span>
										</Card.Description>
									</Card.Content>
								</Card>
							</div>
						): this.stateRightPets.map((pet, i) =>
							<div className="petMatchingColumn" key={i}>
								<Card onClick={this.selectPet.bind(this)} value={pet.pet_id}>
									<Image value={pet.pet_id} src={pet.pet_image} ui={false} />
									<Card.Content>
										<Card.Header value={pet.pet_id}>{pet.pet_name}</Card.Header>
										<Card.Meta>
											<span value={pet.pet_id} className='date'>Breed: {pet.primary_breed}</span>
										</Card.Meta>
										<Card.Meta>
											<span value={pet.pet_id} className='date'>Gender: {pet.gender}</span>
										</Card.Meta>
										<Card.Meta>
											<span value={pet.pet_id} className='date'>Altered: {pet.altered_status}</span>
										</Card.Meta>
										<Card.Meta>
											<span value={pet.pet_id} className='date'>Status: {pet.pet_status}</span>
										</Card.Meta>
										<Card.Description value={pet.pet_id}>
											{pet.animal_type}
										</Card.Description>
										<Card.Description value={pet.pet_id}>
											<span className='date'>ID: {pet.pet_id}</span>
										</Card.Description>
									</Card.Content>
								</Card>
							</div>
						)}
					</div>

					<div className="petMatchingColumn">
						{this.state.LeftPets.map((pet, i) =>
							<div className="petMatchingColumn" key={i}>
								<Card>
									<Image src={pet.pet_image} ui={false} />
									<Card.Content>
										<Card.Header>{pet.pet_name}</Card.Header>
										<Card.Meta>
											<span className='date'>Breed: {pet.primary_breed}</span>
										</Card.Meta>
										<Card.Meta>
											<span className='date'>Gender: {pet.gender}</span>
										</Card.Meta>
										<Card.Meta>
											<span className='date'>Altered: {pet.altered_status}</span>
										</Card.Meta>
										<Card.Meta>
											<span className='date'>Status: {pet.pet_status}</span>
										</Card.Meta>
										<Card.Description>
											{pet.animal_type}
										</Card.Description>
										<Card.Description>
											<span className='date'>ID: {pet.pet_id}</span>
										</Card.Description>
									</Card.Content>
								</Card>
							</div>
						)}
					</div>
				</div>
			</div>
		)
	}
}
export default PetMatching