import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import IndexPage from './pages/index';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        {/* You can add more routes here */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;