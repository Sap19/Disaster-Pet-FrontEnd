import React, { Component } from 'react'
import { Button, Form, Message, Loader, Dropdown } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import i18n from '../../../../Component/i18n/i18n';

export class NewUniqueFeature extends Component {

	constructor(props) {
		super(props);
		this.state = {
			uniqueFeature: {},
			animal: "",
			part: "",
			color: "",
			feature: "",
			position: "",
			animalOptions: [],
			partOptions: [],
			colorOptions: [],
			featureOptions: [],
			positionOptions: [],
			errorMessage: "",
			successMessage: "",
			loaded: true
		}
	}
	newDropDownValue = (event, data) => {
		let newSelectedID = data.options.filter((option) => option.value === data.value)
		this.setState({
			[data.name]: newSelectedID[0].key,
		})
	}
	componentDidMount() {
		this.getDropdownInfo()
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
			result.animal.forEach((animal, i) => {
				this.setState({
					arr: this.state.animalOptions.push({ 'key': animal.id, 'value': animal.id, 'text': animal.animal })
				})
			})

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
				errorMessage: i18n.t("error")
			})
		}
	}
	async updateUniqueFeatureInfo() {
		try {
			let res = await fetch('http://127.0.0.1:5000/manageuniquefeatures', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					color: this.state.color,
					animal: this.state.animal,
					feature: this.state.feature,
					bodyPart: this.state.part,
					position: this.state.position
				})
			});
			let result = await res.json();
			if (result.message === "New Feature Has been Added") {
				this.setState({
					successMessage: i18n.t("manageUniqueFeatures.new")
				})
			}

		} catch (e) {
			this.setState({
				errorMessage: i18n.t("error")
			})
		}
	}
	render() {
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{ paddingLeft: '2%' }}>
					<Button className="backButton" href="/manageUniquefeatures"> &#8592; {i18n.t("manageUniqueFeatures.back")} </Button>
				</div>
				<h2>{i18n.t("manageUniqueFeatures.addTitle")}</h2>
				<div className="message">
					{this.state.errorMessage &&
						<Message className="error"> {this.state.errorMessage} </Message>}
					{this.state.successMessage &&
						<Message className="success"> {this.state.successMessage} </Message>}
				</div>
				<div style={{ paddingLeft: "35%", paddingRight: "35%" }}>
					{this.state.loaded ? <Loader active /> :
						<Form>
							<Form.Field>
								<label>{i18n.t("manageUniqueFeatures.animal")}</label>
									<Dropdown
										placeholder={i18n.t("manageUniqueFeatures.animal")}
										name="animal"
										fluid
										selection
										onChange={this.newDropDownValue}
										options={this.state.animalOptions}
									/>
							</Form.Field>
							<Form.Field>
								<label>{i18n.t("manageUniqueFeatures.part")}</label>
									<Dropdown
										placeholder={i18n.t("manageUniqueFeatures.part")}
										name="part"
										fluid
										selection
										onChange={this.newDropDownValue}
										options={this.state.partOptions}
									/>
							</Form.Field>
							<Form.Field>
								<label>{i18n.t("manageUniqueFeatures.color")}</label>
									<Dropdown
										placeholder={i18n.t("manageUniqueFeatures.color")}
										name="color"
										fluid
										selection
										onChange={this.newDropDownValue}
										options={this.state.colorOptions}
									/>
							</Form.Field>
							<Form.Field>
								<label>{i18n.t("manageUniqueFeatures.feature")}</label>
									<Dropdown
										placeholder={i18n.t("manageUniqueFeatures.feature")}
										name="feature"
										fluid
										selection
										onChange={this.newDropDownValue}
										options={this.state.featureOptions}
									/>
							</Form.Field>
							<Form.Field>
								<label>{i18n.t("manageUniqueFeatures.position")}</label>
									<Dropdown
										placeholder={i18n.t("manageUniqueFeatures.position")}
										name="position"
										fluid
										selection
										onChange={this.newDropDownValue}
										options={this.state.positionOptions}
									/>
							</Form.Field>
							<Form.Field>
								<Form.Button
									style={{ width: "100%", }}
									content={i18n.t("manageUniqueFeatures.addUniquefeature")}
									onClick={this.updateUniqueFeatureInfo.bind(this)}
								//value={0}
								>
								</Form.Button>
							</Form.Field>
						</Form>}
				</div>
			</div>
		)
	}
}

export default NewUniqueFeature