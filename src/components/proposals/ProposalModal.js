import React, { Component } from 'react';
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Form,
	FormGroup,
	Label,
	Input,
	FormText
} from 'reactstrap';

class ProposalModal extends Component {
	constructor() {
		super();
		this.state = {
			modal: false
		};
	}

	toggle = () => this.setState({ modal: !this.state.modal });

	handleChange = event => {
		this.props.onChange(event.target.value);
	};

	handleSubmit = event => {
		event.preventDefault();
		this.props.onFormSubmit(event.target.elements);
		this.setState({ modal: !this.state.modal });
	};

	render() {
		return (
			<div>
				<Button color='primary' className='fab' onClick={this.toggle}>
					<i className='fas fa-plus'></i>
				</Button>
				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalHeader toggle={this.toggle}>New Proposal</ModalHeader>
					<Form onSubmit={this.handleSubmit}>
						<ModalBody>
							<FormGroup>
								<Label for='title'>Title</Label>
								<Input type='text' name='title' id='title' required />
							</FormGroup>
							<FormGroup>
								<Label for='description'>Description</Label>
								<Input
									type='textarea'
									name='description'
									id='description'
									rows='10'
									required
								/>
							</FormGroup>
							<FormGroup>
								<Label for='daysremaining'>
									Days Until Voting on Proposal Ends
								</Label>
								<Input
									type='range'
									name='daysremaining'
									id='daysremaining'
									min='1'
									max='14'
									step='1'
									defaultValue='8'
									onChange={this.handleChange}
								/>
								<FormText color='muted' id='daysremainingtext'>
									{this.props.daysremaining}{' '}
									{this.props.daysremaining === '1' ? 'day' : 'days'}
								</FormText>
							</FormGroup>
						</ModalBody>
						<ModalFooter>
							<Button color='primary' type='submit'>
								Create Proposal
							</Button>{' '}
							<Button color='secondary' onClick={this.toggle}>
								Cancel
							</Button>
						</ModalFooter>
					</Form>
				</Modal>
			</div>
		);
	}
}

export default ProposalModal;
