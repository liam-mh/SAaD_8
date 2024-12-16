import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container, Col, Row, Form, FormGroup } from 'react-bootstrap';
import MediaPagination from '../components/Media-Pagination/MediaPagination';
import MediaFrontEndService from '../services/storefront/mediaFrontEndService';

const mediaFrontEndService = new MediaFrontEndService();

const SearchPage = () => {
    const location = useLocation();
    const searchTerm = location.state ? location.state.searchTerm : '';
    const { preFilterType } = location.state || {};

    const [media, setMedia] = useState([]);
    const [displayMedia, setDisplayMedia] = useState([]); 
    const [selectedFormats, setSelectedFormats] = useState(preFilterType ? [preFilterType] : []);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [sortType, setSortType] = useState('Relevance');
    const [productsPerPage, setProductsPerPage] = useState(24); 
    const [currentPage, setCurrentPage] = useState(1)
    const [allDataLoaded, setAllDataLoaded] = useState(false);

    const formats = ['Book', 'CD', 'DVD', 'Game', 'Journal', 'Periodical'];
    const genres = [
        'Fiction', 'Non-Fiction', 'Action', 'Fantasy', 'Biography', 'Thriller',
        'History', 'Educational', 'Entertainment', 'Art & Culture',
    ];

    const sortByDateNewestFirst = (mediaArray) => {
        return mediaArray.sort((a, b) => {
            const dateA = new Date(a.PublishDate.split('-').reverse().join('-'));
            const dateB = new Date(b.PublishDate.split('-').reverse().join('-'));
            return dateB - dateA; 
        });
    };

    useEffect(() => {
        async function loadData() {
            try {
                let res;
                if (preFilterType) {
                    res = await mediaFrontEndService.get('/readRecords', { Type: preFilterType }, true);
                } else if (searchTerm) {
                    res = await mediaFrontEndService.autoComplete(searchTerm);
                } else {
                    res = await mediaFrontEndService.get('/readRecords', {}, true);
                    setAllDataLoaded(true);
                }
                setMedia(res.data);
                setDisplayMedia(res.data);
            } catch (error) {
                console.error('Error loading media data:', error);
            }
        }
    
        loadData();
    }, [searchTerm, preFilterType]);    

    useEffect(() => {
        if (media.length === 0) return;
        if (!selectedFormats.length && !selectedGenres.length && !allDataLoaded) {
            setDisplayMedia(media);
        }
    }, [media, selectedFormats, selectedGenres, allDataLoaded]);

    useEffect(() => {
        if (media.length > 0) {
            let updatedMedia = [...media];
            if (selectedFormats.length > 0) {
                updatedMedia = updatedMedia.filter((item) =>
                    selectedFormats.includes(item.Type)
                );
            }
            if (selectedGenres.length > 0) {
                updatedMedia = updatedMedia.filter((item) =>
                    selectedGenres.some((genre) => item.Genre.includes(genre))
                );
            }

            switch (sortType) {
                case 'Title':
                    updatedMedia.sort((a, b) => a.Title.localeCompare(b.Title));
                    break;
                case 'Release':
                    updatedMedia = sortByDateNewestFirst(updatedMedia);
                    break;
                default:
                    break;
            }
    
            setDisplayMedia(updatedMedia);
        } else {
            setDisplayMedia([]);
        }
    }, [media, selectedFormats, selectedGenres, sortType]);
    

    const handleFormatChange = (format) => {
        setSelectedFormats((prevSelected) => {
            const updatedFormats = prevSelected.includes(format)
                ? prevSelected.filter((f) => f !== format)
                : [...prevSelected, format];
    
            return updatedFormats;
        });
    };

    const fetchAllData = async () => {
        try {
            const res = await mediaFrontEndService.get('/readRecords', {}, true);
            setMedia(res.data);
            setDisplayMedia(res.data);
            setAllDataLoaded(true);
        } catch (error) {
            console.error('Error fetching all media data:', error);
        }
    };

    const handleGenreChange = (genre) => {
        setSelectedGenres((prevSelected) =>
            prevSelected.includes(genre)
                ? prevSelected.filter((g) => g !== genre)
                : [...prevSelected, genre]
        );
    };

    const handleProductsPerPageChange = (value) => {
        setProductsPerPage(Number(value)); 
        setCurrentPage(1); 
    };

    return (
        <Container fluid="lg">
            <h1 className="pb-2">
                Search Results:{' '}
                <strong>{searchTerm || (preFilterType ? preFilterType + 's' : 'All')}</strong>
            </h1>
            {media.length === 0 ? (
                <div className="content-panel" style={{ width: 'fit-content' }}>
                    <span>
                        <strong>No Results</strong>
                        <br />
                        <br />
                        Want to request media? Click{' '}
                        <Link to="/help#media-request">here</Link>
                        <br />
                        <br />
                        Click <Link to="/">here</Link> to continue shopping
                    </span>
                </div>
            ) : (
                <Row>
                    <Col xs={2}>
                        {!preFilterType && (
                            <Row className="content-panel g-0 mb-4">
                                <span>
                                    <strong>Format</strong>
                                </span>
                                <Form>
                                    {formats.map((format) => (
                                        <FormGroup controlId={`format-${format}`} key={format}>
                                            <Form.Check
                                                type="checkbox"
                                                label={format}
                                                checked={selectedFormats.includes(format)}
                                                onChange={() => handleFormatChange(format)}
                                            />
                                        </FormGroup>
                                    ))}
                                </Form>
                            </Row>
                        )}
                        <Row className="content-panel g-0">
                            <span>
                                <strong>Genre</strong>
                            </span>
                            <Form>
                                {genres.map((genre) => (
                                    <FormGroup controlId={`genre-${genre}`} key={genre}>
                                        <Form.Check
                                            type="checkbox"
                                            label={genre}
                                            checked={selectedGenres.includes(genre)}
                                            onChange={() => handleGenreChange(genre)}
                                        />
                                    </FormGroup>
                                ))}
                            </Form>
                        </Row>
                    </Col>
                    <Col>
                        <Row className="content-panel g-0 d-flex align-items-center gap-3 ">
                            <span style={{ width: 'auto' }}>Products Per Page:</span>
                            <Form.Group controlId="productsPerPage" className="mb-0" style={{ width: '200px' }}>
                                <Form.Select
                                    className="form-secondary"
                                    onChange={(e) => handleProductsPerPageChange(e.target.value)}
                                >
                                    <option value="24">24</option>
                                    <option value="48">48</option>
                                    <option value="72">72</option>
                                </Form.Select>
                            </Form.Group>
                            <span style={{ width: 'auto' }}>Sort By:</span>
                            <Form.Group controlId="formBasicType" className="mb-0" style={{ width: '200px' }}>
                                <Form.Select
                                    className="form-secondary"
                                    onChange={(e) => setSortType(e.target.value)}
                                >
                                    <option value="Relevance">Relevance</option>
                                    <option value="Title">Title: A-Z</option>
                                    <option value="Release">Release: Newest First</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Row className="pt-4">
                            <MediaPagination media={displayMedia} numColumn={4} numRow={productsPerPage / 4} />
                        </Row>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default SearchPage;