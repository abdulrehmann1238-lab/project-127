import { Order } from '../types';

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-10482',
    orderNumber: 'EG-10482',
    date: 'Sep 18, 2026',
    customerName: 'Sarah Jenkins',
    customerEmail: 'sarah.jenkins@elevatedgreen.com',
    total: 306,
    subtotal: 306,
    tax: 24.50,
    shipping: 0,
    status: 'Delivered',
    items: [
      {
        id: 'item-1',
        productName: 'Fairway Quarter-Zip Pullover',
        color: 'Moss Green',
        size: 'M',
        quantity: 1,
        price: 188,
        image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'item-2',
        productName: 'Tour Performance Polo',
        color: 'Sand Khaki',
        size: 'M',
        quantity: 1,
        price: 118,
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80'
      }
    ],
    shippingAddress: {
      street: '42 Cypress Point Way',
      city: 'Pebble Beach',
      state: 'CA',
      zip: '93953'
    },
    trackingNumber: '1Z9999999999999999',
    estimatedDelivery: 'Sep 20, 2026',
    timeline: [
      { title: 'Order Placed', timestamp: 'Sep 18, 09:14 AM', completed: true },
      { title: 'Payment Confirmed via Apple Pay', timestamp: 'Sep 18, 09:15 AM', completed: true },
      { title: 'Dispatched from Pebble Beach Hub', timestamp: 'Sep 18, 03:30 PM', completed: true },
      { title: 'Delivered to Clubhouse Concierge', timestamp: 'Sep 19, 11:45 AM', completed: true }
    ]
  },
  {
    id: 'ord-10483',
    orderNumber: 'EG-10483',
    date: 'Sep 19, 2026',
    customerName: 'Marcus Whitfield',
    customerEmail: 'm.whitfield@sandhills.org',
    total: 248,
    subtotal: 248,
    tax: 19.84,
    shipping: 0,
    status: 'Shipped',
    items: [
      {
        id: 'item-3',
        productName: 'Clubhouse Leather Weekend Duffel',
        color: 'Saddle Tan',
        size: '48L Weekend',
        quantity: 1,
        price: 248,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
      }
    ],
    shippingAddress: {
      street: '18 Carolina Pine Terrace',
      city: 'Pinehurst',
      state: 'NC',
      zip: '28374'
    },
    trackingNumber: 'FEDEX-7829104829',
    estimatedDelivery: 'Sep 22, 2026',
    timeline: [
      { title: 'Order Placed', timestamp: 'Sep 19, 10:20 AM', completed: true },
      { title: 'Payment Confirmed', timestamp: 'Sep 19, 10:21 AM', completed: true },
      { title: 'Packaging with Embroidered Monogram', timestamp: 'Sep 19, 01:15 PM', completed: true },
      { title: 'In Transit with FedEx Priority', timestamp: 'Sep 19, 04:00 PM', completed: true }
    ]
  },
  {
    id: 'ord-10484',
    orderNumber: 'EG-10484',
    date: 'Sep 19, 2026',
    customerName: 'Elena Ruiz',
    customerEmail: 'elena.ruiz@coastalventures.com',
    total: 283,
    subtotal: 283,
    tax: 22.64,
    shipping: 0,
    status: 'Ready for Pickup',
    items: [
      {
        id: 'item-4',
        productName: 'Monterey Spikeless Derby Shoe',
        color: 'Pure White & Cognac',
        size: '9.5',
        quantity: 1,
        price: 235,
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'item-5',
        productName: 'Links Cabretta Leather Glove',
        color: 'Heritage Tan',
        size: 'Regular ML',
        quantity: 1,
        price: 48,
        image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=600&q=80'
      }
    ],
    shippingAddress: {
      street: 'Flagship Clubhouse — 100 Links Boulevard (Curbside Valet)',
      city: 'Carmel-by-the-Sea',
      state: 'CA',
      zip: '93921'
    },
    trackingNumber: 'PICKUP-PIN-4820',
    estimatedDelivery: 'Ready for Pickup Today',
    timeline: [
      { title: 'Curbside Pickup Reserved', timestamp: 'Sep 19, 02:40 PM', completed: true },
      { title: 'Staged at Pro Shop Register', timestamp: 'Sep 19, 03:05 PM', completed: true },
      { title: 'SMS Notification Sent to Guest', timestamp: 'Sep 19, 03:10 PM', completed: true }
    ]
  },
  {
    id: 'ord-10485',
    orderNumber: 'EG-10485',
    date: 'Sep 20, 2026',
    customerName: 'James Calloway',
    customerEmail: 'j.calloway@scotlandlinks.co.uk',
    total: 198,
    subtotal: 198,
    tax: 15.84,
    shipping: 0,
    status: 'Processing',
    items: [
      {
        id: 'item-6',
        productName: 'Tour Stretch Tailored Trousers',
        color: 'Charcoal Slate',
        size: '32x32',
        quantity: 1,
        price: 198,
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80'
      }
    ],
    shippingAddress: {
      street: '7 St. Andrews View',
      city: 'Scottsdale',
      state: 'AZ',
      zip: '85255'
    },
    trackingNumber: 'Pending Carrier Assignment',
    estimatedDelivery: 'Sep 24, 2026',
    timeline: [
      { title: 'Order Received', timestamp: 'Sep 20, 01:10 AM', completed: true },
      { title: 'Payment Authorized', timestamp: 'Sep 20, 01:10 AM', completed: true },
      { title: 'Order Routing to Fulfillment Center', timestamp: 'Pending', completed: false }
    ]
  }
];
