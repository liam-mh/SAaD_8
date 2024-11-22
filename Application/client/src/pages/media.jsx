// media.jsx
import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import BranchStockCard from '../components/BranchStockCard';
import NotificationBanner from '../components/NotificationBanner';
import { useLocation } from 'react-router-dom';
import { getByTitle } from '../services/sampleDataFunctions';
const mediaFrontEndService = require('../services/storefront/mediaFrontEndService');

const MediaPage = () => {
  const location = useLocation();
  const { mediaType = "default-type", mediaTitle = "default-title" } = location.state || {};
  const [media, setMedia] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');

  useEffect(() => {
    async function loadData() {
      const mediaItem = await getByTitle(mediaTitle);
      if (mediaType) {
        const filteredMedia = mediaItem.filter(item => item.Type === mediaType);
        setMedia(filteredMedia); 
      } else {
        setMedia(mediaItem);
      }
    }
  
    loadData();
  }, []);

  const mediaItem = media.length > 0 ? media[0] : null;
  const mediaArtwork = mediaItem ? mediaFrontEndService.generateImageSrc(mediaItem.Title, mediaItem.Type) : null;

  const handleAddToBasket = (addedMediaTitle) => {
    setNotificationText(addedMediaTitle);
    setShowNotification(true);
  };

  {/* Example Usage Branches */}
  const exampleBranch1 = {
    BranchID: '0001',
    FirstLineAddress: '120 example road',
    City: 'Sheffield',
    Postcode: 'S10 ABC'
  };
  const exampleBranch2 = {
    BranchID: '0002',
    FirstLineAddress: '60 Test Drive',
    City: 'Sheffield',
    Postcode: 'S5 XYZ'
  };
  {/* END - Example Usage Branches */}

  return (
    <>
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
        
            {/* Local Branch */}
            <Row className='pt-3 g-0'>
              <h3 id="stock">Stock At Local Branch</h3>
              <BranchStockCard branch={exampleBranch1} media={mediaItem} onAddToBasket={handleAddToBasket} />
            </Row>

            {/* Suggested Branch */}
            <Row className='pt-3 g-0'>
              <h3 id="stock">Stock At Suggested Branches</h3>
              <BranchStockCard branch={exampleBranch2} media={mediaItem} onAddToBasket={handleAddToBasket} />
            </Row>

          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MediaPage;