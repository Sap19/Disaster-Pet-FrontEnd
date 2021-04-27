import React, { useEffect, useState } from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import '../Assets/Css/PetDetails.css'
import Footer from "../Component/Footer/Footer"
import "../Assets/Css/PetDetails.css";
import i18n from '../Component/i18n/i18n';
import Moment from 'moment';

function PetDetails({ match }) {
	useEffect(() => {
		fetchPet()
	}, [])
	const [pet, setPet] = useState({})
	const [petImages, setImages] = useState([])
	const [petFeatures, setFeatures] = useState([])
	function exampleReducer(state, action) {
		switch (action.type) {
			case 'close':
				return { open: false }
			case 'open':
				return { open: true, photo: action.photo.image }
			default:
				throw new Error('Unsupported action...')
		}
	}
	const [state, dispatch] = React.useReducer(exampleReducer, {
		open: false,
		photo: undefined,
	})
	const { open, photo } = state
	var petImagesArray = []
	var petFeaturesArray = []
	const fetchPet = async () => {
		const fetchPet = await fetch('http://127.0.0.1:5000/petdetails', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': "Bearer " + localStorage.getItem('token')
			},
			body: JSON.stringify({
				id: match.params.id
			})
		});
		const pet = await fetchPet.json();
		pet.pets[0].date_created = pet.pets[0].date_created.slice(0, 16)
		setPet(pet.pets[0])
		pet.images.map((image, i) => {
			petImagesArray.push(image[0])
		})
		pet.feature.map((feature, i) => {
			petFeaturesArray.push(feature[0])
		})
		setImages(petImagesArray)
		setFeatures(petFeaturesArray)
	}
	return (
		<div style={{ paddingTop: "60px" }}>
			<h2>{pet.pet_name}</h2>
			<div className="petPhotoRow">
				<div className="petPhotoColumn">
					{petImages.map((image, i) => (
						<Image
							src={image}
							size="large"
							ui={false}
							onClick={() => dispatch({ type: 'open', photo: { image } })}
							style={{ width: "40%", height: "500px", paddingLeft: "2%", paddingBottom: "5%" }}
						/>
					))}
				</div>
				<div classname="petPhotoColumn" style={{ paddingTop: "5%" }}>
					<div>
						<h1 style={{ textAlign: "left", display: 'inline' }}>ID: </h1>
						<h2 style={{ textAlign: "left", display: 'inline' }}>{pet.id}</h2>
					</div>
					<div>
						<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.gender")}: </h1>
						<h2 style={{ textAlign: "left", display: 'inline' }}>{pet.gender}</h2>
					</div>
					<div>
						<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.primary")}: </h1>
						<h2 style={{ textAlign: "left", display: 'inline' }}>{pet.primary_breed}</h2>
					</div>
					<div>
						<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.secondary")}: </h1>
						<h2 style={{ textAlign: "left", display: 'inline' }}>{pet.secondary_breed}</h2>
					</div>
					<div>
						<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.status")}: </h1>
						<h2 style={{ textAlign: "left", display: 'inline' }}>{pet.pet_status}</h2>
					</div>
					<div>
						<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.altered")}: </h1>
						<h2 style={{ textAlign: "left", display: 'inline' }}>{pet.altered_status}</h2>
					</div>
					<div>
						<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.animalType")}: </h1>
						<h2 style={{ textAlign: "left", display: 'inline' }}>{pet.animal_type}</h2>
					</div>
					<div>
						<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("managePets.dateAdded")}: </h1>
						{localStorage.getItem("i18nextLng") == "en" ?
							<h2 style={{ textAlign: "left", display: 'inline' }}>{Moment(pet.date_created).format('MM-DD-YYYY')}</h2> :
							<h2 style={{ textAlign: "left", display: 'inline' }}>{Moment(pet.date_created).format('DD-MM-YYYY')}</h2>}
					</div>
				</div>
			</div>
			<div className="featureRow" style={{ paddingTop: "1%" }}>
				{petFeatures.map((feature, i) => (
					<div className="featureColumn" style={{ paddingTop: "1%" }}>
						<h1 style={{ fontWeight: "bold", textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.feature")} {i + 1}</h1>
						<div>
							<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.part")}: </h1>
							<h2 style={{ textAlign: "left", display: 'inline' }}>{feature.bodyPartid}</h2>
						</div>
						<div>
							<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.color")}: </h1>
							<h2 style={{ textAlign: "left", display: 'inline' }}>{feature.colorid}</h2>
						</div>
						<div>
							<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.feature")}: </h1>
							<h2 style={{ textAlign: "left", display: 'inline' }}>{feature.featureid}</h2>
						</div>
						<div>
							<h1 style={{ textAlign: "left", display: 'inline' }}>{i18n.t("manageUniqueFeatures.position")}: </h1>
							<h2 style={{ textAlign: "left", display: 'inline' }}>{feature.positionid}</h2>
						</div>
					</div>
				))}
			</div>
			<Footer />
			<div>
				<Modal
					onClose={() => dispatch({ type: 'close' })}
					open={open}
					style={{ paddingTop: "40px" }}
					centered
					size="medium"
				>
					<Modal.Header>{pet.pet_name}</Modal.Header>
					<Modal.Content image>
						<Image size='large' src={photo} centered
							style={{ height: "600px", paddingLeft: "2%", paddingBottom: "5%" }} />
					</Modal.Content>
					<Modal.Actions>
						<Button color='black' onClick={() => dispatch({ type: 'close' })}>
							Close
						</Button>
					</Modal.Actions>
				</Modal>
			</div>
		</div>
	)
}


export default PetDetails
