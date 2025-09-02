'use client';

import React, { useState } from 'react';
import { 
  Calendar, 
  Users, 
  ShoppingBag, 
  Utensils, 
  TrendingUp
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  useAdminData, 
  PageHeader, 
  StatCard, 
  TableStatusCard, 
  Timeline, 
  RecentActivity, 
  TableDetailModal,
  type Table 
} from './components';

export default function AdminOverviewPage() {
  const { t } = useLanguage();
  const { 
    tables, 
    reservations, 
    orders, 
    menuItems, 
    getCurrentTimeSlot 
  } = useAdminData();
  
  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Statistics calculations
  const availableTablesCount = tables.filter(t => t.status === 'available').length;
  const todayReservationsCount = reservations.length;
  const pendingReservationsCount = reservations.filter(r => r.status === 'pending').length;
  const confirmedReservationsCount = reservations.filter(r => r.status === 'confirmed').length;
  const pendingOrdersCount = orders.filter(o => o.status === 'pending').length;
  const totalRevenue = orders.filter(o => o.status === 'confirmed').reduce((sum, order) => sum + order.total, 0);
  const availableMenuItemsCount = menuItems.filter(m => m.available).length;

  const handleTableClick = (table: Table) => {
    setSelectedTable(table);
    setSelectedTimeSlot(getCurrentTimeSlot());
  };

  const handleCloseModal = () => {
    setSelectedTable(null);
    setSelectedTimeSlot('');
  };

  const handleTimeSlotChange = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  return (
    <div className="space-y-8">
      <PageHeader />

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Reservations Today"
          value={todayReservationsCount}
          icon={Calendar}
          href="/admin/reservations"
          primaryColor="amber"
          subtitle={
            <span className="flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              {confirmedReservationsCount} confirmed
            </span>
          }
          secondaryText={pendingReservationsCount > 0 ? `${pendingReservationsCount} pending` : undefined}
        />

        <StatCard
          title="Orders Today"
          value={orders.length}
          icon={ShoppingBag}
          href="/admin/orders"
          primaryColor="blue"
          subtitle={`€${totalRevenue.toFixed(2)} revenue`}
          secondaryText={pendingOrdersCount > 0 ? `${pendingOrdersCount} pending` : undefined}
        />

        <StatCard
          title="Table Status"
          value={`${availableTablesCount}/${tables.length}`}
          icon={Users}
          href="/admin/tables"
          primaryColor="green"
          subtitle={`${availableTablesCount} available`}
          secondaryText={`${tables.length - availableTablesCount} occupied`}
        />

        <StatCard
          title="Menu Items"
          value={menuItems.length}
          icon={Utensils}
          href="/admin/menu"
          primaryColor="purple"
          subtitle={`${availableMenuItemsCount} available`}
          secondaryText={menuItems.length - availableMenuItemsCount > 0 ? `${menuItems.length - availableMenuItemsCount} unavailable` : undefined}
        />
      </div>

      {/* Table Status Overview */}
      <TableStatusCard 
        tables={tables} 
        onTableClick={handleTableClick} 
      />

      {/* Timeline Section */}
      <Timeline 
        tables={tables} 
        reservations={reservations} 
      />

      {/* Recent Activity */}
      <RecentActivity 
        reservations={reservations} 
        orders={orders} 
      />

      {/* Table Detail Modal */}
      <TableDetailModal
        selectedTable={selectedTable}
        onClose={handleCloseModal}
        selectedTimeSlot={selectedTimeSlot}
        onTimeSlotChange={handleTimeSlotChange}
      />
    </div>
  );
}
