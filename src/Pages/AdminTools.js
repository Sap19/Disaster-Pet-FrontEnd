import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'

export class AdminTools extends Component {
    render() {
        return (
            <div style={{paddingTop: "60px"}}>
				<div style={{paddingRight: "20%", paddingLeft: "20%", paddingTop: '1%'}}>
					<h1 style={{border:"1px solid",borderRadius: "16px" }}>AdminTools</h1>
				</div>
                <div className="row" style={{paddingLeft:'15%'}}>
                    <div className="column" >
                        <h2 style={{textAlign: 'left', textDecorationLine:"underline"}}>Users</h2>
                        <a href="/manageUsers">Manage Users</a> 
						<br/>
						<a href="/manageRoles">Manage Roles</a> 
                    </div>
                    <div className="column" >
                        <h2 style={{textAlign: 'left', textDecorationLine:"underline"}}>Disaster</h2>
						<a href="/">Manage Disasters</a>
                    </div>
                    <div className="column" >
                        <h2 style={{textAlign: 'left', textDecorationLine:"underline"}}>Pets</h2>
                        <a href="/managePets">Manage Pets</a>
						<br/>
						<a href="/manageBreeds">Manage Breeds</a>
						<br/>
						<a href="/manageAnimalTypes">Manage Animal Types</a>
						<br/>
						<a href="/manageGenders">Manage Genders</a>
						<br/>
						<a href="/manageStatus">Manage Status</a>
						<br/>
						<a href="/manageAlteredStatus">Manage Altered Status</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminTools
