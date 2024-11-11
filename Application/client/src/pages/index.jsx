import React, { useEffect, useState } from 'react';
import { fetchMembers } from '../services/memberService';
import WhatsNewCarousel from '../components/WhatsNewCarousel';
import MediaCard from '../components/MediaCard';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Button from 'react-bootstrap/esm/Button';
import Pagination from 'react-bootstrap/Pagination'; // Import React-Bootstrap pagination

import { getAll, getByDate, getRandomFive } from '../services/sampleDataFunctions';

const IndexPage = () => {
  const [allMedia, setAllMedia] = useState([]);
  const [whatsNew, setRecentMedia] = useState([]);
  const [topPicks, setRandomMedia] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [mediaPerPage] = useState(10);
  const [visibleMedia, setVisibleMedia] = useState([]);

  // Track whether the "Explore More" button has been clicked
  const [hasClickedExploreMore, setHasClickedExploreMore] = useState(false);

  // Load media data
  useEffect(() => {
    async function loadData() {
        const allItems = await getAll();
        const recentItems = await getByDate();
        const randomItems = await getRandomFive();
        setAllMedia(allItems);
        setRecentMedia(recentItems);
        setRandomMedia(randomItems);

        // Set the initial visible media (first 5 items)
        setVisibleMedia(allItems.slice(0, 5));
    }
    
    loadData();
  }, []);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    const startIndex = (pageNumber - 1) * mediaPerPage;
    const endIndex = startIndex + mediaPerPage;
    const mediaToShow = allMedia.slice(startIndex, endIndex);

    setVisibleMedia(mediaToShow);
    setCurrentPage(pageNumber);
  };

  // Handle "Explore More" button click
  const handleExploreMore = () => {
    const nextPage = currentPage;
    handlePageChange(nextPage);

    // Once clicked, set the state to hide the button
    setHasClickedExploreMore(true);
  };

  // Calculate total pages
  const totalPages = Math.ceil(allMedia.length / mediaPerPage);

  // Determine if there are more items to load
  const hasMoreItems = visibleMedia.length < allMedia.length;

  return (
    <>
      <div id='whats-new' className='whats-new py-4 d-flex align-items-center justify-content-center'>
        <Row>
          <Col xs={3} className="d-flex align-items-center justify-content-center text-center">
            <h1 className="h1-whats-new"><strong>What's<br />New?</strong></h1>
          </Col>
          <Col className='content-panel-no-padding'>
            <WhatsNewCarousel media={whatsNew} />
          </Col>
        </Row>
      </div>
  
      <Container fluid="lg">
        <h3 id="top-picks" className='pb-2 pt-4'>Top Picks</h3> 
        <Row className='g-0'>
          {topPicks.map((media) => (
            <Col key={media.Title} className='d-flex justify-content-center'>
              <MediaCard media={media} isSearchResult={true} />
            </Col>
          ))}
        </Row>
        
        <h3 id="all" className='pb-2 pt-4'>All Media</h3> 
        <Row>
          {visibleMedia.map((media) => (
            <Col key={media.Title} className='d-flex justify-content-center pb-4'>
              <MediaCard media={media} isSearchResult={true} />
            </Col>
          ))}
        </Row>

        {/* Explore More Button - Only show if the button has not been clicked */}
        {!hasClickedExploreMore && hasMoreItems && (
          <div className='pt-4 d-flex justify-content-center'>
            <Button 
              className='button-secondary' 
              onClick={handleExploreMore}
            >
              Explore More
            </Button>
          </div>
        )}

        {/* Pagination Controls */}
        {hasClickedExploreMore && totalPages > 1 && (
          <div className="d-flex justify-content-center pt-4">
            <Pagination>
              {/* Previous Button */}
              <Pagination.Prev 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
              />
              
              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item 
                  key={index} 
                  active={index + 1 === currentPage} 
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}

              {/* Next Button */}
              <Pagination.Next 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage === totalPages} 
              />
            </Pagination>
          </div>
        )}
      </Container>
    </>
  );
};

export default IndexPage;
