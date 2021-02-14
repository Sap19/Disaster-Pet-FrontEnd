import React, { Component } from 'react'
import { Card, Image, Loader } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import Footer from "../Component/Footer/Footer"

export class Dashboard extends Component {
    constructor(props) {
		super(props);
		this.state = {
			Pets: [],
			loaded: true
		}
	}
    componentDidMount() {
		this.DashboardInit();
	}
	imageFloat() { }
    async DashboardInit() {
        try {
			let res = await fetch('http://127.0.0.1:5000/dashboard', {
                method: 'GET',
                headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': "Bearer " + localStorage.getItem('token')
                },
			});
			let result = await res.json();
			if (result.message === "successfully Pulled!") {
				this.setState({
					Pets:result.pets,
					loaded: false
				})
			}
			console.log(result)
		} catch (e) {
			console.log(e)
		}
    }
    render() {
        return (
            <div style={{paddingTop: "60px"}}>
                <h1>Dashboard</h1>
                <div>
                    <h2 style={{textAlign: "left", padding: "1%"}}>My Pets</h2>
                </div>
				<div className="row" >
				{this.state.loaded ?
						<Loader active inline='centered' /> :
					this.state.Pets.map((pet, i) =>
						<div className="column-petGalleryCard" key={i}>
							<Link to={`/petDetails/${pet[0].pet_id}`}>
							<Card onClick={this.imageFloat.bind(this)}>
								<Image src={pet[0].pet_image}  ui={false} 
								style={{ height: "400px" }}/>
								<Card.Content>
									<Card.Header>{pet[0].pet_name}</Card.Header>
									<Card.Meta>
										<span className='date'>Breed: {pet[0].primary_breed}</span>
									</Card.Meta>
									<Card.Meta>
										<span className='date'>Gender: {pet[0].gender}</span>
									</Card.Meta>
									<Card.Meta>
										<span className='date'>Altered: {pet[0].altered_status}</span>
									</Card.Meta>
									<Card.Meta>
										<span className='date'>Status: {pet[0].pet_status}</span>
									</Card.Meta>
									<Card.Description>
										{pet[0].animal_type}
									</Card.Description>
								</Card.Content>
							</Card>
							</Link>
						</div>
					)}
				</div>
				<Footer />
            </div>
        )
    }
}

export default Dashboard
