import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { SessionContext } from '../services/sessionContext';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import CardImg from 'react-bootstrap/esm/CardImg';

function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, setUser } = useContext(SessionContext);

  const handleLogin = (e) => {
    e.preventDefault(); 

    // Dummy credentials for testing
    const testEmail = 'test@example.com';
    const testPassword = 'pass';

    if (email === testEmail && password === testPassword) {
      // Simulate user details on successful login
      const newUser = {
        MemberID: '0001',
        FirstName: 'Liam',
        Surname: 'Hammond',
        email: email,
        password: password,
        FirstLineAddress: '123 Home Street',
        City: 'Sheffield',
        Postcode: 'S10 ABC',
        BranchID: '0001',
        RegisterDate: '01-01-2024',
      };

      setUser(newUser); // Update context with user details
      setErrorMessage(''); // Clear any previous error messages
    } else {
      setErrorMessage('Invalid email or password. Please try again.'); 
    }
  };

  const handleLogout = () => {
    setUser(null); // Clear the user from context
  };

  return (
    !user && (
      <Card className="content-panel-no-padding" style={{ width: '600px' }}>
        <Card.Body>
          <Row>

            {/* Logo */}
            <Col xs={4} className='d-flex flex-column justify-content-center align-items-center text-center'>
              <CardImg
                src="/AML-logo.png" 
                alt="Advanced Media Library Logo" 
                style={{ height: '8rem', width: 'auto' }} 
              />
              <h2 style={{ color: 'var(--primary)', fontWeight: '600' }}>AML</h2>
            </Col>

            {/* Input Form */}
            <Col className='left-border-primary justify-content-center align-items-center text-center'>
              <h4 className='py-4'>Login to your account</h4>
              <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                <Form onSubmit={handleLogin} style={{ width: '80%' }}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control 
                      className="form-primary"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                      className="form-primary"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                  <Button className="button-primary" type="submit">
                    Login
                  </Button>
                </Form>
              </div>
              <p className='py-4'>New here? <Link to="/account#register">Sign up</Link></p>
            </Col>

          </Row>
        </Card.Body>
      </Card>
    )
  );
}

export default LoginCard;