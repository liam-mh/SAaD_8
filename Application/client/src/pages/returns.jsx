import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const Returns = () => {
    const [mediaId, setMediaId] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Returned Media ID:', mediaId);
    };

    return (
        <>
        </>
    );
};

export default Returns;
