import React, { useContext, useState, useEffect } from 'react';
import { SessionContext } from '../../services/sessionContext';
import branchFrontEndService from '../../services/storefront/branchFrontEndService';

function BranchStockCard({ media, onAddToBasket }) {
    if (!media) { return <p>Loading media information...</p>; }
    const { basket, setBasket, branches, setBranches } = useContext(SessionContext);
    const isInStock = true;
    const [branch, setCardBranch] = useState();

    useEffect(() => {
        async function loadData() {
            const branchData = await branchFrontEndService.get('/readRecords', { BranchID: media.BranchID });
            setCardBranch(branchData.data[0]);
        }
    
        loadData();
    }, []);

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
        <div className="content-panel">
            {branch ? (
                <span>
                    {branch.FirstLineAddress || 'First Line'}<br />
                    {branch.City || 'City'}<br />
                    {branch.Postcode || 'Postcode'}<br />
                </span>
            ) : (
                <p>Loading branch information...</p>
            )}
    
            {isInStock ? (
                <div>
                    {isInBasket ? (
                        <button className="button-secondary" onClick={handleRemoveFromBasket}>
                            Remove from Basket
                        </button>
                    ) : (
                        <button className="button-primary" onClick={handleAddToBasket}>
                            Add to Basket
                        </button>
                    )}
                </div>
            ) : (
                <span className="highlight-secondary-outline">Out Of Stock</span>
            )}
        </div>
    );    
}

export default BranchStockCard;