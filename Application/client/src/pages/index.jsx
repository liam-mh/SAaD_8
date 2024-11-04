import React, { useEffect, useState } from 'react';
import { fetchMembers } from '../services/memberService';

const IndexPage = () => {
  const [members, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMembers = async () => {
        try {
            const data = await fetchMembers(); 
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    loadMembers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Current Members:</h2>
      <ul>
        {members.map(member => (
          <li key={member.id}>
            ID: {member.MemberID}, Name: {member.FirstName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;