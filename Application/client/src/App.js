import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
//pages
import IndexPage from './pages/index';
import HelpPage from './pages/help';
import AccountPage from './pages/account';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;