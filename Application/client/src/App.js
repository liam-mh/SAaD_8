import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SessionContextProvider } from './services/sessionContext';
import ScrollToSection from './services/scrollToSection';
import Header from './components/Header';
import Footer from './components/Footer';
// Pages
import IndexPage from './pages/index';
import HelpPage from './pages/help';
import AccountPage from './pages/account';
import MediaPage from './pages/media';
import BasketPage from './pages/basket';
import SearchPage from './pages/search';
import CheckoutPage from './pages/checkout';
import LibrarianPage from './pages/librarianPage';

function App() {
  return (
    <SessionContextProvider>
      <Router>
        <ScrollToSection />
        <Header />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/basket" element={<BasketPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/employee" element={<LibrarianPage />} />
        </Routes>
        <Footer />
      </Router>
    </SessionContextProvider>
  );
}

export default App;