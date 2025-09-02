'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ShoppingBag } from 'lucide-react';
import { Reservation, Order, useAdminData } from './AdminDataProvider';

interface RecentActivityProps {
  reservations: Reservation[];
  orders: Order[];
}

export function RecentActivity({ reservations, orders }: RecentActivityProps) {
  const { getStatusColor } = useAdminData();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Reservations */}
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>Recent Reservations</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reservations.slice(0, 4).map((reservation) => (
              <div key={reservation.id} className="p-3 bg-zinc-700/50 rounded-lg border border-zinc-600/30">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-white">{reservation.customerName}</p>
                    <p className="text-sm text-zinc-400">
                      {reservation.date} at {reservation.time} • {reservation.guests} guests
                    </p>
                    {reservation.specialRequests && (
                      <p className="text-xs text-amber-400 mt-1">
                        Special: {reservation.specialRequests}
                      </p>
                    )}
                  </div>
                  <Badge className={getStatusColor(reservation.status)}>
                    {reservation.status}
                  </Badge>
                </div>
              </div>
            ))}
            {reservations.length === 0 && (
              <div className="text-center py-6 text-zinc-400">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No reservations today</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-blue-400" />
            <span>Recent Orders</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {orders.slice(0, 4).map((order) => (
              <div key={order.id} className="p-3 bg-zinc-700/50 rounded-lg border border-zinc-600/30">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-white">{order.customerName}</p>
                    <p className="text-sm text-zinc-400">
                      €{order.total.toFixed(2)} • {order.deliveryMethod} • {order.orderTime}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {order.items.length} items
                    </p>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center py-6 text-zinc-400">
                <ShoppingBag className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>No orders today</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
