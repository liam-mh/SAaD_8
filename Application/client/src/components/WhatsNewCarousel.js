import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';

function WhatsNewCarousel({ media }) {
  const dvds = media.filter(item => item.Type === 'DVD');
  const books = media.filter(item => item.Type === 'Book');
  const journals = media.filter(item => item.Type === 'Journal');
  const periodicals = media.filter(item => item.Type === 'Periodical');
  const cds = media.filter(item => item.Type === 'CD');
  const games = media.filter(item => item.Type === 'Game');

  const slides = [
    { title: "DVD's", items: dvds },
    { title: "Books", items: books },
    { title: "Journals", items: journals },
    { title: "Periodicals", items: periodicals },
    { title: "CD's", items: cds },
    { title: "Games", items: games },
  ];

  return (
    <Container fluid>
      <div style={{ width: '700px', height: '200px', margin: 'auto' }}> {/* Custom carousel size */}
        <Carousel>
          {slides.map((slide, index) => (
            <Carousel.Item key={index}>
              <Row>
                <Col xs={2}>
                  {/* Category Title */}
                  <div className="category-title" style={{ position: 'absolute', top: '2rem', zIndex: 10 }}>
                    <h4>{slide.title}</h4>
                  </div>
                </Col>
                <Col>
                  {/* Display the items in each slide */}
                  <Row className="justify-content-center g-0">
                    {slide.items.map((item, idx) => (
                      <Col key={idx} md={4}>
                        <div
                          className="artwork-container"
                          style={{
                            position: 'relative',
                            width: '100%',
                            height: '200px',
                            overflow: 'hidden',
                            backgroundColor: '#E0E0E0'
                          }}
                        >
                          {/* Actual Artwork */}
                          <img
                            src={item.Artwork} 
                            alt={item.Title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              border: 'none',     
                              outline: 'none', 
                            }}
                          />
                          {/* Masked Rhombus Effect */}
                          <div
                            style={{
                              content: "''",
                              position: 'absolute',
                              top: 0,
                              left: -0.5,
                              width: '100%',
                              height: '100%',
                              backgroundColor: 'white', 
                              clipPath: 'polygon(0 0, 10% 0, 0 100%, 0 100%)', 
                              transformOrigin: 'center',
                              zIndex: 1,
                            }}
                          />
                          <div
                            style={{
                              content: "''",
                              position: 'absolute',
                              top: 0,
                              left: 0.5,
                              width: '100%',
                              height: '100%',
                              backgroundColor: 'white', 
                              clipPath: 'polygon(100% 0, 100% 0, 90% 100%, 100% 100%)', 
                              transformOrigin: 'center',
                              zIndex: 1,
                            }}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Container>
  );
}

export default WhatsNewCarousel;
