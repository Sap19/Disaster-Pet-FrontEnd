import React, { Component } from 'react'
import { Button, Dropdown, Form, Input, Table, Loader } from 'semantic-ui-react'
import '../../../Assets/Css/AdminTools/ManageUsers.css'
import { Link } from "react-router-dom"
import i18n from '../../../Component/i18n/i18n';
import Moment from 'moment';

export class ManageDisasters extends Component {
	constructor(props) {
		super(props);
		this.state = {
			Disasters: [],
			search: '',
			filter: 'id',
			filterOptions: [
				{ 'key': 1, 'value': 'id', 'text': 'ID' },
				{ 'key': 2, 'value': 'disaster_name', 'text': 'Disaster Name' },
				{ 'key': 3, 'value': 'county', 'text': 'County' },
				{ 'key': 4, 'value': 'state', 'text': 'State' },
			],
			loaded: true
		}
	}

	setDropDownInputValue = (event, data) => {
		this.setState({
			[data.name]: data.value,
		})

	}
	changeRoute() {
		this.props.history.push('/newDisaster')
	}
	handleSearchChange(event) {

		this.setState({
			[event.target.name]: event.target.value.substr(0, 20),
		})
	}
	componentDidMount() {
		this.Disasters();
	}

	async Disasters() {
		try {
			let res = await fetch('http://127.0.0.1:5000/managedisater', {
				method: 'GET',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
			});
			let result = await res.json();
			if (result.message === "all disasters returned") {
				this.setState({
					Disasters: result.Disasters,
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
		let disasterSearch = this.state.Disasters.filter(
			(disaster) => {
				return disaster[this.state.filter].toString().toLowerCase().indexOf(this.state.search) !== -1
			}
		)
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/adminTools"> &#8592; {i18n.t("adminTools.backToAdmin")} </Button>
				</div>
				<div style={{ paddingRight: "20%", paddingLeft: "20%", paddingTop: '1%' }}>
					<h1 style={{ border: "1px solid", borderRadius: "16px" }}>{i18n.t("manageDisaster.title")}</h1>
				</div>
				<div style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "3%" }}>
					<div classname="row">
						<Form.Field className="optionColumn">
							<Input
								type="text"
								name="search"
								value={this.state.search}
								onChange={this.handleSearchChange.bind(this)}
								placeholder={i18n.t("manageDisaster.search")}
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
						<Form.Field className="optionColumn" style={{ paddingLeft: "1%" }}>
							<Form.Button
								content={i18n.t("manageDisaster.addDisaster")}
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
									<Table.HeaderCell>{i18n.t("manageDisaster.name")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("manageDisaster.county")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("manageDisaster.state")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("manageDisaster.start")}</Table.HeaderCell>
									<Table.HeaderCell>{i18n.t("manageDisaster.end")}</Table.HeaderCell>
								</Table.Row>
							</Table.Header>

							<Table.Body>
								{this.state.loaded ? <Loader active /> :
									disasterSearch.map((disaster, i) =>
										<Table.Row key={i}>
											<Table.Cell>
												<Link to={`/disasterEdit/${disaster.id}`}>
													{disaster.id}
												</Link>
											</Table.Cell>
											<Table.Cell>
												<Link to={`/disasterEdit/${disaster.id}`}>
													{disaster.disaster_name}
												</Link>
											</Table.Cell>
											<Table.Cell>
												<Link to={`/disasterEdit/${disaster.id}`}>
													{disaster.county}
												</Link>
											</Table.Cell>
											<Table.Cell>
												<Link to={`/disasterEdit/${disaster.id}`}>
													{disaster.state}
												</Link>
											</Table.Cell>
											<Table.Cell>
												<Link to={`/disasterEdit/${disaster.id}`}>
													{localStorage.getItem("i18nextLng") == "en" ?
														<a style={{ textAlign: "left", display: 'inline' }}>{Moment(disaster.start_date).format('MM-DD-YYYY')}</a> :
														<a style={{ textAlign: "left", display: 'inline' }}>{Moment(disaster.start_date).format('DD-MM-YYYY')}</a>}
												</Link>
											</Table.Cell>
											<Table.Cell>
												<Link to={`/disasterEdit/${disaster.id}`}>
													{disaster.end_date == null ? "N/A" : localStorage.getItem("i18nextLng") == "en" ?
														<a style={{ textAlign: "left", display: 'inline' }}>{Moment(disaster.end_date).format('MM-DD-YYYY')}</a> :
														<a style={{ textAlign: "left", display: 'inline' }}>{Moment(disaster.end_date).format('DD-MM-YYYY')}</a>}
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

export default ManageDisasters