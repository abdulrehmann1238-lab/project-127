import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/mockProducts';

interface SyncEvent {
  id: string;
  sku: string;
  productName: string;
  quantity: number;
  type: 'in_store_sale' | 'online_sale' | 'restock' | 'manual_sync';
  timestamp: string;
}

interface InventoryContextType {
  products: Product[];
  lastSyncTime: string;
  secondsSinceLastSync: number;
  isSyncing: boolean;
  syncEvents: SyncEvent[];
  simulateInStoreSale: (sku: string, qty?: number) => Promise<void>;
  simulateOnlineSale: (sku: string, qty?: number) => Promise<void>;
  updateProductStock: (sku: string, newStock: number) => void;
  triggerManualSync: () => Promise<void>;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductBySku: (sku: string) => Product | undefined;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

const STORAGE_KEY = 'elevated_green_products_v1';

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [secondsSinceLastSync, setSecondsSinceLastSync] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncEvents, setSyncEvents] = useState<SyncEvent[]>([
    {
      id: 'evt-initial',
      sku: 'EG-PL-SND-02',
      productName: 'Tour Performance Polo',
      quantity: 1,
      type: 'in_store_sale',
      timestamp: 'Today at 09:42 AM'
    },
    {
      id: 'evt-2',
      sku: 'EG-GL-TAN-03',
      productName: 'Links Cabretta Leather Glove',
      quantity: 2,
      type: 'in_store_sale',
      timestamp: 'Today at 11:15 AM'
    }
  ]);

  // Persist products to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Real-time counter for seconds since last sync
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSinceLastSync((prev) => {
        const next = prev + 1;
        if (next < 5) {
          setLastSyncTime('Just now');
        } else if (next < 60) {
          setLastSyncTime(`${next}s ago`);
        } else {
          setLastSyncTime(`${Math.floor(next / 60)}m ago`);
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate In-Store Sale (THE WOW MOMENT)
  const simulateInStoreSale = async (sku: string, qty: number = 1): Promise<void> => {
    setIsSyncing(true);

    // Step 1: In-store POS register records sale immediately
    setProducts((prev) =>
      prev.map((p) => {
        if (p.sku === sku) {
          return {
            ...p,
            posStock: Math.max(0, p.posStock - qty)
          };
        }
        return p;
      })
    );

    // Step 2: Simulated webhook delay & conduit sync transmission (600ms)
    await new Promise((res) => setTimeout(res, 650));

    // Step 3: Online Store synchronizes to match POS
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    let targetName = 'Item';

    setProducts((prev) =>
      prev.map((p) => {
        if (p.sku === sku) {
          targetName = p.name;
          const updatedStock = Math.max(0, p.stock - qty);
          return {
            ...p,
            stock: updatedStock
          };
        }
        return p;
      })
    );

    setSyncEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        sku,
        productName: targetName,
        quantity: qty,
        type: 'in_store_sale',
        timestamp: `Today at ${nowStr}`
      },
      ...prev.slice(0, 8)
    ]);

    setSecondsSinceLastSync(0);
    setLastSyncTime('Just now');
    setIsSyncing(false);
  };

  // Simulate Online Sale
  const simulateOnlineSale = async (sku: string, qty: number = 1): Promise<void> => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.sku === sku) {
          const newStock = Math.max(0, p.stock - qty);
          return {
            ...p,
            stock: newStock,
            posStock: newStock
          };
        }
        return p;
      })
    );

    setSecondsSinceLastSync(0);
    setLastSyncTime('Just now');
  };

  // Update Product Stock (Manual edit in admin)
  const updateProductStock = (sku: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.sku === sku ? { ...p, stock: newStock, posStock: newStock } : p
      )
    );
    setSecondsSinceLastSync(0);
    setLastSyncTime('Just now');
  };

  // Full manual inventory reconciliation
  const triggerManualSync = async (): Promise<void> => {
    setIsSyncing(true);
    await new Promise((res) => setTimeout(res, 800));
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        posStock: p.stock
      }))
    );
    setSecondsSinceLastSync(0);
    setLastSyncTime('Just now');
    setIsSyncing(false);
  };

  const getProductBySlug = (slug: string) => {
    return products.find((p) => p.slug === slug);
  };

  const getProductBySku = (sku: string) => {
    return products.find((p) => p.sku === sku);
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        lastSyncTime,
        secondsSinceLastSync,
        isSyncing,
        syncEvents,
        simulateInStoreSale,
        simulateOnlineSale,
        updateProductStock,
        triggerManualSync,
        getProductBySlug,
        getProductBySku
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
};
