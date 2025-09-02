'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  CheckCircle, 
  XCircle,
  Clock,
  Users,
  Phone,
  Mail,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData } from '../components/AdminDataProvider';

export default function ReservationsPage() {
  const { t } = useLanguage();
  const { reservations, updateReservationStatus, getStatusColor } = useAdminData();

  const pendingReservations = reservations.filter(r => r.status === 'pending');
  const confirmedReservations = reservations.filter(r => r.status === 'confirmed');
  const rejectedReservations = reservations.filter(r => r.status === 'rejected');

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center space-x-3">
        <Calendar className="h-8 w-8 text-amber-400" />
        <h1 className="text-3xl font-bold text-white">{t('admin.manageReservations')}</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-800 border-zinc-700 hover:border-yellow-400/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{pendingReservations.length}</p>
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
                <p className="text-2xl font-bold text-green-400">{confirmedReservations.length}</p>
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
                <p className="text-2xl font-bold text-red-400">{rejectedReservations.length}</p>
              </div>
              <div className="bg-red-500/20 p-3 rounded-lg">
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Reservations */}
      {pendingReservations.length > 0 && (
        <Card className="bg-zinc-800 border-zinc-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-400" />
              <span>Pending Reservations ({pendingReservations.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingReservations.map((reservation) => (
                <div key={reservation.id} className="p-4 bg-zinc-700/50 rounded-lg border border-zinc-600">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-white text-lg mb-2">{reservation.customerName}</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2 text-zinc-300">
                              <Mail className="h-4 w-4 text-zinc-400" />
                              <span>{reservation.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-zinc-300">
                              <Phone className="h-4 w-4 text-zinc-400" />
                              <span>{reservation.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2 text-zinc-300">
                              <Calendar className="h-4 w-4 text-amber-400" />
                              <span>{reservation.date}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-zinc-300">
                              <Clock className="h-4 w-4 text-amber-400" />
                              <span>{reservation.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-zinc-300">
                              <Users className="h-4 w-4 text-amber-400" />
                              <span>{reservation.guests} {t('admin.people')}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {reservation.specialRequests && (
                        <div className="mt-4 p-3 bg-zinc-600/50 rounded">
                          <div className="flex items-start space-x-2">
                            <MessageSquare className="h-4 w-4 text-amber-400 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium text-amber-400">
                                {t('admin.specialRequests')}:
                              </p>
                              <p className="text-sm text-zinc-300">{reservation.specialRequests}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <Badge className={getStatusColor(reservation.status)}>
                        {t(`admin.reservationStatus.${reservation.status}`)}
                      </Badge>
                      <div className="flex flex-col space-y-2">
                        <Button
                          size="sm"
                          onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {t('admin.approve')}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateReservationStatus(reservation.id, 'rejected')}
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

      {/* All Reservations */}
      <Card className="bg-zinc-800 border-zinc-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-amber-400" />
            <span>All Reservations ({reservations.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reservations.map((reservation) => (
              <div key={reservation.id} className="p-4 bg-zinc-700/50 rounded-lg border border-zinc-600">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{reservation.customerName}</h3>
                        <p className="text-sm text-zinc-400">{reservation.email} • {reservation.phone}</p>
                        <p className="text-sm text-zinc-300">
                          {reservation.date} {t('admin.at')} {reservation.time} • {reservation.guests} {t('admin.people')}
                        </p>
                        {reservation.specialRequests && (
                          <p className="text-sm text-amber-400 mt-1">
                            {t('admin.specialRequests')}: {reservation.specialRequests}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={getStatusColor(reservation.status)}>
                      {t(`admin.reservationStatus.${reservation.status}`)}
                    </Badge>
                    {reservation.status === 'pending' && (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {t('admin.approve')}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateReservationStatus(reservation.id, 'rejected')}
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
