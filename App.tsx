
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Catalog from './pages/Catalog';
import PropertyDetailPage from './pages/PropertyDetailPage';
import Investment from './pages/Investment';
import ServicesPage from './pages/ServicesPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="catalog/:id" element={<PropertyDetailPage />} />
          <Route path="investment" element={<Investment />} />
          <Route path="services" element={<ServicesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
