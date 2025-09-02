'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  Calendar, 
  ShoppingBag, 
  Users, 
  Utensils, 
  Home,
  ChefHat
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AdminDataProvider, useAdminData } from './components/AdminDataProvider';

function AdminNavigation() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const adminData = useAdminData();

  const pendingReservationsCount = adminData.reservations?.filter(r => r.status === 'pending').length || 0;
  const pendingOrdersCount = adminData.orders?.filter(o => o.status === 'pending').length || 0;

  const navigationItems = [
    {
      href: '/admin',
      label: t('admin.overview'),
      icon: Home,
      isActive: pathname === '/admin'
    },
    {
      href: '/admin/reservations',
      label: t('admin.reservations'),
      icon: Calendar,
      isActive: pathname === '/admin/reservations',
      badge: pendingReservationsCount > 0 ? pendingReservationsCount : undefined
    },
    {
      href: '/admin/orders',
      label: t('admin.orders'),
      icon: ShoppingBag,
      isActive: pathname === '/admin/orders',
      badge: pendingOrdersCount > 0 ? pendingOrdersCount : undefined
    },
    {
      href: '/admin/tables',
      label: t('admin.tableManagement'),
      icon: Users,
      isActive: pathname === '/admin/tables'
    },
    {
      href: '/admin/menu',
      label: t('admin.menuManagement'),
      icon: Utensils,
      isActive: pathname === '/admin/menu'
    }
  ];

  return (
    <nav className="bg-zinc-800 border-b border-zinc-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-colors relative ${
                    item.isActive
                      ? 'border-amber-500 text-amber-400'
                      : 'border-transparent text-zinc-300 hover:text-amber-400 hover:border-amber-500/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="whitespace-nowrap font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge className="bg-red-500 text-white text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center ml-2">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t } = useLanguage();

  return (
    <AdminDataProvider>
      <div className="min-h-screen bg-zinc-900">
        {/* Admin Header */}
        <header className="bg-zinc-900 border-b border-zinc-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="text-zinc-300 hover:text-amber-400">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {t('admin.backToWebsite')}
                  </Button>
                </Link>
                <div className="h-6 w-px bg-zinc-700"></div>
                <div className="flex items-center space-x-2">
                  <ChefHat className="h-6 w-6 text-amber-400" />
                  <h1 className="text-2xl font-bold font-playfair text-amber-400">
                    Chang Restaurant - {t('admin.dashboard')}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation */}
        <AdminNavigation />

        {/* Main Content */}
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </AdminDataProvider>
  );
}
