'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Table {
  id: string;
  number: number;
  seats: number;
  location: string;
  status: 'available' | 'occupied' | 'reserved' | 'cleaning';
  customer?: {
    name: string;
    phone: string;
    email: string;
    guests: number;
    time: string;
  };
}

export interface Reservation {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'rejected';
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  deliveryMethod: 'pickup' | 'delivery';
  deliveryAddress?: string;
  paymentMethod: 'cash' | 'card';
  status: 'pending' | 'confirmed' | 'rejected';
  orderTime: string;
}

export interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  nameVi: string;
  description: string;
  descriptionEn: string;
  descriptionVi: string;
  price: number;
  category: string;
  available: boolean;
  vegetarian: boolean;
  spicy: boolean;
  image: string;
}

interface AdminDataContextType {
  tables: Table[];
  setTables: React.Dispatch<React.SetStateAction<Table[]>>;
  reservations: Reservation[];
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  menuItems: MenuItem[];
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  updateReservationStatus: (id: string, status: 'confirmed' | 'rejected') => void;
  updateOrderStatus: (id: string, status: 'confirmed' | 'rejected') => void;
  toggleMenuItemAvailability: (id: string) => void;
  updateTableStatus: (id: string, status: 'available' | 'occupied' | 'reserved' | 'cleaning') => void;
  updateTableCustomer: (id: string, customer?: Table['customer']) => void;
  getCurrentTimeSlot: () => string;
  getStatusColor: (status: string) => string;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [tables, setTables] = useState<Table[]>([
    {
      id: '1',
      number: 1,
      seats: 4,
      location: 'Window side',
      status: 'available'
    },
    {
      id: '2',
      number: 2,
      seats: 2,
      location: 'Center',
      status: 'occupied',
      customer: {
        name: 'John Doe',
        phone: '+49 30 12345678',
        email: 'john@example.com',
        guests: 2,
        time: '12:36-15:24'
      }
    },
    {
      id: '3',
      number: 3,
      seats: 6,
      location: 'Private area',
      status: 'reserved',
      customer: {
        name: 'Maria Schmidt',
        phone: '+49 30 87654321',
        email: 'maria@example.com',
        guests: 4,
        time: '18:12-21:00'
      }
    },
    {
      id: '4',
      number: 4,
      seats: 8,
      location: 'Main hall',
      status: 'cleaning'
    },
    {
      id: '5',
      number: 5,
      seats: 4,
      location: 'Window side',
      status: 'available'
    },
    {
      id: '6',
      number: 6,
      seats: 2,
      location: 'Center',
      status: 'available'
    },
    {
      id: '7',
      number: 7,
      seats: 6,
      location: 'Private area',
      status: 'occupied',
      customer: {
        name: 'Klaus Meyer',
        phone: '+49 30 99999999',
        email: 'klaus@example.com',
        guests: 5,
        time: '15:24-18:12'
      }
    },
    {
      id: '8',
      number: 8,
      seats: 4,
      location: 'Terrace',
      status: 'reserved',
      customer: {
        name: 'Sophie Wagner',
        phone: '+49 30 88888888',
        email: 'sophie@example.com',
        guests: 3,
        time: '09:48-12:36'
      }
    },
    {
      id: '9',
      number: 9,
      seats: 2,
      location: 'Bar area',
      status: 'available'
    },
    {
      id: '10',
      number: 10,
      seats: 8,
      location: 'Main hall',
      status: 'available'
    },
    {
      id: '11',
      number: 11,
      seats: 4,
      location: 'Window side',
      status: 'cleaning'
    },
    {
      id: '12',
      number: 12,
      seats: 6,
      location: 'Private area',
      status: 'available'
    },
    {
      id: '13',
      number: 13,
      seats: 2,
      location: 'Center',
      status: 'occupied',
      customer: {
        name: 'Emma Fischer',
        phone: '+49 30 77777777',
        email: 'emma@example.com',
        guests: 2,
        time: '07:00-09:48'
      }
    },
    {
      id: '14',
      number: 14,
      seats: 4,
      location: 'Terrace',
      status: 'available'
    },
    {
      id: '15',
      number: 15,
      seats: 10,
      location: 'Banquet room',
      status: 'reserved',
      customer: {
        name: 'Business Dinner',
        phone: '+49 30 55555555',
        email: 'booking@company.com',
        guests: 8,
        time: '18:12-21:00'
      }
    },
    {
      id: '16',
      number: 16,
      seats: 2,
      location: 'Bar area',
      status: 'available'
    }
  ]);

