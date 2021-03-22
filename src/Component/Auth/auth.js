import jwt_decode from 'jwt-decode'
class Auth {
	constructor() {
		this.validateAuth()
	}
	validateAuth() {
		if (localStorage.getItem('token')) {
			var token = localStorage.getItem('token')
			var decoded = jwt_decode(token)
			this.authenticated = true
			this.user_id = decoded.identity
			this.role = decoded.role
			if (this.role === 2) {
				this.isAdmin = true
			}
			else if (this.role === 3) {
				this.isVolunteer = true
			}
			else {
				this.isAdmin = false
				this.isVolunteer = false
			}
		}
		else {
			this.authenticated = false
			this.isAdmin = false
			this.isVolunteer = false
			this.user_id = ""
			this.role = ""
			this.token = ""
		}
	}
	login(cb) {
		cb();
	}

	logout(cb) {
		localStorage.removeItem('token')
		this.authenticated = false;
		this.isAdmin = false
		this.isVolunteer = false;
		this.user_id = ""
		this.role = ""
		this.token = ""
		cb();
	}
	isAdminAuth() {
		this.validateAuth()
		return this.isAdmin;
	}
	isAuthenticated() {
		this.validateAuth()
		return this.authenticated;
	}
	isVolunteerAuth() {
		this.validateAuth()
		return this.isVolunteer;
	}
	getUserId() {
		this.validateAuth()
		return this.role;
	}
	getUser() {
		this.validateAuth()
		return this.user_id;
	}

}

export default new Auth();
