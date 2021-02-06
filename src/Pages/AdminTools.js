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
                    </div>
                    <div className="column" >
                        <h2 style={{textAlign: 'left', textDecorationLine:"underline"}}>Disaster</h2>
						<a href="/">Manage Disasters</a>
                    </div>
                    <div className="column" >
                        <h2 style={{textAlign: 'left', textDecorationLine:"underline"}}>Pets</h2>
                        <a href="/">Manage Pets</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminTools
