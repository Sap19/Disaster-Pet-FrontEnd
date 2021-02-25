import React, { Component } from 'react'
import { Button, Dropdown, Form, Input, Table, Loader } from 'semantic-ui-react'
import '../../../Assets/Css/AdminTools/ManageUsers.css'
import { Link } from "react-router-dom"
import i18n from '../../../Component/i18n/i18n';

export class ManageUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Users: [],
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
		this.Users();
	}

	async Users() {
		try {
			let res = await fetch('http://127.0.0.1:5000/manageuser', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({

				})
			});
			let result = await res.json();
			if (result.message === "all users returned") {
				console.log(result.Users)
				this.setState({
					Users: result.Users,
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
		let userSearch = this.state.Users.filter(
			(user) => {
				return user[this.state.filter].toString().toLowerCase().indexOf(this.state.search) !== -1
			}
		)
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/adminTools"> &#8592; {i18n.t("adminTools.backToAdmin")} </Button>
				</div>
				<div style={{ paddingRight: "20%", paddingLeft: "20%", paddingTop: '1%' }}>
					<h1 style={{ border: "1px solid", borderRadius: "16px" }}>{i18n.t("manageUsers.title")}</h1>
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
									<Table.HeaderCell>{i18n.t("manageUsers.name")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("manageUsers.email")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("manageUsers.role")}</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{this.state.loaded ? <Loader active /> :
									userSearch.map((user, i) =>
										<Table.Row key={i}>
											<Table.Cell>
												<Link to={`/userEdit/${user.id}`}>
													{user.id}
												</Link>
											</Table.Cell>
											<Table.Cell>
												<Link to={`/userEdit/${user.id}`}>
													{user.fname} {user.lname}
												</Link>
											</Table.Cell>
											<Table.Cell>{user.email}</Table.Cell>
											<Table.Cell>{user.role_id}</Table.Cell>
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

export default ManageUser