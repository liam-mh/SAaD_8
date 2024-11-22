import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const mediaFrontEndService = require('../services//storefront/mediaFrontEndService');

function MediaCard({ isSearchResult = false, media }) {
  const buttonText = isSearchResult ? "Shop" : "Add To Basket";
  const state = { mediaType: media.Type, mediaTitle: media.Title };

  const mediaArtwork = mediaFrontEndService.generateImageSrc(media.Title, media.Type); 

  const cardLink = !isSearchResult ? (
    <Card.Link className="nav-link-secondary" as={Link} to={'/media'} state={state}>
      More Information
    </Card.Link>
  ) : null;

  return (
    <Card className='content-panel-no-padding' style={{ width: '17rem', height: '100%' }}>
      <Card.Img 
        src={mediaArtwork} 
        alt={media.Title} 
        style={{
          width: '100%', 
          aspectRatio: '1',
          objectFit: 'contain'
        }}
      />
      <span className='card-media-type'>{media.Type || 'Media Type'}</span>
      <Card.Body 
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Card.Title style={{ fontSize: '1rem' }}><strong>{media.Title || 'Media Title'}</strong></Card.Title>
        
        <div style={{ flexGrow: 1 }} />
        {cardLink}
        <Button className='button-primary-outline' style={{ marginTop: '0.5rem', width: '100%' }} as={Link} to={'/media'} state={state}>
          {buttonText}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default MediaCard;
