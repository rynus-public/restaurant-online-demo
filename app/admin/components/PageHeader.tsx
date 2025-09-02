'use client';

import React from 'react';
import { BarChart3, Activity } from 'lucide-react';

interface PageHeaderProps {
  title?: string;
}

export function PageHeader({ title = "Admin Dashboard Overview" }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <BarChart3 className="h-8 w-8 text-amber-400" />
        <h1 className="text-3xl font-bold text-white">{title}</h1>
      </div>
      <div className="flex items-center space-x-2 text-zinc-400">
        <Activity className="h-4 w-4" />
        <span className="text-sm">Live updates</span>
      </div>
    </div>
  );
}
