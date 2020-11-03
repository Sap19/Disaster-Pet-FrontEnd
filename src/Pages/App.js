import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from './LoginForm';
import LandingPage from './LandingPage';
import SignUpForm from './SignUpForm';
import NavigationBar from '../Component/NavBar/NavBar';
import NotFound from './NotFound';
import Dashboard from "./Dashboard"
import AddPet from "./AddPet";
import { ProtectedRoute } from "../Component/ProtectedRoutes/protected.route"
import { AdminProtectedRoute } from "../Component/ProtectedRoutes/AdminProtected.route"

class App extends Component {
	render() {
		return (
			<React.Fragment>
				<BrowserRouter>
					<Route component={NavigationBar} />
					<div className="">
						<Switch>
							<Route exact path="/" component={LandingPage} />
							<Route exact path="/login" component={LoginForm} />
							<Route exact path="/signup" component={SignUpForm} />
							<ProtectedRoute exact path="/dashboard" component={Dashboard} />
							<ProtectedRoute exact path="/addPet" component={AddPet} />
							<AdminProtectedRoute exact path="/adminTools" component={AddPet} />
							<Route path="*" component={NotFound} />
						</Switch>
					</div>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}

export default App;
