import React, { Component } from 'react'
import { Button, Dropdown, Form, Input, Table, Loader } from 'semantic-ui-react'
import '../../../Assets/Css/AdminTools/ManageUsers.css'
import { Link } from "react-router-dom"
import i18n from '../../../Component/i18n/i18n';
import Moment from 'moment';

export class ManagePets extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Pets: [],
			search: '',
			filter: 'pet_id',
			filterOptions: [
				{ 'key': 1, 'value': 'pet_id', 'text': 'ID' },
				{ 'key': 2, 'value': 'pet_name', 'text': 'Name' },
				{ 'key': 3, 'value': 'gender', 'text': 'Gender' },
				{ 'key': 4, 'value': 'pet_status', 'text': 'Status' },
				{ 'key': 5, 'value': 'primary_breed', 'text': 'Primary Breed' },
				{ 'key': 6, 'value': 'secondary_breed', 'text': 'Secondary Breed' },
				{ 'key': 7, 'value': 'animal_type', 'text': 'Animal Type' },
				{ 'key': 8, 'value': 'altered_status', 'text': 'Altered Status' },
			],
			loaded: true
		}
	}

	setDropDownInputValue = (event, data) => {
		console.log(data.value)
		this.setState({
			[data.name]: data.value,
		})

	}
	handleSearchChange(event) {

		this.setState({
			[event.target.name]: event.target.value.substr(0, 20),
		})
	}
	componentDidMount() {
		this.Pets();
	}

	async Pets() {
		try {
			let res = await fetch('http://127.0.0.1:5000/petmatching', {
				method: 'GET',
			});
			let result = await res.json();
			if (result.message === "successfully Pulled!") {
				console.log(result)
				this.setState({
					Pets: result.pets,
					loaded: false
				})
			}
		} catch (e) {
			console.log("Server Error. Please Refresh Page")
		}
	}
	render() {
		let petSearch = this.state.Pets.filter(
			(pet) => {
				return pet[this.state.filter].toString().toLowerCase().indexOf(this.state.search) !== -1
			}
		)
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/adminTools"> &#8592; {i18n.t("adminTools.backToAdmin")} </Button>
				</div>
				<div style={{ paddingRight: "20%", paddingLeft: "20%", paddingTop: '1%' }}>
					<h1 style={{ border: "1px solid", borderRadius: "16px" }}>{i18n.t("managePets.title")}</h1>
				</div>
				<div style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "3%" }}>
					<div classname="row">
						<Form.Field className="optionColumn">
							<Input
								type="text"
								name="search"
								value={this.state.search}
								onChange={this.handleSearchChange.bind(this)}
								placeholder={i18n.t("managePets.search")}
							/>
						</Form.Field>
						<Form.Field className="optionColumn">
							<Dropdown
								placeholder='Filter'
								name="filter"
								fluid
								defaultValue='pet_id'
								selection
								onChange={this.setDropDownInputValue}
								options={this.state.filterOptions}
							/>
						</Form.Field>
					</div>
					<div style={{ paddingBottom: "5%" }}>
						<Table striped>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>ID</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("managePets.name")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("managePets.animalType")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("managePets.gender")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("managePets.status")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("managePets.primary")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("managePets.secondary")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("managePets.altered")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("managePets.dateAdded")}</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{this.state.loaded ? <Loader active /> :
									petSearch.map((pet, i) =>
										<Table.Row key={i}>
											<Table.Cell>
												<Link to={`/petEdit/${pet.pet_id}`}>
													{pet.pet_id}
												</Link>
											</Table.Cell>
											<Table.Cell>
												<Link to={`/petEdit/${pet.pet_id}`}>
													{pet.pet_name}
												</Link>
											</Table.Cell>
											<Table.Cell>{pet.animal_type}</Table.Cell>
											<Table.Cell>{pet.gender}</Table.Cell>
											<Table.Cell>{pet.pet_status}</Table.Cell>
											<Table.Cell>{pet.primary_breed}</Table.Cell>
											<Table.Cell>{pet.secondary_breed}</Table.Cell>
											<Table.Cell>{pet.altered_status}</Table.Cell>
											{localStorage.getItem("i18nextLng") == "en" ?
												<Table.Cell style={{ textAlign: "left", display: 'inline' }}>{Moment(pet.date_created.slice(0, 16)).format('MM-DD-YYYY')}</Table.Cell> :
												<Table.Cell style={{ textAlign: "left", display: 'inline' }}>{Moment(pet.date_created.slice(0, 16)).format('DD-MM-YYYY')}</Table.Cell>}
										</Table.Row>
									)}
							</Table.Body>
						</Table>
					</div>
				</div>
			</div>
		)
	}
}

export default ManagePets