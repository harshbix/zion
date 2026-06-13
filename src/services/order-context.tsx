

import React, { createContext, useContext, useState, useEffect } from 'react';

export type OrderStatus = 'placed' | 'baking' | 'quality-checked' | 'delivering' | 'delivered';

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedSize?: string;
  customMessage?: string;
};

export type Order = {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingDetails: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    notes?: string;
  };
  paymentMethod: string;
};

type OrderContextType = {
  orders: Order[];
  placeNewOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  updateOrderStatus: (id: string, status: OrderStatus) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const INITIAL_ORDERS: Order[] = [
  {
    id: 'ZION-9812',
    date: 'June 05, 2026',
    items: [
      {
        id: 'c1',
        name: 'Chocolate Dream Cake',
        price: 45000,
        quantity: 1,
        selectedSize: '8 inch',
        customMessage: 'Happy Birthday Joe',
      },
    ],
    total: 45000,
    status: 'delivered',
    shippingDetails: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+255 789 123 456',
      address: 'Forest Area, Plot 42',
      city: 'Mbeya',
    },
    paymentMethod: 'Mobile Money',
  },
  {
    id: 'ZION-9740',
    date: 'May 24, 2026',
    items: [
      { id: 'j1', name: 'Mango Sunrise Juice', price: 8000, quantity: 2 },
      { id: 's3', name: 'Chocolate Croissant', price: 8000, quantity: 3 },
    ],
    total: 40000,
    status: 'delivered',
    shippingDetails: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+255 789 123 456',
      address: 'Forest Area, Plot 42',
      city: 'Mbeya',
    },
    paymentMethod: 'Cash on Delivery',
  },
];

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load orders from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('zion_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        setOrders(INITIAL_ORDERS);
        localStorage.setItem('zion_orders', JSON.stringify(INITIAL_ORDERS));
      }
    } catch (e) {
      console.error('Failed to load orders', e);
      setOrders(INITIAL_ORDERS);
    }
    setIsInitialized(true);
  }, []);

  // Save orders to localStorage
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem('zion_orders', JSON.stringify(orders));
      } catch (e) {
        console.error('Failed to save orders', e);
      }
    }
  }, [orders, isInitialized]);

  // Handle active order status advance simulation
  useEffect(() => {
    if (!activeOrder) return;

    const timer = setInterval(() => {
      setOrders((prevOrders) => {
        const order = prevOrders.find((o) => o.id === activeOrder.id);
        if (!order) return prevOrders;

        let nextStatus: OrderStatus = order.status;
        if (order.status === 'placed') nextStatus = 'baking';
        else if (order.status === 'baking') nextStatus = 'quality-checked';
        else if (order.status === 'quality-checked') nextStatus = 'delivering';
        else if (order.status === 'delivering') nextStatus = 'delivered';

        if (nextStatus !== order.status) {
          const updatedOrders = prevOrders.map((o) =>
            o.id === order.id ? { ...o, status: nextStatus } : o
          );
          
          // Update active order ref
          const updatedActive = updatedOrders.find((o) => o.id === order.id) || null;
          setActiveOrder(updatedActive);
          return updatedOrders;
        }

        return prevOrders;
      });
    }, 25000); // Advance tracking step every 25 seconds for visual demonstration

    return () => clearInterval(timer);
  }, [activeOrder?.id, activeOrder?.status]);

  const placeNewOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const randomId = `ZION-${Math.floor(1000 + Math.random() * 9000)}`;
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const newOrder: Order = {
      ...orderData,
      id: randomId,
      date: formattedDate,
      status: 'placed',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
    if (activeOrder && activeOrder.id === id) {
      setActiveOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeNewOrder,
        activeOrder,
        setActiveOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
