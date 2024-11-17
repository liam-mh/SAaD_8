import React, { useContext } from 'react';
import { SessionContext } from '../services/sessionContext';

function BranchStockCard({ branch, media, isInStock = true }) {
    if (!media) { return <p>Loading media information...</p>; }
    const { basket, setBasket } = useContext(SessionContext);

    const isInBasket = basket.some(item => 
        item.Title === media.Title && 
        item.Type === media.Type && 
        item.BranchID === branch.BranchID
    );

    const handleAddToBasket = (e) => {
        e.preventDefault();
        if (!isInBasket) {
            setBasket([...basket, { ...media, BranchID: branch.BranchID }]); 
        }
    };

    const handleRemoveFromBasket = (e) => {
        e.preventDefault();
        setBasket(basket.filter(item => 
            !(item.Title === media.Title && item.Type === media.Type && item.BranchID === branch.BranchID)
        ));
    };

    return (
        <div className="content-panel">
            <span>
                {branch.FirstLineAddress || 'First Line'}<br />
                {branch.City || 'City'}<br />
                {branch.Postcode || 'Postcode'}<br />
            </span>

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