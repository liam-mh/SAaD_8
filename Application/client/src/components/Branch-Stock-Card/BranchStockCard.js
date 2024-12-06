import React, { useContext, useState, useEffect } from 'react';
import { SessionContext } from '../../services/sessionContext';
import branchFrontEndService from '../../services/storefront/branchFrontEndService';
import MediaFrontEndService from '../../services/storefront/mediaFrontEndService';
import MediaHistoryFrontEndService from '../../services/storefront/mediaHistoryFrontEndService';
import { Col, Row } from 'react-bootstrap';

const mediaFrontEndService = new MediaFrontEndService();
const mediaHistoryFrontEndService = new MediaHistoryFrontEndService(); 

function BranchStockCard({ media, onAddToBasket }) {
    if (!media) { return <p>Loading media information...</p>; }
    const { user, basket, setBasket, branches, setBranches } = useContext(SessionContext);
    const [branch, setCardBranch] = useState();
    const [stock, setStock] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [availableStockCount, setAvailableStockCount] = useState(0);
    const [isUserLocalBranch, setIsUserLocalBranch] = useState(false);

    useEffect(() => {
        async function loadDataAndCheckStock() {
            try {
                const [branchData, stockData] = await Promise.all([
                    branchFrontEndService.get('/readRecords', { BranchID: media.BranchID }),
                    mediaFrontEndService.get('/readRecords', { Title: media.Title, Type: media.Type, BranchID: media.BranchID }, false)
                ]);

                setCardBranch(branchData.data[0]);
                setStock(stockData.data);

                const availabilityResults = await Promise.all(
                    stockData.data.map(async (mediaItem) => {
                        const availability = await mediaHistoryFrontEndService.get('/readRecords', { MediaID: mediaItem.MediaID });
                        const activeStatus = availability?.data?.[0]?.Active ?? false;
                        return { media: mediaItem, activeStatus };
                    })
                );

                setAvailability(availabilityResults);

                const availableItems = availabilityResults.filter(item => item.activeStatus === false);
                setAvailableStockCount(availableItems.length);
            } catch (error) {
                console.error("Error loading data or checking stock:", error);
            }
        }

        loadDataAndCheckStock();
    }, []);

    useEffect(() => {
        if (user && user.BranchID === media.BranchID) {
            setIsUserLocalBranch(true);
        }
    }, [user])

    const isInBasket = basket.some(item => 
        item.Title === media.Title && 
        item.Type === media.Type && 
        item.BranchID === media.BranchID
    );

    const handleAddToBasket = (e) => {
        e.preventDefault();
        if (!isInBasket) {
            setBasket([...basket, { ...media }]); 
            setBranches([...branches, {...branch }])
            onAddToBasket(media);
        }
    };

    const handleRemoveFromBasket = (e) => {
        e.preventDefault();
        setBasket(basket.filter(item => 
            !(item.Title === media.Title && item.Type === media.Type && item.BranchID === media.BranchID)
        ));
    };
    
    return (
        <div className={isUserLocalBranch ? 'content-panel-highlight-primary' : 'content-panel'} style={{ width: '100%', padding: '0.5rem' }}>
            <Row className="align-items-center">
                <Col>
                    {branch ? (
                        <span>
                            {branch.FirstLineAddress || 'First Line'}<br />
                            {branch.City || 'City'}, {branch.Postcode || 'Postcode'}<br />
                        </span>
                    ) : (
                        <span>Loading branch information...</span>
                    )}
                </Col>
                <Col xs={1} className='text-center'>
                    <span>{availableStockCount}</span>
                </Col>
                <Col xs={3} className="text-end">
                    {availableStockCount > 0 ? (
                        <div>
                            {isInBasket ? (
                                <button className="button-secondary-outline" onClick={handleRemoveFromBasket} Title='Remove from basket'>
                                    <i className="bi bi-x-circle-fill"></i>
                                </button>
                            ) : (
                                <button className="button-primary" onClick={handleAddToBasket} Title='Add to basket'>
                                    <i className="bi bi-basket"></i>
                                </button>
                            )}
                        </div>
                    ) : (
                        <span style={{ color: 'red', paddingRight: '1rem' }} Title='Out of stock'>
                            <i className="bi bi-x-circle-fill"></i>
                        </span>
                    )}
                </Col>
            </Row>
        </div>
    );       
}

export default BranchStockCard;