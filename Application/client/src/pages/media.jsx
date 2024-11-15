import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import BranchStockCard from '../components/BranchStockCard';
import { useLocation } from 'react-router-dom';
import { getByTitle } from '../services/sampleDataFunctions';
import { generateImageSrc } from '../services/mediaService';

const MediaPage = () => {

  const location = useLocation();
  const { mediaType, mediaTitle } = location.state || {};

  const [media, setMedia] = useState([]);
  const [localBranch, setLocalBranch] = useState([]);

  useEffect(() => {
    async function loadData() {
      const mediaItems = await getByTitle(mediaTitle);
      setMedia(mediaItems);
    }
    
    loadData();
  }, []); // Empty dependency array means it runs only once after initial render.

  // Access the first media item, if it exists
  const mediaItem = media.length > 0 ? media[0] : null;

  const mediaArtwork = generateImageSrc(mediaTitle, mediaType);

  return (
    <>
      <Container fluid='lg'>
        <Row>
          <Col className='content-panel g-0' style={{ paddingRight: '1.5rem' }}>
            {mediaItem ? (
              <img 
                src={mediaArtwork} 
                alt={mediaItem.Title || 'Media Image'} 
                style={{ width: '100%', aspectRatio: '1' , objectFit: 'contain' }} 
              />
            ) : (
              <p>Loading image...</p> // Optionally show a placeholder while loading
            )}
          </Col>
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
            <Row className='pt-3 g-0'>
              <h3 id="stock">Stock At Local Store</h3>
              <BranchStockCard branch={localBranch} isInStock={false} />
            </Row>
            <Row className='pt-3 g-0'>
              <h3 id="suggestion">Suggested Stores</h3>
              <BranchStockCard branch={localBranch} />
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MediaPage;
