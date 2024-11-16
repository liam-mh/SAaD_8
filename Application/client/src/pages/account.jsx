import React, { useEffect, useState } from 'react';
import { getMembers, createMember, updateMember, deleteMember } from '../services/memberService';
import { getEmployee } from '../services/employeeService';

const AccountPage = () => {
  const [allMembers, setAll] = useState([]);


  useEffect(() => {
    async function loadData() {
      try {
        const allItems = await getEmployee([], true);
        setAll(Array.isArray(allItems.data) ? allItems.data : []);
      } catch (error) {
        console.error("Error loading members:", error);
        setAll([]);  // Set to empty array on error
      }
      
    }
    
    loadData();
  }, []);
  return (
    <>
      <h1>Account Management</h1>
      <h2 id="account">My Account</h2>
      <h2 id="subscription">My Subcription</h2>
      <h2 id="library">My Library</h2>
      <h2 id="wishlist">My Wishlist</h2>
      <h1>TEST FOR API SERVICE</h1>
      {allMembers.map((member) => (member.FirstName))}
    </>
  );
};

export default AccountPage;