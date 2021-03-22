import React, { Component } from 'react'
import { Button, Dropdown, Form, Input, Table, Loader } from 'semantic-ui-react'
import '../../../Assets/Css/AdminTools/ManageUsers.css'
import { Link } from "react-router-dom"
import i18n from '../../../Component/i18n/i18n';

export class ManageColors extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Colors: [],
			search: '',
			filter: 'id',
			filterOptions: [
				{ 'key': 1, 'value': 'id', 'text': 'ID' },
				{ 'key': 2, 'value': 'color', 'text': 'Color' },
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
		this.props.history.push('/newColor')
	}
	handleSearchChange(event) {

		this.setState({
			[event.target.name]: event.target.value.substr(0, 20),
		})
	}
	componentDidMount() {
		this.Colors();
	}

	async Colors() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managecolor', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
			});
			let result = await res.json();
			if (result.message === "All Colors Have Been Returned") {
				console.log(result.Color)
				this.setState({
					Colors: result.Color,
					loaded: false
				})
			}
		} catch (e) {
			console.log(e)
			this.setState({
				errorMessage: i18n.t("error")
			})
		}
	}
	render() {
		let colorSearch = this.state.Colors.filter(
			(color) => {
				return color[this.state.filter].toString().toLowerCase().indexOf(this.state.search) !== -1
			}
		)
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/adminTools"> &#8592; {i18n.t("adminTools.backToAdmin")} </Button>
				</div>
				<div style={{ paddingRight: "20%", paddingLeft: "20%", paddingTop: '1%' }}>
					<h1 style={{ border: "1px solid", borderRadius: "16px" }}>{i18n.t("manageColors.title")}</h1>
				</div>
				<div style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "3%" }}>
					<div classname="row">
						<Form.Field className="optionColumn">
							<Input
								type="text"
								name="search"
								value={this.state.search}
								onChange={this.handleSearchChange.bind(this)}
								placeholder={i18n.t("manageColors.search")}
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
								content={i18n.t("manageColors.addColor")}
								color="green"
								onClick={() => this.changeRoute()}
							>
							</Form.Button>
						</Form.Field>
					</div>
					<div style={{ paddingBottom: "5%" }}>
						<Table striped>
							<Table.Header>
								<Table.Row>
									<Table.HeaderCell>ID</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("manageColors.color")}</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{this.state.loaded ? <Loader active /> :
									colorSearch.map((color, i) =>
										<Table.Row key={i}>
											<Table.Cell>
												<Link to={`/colorEdit/${color.id}`}>
													{color.id}
												</Link>
											</Table.Cell>
											<Table.Cell>
												<Link to={`/colorEdit/${color.id}`}>
													{color.color}
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

export default ManageColors