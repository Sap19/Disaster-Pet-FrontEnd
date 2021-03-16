import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from './Pages/LoginForm';
import LandingPage from './Pages/LandingPage';
import SignUpForm from './Pages/SignUpForm';
import ForgotPassword from './Pages/ForgotPassword'
import ResetPassword from './Pages/ResetPassword'
import NavigationBar from './Component/NavBar/NavBar'
import NotFound from './Pages/NotFound'
import Dashboard from "./Pages/Dashboard"
import Gallery from './Pages/GalleryPage'
import AddPet from "./Pages/AddPet"
import PetMatching from './Pages/PetMatchingPage'
import RainbowGallery from './Pages/RainbowGallery'
import PetDetails from './Pages/PetDetails'
import AdminTools from './Pages/AdminTools'
import ManageUsers from './Pages/AdminTools/User/ManageUser'
import ManagePets from './Pages/AdminTools/Pets/ManagePets'
import ManageRoles from './Pages/AdminTools/User/ManageRoles'
import ManageAlteredStatus from './Pages/AdminTools/Pets/ManageAlteredStatus'
import ManageAnimalTypes from './Pages/AdminTools/Pets/ManageAnimalTypes'
import ManageBreeds from './Pages/AdminTools/Pets/ManageBreeds'
import ManageGenders from './Pages/AdminTools/Pets/ManagerGenders'
import ManageStatus from './Pages/AdminTools/Pets/ManageStatus'
import UserEdit from './Pages/AdminTools/User/EditPages/UserEdit'
import PetEdit from './Pages/AdminTools/Pets/EditPages/PetEdit'
import AlteredStatusEdit from './Pages/AdminTools/Pets/EditPages/AlteredStatusEdit'
import AnimalTypesEdit from './Pages/AdminTools/Pets/EditPages/AnimalTypesEdit'
import BreedEdit from './Pages/AdminTools/Pets/EditPages/BreedEdit'
import GenderEdit from './Pages/AdminTools/Pets/EditPages/GenderEdit'
import StatusEdit from './Pages/AdminTools/Pets/EditPages/StatusEdit'
import RoleEdit from './Pages/AdminTools/User/EditPages/RoleEdit'
import NewAlteredStatus from './Pages/AdminTools/Pets/NewPages/NewAlteredStatus'
import NewAnimalTypes from './Pages/AdminTools/Pets/NewPages/NewAnimalType'
import NewBreed from './Pages/AdminTools/Pets/NewPages/NewBreed'
import NewGender from './Pages/AdminTools/Pets/NewPages/NewGender'
import NewStatus from './Pages/AdminTools/Pets/NewPages/NewStatus'
import NewRole from './Pages/AdminTools/User/NewPages/NewRole'
import { ProtectedRoute } from "./Component/ProtectedRoutes/protected.route"
import { AdminProtectedRoute } from "./Component/ProtectedRoutes/AdminProtected.route"
import i18n from './Component/i18n/i18n';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lng: 'en'
		}
		this.onLanguageChanged = this.onLanguageChanged.bind(this)
	}

	componentDidMount() {
		i18n.on('languageChanged', this.onLanguageChanged)
	}

	componentWillUnmount() {
		i18n.off('languageChanged', this.onLanguageChanged)
	}
	onLanguageChanged(lng) {
		this.setState({
			lng: lng
		})
	}
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
							<Route exact path="/forgotPassword" component={ForgotPassword} />
							<Route exact path="/resetPassword/:token" component={ResetPassword} />
							<Route exact path="/rainbowGallery" component={RainbowGallery} />
							<ProtectedRoute exact path="/dashboard" component={Dashboard} />
							<ProtectedRoute exact path="/addPet" component={AddPet} />
							<ProtectedRoute exact path="/matchPets" component={PetMatching} />
							<ProtectedRoute path="/petDetails/:id" component={PetDetails} />
							<AdminProtectedRoute exact path="/manageUsers" component={ManageUsers} />
							<AdminProtectedRoute exact path="/managePets" component={ManagePets} />

							<AdminProtectedRoute exact path="/manageRoles" component={ManageRoles} />
							<AdminProtectedRoute exact path="/manageBreeds" component={ManageBreeds} />
							<AdminProtectedRoute exact path="/manageAnimalTypes" component={ManageAnimalTypes} />
							<AdminProtectedRoute exact path="/manageGenders" component={ManageGenders} />
							<AdminProtectedRoute exact path="/manageStatus" component={ManageStatus} />
							<AdminProtectedRoute exact path="/manageAlteredStatus" component={ManageAlteredStatus} />

							<AdminProtectedRoute exact path="/adminTools" component={AdminTools} />
							<AdminProtectedRoute path="/userEdit/:id" component={UserEdit} />
							<AdminProtectedRoute path="/petEdit/:id" component={PetEdit} />

							<AdminProtectedRoute path="/breedEdit/:id" component={BreedEdit} />
							<AdminProtectedRoute path="/animalTypeEdit/:id" component={AnimalTypesEdit} />
							<AdminProtectedRoute path="/genderEdit/:id" component={GenderEdit} />
							<AdminProtectedRoute path="/statusEdit/:id" component={StatusEdit} />
							<AdminProtectedRoute path="/alteredStatusEdit/:id" component={AlteredStatusEdit} />
							<AdminProtectedRoute path="/roleEdit/:id" component={RoleEdit} />

							<AdminProtectedRoute path="/newBreed" component={NewBreed} />
							<AdminProtectedRoute path="/newAnimalType" component={NewAnimalTypes} />
							<AdminProtectedRoute path="/newGender" component={NewGender} />
							<AdminProtectedRoute path="/newStatus" component={NewStatus} />
							<AdminProtectedRoute path="/newAlteredStatus" component={NewAlteredStatus} />
							<AdminProtectedRoute path="/newRole" component={NewRole} />
							<Route path="*" component={NotFound} />
						</Switch>
					</div>
				</BrowserRouter>
			</React.Fragment>
		);
	}
}

export default App;
