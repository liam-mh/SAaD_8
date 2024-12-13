import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Button } from 'react-bootstrap';

import MemberFrontEndService from '../../services/account/memberFrontEndService';
import MemberSubscriptionFrontEndService from '../../services/account/memberSubscriptionFrontEndService';


function MemberAccountDetails({ ID = null, email = null }) {
    const memberFrontEndService = new MemberFrontEndService();
    const memberSubscriptionFrontEndService = new MemberSubscriptionFrontEndService();

    const [member, setMember] = useState();
    const [memberTokens, setMemberTokens] = useState();

    useEffect(() => {
        if (member) return;
        async function loadData() {
            try {
                let userData;
                if (email) {
                    userData = await memberFrontEndService.get("/readRecords", {
                        Email: email,
                    });
                }
                if (ID) {
                    userData = await memberFrontEndService.get("/readRecords", {
                        MemberID: ID,
                    });
                }
                setMember(userData.data[0]);
            } catch (error) {
                console.log(error);
            }
        }

        loadData();
    }, [])

    useEffect(() => {
        if (memberTokens) return;
        async function loadData() {
            try {
                let tokenData;
                if (member) {
                    tokenData = await memberSubscriptionFrontEndService.get("/readRecords", {
                        MemberID: member.MemberID,
                    });
                }
                setMemberTokens(tokenData.data[0]);
            } catch (error) {
                console.log(error);
            }
        }

        loadData();
    }, [member])

    return (
        <div className="content-panel">
            {member && memberTokens ? (
                <>
                    <Row>
                        <Col>
                            <Table className='account-details'>
                                <tbody>
                                    <tr>
                                        <th>First Name</th>
                                        <td>{ member.FirstName }</td>
                                    </tr>
                                    <tr>
                                        <th>Surname</th>
                                        <td>{ member.Surname }</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{member.Email}</td>
                                    </tr>
                                    <tr>
                                        <th>Password</th>
                                        <td>---</td>
                                    </tr>
                                    <tr>
                                        <th>Registered Date</th>
                                        <td>{member.RegisterDate}</td>
                                    </tr>
                                    <tr>
                                        <th>Local Branch</th>
                                        <td>{member.BranchID}</td>
                                    </tr>
                                    <tr>
                                        <th>First Line Address</th>
                                        <td>{member.FirstLineAddress}</td>
                                    </tr>
                                    <tr>
                                        <th>City</th>
                                        <td>{member.City}</td>
                                    </tr>
                                    <tr>
                                        <th>Postcode</th>
                                        <td>{member.Postcode}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Button className="button-primary-outline" as={Link} to="/account#account">
                                Edit Account
                            </Button>
                        </Col>
                        <Col>
                            <Table className='account-details'>
                                <tbody>
                                    <tr>
                                        <th>Remaining Tokens</th>
                                        <td>{ memberTokens.RemainingTokens }</td>
                                    </tr>
                                    <tr>
                                        <th>Subscription ID</th>
                                        <td>{ memberTokens.SubscriptionID }</td>
                                    </tr>
                                    <tr>
                                        <th>Subscription Date</th>
                                        <td>{ memberTokens.SubscriptionDate }</td>
                                    </tr>
                                    <tr>
                                        <th>Overdue Debt</th>
                                        <td>£{ memberTokens.OverdueDebt }</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </>
            ) : (
                <span>No member information</span>
            )}
                  
        </div>
    );
}

export default MemberAccountDetails;
