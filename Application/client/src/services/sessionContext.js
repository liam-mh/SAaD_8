import React, { createContext, useState, useEffect } from 'react';

export const SessionContext = createContext();

export const SessionContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState([]);
  const [branches, setBranches] = useState([]);
  const [checkout, setCheckout] = useState([]);
  const [employee, setEmployee] = useState([]);

  const safelyParse = (data) => {
    try {
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error("Error parsing localStorage data:", e);
      return null;
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedBasket = localStorage.getItem('basket');
    const storedBranches = localStorage.getItem('branches');
    const storedCheckout = localStorage.getItem('checkout');
    const storedEmployee = localStorage.getItem('employee');

    setUser(safelyParse(storedUser));
    setBasket(safelyParse(storedBasket) || []);
    setBranches(safelyParse(storedBranches) || []);
    setCheckout(safelyParse(storedCheckout) || []);
    setEmployee(safelyParse(storedEmployee) || []);
  }, []);

  const safelyStringify = (data) => {
    try {
      return JSON.stringify(data);
    } catch (e) {
      console.error("Error stringifying data for localStorage:", e);
      return null;
    }
  };

  useEffect(() => {
    localStorage.setItem('user', safelyStringify(user));
    localStorage.setItem('basket', safelyStringify(basket));
    localStorage.setItem('branches', safelyStringify(branches));
    localStorage.setItem('checkout', safelyStringify(checkout));
    localStorage.setItem('employee', safelyStringify(employee));
  }, [user, basket, branches, checkout, employee]);

  useEffect(() => {
    const handleTabClose = () => {
      localStorage.removeItem('user');
      localStorage.removeItem('basket');
      localStorage.removeItem('branches');
      localStorage.removeItem('checkout');
      localStorage.removeItem('employee');
    };
    window.addEventListener('beforeunload', handleTabClose);
    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  const clearBasket = () => {
    setBasket([]);
    localStorage.removeItem('basket');
  };
  const clearBranches = () => {
    setBranches([]);
    localStorage.removeItem('branches');
  };
  const clearCheckout = () => {
    setCheckout([]);
    localStorage.removeItem('checkout');
  };
  const clearEmployee = () => {
    setEmployee([]);
    localStorage.removeItem('employee')
  }

  return (
    <SessionContext.Provider 
      value={{ 
        user, basket, branches, checkout, employee,
        setUser, setEmployee, setBasket, setBranches, setCheckout,
        clearUser, clearBasket, clearBranches, clearCheckout, clearEmployee
      }}>
      {children}
    </SessionContext.Provider>
  );
};