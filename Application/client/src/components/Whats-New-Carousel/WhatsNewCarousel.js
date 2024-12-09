import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import MediaFrontEndService from '../../services/storefront/mediaFrontEndService';

const mediaFrontEndService = new MediaFrontEndService();

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
      <div className="carousel-container">
        <Carousel>
          {slides.map((slide, index) => (
            <Carousel.Item key={index}>
              <Row>
                <Col xs={2}>
                  <div className="category-title">
                    <h4>{slide.title}</h4>
                  </div>
                </Col>
                <Col>
                  <Row className="justify-content-center g-0">
                    {slide.items.map((item, idx) => (
                      <Col key={idx} md={4}>
                        <Link
                          to="/media"
                          state={{ mediaType: item.Type, mediaTitle: item.Title }}
                          className="carousel-link"
                        >
                          <div className="artwork-container">
                            <img
                              src={mediaFrontEndService.generateImageSrc(item.Title, item.Type)} 
                              alt={item.Title}
                            />
                            <div className="mask-left"></div>
                            <div className="mask-right"></div>
                          </div>
                        </Link>
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