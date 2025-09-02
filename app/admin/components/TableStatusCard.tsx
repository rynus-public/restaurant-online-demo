'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Table, useAdminData } from './AdminDataProvider';

interface TableStatusCardProps {
  tables: Table[];
  onTableClick: (table: Table) => void;
}

export function TableStatusCard({ tables, onTableClick }: TableStatusCardProps) {
  const { getStatusColor, getCurrentTimeSlot } = useAdminData();

  const availableTablesCount = tables.filter(t => t.status === 'available').length;
  const occupiedTablesCount = tables.filter(t => t.status === 'occupied').length;
  const reservedTablesCount = tables.filter(t => t.status === 'reserved').length;
  const cleaningTablesCount = tables.filter(t => t.status === 'cleaning').length;

  const timeSlots = [
    { value: '07:00-09:48', label: 'Ca 1: Sáng sớm' },
    { value: '09:48-12:36', label: 'Ca 2: Sáng muộn' },
    { value: '12:36-15:24', label: 'Ca 3: Trưa' },
    { value: '15:24-18:12', label: 'Ca 4: Chiều' },
    { value: '18:12-21:00', label: 'Ca 5: Tối' }
  ];

  const getCurrentShiftName = (timeSlot: string) => {
    const slot = timeSlots.find(slot => slot.value === timeSlot);
    return slot ? slot.label : timeSlot;
  };

  return (
    <Card className="bg-zinc-800 border-zinc-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center space-x-2">
          <Users className="h-5 w-5 text-amber-400" />
          <span>Restaurant Floor Status</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Table Status Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
            <p className="text-green-400 text-2xl font-bold">{availableTablesCount}</p>
            <p className="text-green-300 text-sm">Available</p>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
            <p className="text-red-400 text-2xl font-bold">{occupiedTablesCount}</p>
            <p className="text-red-300 text-sm">Occupied</p>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 text-center">
            <p className="text-amber-400 text-2xl font-bold">{reservedTablesCount}</p>
            <p className="text-amber-300 text-sm">Reserved</p>
          </div>
          <div className="bg-zinc-500/10 border border-zinc-500/20 rounded-lg p-4 text-center">
            <p className="text-zinc-400 text-2xl font-bold">{cleaningTablesCount}</p>
            <p className="text-zinc-300 text-sm">Cleaning</p>
          </div>
        </div>

        {/* Table Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              onClick={() => onTableClick(table)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${getStatusColor(table.status)}`}
            >
              <div className="text-center">
                <h3 className="font-bold text-lg">Table {table.number}</h3>
                <p className="text-sm opacity-80">{table.seats} seats</p>
                <p className="text-xs mt-1 opacity-60">{table.location}</p>
                {table.customer && (
                  <div className="mt-2 text-xs">
                    <p className="font-medium">{table.customer.name}</p>
                    <p>{table.customer.guests} people</p>
                    <p className="text-amber-400">{getCurrentShiftName(table.customer.time)}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
