import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Button, Form } from 'react-bootstrap';

import MemberFrontEndService from '../../services/account/memberFrontEndService';
import MemberSubscriptionFrontEndService from '../../services/account/memberSubscriptionFrontEndService';

function MemberAccountDetails({ ID = null, email = null }) {
    const memberFrontEndService = new MemberFrontEndService();
    const memberSubscriptionFrontEndService = new MemberSubscriptionFrontEndService();

    const [member, setMember] = useState();
    const [memberTokens, setMemberTokens] = useState();
    const [editMode, setEditMode] = useState(false);
    const [editableData, setEditableData] = useState({});
    const [passwordChanged, setPasswordChanged] = useState(false);

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
                setEditableData(userData.data[0]);
            } catch (error) {
                console.log(error);
            }
        }

        loadData();
    }, []);

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
    }, [member]);

    const handleInputChange = (field, value) => {
        setEditableData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const saveChanges = () => {
        if (!passwordChanged) {
            editableData.Password = member.Password; 
        }
        console.log(editableData);
        setMember(editableData);
        setEditMode(false); 
        setPasswordChanged(false);
        const updateData = async () => {
            try {
                await memberFrontEndService.put("/updateRecord", 
                    editableData,
                );
            } catch (error) {
                console.log(error);
            }
        }
        
        updateData();
    };

    return (
        <div className="content-panel">
            {member && memberTokens ? (
                <>
                    <Row>
                        <Col>
                            <Table className="account-details">
                                <tbody>
                                    {editMode ? (
                                        <>
                                            <tr>
                                                <th>First Name</th>
                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder={member.FirstName}
                                                        value={editableData.FirstName || ''}
                                                        onChange={(e) =>
                                                            handleInputChange('FirstName', e.target.value)
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Surname</th>
                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder={member.Surname}
                                                        value={editableData.Surname || ''}
                                                        onChange={(e) =>
                                                            handleInputChange('Surname', e.target.value)
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder={member.Email}
                                                        value={editableData.Email || ''}
                                                        onChange={(e) =>
                                                            handleInputChange('Email', e.target.value)
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Password</th>
                                                <td>
                                                    <Form.Control
                                                        type="password"
                                                        placeholder="********"
                                                        value={passwordChanged ? editableData.Password : ''}
                                                        onChange={(e) => {
                                                            setPasswordChanged(true);
                                                            handleInputChange('Password', e.target.value);
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Registered Date</th>
                                                <td>{member.RegisterDate}</td>
                                            </tr>
                                            <tr>
                                                <th>Local Branch</th>
                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder={member.BranchID}
                                                        value={editableData.BranchID || ''}
                                                        onChange={(e) =>
                                                            handleInputChange('BranchID', e.target.value)
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>First Line Address</th>
                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder={member.FirstLineAddress}
                                                        value={editableData.FirstLineAddress || ''}
                                                        onChange={(e) =>
                                                            handleInputChange('FirstLineAddress', e.target.value)
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>City</th>
                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder={member.City}
                                                        value={editableData.City || ''}
                                                        onChange={(e) =>
                                                            handleInputChange('City', e.target.value)
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Postcode</th>
                                                <td>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder={member.Postcode}
                                                        value={editableData.Postcode || ''}
                                                        onChange={(e) =>
                                                            handleInputChange('Postcode', e.target.value)
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        </>
                                    ) : (
                                        <>
                                            <tr>
                                                <th>First Name</th>
                                                <td>{member.FirstName}</td>
                                            </tr>
                                            <tr>
                                                <th>Surname</th>
                                                <td>{member.Surname}</td>
                                            </tr>
                                            <tr>
                                                <th>Email</th>
                                                <td>{member.Email}</td>
                                            </tr>
                                            <tr>
                                                <th>Password</th>
                                                <td>********</td>
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
                                        </>
                                    )}
                                </tbody>
                            </Table>
                            <Button
                                className="button-primary-outline"
                                onClick={() => (editMode ? saveChanges() : setEditMode(true))}
                            >
                                {editMode ? 'Save Changes' : 'Edit Account'}
                            </Button>
                            {editMode && (
                                <Button
                                    className="button-red-outline ms-2"
                                    onClick={() => {
                                        setEditableData(member); 
                                        setEditMode(false); 
                                        setPasswordChanged(false); 
                                    }}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </Button>
                            )}

                        </Col>
                        <Col>
                            <Table className="account-details">
                                <tbody>
                                    <tr>
                                        <th>Remaining Tokens</th>
                                        <td>{memberTokens.RemainingTokens}</td>
                                    </tr>
                                    <tr>
                                        <th>Subscription ID</th>
                                        <td>{memberTokens.SubscriptionID}</td>
                                    </tr>
                                    <tr>
                                        <th>Subscription Date</th>
                                        <td>{memberTokens.SubscriptionDate}</td>
                                    </tr>
                                    <tr>
                                        <th>Overdue Debt</th>
                                        <td>£{memberTokens.OverdueDebt}</td>
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