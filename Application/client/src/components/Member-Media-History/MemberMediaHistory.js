import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Table, Button, Form } from 'react-bootstrap';
import moment from 'moment';

import MediaHistoryFrontEndService from '../../services/storefront/mediaHistoryFrontEndService';
import MemberFrontEndService from '../../services/account/memberFrontEndService';
import WishlistFrontEndService from '../../services/storefront/wishlistFrontEndSevice';

function MemberMediaHistory({ ID = null }) {
    const mediaHistoryFrontEndService = new MediaHistoryFrontEndService();
    const memberFrontEndService = new MemberFrontEndService();
    const wishlistFrontEndSevice = new WishlistFrontEndService();

    const [memberMediaHistory, setMemberMediaHistory] = useState();
    const [refreshData, setRefreshData] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const mediaData = await mediaHistoryFrontEndService.get("/readRecords", {
                    MemberID: ID,
                });
                setMemberMediaHistory(mediaData.data);
                setRefreshData(false);
            } catch (error) {
                console.log(error);
            }
        }

        loadData();
    }, [refreshData]);

    const handleReturn = (historyID) => async () => {
        async function updateData() {
            try {
                const returnedMedia = await mediaHistoryFrontEndService.put("/updateRecord", {
                    HistoryID: historyID,
                    Active: 0,
                    ActualReturn: moment().format("YYYY-MM-DD")
                });

                {/* NON FUNCTIONAL 500 ERR message: 'Failed to retrieve emails', error: 'Failed to fetch emails'

                console.log('returned media:',returnedMedia);

                if (returnedMedia.status === 200) {
                    const wishlist = await wishlistFrontEndSevice.get("/readRecords", {
                        Title: returnedMedia.data.Title,
                        Type: returnedMedia.data.Type,
                    });
                    if (wishlist.data.length > 0) {
                        const member = await memberFrontEndService.handleMembersWishlist(
                            wishlist.data
                        );
                    }
                }

                */}

                setRefreshData(true);
            } catch (error) {
                console.error("Error during return:", error);
            }
        }

        updateData();
    };

    return (
        <div className="content-panel">
            <div style={{ maxHeight: "30vh", overflow: "auto" }}>
                {memberMediaHistory ? (
                    <Table hover className="aml-table">
                        <thead>
                            <tr>
                            <th>Product</th>
                            <th>Rent Details</th>
                            <th>Days Remaining</th>
                            <th>Return</th>
                            </tr>
                        </thead>
                        <tbody>
                            {memberMediaHistory.map((item, index) => {
                            const returnMessage = item.ActualReturn
                                ? item.ActualReturn
                                : 'Not returned yet'
            
                            const checkDateAndDifference = (returnDate) => {
                                const today = moment(); 
                                const firstDate = moment(returnDate, 'YYYY-MM-DD');
                                const isBeforeToday = firstDate.isBefore(today, 'day'); 
                                const differenceInDays = firstDate.diff(today, 'days'); 
                                return {
                                    isBeforeToday,
                                    differenceInDays,
                                };
                            };
            
                            const result = checkDateAndDifference(item.RentEnd);
                            const remainingDays = result.differenceInDays;
                            const isBeforeToday = result.isBeforeToday;

                            let hideReturn = false;
                            let remainingMessage = '';
                            let spanStyle = '';
                            if (item.Active === 1 && isBeforeToday) {
                                remainingMessage = `Overdue: ${remainingDays}`;
                                spanStyle = 'highlight-red-outline'
                            } 
                            if (item.Active === 0) {
                                remainingMessage = `Returned ${item.ActualReturn}`;
                                spanStyle = 'highlight-secondary-outline'
                                hideReturn = true;
                            }
                            if (item.Active === 1 && !isBeforeToday) {
                                remainingMessage = `Left: ${remainingDays}`;
                                spanStyle = 'highlight-primary-outline'
                            }
                            
                            return (
                                <tr key={index} style={{ verticalAlign: "middle" }}>
                                    <td>
                                        <span>
                                            ID: {item.MediaID}
                                        </span>
                                    </td>
                                    <td>
                                        <span>
                                            Start: {item.RentStart} <br />
                                            Return: {item.RentEnd} <br />
                                        </span>
                                    </td>
                                    <td>
                                        <span className={spanStyle}>
                                            {remainingMessage}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: "rig" }}>
                                        {!hideReturn && (
                                            <Button
                                                className="button-primary ms-2"
                                                onClick={handleReturn(item.HistoryID)} 
                                            >
                                                Return
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            );
                            })}
                        </tbody>
                    </Table>
                ) : (
                    <span>No media history</span>
                )}
            </div>
        </div>
    );
}

export default MemberMediaHistory;