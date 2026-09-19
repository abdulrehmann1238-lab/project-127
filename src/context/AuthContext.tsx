import React, { createContext, useContext, useState } from 'react';
import { Customer, Order } from '../types';
import { INITIAL_ORDERS } from '../data/mockOrders';

interface AuthContextType {
  user: Customer | null;
  isAuthenticated: boolean;
  orders: Order[];
  login: (email?: string, password?: string) => Promise<boolean>;
  logout: () => void;
  addNewOrder: (order: Order) => void;
  getOrderById: (orderId: string) => Order | undefined;
}

const DEFAULT_USER: Customer = {
  id: 'cust-101',
  name: 'Sarah Jenkins',
  email: 'sarah.jenkins@elevatedgreen.com',
  phone: '(831) 555-0192',
  memberTier: 'Clubhouse Patron',
  handicap: '8.4',
  homeClub: 'Pebble Beach Golf Links',
  ordersCount: 4,
  totalSpent: 1248,
  defaultAddress: '42 Cypress Point Way, Pebble Beach, CA 93953'
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Customer | null>(DEFAULT_USER);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);

  const login = async (email: string = 'sarah.jenkins@elevatedgreen.com'): Promise<boolean> => {
    await new Promise((res) => setTimeout(res, 600));
    setUser({
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email
    });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const addNewOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    if (user) {
      setUser((prev) =>
        prev
          ? {
              ...prev,
              ordersCount: prev.ordersCount + 1,
              totalSpent: prev.totalSpent + newOrder.total
            }
          : null
      );
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        orders,
        login,
        logout,
        addNewOrder,
        getOrderById
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
