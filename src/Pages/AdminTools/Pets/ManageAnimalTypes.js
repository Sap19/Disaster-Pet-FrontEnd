import React, { Component } from 'react'
import { Button, Dropdown, Form, Input, Table, Loader } from 'semantic-ui-react'
import '../../../Assets/Css/AdminTools/ManageUsers.css'
import { Link } from "react-router-dom"

export class ManageAlteredStatus extends Component {
	constructor(props) {
		super(props);
		this.state = {
			AnimalType: [],
			search: '',
			filter: 'id',
			filterOptions: [
				{ 'key': 1, 'value': 'id', 'text': 'ID' },
				{ 'key': 2, 'value': 'animal', 'text': 'Name' },
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
	changeRoute() {
		this.props.history.push('/newAnimalType')
	}
	handleSearchChange(event) {

		this.setState({
			[event.target.name]: event.target.value.substr(0, 20),
		})
	}
	componentDidMount() {
		this.AnimalTypes();
	}

	async AnimalTypes() {
		try {
			let res = await fetch('http://127.0.0.1:5000/manageanimaltype', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
			});
			let result = await res.json();
			if (result.message === "All Animal Types Have Been Returned") {
				console.log(result.AnimalType)
				this.setState({
					AnimalType: result.AnimalType,
					loaded: false
				})
			}
		} catch (e) {
			console.log(e)
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	render() {
		let animalTypeSearch = this.state.AnimalType.filter(
			(animalType) => {
				return animalType[this.state.filter].toString().toLowerCase().indexOf(this.state.search) !== -1
			}
		)
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/adminTools"> &#8592; Back to Admin Tools </Button>
				</div>
				<div style={{ paddingRight: "20%", paddingLeft: "20%", paddingTop: '1%' }}>
					<h1 style={{ border: "1px solid", borderRadius: "16px" }}>Manage Animal Type</h1>
				</div>
				<div style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "3%" }}>
					<div classname="row">
						<Form.Field className="optionColumn">
							<Input
								type="text"
								name="search"
								value={this.state.search}
								onChange={this.handleSearchChange.bind(this)}
								placeholder="Search"
							/>
						</Form.Field>
						<Form.Field className="optionColumn">
							<Dropdown
								placeholder='Filter'
								name="filter"
								fluid
								defaultValue='id'
								selection
								onChange={this.setDropDownInputValue}
								options={this.state.filterOptions}
							/>
						</Form.Field>
						<Form.Field className="optionColumn" style={{paddingLeft: "1%"}}>
							<Form.Button
								content="Add New Animal Type"
								color="green"
								onClick={() => this.changeRoute()}
							//value={0}
							>
							</Form.Button>
						</Form.Field>
					</div>
					<div style={{ paddingBottom: "5%" }}>
						<Table striped>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>ID</Table.HeaderCell>
									<Table.HeaderCell>Name</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{this.state.loaded ? <Loader active /> :
									animalTypeSearch.map((animalType, i) =>
										<Table.Row key={i}>
											<Table.Cell>
												<Link to={`/animalTypeEdit/${animalType.id}`}>
													{animalType.id}
												</Link>
											</Table.Cell>
											<Table.Cell>
												<Link to={`/animalTypeEdit/${animalType.id}`}>
													{animalType.animal}
												</Link>
											</Table.Cell>
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

export default ManageAlteredStatus