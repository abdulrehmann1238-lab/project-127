import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { CartDrawer } from '../components/cart/CartDrawer';
import { OpeningLoader } from '../components/common/OpeningLoader';

export const RootLayout: React.FC = () => {
  const location = useLocation();
  // Show opening loader only on initial visit to homepage
  const [showLoader, setShowLoader] = useState(() => {
    return location.pathname === '/' && !sessionStorage.getItem('eg_loader_shown');
  });

  const handleLoaderFinish = () => {
    sessionStorage.setItem('eg_loader_shown', 'true');
    setShowLoader(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] selection:bg-[#1F3B2C] selection:text-[#FAF8F3]">
      {/* 1.2s Editorial Opening Loader (§6) */}
      {showLoader && <OpeningLoader onFinish={handleLoaderFinish} />}

      {/* Main Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Footer */}
      <Footer />
    </div>
  );
};
