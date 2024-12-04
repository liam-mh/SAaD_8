import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import BranchStockCard from '../components/Branch-Stock-Card/BranchStockCard';
import NotificationBanner from '../components/Notification-Banner/NotificationBanner';
import { useLocation } from 'react-router-dom';
const mediaFrontEndService = require('../services/storefront/mediaFrontEndService');

const MediaPage = () => {
  const location = useLocation();
  const { mediaType, mediaTitle } = location.state || {};
  const [media, setMedia] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  

  const [errorMessage, setErrorMessage] = useState('');  // For error handling

  useEffect(() => {
    async function loadData() {
      try {
        const allItems = await mediaFrontEndService.get('/readRecords', { Title: mediaTitle, Type: mediaType }, true);
        setMedia(allItems.data);
        allItems.data.length === 0 ? setErrorMessage('No media available') : setErrorMessage('');
      } catch (error) {
        setErrorMessage('Something went wrong');  // Set error message on failure
      }
    }

    loadData();
  }, [mediaTitle, mediaType]);

  const mediaItem = media.length > 0 ? media[0] : null;
  const mediaArtwork = mediaItem ? mediaFrontEndService.generateImageSrc(mediaItem.Title, mediaItem.Type) : null;

  const handleAddToBasket = () => {
    setNotificationText(mediaItem.Title);
    setShowNotification(true);
  };

  return (
    <>
      {errorMessage && <div>{errorMessage}</div>}  

      {showNotification && <NotificationBanner mediaTitle={notificationText} />}
      
      <Container fluid='lg'>
        <Row>
          {/* Media Artwork */}
          <Col className='content-panel g-0' style={{ paddingRight: '1.5rem' }}>
            {mediaItem ? (
              <img 
                src={mediaArtwork} 
                alt={mediaItem.Title || 'Media Image'} 
                style={{ width: '100%', aspectRatio: '1', objectFit: 'contain' }} 
              />
            ) : (
              <p>Loading image...</p>
            )}
          </Col>

          {/* Media Information*/}
          <Col style={{ paddingLeft: '1.5rem' }}>
            <Row className='pb-3'>
              <h1>{mediaItem ? mediaItem.Title : 'Media Title'}</h1>
              <span>Rent tokens per week: <strong>1</strong></span>
            </Row>
            <Row className='content-panel g-0'>
              <Col>
                <span>
                  <strong>Details</strong><br />
                  Format: {mediaItem ? mediaItem.Type : 'Type'}<br />
                  Genre: {mediaItem ? mediaItem.Genre : 'Genre'}<br />
                  Author: {mediaItem ? mediaItem.Author : 'Author'}<br />
                  Published: {mediaItem ? mediaItem.PublishDate : 'Publish Date'}
                </span>
              </Col>
              <Col>
                <span>
                  <strong>Description</strong><br />
                  {mediaItem ? mediaItem.Description : 'Description'}
                </span>
              </Col>
            </Row>
            
            <Row className="pt-3 g-0">
              <h3 id="stock">Availability</h3>
              {media.map((mediaItem, index) => (
                <Row className='pb-4 g-0'>
                  <BranchStockCard 
                    key={`${mediaItem.Title}-${mediaItem.BranchID}-${index}`} 
                    media={mediaItem} 
                    onAddToBasket={handleAddToBasket} 
                  />
              </Row>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MediaPage;
