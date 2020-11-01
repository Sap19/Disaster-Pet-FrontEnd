import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import Footer from "../Component/Footer/Footer";
import addPetBanner from "../Assets/Images/addPetBanner.jpg"


class AddPetForm extends Component {
    render() {
        const breedOptions = [
            { key: '1', value: 'breed1', text: 'Bulldog' },
            { key: '2', value: 'breed2', text: 'German Shephed' },
            { key: '3', value: 'breed3', text: 'Beagle' },
            { key: '4', value: 'breed4', text: 'Dachshund' },
        ]
        const genderOptions = [
            { key: '1', value: 'gender1', text: 'Male' },
            { key: '2', value: 'gender2', text: 'Femal' },
        ]
        const animalOptions = [
            { key: '1', value: 'animal1', text: 'Dog' },
            { key: '2', value: 'animal2', text: 'Cat' },
        ]
        return (
            <div>
                <h1 style={{ paddingTop: "60px" }}>Add Pet</h1>
                <img style={{ height: "300px", paddingLeft: "20%" }} src={addPetBanner} alt="Add Pet Banner"></img>

                <Form className="form" style={{padding: "40px", width: "50%"}}>
                        <Form.Input fluid label="Pet Name" placeholder="Pet Name" />
                        <Form.Select fluid clearable label="Animal" options={animalOptions} placeholder="Animal" />
                        <Form.Select fluid clearable label="Breed" options={breedOptions} placeholder="Breed" />
                        <Form.Select fluid clearable label="Gender" options={genderOptions} placeholder="Gender" />
                </Form>

                <Footer />
            </div>
        )
    }
}

export default AddPetForm
