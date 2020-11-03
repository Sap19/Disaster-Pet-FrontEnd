import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import auth from '../Auth/auth';

export class NavigationBar extends Component {
    logout() {
        auth.logout(() => {
            this.props.history.push('/')
        })
    }
    render() {
        return (
            <div>
                <Navbar collapseOnSelect fixed="top" expand="lg" bg="info" variant="dark" >
                    <Navbar.Brand href="/">Disaster Pets</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {localStorage.getItem('token') &&
                                <Nav.Link href="/dashboard">Dashboard</Nav.Link>}
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/petGallery">Pet Gallery</Nav.Link>
                            <Nav.Link href="/lostPet">Report Lost Pet</Nav.Link>
                            <Nav.Link href="/howTo">How To</Nav.Link>
                            {localStorage.getItem('token') &&
                                <Nav.Link href="/addPet">Add Pet</Nav.Link>}
                            {localStorage.getItem('token') &&
                                <Nav.Link href="/matchPets">Match Pets</Nav.Link>}
                            {auth.isAdminAuth() &&
                                <Nav.Link href="/adminTools">Admin Tools</Nav.Link> }
                        </Nav>
                        <Nav>
                            {!localStorage.getItem('token') &&
                                <Nav.Link href="/login">Login</Nav.Link>}
							{!localStorage.getItem('token') &&
                                <Nav.Link href="/signup">Sign Up</Nav.Link>}
                            {localStorage.getItem('token') &&
                                <Nav.Link href="/" onClick={() => this.logout()} >Logout</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar
