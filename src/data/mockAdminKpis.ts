export interface KPIData {
  monthlyRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  avgOrderValue: number;
  lowStockItemsCount: number;
  posSyncStatus: 'Connected' | 'Syncing' | 'Offline';
  posProvider: string;
  lastSyncTimestamp: string;
}

export const MOCK_KPIS: KPIData = {
  monthlyRevenue: 48210,
  revenueGrowth: 12.4,
  totalOrders: 312,
  avgOrderValue: 154,
  lowStockItemsCount: 3,
  posSyncStatus: 'Connected',
  posProvider: 'Square Register Terminal #4',
  lastSyncTimestamp: 'Just now'
};

export const REVENUE_CHART_DATA = [
  { day: 'Sep 1', revenue: 1420, orders: 9 },
  { day: 'Sep 3', revenue: 1680, orders: 11 },
  { day: 'Sep 5', revenue: 1250, orders: 8 },
  { day: 'Sep 7', revenue: 2190, orders: 14 },
  { day: 'Sep 9', revenue: 1940, orders: 12 },
  { day: 'Sep 11', revenue: 2450, orders: 16 },
  { day: 'Sep 13', revenue: 1870, orders: 12 },
  { day: 'Sep 15', revenue: 2890, orders: 18 },
  { day: 'Sep 17', revenue: 2310, orders: 15 },
  { day: 'Sep 19', revenue: 3150, orders: 20 },
  { day: 'Sep 20', revenue: 2740, orders: 17 },
];
