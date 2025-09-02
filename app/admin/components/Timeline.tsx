'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, Filter } from 'lucide-react';
import { Table, Reservation, useAdminData } from './AdminDataProvider';

interface TimelineProps {
  tables: Table[];
  reservations: Reservation[];
}

interface TimelineEvent {
  id: string;
  type: 'table' | 'reservation';
  tableNumber?: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: string;
  location?: string;
}

export function Timeline({ tables, reservations }: TimelineProps) {
  const { getStatusColor } = useAdminData();
  const [timelineFilter, setTimelineFilter] = useState<string>('all');
  const [timelineScrollRef, setTimelineScrollRef] = useState<HTMLDivElement | null>(null);

  const generateTimelineHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      hours.push(`${i.toString().padStart(2, '0')}:00`);
      hours.push(`${i.toString().padStart(2, '0')}:30`);
    }
    return hours;
  };

  const getCurrentHourIndex = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    return currentHour * 2 + (currentMinute >= 30 ? 1 : 0);
  };

  const getTimelineEvents = (): TimelineEvent[] => {
    const events: TimelineEvent[] = [];
    
    // Add table reservations/occupations
    tables.forEach(table => {
      if (table.customer && (timelineFilter === 'all' || timelineFilter === table.id)) {
        const timeRange = table.customer.time;
        const [startTime, endTime] = timeRange.split('-');
        
        events.push({
          id: `table-${table.id}`,
          type: 'table',
          tableNumber: table.number,
          title: `Bàn ${table.number} - ${table.customer.name}`,
          description: `${table.customer.guests} người`,
          startTime,
          endTime,
          status: table.status,
          location: table.location
        });
      }
    });

    // Add reservations
    reservations.forEach(reservation => {
      if (timelineFilter === 'all' || timelineFilter === `reservation-${reservation.id}`) {
        const timeStr = reservation.time;
        const endHour = parseInt(timeStr.split(':')[0]) + 2; // Assume 2 hour duration
        const endTime = `${endHour.toString().padStart(2, '0')}:${timeStr.split(':')[1]}`;
        
        events.push({
          id: `reservation-${reservation.id}`,
          type: 'reservation',
          title: `Đặt bàn - ${reservation.customerName}`,
          description: `${reservation.guests} người`,
          startTime: timeStr,
          endTime,
          status: reservation.status
        });
      }
    });

    return events.sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const scrollToCurrentTime = () => {
    if (timelineScrollRef) {
      const currentIndex = getCurrentHourIndex();
      const itemWidth = 120; // Width of each time slot
      const scrollPosition = Math.max(0, (currentIndex - 4) * itemWidth); // Show 4 hours before current
      timelineScrollRef.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (timelineScrollRef) {
      const currentIndex = getCurrentHourIndex();
      const itemWidth = 120; // Width of each time slot
      const scrollPosition = Math.max(0, (currentIndex - 4) * itemWidth); // Show 4 hours before current
      timelineScrollRef.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }
  }, [timelineScrollRef]);

  return (
    <Card className="bg-zinc-800 border-zinc-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center space-x-2">
          <Clock className="h-5 w-5 text-amber-400" />
          <span>Timeline Hôm Nay</span>
        </CardTitle>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-zinc-400" />
            <Select value={timelineFilter} onValueChange={setTimelineFilter}>
              <SelectTrigger className="w-48 bg-zinc-700 border-zinc-600">
                <SelectValue placeholder="Lọc theo bàn" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-700 border-zinc-600">
                <SelectItem value="all">Tất cả bàn</SelectItem>
                {tables.map(table => (
                  <SelectItem key={table.id} value={table.id}>
                    Bàn {table.number} - {table.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={scrollToCurrentTime}
            variant="outline" 
            size="sm"
            className="border-zinc-600 text-zinc-300"
          >
            <Clock className="h-4 w-4 mr-1" />
            Hiện tại
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Timeline Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-zinc-400">
              Hiển thị lịch hoạt động trong ngày (cuộn để xem thêm)
            </div>
            <div className="text-sm text-amber-400">
              {new Date().toLocaleDateString('vi-VN', { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Time Scale */}
          <div 
            ref={setTimelineScrollRef}
            className="flex overflow-x-auto scrollbar-thin scrollbar-track-zinc-700 scrollbar-thumb-zinc-500 pb-4 mb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {generateTimelineHours().map((hour, index) => {
              const isCurrentHour = index === getCurrentHourIndex();
              return (
                <div 
                  key={hour} 
                  className={`flex-shrink-0 w-30 px-2 py-2 text-center border-r border-zinc-600 relative ${
                    isCurrentHour ? 'bg-amber-500/10 border-amber-500/30' : ''
                  }`}
                  style={{ minWidth: '120px' }}
                >
                  <div className={`text-sm font-medium ${
                    isCurrentHour ? 'text-amber-400' : 'text-zinc-300'
                  }`}>
                    {hour}
                  </div>
                  {isCurrentHour && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full bg-amber-400 opacity-50"></div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Events */}
          <div className="space-y-2">
            {getTimelineEvents().map((event) => {
              const startHour = parseFloat(event.startTime.replace(':', '.'));
              const endHour = parseFloat(event.endTime.replace(':', '.'));
              const duration = endHour - startHour;
              const leftPosition = (startHour * 2) * 120; // 2 slots per hour * 120px width
              const width = duration * 2 * 120;

              return (
                <div key={event.id} className="relative h-12">
                  <div
                    className={`absolute h-10 rounded-lg border-2 flex items-center px-3 text-sm font-medium ${
                      event.type === 'table' 
                        ? getStatusColor(event.status) 
                        : event.status === 'confirmed' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                    }`}
                    style={{
                      left: `${leftPosition}px`,
                      width: `${Math.max(width, 120)}px`
                    }}
                  >
                    <div className="truncate">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs opacity-75">{event.description}</div>
                    </div>
                    {event.type === 'table' && (
                      <div className="ml-auto text-xs bg-black/20 px-2 py-1 rounded">
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {getTimelineEvents().length === 0 && (
              <div className="text-center py-8 text-zinc-400">
                <Clock className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Không có hoạt động nào được lên lịch</p>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-zinc-600">
          <div className="flex flex-wrap gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-green-500/20 border border-green-500/30"></div>
              <span className="text-zinc-400">Available/Confirmed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-red-500/20 border border-red-500/30"></div>
              <span className="text-zinc-400">Occupied</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-yellow-500/20 border border-yellow-500/30"></div>
              <span className="text-zinc-400">Reserved/Pending</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/30"></div>
              <span className="text-zinc-400">Cleaning</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
