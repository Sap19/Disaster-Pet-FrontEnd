import React, { Component } from 'react'
import '../Assets/Css/PetGallery.css'
import { Form, TextArea } from 'semantic-ui-react'
import { Document, Page, View, Image, Text, Link, Font, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import Footer from "../Component/Footer/Footer"
import i18n from '../Component/i18n/i18n';
import "../Assets/Css/PDFMaker.css"

export class PDFMaker extends Component {

	constructor(props) {
		super(props);
		this.state = {
			pet_id: props.match.params.id,
			pet: [],
			images: [],
			title: '',
			tempTitle: 'This is where the title will go',
			content: '',
			tempContent: 'This is where the content will go'
		}
	}

	componentDidMount() {
		this.PetDetail();
	}
	setInputValue(property, val) {
		if (property == "title") {
			this.setState({
				tempTitle: '',
			})
		}
		else if (property == "content") {
			this.setState({
				tempContent: '',
			})
		}
		this.setState({
			[property]: val,
		})
	}

	async PetDetail() {
		try {
			let res = await fetch('http://127.0.0.1:5000/petdetails', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
				},
				body: JSON.stringify({
					id: this.state.pet_id
				})
			});
			let result = await res.json();
			var tempImages = []
			result.images.map((image, i) => {
				tempImages.push(image[0])
			})
			this.setState({
				pet: result.pets[0],
				images: tempImages
			})
		} catch (e) {
			this.setState({
				errorMessage: i18n.t("error")
			})
		}
	}
	render() {
		// Create styles
		Font.register({
			family: 'Oswald',
			src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
		});

		const styles = StyleSheet.create({
			body: {
				paddingTop: 35,
				paddingBottom: 65,
				paddingHorizontal: 100,
			},
			title: {
				fontSize: 24,
				textAlign: 'center',
				fontFamily: 'Oswald'
			},
			author: {
				fontSize: 12,
				textAlign: 'center',
				marginBottom: 5,
			},
			subtitle: {
				fontSize: 18,
				margin: 12,
				fontFamily: 'Oswald'
			},
			text: {
				margin: 12,
				fontSize: 14,
				textAlign: 'justify',
				fontFamily: 'Times-Roman'
			},
			image: {
				marginVertical: 15,
				marginHorizontal: 75,
				floar: "left"
			},
			header: {
				fontSize: 12,
				marginBottom: 20,
				textAlign: 'center',
				color: 'grey',
			},
			pageNumber: {
				position: 'absolute',
				fontSize: 12,
				bottom: 30,
				left: 0,
				right: 0,
				textAlign: 'center',
				color: 'grey',
			},
		});
		return (
			<div style={{ paddingTop: "60px" }}>
				<h1>{i18n.t("pdfFlyer.title")}</h1>
				<div className="pdfMakerRow">
					<div className="column">
						<Form>
							<h1>Title</h1>
							<TextArea
								placeholder='Enter Title'
								value={this.state.title}
								onChange={e => this.setInputValue('title', e.target.value)}
							/>
						</Form>
						<Form>
							<h1>Content</h1>
							<TextArea
								placeholder='Enter Content'
								value={this.state.content}
								onChange={e => this.setInputValue('content', e.target.value)}
							/>
						</Form>
					</div>
					<div className="column">
						<PDFViewer style={{ width: "100%", height: "750px" }}>
							<Document>
								<Page size="A4" style={styles.body}>
									<Text style={styles.header} fixed>
										~ Disaster Pet Flyer ~
									</Text>
									<Text style={styles.title}>
										{this.state.tempTitle}{this.state.title}
									</Text>
									<Text style={styles.author}>
										Pet Name : {this.state.pet.pet_name}
									</Text>
									<Image
										style={styles.image}
										src={{ uri: this.state.images, method: 'GET', headers: {}, body: '' }}
									/>
									<Text style={styles.subtitle}>
										{this.state.tempContent}{this.state.content}
									</Text>
									<Text style={styles.text}>
										Animal Type: {this.state.pet.animal_type}
									</Text>
									<Text style={styles.text}>
										Gender: {this.state.pet.gender}
									</Text>
									<Text style={styles.text}>
										Primary Breed: {this.state.pet.primary_breed}
									</Text>
									<Text style={styles.text}>
										Secondary Breed: {this.state.pet.secondary_breed}
									</Text>
									<Text style={styles.text}>
										Altered Status: {this.state.pet.altered_status}
									</Text>
									<Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
										`${pageNumber} / ${totalPages}`
									)} fixed />
								</Page>
							</Document>
						</PDFViewer>
					</div>
				</div>

				<Footer />
			</div>
		)
	}
}

export default PDFMaker
