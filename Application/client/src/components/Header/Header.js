import React, { useState, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Nav, Form, Button, Row, Col } from 'react-bootstrap';
import { SessionContext } from '../../services/sessionContext';
import DropdownMenu from '../Drop-Down-Menu/DropdownMenu';

function Header() {
  const { basket } = useContext(SessionContext) || {}; 
  const basketNum = basket.length;
  const localBranch = {};

  const location = useLocation();
  const minimalHeader = location.pathname === '/checkout';

  const headerClass = 
    location.pathname === '/' || 
    location.pathname === '/help' ||
    minimalHeader || 
    location.pathname.startsWith('/employee') 
    ? 'header mb-0' 
    : 'header';

  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    setSearchText('');
  }, [location]);

  return (
    <header className={headerClass}>
      <Container fluid>
        {minimalHeader ? (
          <>
            {/* Logo */}
            <Row className="pt-1">
              <Col className="d-flex">
                <img 
                  src="/AML-logo.png" 
                  alt="Advanced Media Library Logo" 
                  style={{ height: '3rem' }} 
                />
                <h2 style={{ color: 'var(--primary)', marginLeft: '0.5rem', marginTop: '0.5rem', fontWeight: '600' }}>Advanced Media Library</h2>
              </Col>
              <Col className="d-flex justify-content-end">
                {/* Emoty Col */}
              </Col>
            </Row>
          </>
        ) : (
          <>
            <Row className="border-bottom border-secondary">
              <Col>
                <span>Your local store: <strong>{ localBranch.FirstLineAddress || 'First Line'}, { localBranch.City || 'City' }</strong></span>
              </Col>
              <Col className="text-end">
                <p className="d-inline">Need </p>
                <Link to="/help">
                  <span>Help?</span>
                </Link>
              </Col>
            </Row>

            {/* Logo and Search */}
            <Row className="pt-1">
              <Col className="d-flex">
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                  <img 
                    src="/AML-logo.png" 
                    alt="Advanced Media Library Logo" 
                    style={{ height: '3rem' }} 
                  />
                  <h2 style={{ color: 'var(--primary)', marginLeft: '0.5rem', marginTop: '0.5rem', fontWeight: '600' }}>Advanced Media Library</h2>
                </Link>
              </Col>
              <Col className="d-flex justify-content-end">
                <Form className="d-flex align-items-center">
                  <DropdownMenu searchText={searchText} setSearchText={setSearchText} /> 
                  <Link to="/search" state={{ searchTerm: searchText }}>
                    <Button className="button-secondary me-2" style={{ borderRadius: '0 5px 5px 0' }}>Search</Button>
                  </Link>
                  <Button className="button-secondary" style={{ borderRadius: '5px 0 0 5px' }} as={Link} to="/basket">
                    Basket
                  </Button>
                  <span className='highlight-primary' style={{ borderRadius: '0 5px 5px 0' }}>{basketNum || '0'}</span>
                </Form>
              </Col>
            </Row>

            {/* Navigation Links */}
            <Row>
              <Col>
                <Nav className="justify-content-start">
                  <Nav.Link as={Link} className="nav-link-secondary" to='/search' state={{preFilterType: 'Book'}}>Books</Nav.Link>
                  <Nav.Link as={Link} className="nav-link-secondary" to='/search' state={{preFilterType: 'Journal'}}>Journals</Nav.Link>
                  <Nav.Link as={Link} className="nav-link-secondary" to='/search' state={{preFilterType: 'Periodical'}}>Periodicals</Nav.Link>
                  <Nav.Link as={Link} className="nav-link-secondary" to='/search' state={{preFilterType: 'CD' }}>CDs</Nav.Link>
                  <Nav.Link as={Link} className="nav-link-secondary" to='/search' state={{preFilterType: 'DVD' }}>DVDs</Nav.Link>
                  <Nav.Link as={Link} className="nav-link-secondary" to='/search' state={{preFilterType: 'Game' }}>Games</Nav.Link>
                </Nav>
              </Col>
              <Col>
                <Nav className="justify-content-end">
                  <Nav.Link as={Link} className="nav-link-secondary" to="/account#library">My Library</Nav.Link>
                  <Nav.Link as={Link} className="nav-link-secondary" to="/account#account">Account</Nav.Link>
                </Nav>
              </Col>
            </Row>
          </>  
        )}

        
      </Container>
    </header>
  );
}

export default Header;