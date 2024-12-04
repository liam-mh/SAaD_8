// media.jsx
import React, { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { SessionContext } from '../services/sessionContext';
import BranchStockCard from '../components/Branch-Stock-Card/BranchStockCard';
import NotificationBanner from '../components/Notification-Banner/NotificationBanner';
import { useLocation } from 'react-router-dom';
import wishlistFrontEndService from '../services/storefront/wishlistFrontEndSevice';
import mediaFrontEndService from '../services/storefront/mediaFrontEndService';
import moment from 'moment';
import { Link } from 'react-router-dom';

const MediaPage = () => {
  const { user } = useContext(SessionContext) || {};
  const location = useLocation();
  const { mediaType, mediaTitle } = location.state || {};
  const [media, setMedia] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const [usedWishlistButton, setUsedWishlistButton] = useState(false);

  useEffect(() => {
    async function loadData() {
      const allItems = await mediaFrontEndService.get('/readRecords', {Title: mediaTitle, Type: mediaType} , true);
      setMedia(allItems.data);
    }

    loadData();
  }, []);

  const mediaItem = media.length > 0 ? media[0] : null;
  const mediaArtwork = mediaItem ? mediaFrontEndService.generateImageSrc(mediaItem.Title, mediaItem.Type) : null;

  const handleAddToBasket = () => {
    setNotificationText(mediaItem.Title);
    setShowNotification(true);
  };

  const handleAddToWishlist = async () => {
    try {
      if (!user && !usedWishlistButton) {
        const addToWishlist = await wishlistFrontEndSevice.post(
          '/createRecord', 
          {
            MemberID: user.MemberID,
            Title: mediaTitle,
            Type: mediaType,
            DateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
            WishType: 'Wishlist'
          }
        )
      }
    } catch (error) {
      console.log(error);
    }

    setUsedWishlistButton(true);
  }

  useEffect(() => {
    if (!user) return;
    async function checkWishlist() {
      const isMediaInWishlist = await wishlistFrontEndService.get(
        '/readRecords', 
        {
          MemberID: user.MemberID,
          Title: mediaTitle,
          Type: mediaType 
        }
      );
      if (isMediaInWishlist.data.length > 0) {
        setUsedWishlistButton(true);
      }
    }

    checkWishlist();
  }, [user])

  return (
    <>
      {showNotification && <NotificationBanner mediaTitle={notificationText} />}
      <Container fluid='lg'>
        <Row>
          {/* Media Artwork */}
          <Col className='p-0' style={{ paddingRight: '1.5rem' }}>
            <div className='content-panel'>
              {mediaItem ? (
                <img 
                  src={mediaArtwork} 
                  alt={mediaItem.Title || 'Media Image'} 
                  style={{ width: '100%', aspectRatio: '1', objectFit: 'contain' }} 
                />
              ) : (
                <p>Loading image...</p>
              )}
            </div>
          </Col>

          {/* Media Information*/}
          <Col style={{ paddingLeft: '1.5rem' }}>
            <Row className='pb-3'>
              <h1>{mediaItem ? mediaItem.Title : 'Media Title'}</h1>
              <span>Rent tokens per week: <strong>1</strong></span>
            </Row>
            <Row className='content-panel g-0'>
              <Col>
                <p>
                  <strong>Details</strong><br />
                  Format: {mediaItem ? mediaItem.Type : 'Type'}<br />
                  Genre: {mediaItem ? mediaItem.Genre : 'Genre'}<br />
                  Author: {mediaItem ? mediaItem.Author : 'Author'}<br />
                  Published: {mediaItem ? mediaItem.PublishDate : 'Publish Date'}
                </p>
                {
                  !user ? (
                    <span style={{ color: 'var(--wishlist)' }}>
                      <Link to='/account#account' className="nav-link-wishlist">Login</Link> to add to wishlist
                    </span>
                  ) : !usedWishlistButton ? (
                    <button className="button-wishlist" onClick={handleAddToWishlist} title="Add to Wishlist">
                      <i className="bi bi-star-fill"></i>
                    </button>
                  ) : (
                    <span style={{ color: 'var(--wishlist)' }}>
                      <i className="bi bi-star-fill"></i> Item in <Link to='/account#wishlist' className="nav-link-wishlist">wishlist</Link>
                    </span>
                  )
                }                
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
              <Row className='g-1'>
                <Col><span><strong>Branch</strong></span></Col>
                <Col xs={1}><span><strong>Stock</strong></span></Col>
                <Col xs={3} className="text-end"><span><strong>Basket</strong></span></Col>
              </Row>
              {media.map((mediaItem, index) => (
                <Row className='pb-3 g-0'>
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