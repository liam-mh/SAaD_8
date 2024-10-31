import React, { useEffect, useState } from 'react';

const IndexPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetching from API Gateway
        const response = await fetch('http://localhost:4000/api/account/user'); // Call the API Gateway directly
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
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
    </div>
  );
};

export default IndexPage;