  const [reservations, setReservations] = useState<Reservation[]>([
    {
      id: '1',
      customerName: 'Anna Mueller',
      email: 'anna@example.com',
      phone: '+49 30 11111111',
      date: '2025-01-15',
      time: '19:00',
      guests: 4,
      specialRequests: 'Birthday celebration',
      status: 'pending'
    },
    {
      id: '2',
      customerName: 'Peter Weber',
      email: 'peter@example.com',
      phone: '+49 30 22222222',
      date: '2025-01-16',
      time: '20:00',
      guests: 2,
      status: 'confirmed'
    }
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'Lisa Chen',
      phone: '+49 30 33333333',
      email: 'lisa@example.com',
      items: [
        { name: 'Pad Thai', quantity: 2, price: 18.50 },
        { name: 'Thai Eistee', quantity: 2, price: 5.50 }
      ],
      total: 48.00,
      deliveryMethod: 'delivery',
      deliveryAddress: 'Hauptstraße 456, 12345 Berlin',
      paymentMethod: 'cash',
      status: 'pending',
      orderTime: '18:30'
    }
  ]);

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      name: 'Pad Thai',
      nameEn: 'Traditional Pad Thai',
      nameVi: 'Pad Thai Truyền Thống',
      description: 'Gebratene Reisnudeln mit Garnelen',
      descriptionEn: 'Stir-fried rice noodles with shrimp',
      descriptionVi: 'Bánh phở xào với tôm',
      price: 18.50,
      category: 'mains',
      available: true,
      vegetarian: false,
      spicy: true,
      image: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg'
    }
  ]);

  const updateReservationStatus = (id: string, status: 'confirmed' | 'rejected') => {
    setReservations(reservations.map(reservation =>
      reservation.id === id ? { ...reservation, status } : reservation
    ));
  };

  const updateOrderStatus = (id: string, status: 'confirmed' | 'rejected') => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status } : order
    ));
  };

  const toggleMenuItemAvailability = (id: string) => {
    setMenuItems(menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    ));
  };

  const updateTableStatus = (id: string, status: 'available' | 'occupied' | 'reserved' | 'cleaning') => {
    setTables(tables.map(table =>
      table.id === id ? { ...table, status, customer: status === 'available' ? undefined : table.customer } : table
    ));
  };

  const updateTableCustomer = (id: string, customer?: Table['customer']) => {
    setTables(tables.map(table =>
      table.id === id ? { ...table, customer } : table
    ));
  };

  const getCurrentTimeSlot = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;
    
    // 5 shifts from 7:00 to 21:00 (14 hours total, ~2.8 hours per shift)
    if (currentTime >= 7 && currentTime < 9.8) return '07:00-09:48'; // Ca 1: 7:00-9:48
    if (currentTime >= 9.8 && currentTime < 12.6) return '09:48-12:36'; // Ca 2: 9:48-12:36
    if (currentTime >= 12.6 && currentTime < 15.4) return '12:36-15:24'; // Ca 3: 12:36-15:24
    if (currentTime >= 15.4 && currentTime < 18.2) return '15:24-18:12'; // Ca 4: 15:24-18:12
    if (currentTime >= 18.2 && currentTime <= 21) return '18:12-21:00'; // Ca 5: 18:12-21:00
    
    // Default to closest shift if outside hours
    if (currentTime < 7) return '07:00-09:48';
    return '18:12-21:00';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'occupied': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'reserved': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'cleaning': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <AdminDataContext.Provider value={{
      tables,
      setTables,
      reservations,
      setReservations,
      orders,
      setOrders,
      menuItems,
      setMenuItems,
      updateReservationStatus,
      updateOrderStatus,
      toggleMenuItemAvailability,
      updateTableStatus,
      updateTableCustomer,
      getCurrentTimeSlot,
      getStatusColor
    }}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (context === undefined) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
