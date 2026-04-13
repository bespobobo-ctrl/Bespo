import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CartSidebar from './components/ui/CartSidebar';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductPage from './pages/ProductPage';
import AdminPage from './pages/AdminPage';
import Cursor from './components/ui/Cursor';
import ThemeProvider from './components/layout/ThemeProvider';

import './styles/globals.css';
import './styles/animations.css';
import './styles/typography.css';

const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/catalog" element={<PageTransition><CatalogPage /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductPage /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function MainLayout({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <CartSidebar />
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Cursor />
        <MainLayout>
          <AnimatedRoutes />
        </MainLayout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
