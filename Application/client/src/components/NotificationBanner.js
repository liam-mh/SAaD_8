import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotificationBanner({ mediaTitle = null, overdueQuantity = null }) {
  const [show, setShow] = useState(true);
  const style = overdueQuantity ? 'notification-banner-alert' : 'notification-banner';
  const text = overdueQuantity
    ? overdueQuantity === 1
      ? `You have ${overdueQuantity} media item overdue.`
      : `You have ${overdueQuantity} media items overdue.`
    : `${mediaTitle} has been added to your basket`;

  return (
    <>
      {show && (
        <Row className={style}>
          <Col>
            <span>{text}</span>
          </Col>
          <Col className="text-end">
            <Link onClick={() => setShow(false)}>
              <span>X</span>
            </Link>
          </Col>
        </Row>
      )}
    </>
  );
}

export default NotificationBanner;