import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SessionContext } from '../services/sessionContext';
import MediaRequestForm from '../components/Media-Request-Form/MediaRequestForm';
import LoginCard from '../components/Login-Card/LoginCard';

const HelpPage = () => {
  const { user } = useContext(SessionContext) || {};

  return (
    <>
      <div className='white-background py-4'>
        <Container fluid='lg'>
          <h1>Help Centre</h1>
          <div className='bottom-border-primary'>
            <h2 id="about" className='pb-2 pt-4'>About Advanced Media Library</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mi tortor, consequat dictum erat quis, pharetra lobortis metus. Maecenas egestas justo quis arcu porta lacinia. Suspendisse semper consequat arcu, at laoreet lacus. Morbi ut neque laoreet, convallis lectus nec, vehicula dolor. Aenean eget arcu ornare, finibus ex a, accumsan lorem. Suspendisse interdum, mauris eget porttitor sodales, ex ipsum consectetur nunc, sit amet blandit elit odio id ligula. Nunc sed pharetra erat. </p>
          </div>
          <div className='bottom-border-primary'>
            <h2 id="rerturn-policy" className='pb-2 pt-4'>Return Policy</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mi tortor, consequat dictum erat quis, pharetra lobortis metus. Maecenas egestas justo quis arcu porta lacinia. Suspendisse semper consequat arcu, at laoreet lacus. Morbi ut neque laoreet, convallis lectus nec, vehicula dolor. Aenean eget arcu ornare, finibus ex a, accumsan lorem. Suspendisse interdum, mauris eget porttitor sodales, ex ipsum consectetur nunc, sit amet blandit elit odio id ligula. Nunc sed pharetra erat. Nulla facilisi. Aenean laoreet volutpat metus, eu congue dui tempus id. Nunc quis mattis diam, eget scelerisque lorem. Duis ut mattis libero. Aliquam suscipit orci sit amet erat tempus, varius aliquam nunc viverra. Mauris elementum malesuada vestibulum. Phasellus elementum purus eget dui venenatis, in ullamcorper lorem pellentesque. Suspendisse dolor erat, suscipit ac mi et, condimentum tristique tortor. Etiam est dolor, dictum a augue ut, blandit interdum elit.
              <br />Maecenas ac erat bibendum, elementum est sit amet, accumsan dui. Integer pretium mattis elit, et porta lacus posuere vel. Curabitur mattis blandit nunc, eget sollicitudin neque consequat commodo. Sed vitae pretium sapien, ut facilisis nibh. Praesent id metus fringilla, malesuada nisl et, tincidunt elit. Donec sem sem, feugiat id quam non, sollicitudin viverra odio. Phasellus lacinia massa vel nunc consequat blandit. Vestibulum ac sem a augue lobortis pellentesque.
              <br />Quisque congue tellus vel mauris posuere, tempor eleifend leo dignissim. Aliquam tincidunt dictum sapien ac rhoncus. Ut et est dictum, porttitor diam nec, suscipit turpis. Vivamus ac ultrices dolor. Quisque scelerisque massa eu ligula pretium, vel rutrum diam vestibulum. Proin blandit lacinia ante, vitae posuere ipsum laoreet ut. Curabitur fringilla purus ut nulla feugiat fringilla. Aenean quis interdum mauris, quis viverra elit. Donec tincidunt mi in lorem tristique rutrum. Integer ut tincidunt ante, et tempus tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris ultricies et tortor vitae sodales. Morbi venenatis nibh sit amet lacus scelerisque mollis.
            </p>
          </div>
          <div className='bottom-border-primary'>
            <h2 id="payments" className='pb-2 pt-4'>Payments</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mi tortor, consequat dictum erat quis, pharetra lobortis metus. Maecenas egestas justo quis arcu porta lacinia. Suspendisse semper consequat arcu, at laoreet lacus. Morbi ut neque laoreet, convallis lectus nec, vehicula dolor. Aenean eget arcu ornare, finibus ex a, accumsan lorem. Suspendisse interdum, mauris eget porttitor sodales, ex ipsum consectetur nunc, sit amet blandit elit odio id ligula. Nunc sed pharetra erat. Nulla facilisi. Aenean laoreet volutpat metus, eu congue dui tempus id. Nunc quis mattis diam, eget scelerisque lorem. Duis ut mattis libero. Aliquam suscipit orci sit amet erat tempus, varius aliquam nunc viverra. Mauris elementum malesuada vestibulum. Phasellus elementum purus eget dui venenatis, in ullamcorper lorem pellentesque. Suspendisse dolor erat, suscipit ac mi et, condimentum tristique tortor. Etiam est dolor, dictum a augue ut, blandit interdum elit.
              <br />Maecenas ac erat bibendum, elementum est sit amet, accumsan dui. Integer pretium mattis elit, et porta lacus posuere vel. Curabitur mattis blandit nunc, eget sollicitudin neque consequat commodo. Sed vitae pretium sapien, ut facilisis nibh. Praesent id metus fringilla, malesuada nisl et, tincidunt elit. Donec sem sem, feugiat id quam non, sollicitudin viverra odio. Phasellus lacinia massa vel nunc consequat blandit. Vestibulum ac sem a augue lobortis pellentesque.
              <br />Quisque congue tellus vel mauris posuere, tempor eleifend leo dignissim. Aliquam tincidunt dictum sapien ac rhoncus. Ut et est dictum, porttitor diam nec, suscipit turpis. Vivamus ac ultrices dolor. Quisque scelerisque massa eu ligula pretium, vel rutrum diam vestibulum. Proin blandit lacinia ante, vitae posuere ipsum laoreet ut. Curabitur fringilla purus ut nulla feugiat fringilla. Aenean quis interdum mauris, quis viverra elit. Donec tincidunt mi in lorem tristique rutrum. Integer ut tincidunt ante, et tempus tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris ultricies et tortor vitae sodales. Morbi venenatis nibh sit amet lacus scelerisque mollis.
            </p>
          </div>
          <div className='bottom-border-primary'>
            <Row className='pb-3'>
              <Col>
                <h2 id="media-request" className='pb-2 pt-4'>Media Request</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mi tortor, consequat dictum erat quis, pharetra lobortis metus. Maecenas egestas justo quis arcu porta lacinia. Suspendisse semper consequat arcu, at laoreet lacus. Morbi ut neque laoreet, convallis lectus nec, vehicula dolor. Aenean eget arcu ornare, finibus ex a, accumsan lorem. Suspendisse interdum, mauris eget porttitor sodales, ex ipsum consectetur nunc, sit amet blandit elit odio id ligula. Nunc sed pharetra erat. </p>
              </Col>
              <Col>
                <h2 id="submission-form" className='pb-2 pt-4'>Submission Form</h2>
                {!user ? (
                  <LoginCard />
                ) : (
                  <MediaRequestForm MemberID={user.MemberID}/>
                )}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default HelpPage;