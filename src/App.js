import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from './Pages/LoginForm';
import LandingPage from './Pages/LandingPage';
import SignUpForm from './Pages/SignUpForm';
import NavigationBar from './Component/NavBar/NavBar'
import NotFound from './Pages/NotFound'
import Dashboard from "./Pages/Dashboard"
import Gallery from './Pages/GalleryPage'
import AddPet from "./Pages/AddPet"
import PetMatching from './Pages/PetMatchingPage'
import RainbowGallery from './Pages/RainbowGallery'
import AdminTools from './Pages/AdminTools'
import ManageUsers from './Pages/AdminTools/User/ManageUser'
import PetDetails from './Pages/PetDetails'
import { ProtectedRoute } from "./Component/ProtectedRoutes/protected.route"
import { AdminProtectedRoute } from "./Component/ProtectedRoutes/AdminProtected.route"

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
							<Route exact path="/petGallery" component={Gallery} />
							<Route exact path="/rainbowGallery" component={RainbowGallery} />
							<ProtectedRoute exact path="/dashboard" component={Dashboard} />
							<ProtectedRoute exact path="/addPet" component={AddPet} />
							<ProtectedRoute exact path="/matchPets" component={PetMatching} />
							<Route exact path="/adminTools" component={AdminTools} />
							<Route exact path="/manageUsers" component={ManageUsers} />
							<Route path="/petDetails/:id" component={PetDetails} />
							<AdminProtectedRoute exact path="/adminTools" component={AdminTools} />
							<Route path="*" component={NotFound} />
						</Switch>
					</div>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}

export default App;
