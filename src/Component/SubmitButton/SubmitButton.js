import React from 'react';
import Button from 'react-bootstrap/Button'
import '../../Assets/Css/SubmitButton.css';

class SubmitButton extends React.Component {

	render() {
		return (
			<div className="submitButton">
				<Button
					className='btn'
					variant="info"
					disabled={this.props.disabled}
					onClick={() => this.props.onClick()}
				>
					{this.props.text}
				</Button>
			</div>
		);
	}
}

export default SubmitButton;
