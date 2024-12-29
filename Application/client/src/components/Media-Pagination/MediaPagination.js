import React, { useRef, useEffect } from 'react';
import { Pagination, Row, Col } from 'react-bootstrap';
import MediaCard from '../Media-Card/MediaCard';

const MediaPagination = ({ media, numColumn, numRow, displayFirst = null }) => {
  const mediaContainerRef = useRef(null); // Reference for scrolling
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate pagination details
  const mediaToDisplay = displayFirst ? media.slice(0, displayFirst) : media;
  const mediaPerPage = numColumn * numRow;
  const totalPages = Math.ceil(mediaToDisplay.length / mediaPerPage);
  const startIndex = (currentPage - 1) * mediaPerPage;
  const endIndex = startIndex + mediaPerPage;
  const visibleMedia = mediaToDisplay.slice(startIndex, endIndex);

  // Scroll to the top of mediaContainerRef when currentPage changes
  useEffect(() => {
    if (mediaContainerRef.current) {
      mediaContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Populate rows and columns
  const rows = [];
  let rowContent = [];
  visibleMedia.forEach((item, index) => {
    rowContent.push(
      <Col key={item.Title} className="d-flex justify-content-start pb-4">
        <MediaCard media={item} isSearchResult={true} />
      </Col>
    );
    if (rowContent.length === numColumn) {
      rows.push(<Row key={`row-${index}`}>{rowContent}</Row>);
      rowContent = [];
    }
  });

  if (rowContent.length > 0) {
    const emptyCols = numColumn - rowContent.length;
    for (let i = 0; i < emptyCols; i++) {
      rowContent.push(
        <Col key={`empty-${i}`} className="d-flex justify-content-start pb-4">
          {/* Empty column */}
        </Col>
      );
    }
    rows.push(<Row key="last-row">{rowContent}</Row>);
  }

  return (
    <div>
      {/* Media container for scrolling */}
      <div ref={mediaContainerRef}>
        {rows}
      </div>

      {/* Pagination Controls (only show if displayFirst is not set) */}
      {!displayFirst && (
        <div className="d-flex justify-content-center pt-4" data-testid="media-pagination">
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
    </div>
  );
};

export default MediaPagination;