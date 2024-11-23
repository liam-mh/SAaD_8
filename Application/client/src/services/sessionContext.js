import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState([]);
  const [branches, setBranches] = useState([]);
  const [checkout, setCheckout] = useState([]);

  // Load session data
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedBasket = localStorage.getItem('basket');
    const storedBranches = localStorage.getItem('branches');
    const storedCheckout = localStorage.getItem('checkout');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedBasket) setBasket(JSON.parse(storedBasket));
    if (storedBranches) setBranches(JSON.parse(storedBranches));
    if (storedCheckout) setBranches(JSON.parse(storedCheckout));
  }, []);

  // Update local storage
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('basket', JSON.stringify(basket));
    localStorage.setItem('branches', JSON.stringify(branches));
    localStorage.setItem('checkout', JSON.stringify(checkout));
  }, [user, basket, branches, checkout]);

  return (
    <SessionContext.Provider 
      value={{ 
        user, basket, branches, checkout,
        setUser, setBasket, setBranches, setCheckout
      }}>
      {children}
    </SessionContext.Provider>
  );
};