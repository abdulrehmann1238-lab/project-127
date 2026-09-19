import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ScrollToTop } from './components/common/ScrollToTop';

// Storefront Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { Account } from './pages/Account';
import { GiftCards } from './pages/GiftCards';
import { Concierge } from './pages/Concierge';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

// Admin Operations Pages
import { AdminOverview } from './pages/admin/AdminOverview';
import { InventorySync } from './pages/admin/InventorySync';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminOrders } from './pages/admin/AdminOrders';

export const App: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Storefront Routes */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:category" element={<Shop />} />
          <Route path="product/:slug" element={<ProductDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="account" element={<Account />} />
          <Route path="gift-cards" element={<GiftCards />} />
          <Route path="concierge" element={<Concierge />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Operations Suite */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminOverview />} />
          <Route path="inventory-sync" element={<InventorySync />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
