import React, { Component } from 'react'
import { Button, Form, Message, Image, FormField } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import i18n from '../../../Component/i18n/i18n';
import "../../../Assets/Css/PetDetails.css";
import "../../../Assets/Css/ManageMatch.css"
import Moment from 'moment';

export class ViewMatch extends Component {

	constructor(props) {
		super(props);
		this.state = {
			matchID: props.location.state[2].id,
			admincheck: props.location.state[2].admincheck,
			pet: props.location.state[0],
			potentialPet: props.location.state[1],
			role: {},
			role_name: '',
			errorMessage: "",
			successMessage: "",
		}
	}
	componentDidMount() {

	}

	adminCheck() {
		if (this.state.admincheck == "null") {
			return <div className="rowMatch">
			<div className="columnMatchAccept">
				<FormField>
					<Button
						name={this.state.matchID}
						style={{ width: "100%", }}
						className="ui positive button"
						content="Accept"
						onClick={this.acceptMatch.bind(this)}
						>
					</Button>
				</FormField>
			</div>
			<div className="columnMatchDeny">
				<FormField>
					<Button
						name={this.state.matchID}
						style={{ width: "100%", }}
						className="ui negative button"
						content="Deny"
						onClick={this.denyMatch.bind(this)}>
					</Button>
				</FormField>
			</div>

		</div>
		} else if (this.state.admincheck == true) {
			return <div><h1>Match Accepted</h1></div>
		} else {
			return <div><h1>Match Denied</h1></div>
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
				this.props.history.push('/manageMatches')
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
				alert("Match has been Denied")
				this.props.history.push('/manageMatches')
			}

		} catch (e) {
			this.setState({
				errorMessage: "Server Error. Please Refresh Page"
			})
		}
	}
	render() {
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/manageMatches"> &#8592; Back To Manage Matches </Button>
				</div>
				<h2>View Match</h2>
				{this.adminCheck()}
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div className="row">
					<div className="column">
						<h2>{this.state.pet.pet[0].pet_name}</h2>
						<div className="petPhotoRow">
							<div className="petPhotoColumn">
								{this.state.pet.images.map((image, i) => (
									<Image
										src={image[0]}
										size="large"
										ui={false}
										style={{ width: "100%", height: "500px", paddingLeft: "2%", paddingBottom: "5%" }}
									/>
								))}
							</div>
							<div classname="petPhotoColumn" style={{ paddingTop: "5%" }}>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>ID: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.pet.pet[0].id}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.gender")}: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.pet.pet[0].gender}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.primary")}: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.pet.pet[0].primary_breed}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.secondary")}: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.pet.pet[0].secondary_breed}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.status")}: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.pet.pet[0].pet_status}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.altered")}: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.pet.pet[0].altered_status}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.animalType")}: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.pet.pet[0].animal_type}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.dateAdded")}: </h1>
									{localStorage.getItem("i18nextLng") == "en" ?
										<h2 style={{ textAlign: "left", display: 'inline' }}>{Moment(this.state.pet.pet[0].date_created).format('MM-DD-YYYY')}</h2> :
										<h2 style={{ textAlign: "left", display: 'inline' }}>{Moment(this.state.pet.pet[0].date_created).format('DD-MM-YYYY')}</h2>}
								</div>
							</div>
						</div>
						<div className="featureRow" style={{ paddingTop: "1%" }}>
							{this.state.pet.feature.map((feature, i) => (
								<div className="featureColumnManage" style={{ paddingTop: "1%" }}>
									<h1 style={{ fontWeight: "bold", textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.feature")} {i + 1}</h1>
									<div>
										<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.part")}: </h1>
										<h2 style={{ textAlign: "left", display: 'inline' }}>{feature[0].bodyPartid}</h2>
									</div>
									<div>
										<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.color")}: </h1>
										<h2 style={{ textAlign: "left", display: 'inline' }}>{feature[0].colorid}</h2>
									</div>
									<div>
										<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.feature")}: </h1>
										<h2 style={{ textAlign: "left", display: 'inline' }}>{feature[0].featureid}</h2>
									</div>
									<div>
										<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.position")}: </h1>
										<h2 style={{ textAlign: "left", display: 'inline' }}>{feature[0].positionid}</h2>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className="column">
						<h2>{this.state.potentialPet.pet[0].pet_name}</h2>
						<div className="petPhotoRow">
							<div className="petPhotoColumn">
								{this.state.potentialPet.images.map((image, i) => (
									<Image
										src={image[0]}
										size="large"
										ui={false}
										style={{ width: "100%", height: "500px", paddingLeft: "2%", paddingBottom: "5%" }}
									/>
								))}
							</div>
							<div classname="petPhotoColumn" style={{ paddingTop: "5%" }}>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>ID: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.potentialPet.pet[0].id}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.gender")}: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.potentialPet.pet[0].gender}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.primary")}: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.potentialPet.pet[0].primary_breed}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.secondary")}: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.potentialPet.pet[0].secondary_breed}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.status")}: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.potentialPet.pet[0].pet_status}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.altered")}: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.potentialPet.pet[0].altered_status}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.animalType")}: </h1>
									<h2 style={{ textAlign: "left", display: 'inline' }}>{this.state.potentialPet.pet[0].animal_type}</h2>
								</div>
								<div>
									<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.dateAdded")}: </h1>
									{localStorage.getItem("i18nextLng") == "en" ?
										<h2 style={{ textAlign: "left", display: 'inline' }}>{Moment(this.state.potentialPet.pet[0].date_created).format('MM-DD-YYYY')}</h2> :
										<h2 style={{ textAlign: "left", display: 'inline' }}>{Moment(this.state.potentialPet.pet[0].date_created).format('DD-MM-YYYY')}</h2>}
								</div>
							</div>
						</div>
						<div className="featureRow" style={{ paddingTop: "1%" }}>
							{this.state.potentialPet.feature.map((feature, i) => (
								<div className="featureColumnManage" style={{ paddingTop: "1%" }}>
									<h1 style={{ fontWeight: "bold", textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.feature")} {i + 1}</h1>
									<div>
										<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.part")}: </h1>
										<h2 style={{ textAlign: "left", display: 'inline' }}>{feature[0].bodyPartid}</h2>
									</div>
									<div>
										<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.color")}: </h1>
										<h2 style={{ textAlign: "left", display: 'inline' }}>{feature[0].colorid}</h2>
									</div>
									<div>
										<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.feature")}: </h1>
										<h2 style={{ textAlign: "left", display: 'inline' }}>{feature[0].featureid}</h2>
									</div>
									<div>
										<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.position")}: </h1>
										<h2 style={{ textAlign: "left", display: 'inline' }}>{feature[0].positionid}</h2>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default ViewMatch