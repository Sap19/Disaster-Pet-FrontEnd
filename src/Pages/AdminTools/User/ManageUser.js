import React, { Component } from 'react'
import { Button, Dropdown, Form, Input, Table } from 'semantic-ui-react'
import '../../../Assets/Css/AdminTools/ManageUsers.css'

export class ManageUser extends Component {
	render() {
		return (
			<div style={{ paddingTop: "60px" }}>
				<div style={{paddingLeft: '2%'}}>
					<Button className="backButton" href="/adminTools"> &#8592; Back to Admin Tools </Button>
				</div>
				<div style={{ paddingRight: "20%", paddingLeft: "20%", paddingTop: '1%' }}>
					<h1 style={{ border: "1px solid", borderRadius: "16px" }}>Manage Users</h1>
				</div>
				<div style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "3%" }}>
					<div classname="row">
						<Form.Field className="optionColumn">
							<Input
								type="text"
								name="userSearch"
								//value={this.state.searchLeft}
								//onChange={this.handleSearchChange.bind(this)}
								placeholder="Search"
							/>
						</Form.Field>
						<Form.Field className="optionColumn">
							<Dropdown
								placeholder='Filter'
								name="userFilter"
								fluid
								search
								clearable
								selection
							//onChange={this.setDropDownInputValue}
							//options={this.state.genderOptions}
							/>
						</Form.Field>
					</div>
					<Table striped>
						<Table.Header>
							<Table.Row>
								<Table.HeaderCell>Name</Table.HeaderCell>
								<Table.HeaderCell>Date Joined</Table.HeaderCell>
								<Table.HeaderCell>E-mail</Table.HeaderCell>
								<Table.HeaderCell>Called</Table.HeaderCell>
							</Table.Row>
						</Table.Header>

						<Table.Body>
							<Table.Row>
								<Table.Cell>John Lilki</Table.Cell>
								<Table.Cell>September 14, 2013</Table.Cell>
								<Table.Cell>jhlilk22@yahoo.com</Table.Cell>
								<Table.Cell>No</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Jamie Harington</Table.Cell>
								<Table.Cell>January 11, 2014</Table.Cell>
								<Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
								<Table.Cell>Yes</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Jill Lewis</Table.Cell>
								<Table.Cell>May 11, 2014</Table.Cell>
								<Table.Cell>jilsewris22@yahoo.com</Table.Cell>
								<Table.Cell>Yes</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>John Lilki</Table.Cell>
								<Table.Cell>September 14, 2013</Table.Cell>
								<Table.Cell>jhlilk22@yahoo.com</Table.Cell>
								<Table.Cell>No</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>John Lilki</Table.Cell>
								<Table.Cell>September 14, 2013</Table.Cell>
								<Table.Cell>jhlilk22@yahoo.com</Table.Cell>
								<Table.Cell>No</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Jamie Harington</Table.Cell>
								<Table.Cell>January 11, 2014</Table.Cell>
								<Table.Cell>jamieharingonton@yahoo.com</Table.Cell>
								<Table.Cell>Yes</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>Jill Lewis</Table.Cell>
								<Table.Cell>May 11, 2014</Table.Cell>
								<Table.Cell>jilsewris22@yahoo.com</Table.Cell>
								<Table.Cell>Yes</Table.Cell>
							</Table.Row>
							<Table.Row>
								<Table.Cell>John Lilki</Table.Cell>
								<Table.Cell>September 14, 2013</Table.Cell>
								<Table.Cell>jhlilk22@yahoo.com</Table.Cell>
								<Table.Cell>No</Table.Cell>
							</Table.Row>
						</Table.Body>
					</Table>
				</div>
			</div>
		)
	}
}

export default ManageUser