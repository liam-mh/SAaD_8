import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState([]);
  const [branches, setBranches] = useState([]);
  const [checkout, setCheckout] = useState([]);

  useEffect(() => {
    const keys = ['user', 'basket', 'branches', 'checkout'];
    keys.forEach((key) => {
      try {
        const value = localStorage.getItem(key);
        if (value && !JSON.parse(value)) {
          localStorage.removeItem(key);
        }
      } catch (e) {
        console.warn(`Clearing invalid localStorage key: ${key}`);
        localStorage.removeItem(key);
      }
    });
  }, []);

  useEffect(() => {
    const safelyParse = (data) => {
      try {
        return data ? JSON.parse(data) : null;
      } catch (e) {
        console.error("Error parsing localStorage data:", e);
        return null;
      }
    };

    const storedUser = localStorage.getItem('user');
    const storedBasket = localStorage.getItem('basket');
    const storedBranches = localStorage.getItem('branches');
    const storedCheckout = localStorage.getItem('checkout');

    setUser(safelyParse(storedUser));
    setBasket(safelyParse(storedBasket) || []);
    setBranches(safelyParse(storedBranches) || []);
    setCheckout(safelyParse(storedCheckout) || []);
  }, []);

  useEffect(() => {
    const safelyStringify = (data) => {
      try {
        return JSON.stringify(data);
      } catch (e) {
        console.error("Error stringifying data for localStorage:", e);
        return null;
      }
    };

    localStorage.setItem('user', safelyStringify(user));
    localStorage.setItem('basket', safelyStringify(basket));
    localStorage.setItem('branches', safelyStringify(branches));
    localStorage.setItem('checkout', safelyStringify(checkout));
  }, [user, basket, branches, checkout]);

  useEffect(() => {
    const handleTabClose = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('basket');
      localStorage.removeItem('branches');
      localStorage.removeItem('checkout');
    };
    window.addEventListener('beforeunload', handleTabClose);
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

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