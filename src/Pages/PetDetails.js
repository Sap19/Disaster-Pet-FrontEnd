import React, { useEffect, useState } from 'react'

function PetDetails({ match }) {
	useEffect(() => {
		fetchPet()
	}, [])
	const fetchPet = async () => {
		const fetchPet = await fetch('http://127.0.0.1:5000/petdetails', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': "Bearer " + localStorage.getItem('token')
			},
			body: JSON.stringify({
				id: match.params.id
			})
		});
		const pet = await fetchPet.json();
		console.log(pet)
	}
	return (
		<div style={{paddingTop: "60px"}}>
			<h1>Pet Detail</h1>
		</div>
	)
}


export default PetDetails
