import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BranchStockCard({ branch, isInStock = true }) {
    const text = isInStock ? 'Add To Basket' : 'Out Of Stock';

    return (
        <div className='content-panel'>
            <span>
                { branch.FirstLineAddress || 'First Line'}<br />
                { branch.City || 'City' }<br />
                { branch.Postcode || 'Postcode' }<br />
            </span>

            {/* Conditional rendering based on stock status */}
            {isInStock ? (
                <button className="button-primary">{text}</button>
            ) : (
                <span className='highlight-secondary-outline'>{text}</span>
            )}
        </div>
    );
}

export default BranchStockCard;