import React, { useState } from 'react';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';

const MediaRequestForm = () => {
	const [mediaTitle, setTitle] = useState('');
	const [mediaType, setType] = useState('');
	const [mediaReason, setReason] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmission = (e) => {
		e.preventDefault(); 
		
		// Clear form fields after submit
		setTitle('');
		setType('');
		setReason('');
		setIsSubmitted(true);
	} 

	return (
		!isSubmitted ? (
		<Form onSubmit={handleSubmission}>
			<Form.Group className="mb-3" controlId="formBasicTitle">
			<Form.Label>Media Title</Form.Label>
			<Form.Control 
				className="form-secondary"
				type="text"
				value={mediaTitle}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			</Form.Group>
			
			<Form.Group className="mb-3" controlId="formBasicType">
			<Form.Label>Media Type</Form.Label>
			<Form.Select 
				className="form-secondary"
				value={mediaType}
				onChange={(e) => setType(e.target.value)}
				required
			>
				<option value="">Select Media Type</option>
				<option value="DVD">DVD</option>
				<option value="Book">Book</option>
				<option value="Journal">Journal</option>
				<option value="Periodical">Periodical</option>
				<option value="CD">CD</option>
				<option value="Game">Game</option>
			</Form.Select>
			</Form.Group>

			<Form.Group className="mb-3" controlId="formBasicReason">
			<Form.Label>Reason</Form.Label>
			<Form.Control 
				className="form-secondary"
				as="textarea"
				rows={3}
				value={mediaReason}
				onChange={(e) => setReason(e.target.value)}
				required
			/>
			</Form.Group>
			<Button className="button-secondary" type="submit">
				Submit
			</Button>
		</Form>
		) : (
			<span>Your media request has been submitted, thank you for the contribution.</span>
		)      
	);
};

export default MediaRequestForm;