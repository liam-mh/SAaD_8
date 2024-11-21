import React, { useEffect, useState } from 'react';
import LoginCard from '../components/LoginCard';
const memberFrontendService = require('../services/memberFrontEndService')

const AccountPage = () => {
  const [allMembers, setAll] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true); // Set loading state to true
      setError(null); // Clear any previous errors
      const members = await memberFrontendService.get('/readRecords', { fields: {firstName: "John"}, allFlag: false });
      console.log(members.data)

      try {
        //const allItems = await getMembers([], true);
        setAll(Array.isArray(allItems.data) ? allItems.data : []);
      } catch (error) {
        setError(error.message || 'Failed to fetch data'); // Set error message
      } finally {
        setIsLoading(false); // Set loading state to false after all tasks
      }
    };

    loadData();
  }, []);

  return (
    <>
      <LoginCard />

      <h1>Account Management</h1>
      <h2 id="account">My Account</h2>
      <h2 id="subscription">My Subcription</h2>
      <h2 id="library">My Library</h2>
      <h2 id="wishlist">My Wishlist</h2>

      <h1>TEST FOR API SERVICE</h1>
      {isLoading && <p>Loading data...</p>}
      {error && <p>Error: {error}</p>}
      {allMembers.length > 0 && allMembers.map((member) => (member.FirstName))}
      {!isLoading && !error && allMembers.length === 0 && <p>No data available.</p>}
    </>
  );
};

export default AccountPage;