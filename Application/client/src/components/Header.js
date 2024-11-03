import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Header({ localBranch = {}, basketNum }) {
  return (
    <header className="header mb-3">
      <Container fluid>
        {/* Branch and Help */}
        <Row className="my-1 border-bottom border-secondary">
          <Col>
            <span>Your local store: <strong>{ localBranch.FirstLineAddress || 'First Line'}, { localBranch.City || 'City' }</strong></span>
          </Col>
          <Col className="text-end">
            <p className="d-inline">Need </p>
            <a href="https://example.com" className="d-inline">Help?</a>
          </Col>
        </Row>
        {/* Logo and Search */}
        <Row className='pt-1'>
          <Col className='d-flex'>
            <img 
                src="/AML-logo.png" 
                alt="Advanced Media Library Logo"
                style={{ height: '40px' }} 
            />
            <h2 style={{ color: 'var(--primary)' }}>Advanced Media Library</h2>
          </Col>
          <Col>
            <Form className="d-flex">
              <Form.Control type="text" placeholder="Search products..." className="form-secondary" />
              <Button className="button-secondary me-2">Search</Button>
              <Button className="button-secondary">Basket</Button>
              <span 
                style={{ 
                  backgroundColor: 'var(--primary)', 
                  color: 'white', 
                  padding: '0 0.5rem',
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  borderRadius: '5px'
                }}
              >
                {basketNum || '0'}
              </span>
            </Form>
          </Col>
        </Row>
        {/* Navigation Links */}
        <Row>
          <Col>
            <Nav className="justify-content-start">
              <Nav.Link className="nav-link-secondary" href="#home">Books</Nav.Link>
              <Nav.Link className="nav-link-secondary" href="#journals">Journals</Nav.Link>
              <Nav.Link className="nav-link-secondary" href="#periodicals">Periodicals</Nav.Link>
              <Nav.Link className="nav-link-secondary" href="#cds">CDs</Nav.Link>
              <Nav.Link className="nav-link-secondary" href="#dvds">DVDs</Nav.Link>
              <Nav.Link className="nav-link-secondary" href="#games">Games</Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Nav className="justify-content-end">
              <Nav.Link className="nav-link-secondary" href="#library">My Library</Nav.Link>
              <Nav.Link className="nav-link-secondary" href="#account">Account</Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;