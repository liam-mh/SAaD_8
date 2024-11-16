import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { SessionContext } from '../services/sessionContext';

function LoginCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, setUser } = useContext(SessionContext);

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form from submitting and refreshing the page

    // Dummy credentials for testing
    const testEmail = 'test@example.com';
    const testPassword = 'password123';

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
      setErrorMessage('Invalid email or password. Please try again.'); // Show error for invalid credentials
    }
  };

  const handleLogout = () => {
    setUser(null); // Clear the user from context
  };

  return (
    <Card className="content-panel-no-padding">
      <Card.Body>
        {user ? ( // If the user is logged in
          <div>
            <h4>Hi {user.FirstName}!</h4>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Error message */}

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
}

export default LoginCard;