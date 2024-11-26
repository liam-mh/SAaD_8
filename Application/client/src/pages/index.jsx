import React, { useEffect, useState } from 'react';
import WhatsNewCarousel from '../components/WhatsNewCarousel';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import MediaPagination from '../components/MediaPagination';
import mediaFrontEndService from '../services/storefront/mediaFrontEndService';

import { getByDate, getRandomFive } from '../services/sampleDataFunctions';

const IndexPage = () => {
  const [allMedia, setAllMedia] = useState([]);
  const [whatsNew, setRecentMedia] = useState([]);
  const [topPicks, setRandomMedia] = useState([]);
  const [hasClickedExploreMore, setHasClickedExploreMore] = useState(false);

  // Load media data
  useEffect(() => {
    async function loadData() {
      const allItems = await mediaFrontEndService.get('/readRecords', { });
      const recentItems = await mediaFrontEndService.fetchMediaByTypeAndLimit();
      const randomItems = await getRandomFive();
      setAllMedia(allItems.data);
      setRecentMedia(recentItems);
      setRandomMedia(randomItems);
    }

    loadData();
  }, []);

  const handleExploreMore = () => {
    setHasClickedExploreMore(true);
  };

  return (
    <>
      {/* Whats new carousel */}
      <div id="whats-new" className="whats-new py-4 d-flex align-items-center justify-content-center">
        <Row>
          <Col xs={3} className="d-flex align-items-center justify-content-center text-center">
            <h1>What's<br />New?</h1>
          </Col>
          <Col className="content-panel-no-padding">
            <WhatsNewCarousel media={whatsNew} />
          </Col>
        </Row>
      </div>

      <Container fluid="lg">
        
        {/* Top Picks */}
        <h3 id="top-picks" className="pb-2 pt-4">Top Picks</h3> 
        <MediaPagination
          media={topPicks}
          numColumn='5' 
          numRow='1' 
          displayFirst='5'
        />

        {/* All media */}
        <h3 id="all" className="pb-2 pt-4">All Media</h3>        
        <MediaPagination
          media={allMedia}
          numColumn='5' 
          numRow={hasClickedExploreMore ? '2' : '1'} 
          displayFirst={hasClickedExploreMore ? null : '5'}
        />
        
        {/* Explore More Button */}
        {!hasClickedExploreMore && (
          <div className="pt-4 d-flex justify-content-center">
            <Button className="button-secondary" onClick={handleExploreMore}>
              Explore More
            </Button>
          </div>
        )}
        
      </Container>
    </>
  );
};

export default IndexPage;