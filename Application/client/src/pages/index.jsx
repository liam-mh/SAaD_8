import React, { useEffect, useState } from 'react';
import { fetchMembers } from '../services/memberService';

const IndexPage = () => {
  const [users, setUsers] = useState([]);
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
      <h1>Welcome to the Home Page!</h1>
      <h2>User List:</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            Name: {user.username}, Pass: {user.password}
          </li>
        ))}
      </ul>
      <div id='whats-new'>
        {/* Whats new component */}
      </div>
      <h2 id="top-picks">Top Picks</h2> 
      <h2 id="all">All</h2>  
    </div>
  );
};

export default IndexPage;