'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, 
  CheckCircle, 
  XCircle,
  Clock,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Package
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '../components/AdminDataProvider';

export default function OrdersPage() {
  const { t } = useLanguage();
  const { orders, updateOrderStatus, getStatusColor } = useAdminData();

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const confirmedOrders = orders.filter(o => o.status === 'confirmed');
  const rejectedOrders = orders.filter(o => o.status === 'rejected');

  const totalRevenue = confirmedOrders.reduce((sum, order) => sum + order.total, 0);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <ShoppingBag className="h-8 w-8 text-amber-400" />
        <h1 className="text-3xl font-bold text-white">{t('admin.manageOrders')}</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-zinc-800 border-zinc-700 hover:border-yellow-400/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{pendingOrders.length}</p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 hover:border-green-400/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Confirmed</p>
                <p className="text-2xl font-bold text-green-400">{confirmedOrders.length}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 hover:border-red-400/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Rejected</p>
                <p className="text-2xl font-bold text-red-400">{rejectedOrders.length}</p>
              </div>
              <div className="bg-red-500/20 p-3 rounded-lg">
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 hover:border-amber-400/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Revenue</p>
                <p className="text-2xl font-bold text-amber-400">€{totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-amber-500/20 p-3 rounded-lg">
                <CreditCard className="h-8 w-8 text-amber-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Orders */}
      {pendingOrders.length > 0 && (
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <span>Pending Orders ({pendingOrders.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div key={order.id} className="p-4 bg-zinc-700/50 rounded-lg border border-zinc-600">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Customer & Order Info */}
                        <div>
                          <h3 className="font-semibold text-white text-lg mb-3">{order.customerName}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2 text-zinc-300">
                              <Phone className="h-4 w-4 text-zinc-400" />
                              <span>{order.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-zinc-300">
                              <Mail className="h-4 w-4 text-zinc-400" />
                              <span>{order.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-zinc-300">
                              <Package className="h-4 w-4 text-amber-400" />
                              <span>{t(`admin.${order.deliveryMethod}`)}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-zinc-300">
                              <Clock className="h-4 w-4 text-amber-400" />
                              <span>{order.orderTime}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-zinc-300">
                              <CreditCard className="h-4 w-4 text-amber-400" />
                              <span>{order.paymentMethod === 'cash' ? 'Cash' : 'Card'}</span>
                            </div>
                          </div>
                          {order.deliveryMethod === 'delivery' && order.deliveryAddress && (
                            <div className="mt-3 p-3 bg-zinc-600/50 rounded">
                              <div className="flex items-start space-x-2">
                                <MapPin className="h-4 w-4 text-amber-400 mt-0.5" />
                                <div>
                                  <p className="text-sm font-medium text-amber-400">
                                    {t('admin.deliveryAddress')}:
                                  </p>
                                  <p className="text-sm text-zinc-300">{order.deliveryAddress}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Order Items */}
                        <div>
                          <h4 className="text-sm font-medium text-zinc-300 mb-3">{t('admin.orderedItems')}:</h4>
                          <div className="space-y-2 bg-zinc-600/30 p-3 rounded">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-zinc-300">
                                  {item.quantity}x {item.name}
                                </span>
                                <span className="text-amber-400 font-medium">
                                  €{(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                            <div className="border-t border-zinc-500 pt-2 mt-2">
                              <div className="flex justify-between text-lg font-semibold">
                                <span className="text-white">Total:</span>
                                <span className="text-amber-400">€{order.total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2 ml-4">
                      <Badge className={getStatusColor(order.status)}>
                        {t(`admin.orderStatus.${order.status}`)}
                      </Badge>
                      <div className="flex flex-col space-y-2">
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {t('admin.approve')}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateOrderStatus(order.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          {t('admin.reject')}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Orders */}
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5 text-amber-400" />
            <span>All Orders ({orders.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="p-4 bg-zinc-700/50 rounded-lg border border-zinc-600">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <div>
                        <h3 className="font-semibold text-white">{order.customerName}</h3>
                        <p className="text-sm text-zinc-400">{order.phone} • {order.email}</p>
                        <p className="text-sm text-zinc-300">
                          {t(`admin.${order.deliveryMethod}`)} • {order.orderTime} • {order.paymentMethod === 'cash' ? 'Cash' : 'Card'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-zinc-300 mb-2">{t('admin.orderedItems')}:</h4>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <p key={index} className="text-sm text-zinc-400">
                            {item.quantity}x {item.name} - €{(item.price * item.quantity).toFixed(2)}
                          </p>
                        ))}
                      </div>
                      <p className="text-sm font-semibold text-amber-400 mt-2">
                        Total: €{order.total.toFixed(2)}
                      </p>
                    </div>

                    {order.deliveryMethod === 'delivery' && order.deliveryAddress && (
                      <p className="text-sm text-zinc-400">
                        <strong>{t('admin.deliveryAddress')}:</strong> {order.deliveryAddress}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(order.status)}>
                      {t(`admin.orderStatus.${order.status}`)}
                    </Badge>
                    {order.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {t('admin.approve')}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateOrderStatus(order.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          {t('admin.reject')}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
