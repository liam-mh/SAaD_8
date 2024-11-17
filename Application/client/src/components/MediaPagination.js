import React from 'react';
import { Pagination, Row, Col } from 'react-bootstrap';
import MediaCard from './MediaCard';

const MediaPagination = ({ media, numColumn, numRow, displayFirst = null }) => {
  
  // calulations for media to display
  const mediaToDisplay = displayFirst ? media.slice(0, displayFirst) : media;
  const mediaPerPage = numColumn * numRow;
  const totalPages = Math.ceil(mediaToDisplay.length / mediaPerPage);

  // Page states
  const [currentPage, setCurrentPage] = React.useState(1);
  const startIndex = (currentPage - 1) * mediaPerPage;
  const endIndex = startIndex + mediaPerPage;
  const visibleMedia = mediaToDisplay.slice(startIndex, endIndex);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Populate columns
  const rows = [];
  let rowContent = [];
  visibleMedia.forEach((item, index) => {
    rowContent.push(
      <Col key={item.Title} className="d-flex justify-content-center pb-4">
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
        <Col key={`empty-${i}`} className="d-flex justify-content-center pb-4">
          {/* Empty column */}
        </Col>
      );
    }
    rows.push(<Row key="last-row">{rowContent}</Row>);
  }

  return (
    <div>
      {/* Display media rows */}
      {rows}

      {/* Pagination Controls (only show if displayFirst is not set) */}
      {!displayFirst && (
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
    </div>
  );
};

export default MediaPagination;