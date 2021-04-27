import React, { Component } from 'react'
import { Button, Dropdown, Form, Input, Table, Loader, FormField } from 'semantic-ui-react'
import '../../../Assets/Css/AdminTools/ManageUsers.css'
import { Link } from "react-router-dom"
import i18n from '../../../Component/i18n/i18n';

export class ManageMatches extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Matches: [],
			search: '',
			filter: 'id',
			filterOptions: [
				{ 'key': 1, 'value': 'id', 'text': 'ID' },
				{ 'key': 2, 'value': 'fname', 'text': 'First Name' },
				{ 'key': 3, 'value': 'lname', 'text': 'Last Name' },
				{ 'key': 4, 'value': 'email', 'text': 'Email' },
			],
			loaded: true
		}
	}

	setDropDownInputValue = (event, data) => {
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
		this.Matches();
	}
	adminCheck(admincheck, matchID) {
		if (admincheck == "null") {
			return <div><Table.Cell>
			<FormField>
				<Button
					name={matchID}
					style={{ width: '100%', }}
					className="ui positive button"
					content="Accept"
					onClick={this.acceptMatch.bind(this)}>
				</Button>
			</FormField>
		</Table.Cell><Table.Cell>
			<FormField>
				<Button
					name={matchID}
					style={{ width: '100%', }}
					className="ui negative button"
					content="Deny"
					onClick={this.denyMatch.bind(this)}>
				</Button>
			</FormField>
		</Table.Cell></div>
		} else if (admincheck == true) {
			return <Table.Cell>
			Match Accepted
		</Table.Cell>;
		} else {
			return <Table.Cell>
			Match Denied
		</Table.Cell>;
		}
	}
	async acceptMatch(matchID, data) {
		try {
			let res = await fetch('http://127.0.0.1:5000/managepetmatch', {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: data.name,
					admincheck: 1,
				})
			});
			let result = await res.json();
			if (result.message === "Match Updated") {
				this.Matches()
				alert("Match has been Accepted")
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	async denyMatch(matchID, data) {
		try {
			let res = await fetch('http://127.0.0.1:5000/managepetmatch', {
				method: 'PATCH',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: data.name,
					admincheck: 0,
				})
			});
			let result = await res.json();
			if (result.message === "Match Updated") {
				this.Matches()
				alert("Match has been Denied")
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	async Matches() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managepetmatch', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
			});
			let result = await res.json();
			this.setState({
				Matches: result,
				loaded: false
			})
		} catch (e) {
			console.log(e)
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	render() {
		/*let matchesSearch = this.state.Matches.filter(
			(match) => {
				return match[this.state.filter].toString().toLowerCase().indexOf(this.state.search) !== -1
			}
		)*/
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/adminTools"> &#8592; {i18n.t("adminTools.backToAdmin")} </Button>
				</div>
				<div style={{ paddingRight: "20%", paddingLeft: "20%", paddingTop: '1%' }}>
					<h1 style={{ border: "1px solid", borderRadius: "16px" }}>Manage Matches</h1>
				</div>
				<div style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "3%" }}>
					<div classname="row">
						<Form.Field className="optionColumn">
							<Input
								type="text"
								name="search"
								value={this.state.search}
								onChange={this.handleSearchChange.bind(this)}
								placeholder={i18n.t("manageUsers.search")}
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
					</div>
					<div style={{ paddingBottom: "5%" }}>
						<Table striped>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>ID</Table.HeaderCell>
									<Table.HeaderCell>Pet Name</Table.HeaderCell>
									<Table.HeaderCell>Potential Match Name</Table.HeaderCell>
									<Table.HeaderCell></Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{this.state.loaded ? <Loader active /> :
									this.state.Matches.map((match, i) =>
										<Table.Row key={i}>
											<Table.Cell>
												<Link to={{
													pathname: "/viewMatch",
													state: match
												}}>
													{match[2].id}
												</Link>
											</Table.Cell>
											<Table.Cell>
												<Link to={{
													pathname: "/viewMatch",
													state: match
												}}>
													{match[0].pet[0].pet_name}
												</Link>
											</Table.Cell>
											<Table.Cell>
												<Link to={{
													pathname: "/viewMatch",
													state: match
												}}>
													{match[1].pet[0].pet_name}
												</Link>
											</Table.Cell>
											{this.adminCheck(match[2].admincheck,match[2].id )}

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

export default ManageMatches