import React, { Component } from 'react'
import i18n from '../Component/i18n/i18n';

export class AdminTools extends Component {
    render() {
        return (
            <div style={{paddingTop: "60px"}}>
				<div style={{paddingRight: "20%", paddingLeft: "20%", paddingTop: '1%'}}>
					<h1 style={{border:"1px solid",borderRadius: "16px" }}>{i18n.t("adminTools.title")}</h1>
				</div>
                <div className="row" style={{paddingLeft:'15%'}}>
                    <div className="column" >
                        <h2 style={{textAlign: 'left', textDecorationLine:"underline"}}>{i18n.t("adminTools.users")}</h2>
                        <a href="/manageUsers">{i18n.t("adminTools.manageUsers")}</a> 
						<br/>
						<a href="/manageRoles">{i18n.t("adminTools.manageRoles")}</a> 
                    </div>
                    <div className="column" >
                        <h2 style={{textAlign: 'left', textDecorationLine:"underline"}}>{i18n.t("adminTools.disaster")}</h2>
						<a href="/">{i18n.t("adminTools.manageDisasters")}</a>
                    </div>
                    <div className="column" >
                        <h2 style={{textAlign: 'left', textDecorationLine:"underline"}}>{i18n.t("adminTools.pets")}</h2>
                        <a href="/managePets">{i18n.t("adminTools.managePets")}</a>
						<br/>
						<a href="/manageBreeds">{i18n.t("adminTools.manageBreeds")}</a>
						<br/>
						<a href="/manageAnimalTypes">{i18n.t("adminTools.manageAnimalT")}</a>
						<br/>
						<a href="/manageGenders">{i18n.t("adminTools.manageGender")}</a>
						<br/>
						<a href="/manageStatus">{i18n.t("adminTools.manageStatus")}</a>
						<br/>
						<a href="/manageAlteredStatus">{i18n.t("adminTools.manageAltered")}</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminTools
