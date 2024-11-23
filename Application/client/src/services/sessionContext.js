import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState([]);
  const [branches, setBranches] = useState([]);

  // Load session data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedBasket = localStorage.getItem('basket');
    const storedBranches = localStorage.getItem('branches');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedBasket) setBasket(JSON.parse(storedBasket));
    if (storedBranches) setBranches(JSON.parse(storedBranches));
  }, []);

  // Update local storage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('basket', JSON.stringify(basket));
    localStorage.setItem('branches', JSON.stringify(branches));
  }, [user, basket, branches]);

  return (
    <SessionContext.Provider value={{ user, basket, branches, setUser, setBasket, setBranches }}>
      {children}
    </SessionContext.Provider>
  );
};