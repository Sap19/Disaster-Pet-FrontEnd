import React, { Component } from 'react'
import '../Assets/Css/PetGallery.css'
import { Dropdown } from 'semantic-ui-react'

export class Gallery extends Component {
	render() {
		return (
			<div style={{ paddingTop: "60px" }}>
				<h1>Pet Gallery</h1>
				<div className="row" >
					<div className="column-petGallery">
						<Dropdown
							placeholder='Breed'
							fluid
							multiple
							search
							selection
							options={[]}
						/>
					</div>
					<div className="column-petGallery">
						<Dropdown
							placeholder='Coat Color'
							fluid
							multiple
							search
							selection
							options={[]}
						/>
					</div>
					<div className="column-petGallery">
						<Dropdown
							placeholder='Pet Type'
							fluid
							multiple
							search
							selection
							options={[]}
						/>
					</div>
					<div className="column-petGallery">
						<Dropdown
							placeholder='AlterStatus'
							fluid
							multiple
							search
							selection
							options={[]}
						/>
					</div>
					<div className="column-petGallery">
						<Dropdown
							placeholder='Gender'
							fluid
							multiple
							search
							selection
							options={[]}
						/>
					</div>
					<div className="column-petGallery">
						<Dropdown
							placeholder='Life Status'
							fluid
							multiple
							search
							selection
							options={[]}
						/>
					</div>
				</div>
			</div>
		)
	}
}

export default Gallery