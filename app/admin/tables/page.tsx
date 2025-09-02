'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Users, 
  Plus,
  Edit,
  Trash2,
  MapPin,
  Settings
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData, Table } from '../components/AdminDataProvider';

export default function TablesPage() {
  const { t } = useLanguage();
  const { tables, setTables, getStatusColor } = useAdminData();
  const [isAddTableDialogOpen, setIsAddTableDialogOpen] = useState(false);
  const [editingTable, setEditingTable] = useState<Table | null>(null);

  const [newTable, setNewTable] = useState({
    number: 0,
    seats: 2,
    location: '',
    status: 'active' as 'active' | 'maintenance'
  });

  const availableTablesCount = tables.filter(t => t.status === 'available').length;
  const occupiedTablesCount = tables.filter(t => t.status === 'occupied').length;
  const reservedTablesCount = tables.filter(t => t.status === 'reserved').length;
  const cleaningTablesCount = tables.filter(t => t.status === 'cleaning').length;

  const handleAddTable = () => {
    const table: Table = {
      id: Date.now().toString(),
      number: newTable.number,
      seats: newTable.seats,
      location: newTable.location,
      status: newTable.status === 'active' ? 'available' : 'cleaning'
    };
    setTables([...tables, table]);
    setNewTable({ number: 0, seats: 2, location: '', status: 'active' });
    setIsAddTableDialogOpen(false);
  };

  const handleEditTable = (table: Table) => {
    setEditingTable(table);
    setNewTable({
      number: table.number,
      seats: table.seats,
      location: table.location,
      status: table.status === 'available' ? 'active' : 'maintenance'
    });
    setIsAddTableDialogOpen(true);
  };

  const handleUpdateTable = () => {
    if (editingTable) {
      setTables(tables.map(table => 
        table.id === editingTable.id 
          ? {
              ...table,
              number: newTable.number,
              seats: newTable.seats,
              location: newTable.location,
              status: newTable.status === 'active' ? 'available' : 'cleaning'
            }
          : table
      ));
      setEditingTable(null);
      setNewTable({ number: 0, seats: 2, location: '', status: 'active' });
      setIsAddTableDialogOpen(false);
    }
  };

  const handleDeleteTable = (tableId: string) => {
    setTables(tables.filter(table => table.id !== tableId));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="h-8 w-8 text-amber-400" />
          <h1 className="text-3xl font-bold text-white">{t('admin.tableManagement')}</h1>
        </div>
        <Dialog open={isAddTableDialogOpen} onOpenChange={setIsAddTableDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-900">
              <Plus className="h-4 w-4 mr-2" />
              {t('admin.addNewTable')}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-800 border-zinc-700 text-white">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-amber-400" />
                <span>{editingTable ? t('admin.editTable') : t('admin.addNewTable')}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tableNumber">Table Number</Label>
                <Input
                  id="tableNumber"
                  type="number"
                  value={newTable.number}
                  onChange={(e) => setNewTable({...newTable, number: parseInt(e.target.value) || 0})}
                  className="bg-zinc-700 border-zinc-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="seats">{t('admin.numberOfSeats')}</Label>
                <Input
                  id="seats"
                  type="number"
                  value={newTable.seats}
                  onChange={(e) => setNewTable({...newTable, seats: parseInt(e.target.value) || 2})}
                  className="bg-zinc-700 border-zinc-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="location">{t('admin.location')}</Label>
                <Input
                  id="location"
                  value={newTable.location}
                  onChange={(e) => setNewTable({...newTable, location: e.target.value})}
                  placeholder={t('admin.enterLocation')}
                  className="bg-zinc-700 border-zinc-600 text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="tableStatus"
                  checked={newTable.status === 'active'}
                  onCheckedChange={(checked) => setNewTable({...newTable, status: checked ? 'active' : 'maintenance'})}
                />
                <Label htmlFor="tableStatus">
                  {newTable.status === 'active' ? t('admin.active') : t('admin.maintenance')}
                </Label>
              </div>
              <p className="text-sm text-zinc-400">
                {newTable.status === 'active' ? t('admin.activeDesc') : t('admin.maintenanceDesc')}
              </p>
              <Button
                onClick={editingTable ? handleUpdateTable : handleAddTable}
                className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-900"
                disabled={!newTable.number || !newTable.location}
              >
                {editingTable ? t('admin.updateTable') : t('admin.addTable')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-zinc-800 border-zinc-700 hover:border-green-400/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Available</p>
                <p className="text-2xl font-bold text-green-400">{availableTablesCount}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 hover:border-red-400/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Occupied</p>
                <p className="text-2xl font-bold text-red-400">{occupiedTablesCount}</p>
              </div>
              <div className="bg-red-500/20 p-3 rounded-lg">
                <Users className="h-8 w-8 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 hover:border-yellow-400/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Reserved</p>
                <p className="text-2xl font-bold text-yellow-400">{reservedTablesCount}</p>
              </div>
              <div className="bg-yellow-500/20 p-3 rounded-lg">
                <Users className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 hover:border-blue-400/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Cleaning</p>
                <p className="text-2xl font-bold text-blue-400">{cleaningTablesCount}</p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => (
          <Card key={table.id} className="bg-zinc-800 border-zinc-700 hover:border-amber-400 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                    <Users className="h-5 w-5 text-amber-400" />
                    <span>{t('admin.table')} {table.number}</span>
                  </h3>
                  <div className="flex items-center space-x-2 mt-1 text-zinc-400">
                    <Users className="h-4 w-4" />
                    <span>{table.seats} {t('admin.seats')}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 text-zinc-500">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{table.location}</span>
                  </div>
                </div>
                <Badge className={getStatusColor(table.status)}>
                  {t(`admin.status.${table.status}`)}
                </Badge>
              </div>
              
              {table.customer && (
                <div className="mb-4 p-3 bg-zinc-700/50 rounded">
                  <p className="text-sm font-medium text-white">{table.customer.name}</p>
                  <p className="text-xs text-zinc-400">{table.customer.guests} {t('admin.people')} • {table.customer.time}</p>
                </div>
              )}
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEditTable(table)}
                  className="flex-1 border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  {t('admin.edit')}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteTable(table.id)}
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
