import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = ({ localBranch = {} }) => {
  return (
    <footer className='footer pt-3'>
      <Container fluid>
        <Row>
          {/* Help Section */}
          <Col>
            <Row className='pb-2'>
              <span><strong>Helpful Information</strong></span>
            </Row>
            <Row>
              <Col>
                <Link to="/help" className="nav-link-secondary">
                  <span>Help Centre</span>
                </Link>
              </Col>
              <Col>
                <Link to="/help" className="nav-link-secondary">
                  <span>Support</span>
                </Link>
              </Col> 
            </Row>
            <Row>
              <Col>
                <Link to="/help#payments" className="nav-link-secondary">
                  <span>Payments</span>
                </Link>
              </Col>
              <Col>
                <Link to="/help#return-policy" className="nav-link-secondary">
                  <span>Return Policy</span>
                </Link>
              </Col> 
            </Row>
          </Col>
          {/* Local Branch Section */}
          <Col xs={5} className='px-4'>
            <Row className='pb-2'>
              <Col>
                <span><strong>Local Branch</strong></span>
              </Col>
              <Col className='text-end'>
                <Link to="/account" className="nav-link-secondary">
                  <span>Switch Store?</span>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>Address: { localBranch.FirstLineAddress || 'First Line' }, { localBranch.City || 'City' }</span>
              </Col>
              <Col className='text-end'>
                <span>Hours: Mon-Fri 09:00-19:00</span>
              </Col> 
            </Row>
            <Row>
              <Col>
                <span>Contact: 020 7946 1234</span>
              </Col>
              <Col className='text-end'>
                <span>Sat-Sun 09:00-21:00</span>
              </Col> 
            </Row>
          </Col>
          {/* Socials section */}
          <Col>
            <Row className='pb-2'>
              <span><strong>Stay In Touch</strong></span>
            </Row>
            <Row>
              <Col>
                <a href="https://example.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              </Col>
              <Col>
                <a href="https://example.com" target="_blank" rel="noopener noreferrer">X</a>
              </Col> 
            </Row>
            <Row>
              <Col>
                <a href="https://example.com" target="_blank" rel="noopener noreferrer">Instagram</a>
              </Col>
              <Col>
                <a href="https://example.com" target="_blank" rel="noopener noreferrer">YouTube</a>
              </Col> 
            </Row>
          </Col>
        </Row>
        {/* Copywrite */}
        <Row className="my-1 border-top border-secondary justify-content-center text-center">
          <Col>
            <span>&copy; 2024 Advanced Media Library. All rights reserved.</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;