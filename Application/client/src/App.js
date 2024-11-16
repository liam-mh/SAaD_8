import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SessionContextProvider } from './services/sessionContext';
import Header from './components/Header';
import Footer from './components/Footer';
// Pages
import IndexPage from './pages/index';
import HelpPage from './pages/help';
import AccountPage from './pages/account';
import MediaPage from './pages/media';
import BasketPage from './pages/basket';

function App() {
  return (
    <SessionContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/basket" element={<BasketPage />} />
        </Routes>
        <Footer />
      </Router>
    </SessionContextProvider>
  );
}

export default App;