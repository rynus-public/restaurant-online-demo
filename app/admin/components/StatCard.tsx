'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  href: string;
  primaryColor: 'amber' | 'blue' | 'green' | 'purple';
  subtitle?: string | React.ReactNode;
  secondaryText?: string;
}

const colorClasses = {
  amber: {
    hover: 'hover:border-amber-400/50',
    bg: 'bg-amber-500/20',
    hoverBg: 'group-hover:bg-amber-500/30',
    text: 'text-amber-400'
  },
  blue: {
    hover: 'hover:border-blue-400/50',
    bg: 'bg-blue-500/20',
    hoverBg: 'group-hover:bg-blue-500/30',
    text: 'text-blue-400'
  },
  green: {
    hover: 'hover:border-green-400/50',
    bg: 'bg-green-500/20',
    hoverBg: 'group-hover:bg-green-500/30',
    text: 'text-green-400'
  },
  purple: {
    hover: 'hover:border-purple-400/50',
    bg: 'bg-purple-500/20',
    hoverBg: 'group-hover:bg-purple-500/30',
    text: 'text-purple-400'
  }
};

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  href, 
  primaryColor, 
  subtitle, 
  secondaryText 
}: StatCardProps) {
  const colors = colorClasses[primaryColor];

  return (
    <Link href={href}>
      <Card className={`bg-zinc-800 border-zinc-700 ${colors.hover} transition-all duration-300 cursor-pointer group`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-zinc-400 text-sm font-medium">{title}</p>
              <p className="text-2xl font-bold text-white">{value}</p>
              <div className="flex items-center mt-1 space-x-4">
                {subtitle && (
                  <div className={`text-xs ${colors.text} flex items-center`}>
                    {subtitle}
                  </div>
                )}
                {secondaryText && (
                  <p className="text-xs text-red-400">
                    {secondaryText}
                  </p>
                )}
              </div>
            </div>
            <div className={`${colors.bg} p-3 rounded-lg ${colors.hoverBg} transition-colors`}>
              <Icon className={`h-8 w-8 ${colors.text}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
