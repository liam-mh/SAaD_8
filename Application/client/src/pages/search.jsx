import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import { Col, Row, Form, FormGroup, Button } from 'react-bootstrap';
import { getBySearch } from '../services/sampleDataFunctions';
import MediaPagination from '../components/MediaPagination';

const SearchPage = () => {
    const location = useLocation();
    const searchTerm = location.state ? location.state.searchTerm : '';
    const [media, setMedia] = useState([]);
    const [filteredMedia, setFilteredMedia] = useState([]); // Holds filtered & sorted media
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [sortType, setSortType] = useState('Relevance'); // Default sort

    const formats = ['Book', 'CD', 'DVD', 'Game', 'Journal', 'Periodical'];
    const genres = [
        'Fiction',
        'Non-Fiction',
        'Action',
        'Fantasy',
        'Biography',
        'Thriller',
        'History',
        'Educational',
        'Entertainment',
        'Art & Culture',
    ];

    const sortByDateNewestFirst = (mediaArray) => {
        return mediaArray.sort((a, b) => {
            const dateA = new Date(a.PublishDate.split('-').reverse().join('-')); // Convert DD-MM-YYYY to YYYY-MM-DD
            const dateB = new Date(b.PublishDate.split('-').reverse().join('-')); // Convert DD-MM-YYYY to YYYY-MM-DD
            return dateB - dateA; // Newest first
        });
    };

    // Load initial media data
    useEffect(() => {
        async function loadData() {
            const mediaItem = await getBySearch(searchTerm);
            setMedia(mediaItem);
            setFilteredMedia(mediaItem); // Start with all media shown
        }
        loadData();
    }, [searchTerm]);

    // Apply filters and sort whenever criteria change
    useEffect(() => {
        let updatedMedia = [...media];

        // Filter by selected formats
        if (selectedFormats.length > 0) {
            updatedMedia = updatedMedia.filter((item) =>
                selectedFormats.includes(item.Type)
            );
        }

        // Filter by selected genres
        if (selectedGenres.length > 0) {
            updatedMedia = updatedMedia.filter((item) =>
                selectedGenres.some((genre) => item.Genre.includes(genre))
            );
        }

        // Apply sorting
        switch (sortType) {
            case 'Title':
                updatedMedia.sort((a, b) => a.Title.localeCompare(b.Title));
                break;
            case 'Release':
                updatedMedia = sortByDateNewestFirst(media);
                break;
            case 'Relevance':
            default:
                break; 
        }

        setFilteredMedia(updatedMedia);
    }, [selectedFormats, selectedGenres, sortType, media]);

    // Handle format toggle
    const handleFormatChange = (format) => {
        setSelectedFormats((prevSelected) =>
            prevSelected.includes(format)
                ? prevSelected.filter((f) => f !== format)
                : [...prevSelected, format]
        );
    };

    // Handle genre toggle
    const handleGenreChange = (genre) => {
        setSelectedGenres((prevSelected) =>
            prevSelected.includes(genre)
                ? prevSelected.filter((g) => g !== genre)
                : [...prevSelected, genre]
        );
    };

    return (
        <Container fluid="lg">
            <h1 className="pb-2">
                Search Results: <strong>{searchTerm}</strong>
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
                    {/* Filters */}
                    <Col xs={2}>
                        <Row className="content-panel g-0">
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
                        <Row className="content-panel g-0 mt-4">
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
                        {/* Sort Panel */}
                        <Row className="content-panel g-0 d-flex align-items-center gap-3 ">
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
                            <Button className="button-primary" type="submit" style={{ width: 'auto' }}>
                                Apply Filters
                            </Button>
                        </Row>
                        {/* Display Media */}
                        <Row className="pt-4">
                            <MediaPagination media={filteredMedia} numColumn={4} numRow={3} />
                        </Row>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default SearchPage;