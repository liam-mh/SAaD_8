import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState([]);

  // Load session data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedBasket = localStorage.getItem('basket');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedBasket) setBasket(JSON.parse(storedBasket));
  }, []);

  // Update local storage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [user, basket]);

  return (
    <SessionContext.Provider value={{ user, basket, setUser, setBasket }}>
      {children}
    </SessionContext.Provider>
  );
};