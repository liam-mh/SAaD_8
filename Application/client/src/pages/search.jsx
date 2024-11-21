import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { getBySearch } from '../services/sampleDataFunctions';

const SearchPage = () => {
    const location = useLocation();
    const searchTerm = location.state ? location.state.searchTerm : '';
    const [media, setMedia] = useState([]);

    useEffect(() => {
        async function loadData() {
            const mediaItem = await getBySearch(searchTerm);
            setMedia(mediaItem)
        }
        loadData();
      }, [searchTerm]);

    return (
        <>
            <Container fluid="lg">

                <h1 className="pb-2">Search Results: <strong>{searchTerm}</strong></h1>
                {media.length === 0 ? (
                    <div className='content-panel' style={{width: 'fit-content'}}>
                        <span>
                            <strong>No Results</strong><br /><br />
                            Want to request media? Click <Link to="/help#media-request">here</Link><br /><br />
                            Click <Link to="/">here</Link> to continue shopping
                        </span>
                    </div>
                ) : (
                    <ul>
                        {media.map((item, index) => (
                        <li key={index}>{item.Title} by {item.Author}</li>
                        ))}
                    </ul>
                )}
                

            </Container>
        </>
    );
};

export default SearchPage;