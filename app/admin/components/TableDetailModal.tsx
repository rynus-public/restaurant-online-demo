'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Clock,
  Phone,
  Mail,
  User,
  Edit,
  Save,
  X
} from 'lucide-react';
import { Table, useAdminData } from './AdminDataProvider';

interface TableDetailModalProps {
  selectedTable: Table | null;
  onClose: () => void;
  selectedTimeSlot: string;
  onTimeSlotChange: (timeSlot: string) => void;
}

interface EditForm {
  name: string;
  phone: string;
  email: string;
  guests: number;
}

export function TableDetailModal({ 
  selectedTable, 
  onClose, 
  selectedTimeSlot, 
  onTimeSlotChange 
}: TableDetailModalProps) {
  const { getStatusColor, updateTableStatus, updateTableCustomer, getCurrentTimeSlot } = useAdminData();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<EditForm>({
    name: selectedTable?.customer?.name || '',
    phone: selectedTable?.customer?.phone || '',
    email: selectedTable?.customer?.email || '',
    guests: selectedTable?.customer?.guests || 1
  });

  const timeSlots = [
    { value: '07:00-09:48', label: 'Ca 1: Sáng sớm', time: '07:00-09:48' },
    { value: '09:48-12:36', label: 'Ca 2: Sáng muộn', time: '09:48-12:36' },
    { value: '12:36-15:24', label: 'Ca 3: Trưa', time: '12:36-15:24' },
    { value: '15:24-18:12', label: 'Ca 4: Chiều', time: '15:24-18:12' },
    { value: '18:12-21:00', label: 'Ca 5: Tối', time: '18:12-21:00' }
  ];

  React.useEffect(() => {
    if (selectedTable) {
      setEditForm({
        name: selectedTable.customer?.name || '',
        phone: selectedTable.customer?.phone || '',
        email: selectedTable.customer?.email || '',
        guests: selectedTable.customer?.guests || 1
      });
    }
  }, [selectedTable]);

  const handleStatusChange = (status: string) => {
    if (selectedTable) {
      updateTableStatus(selectedTable.id, status as 'available' | 'occupied' | 'reserved' | 'cleaning');
    }
  };

  const handleSaveCustomer = () => {
    if (selectedTable && selectedTimeSlot) {
      const customerData = {
        name: editForm.name,
        phone: editForm.phone,
        email: editForm.email,
        guests: editForm.guests,
        time: selectedTimeSlot
      };
      
      updateTableCustomer(selectedTable.id, customerData);
      setIsEditing(false);
    }
  };

  const handleClearCustomer = () => {
    if (selectedTable) {
      updateTableCustomer(selectedTable.id, undefined);
      setEditForm({ name: '', phone: '', email: '', guests: 1 });
    }
  };

  const getCurrentShiftName = (timeSlot: string) => {
    const slot = timeSlots.find(slot => slot.value === timeSlot);
    return slot ? slot.label : timeSlot;
  };

  if (!selectedTable) return null;

  return (
    <Dialog open={!!selectedTable} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-800 border-zinc-700 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-amber-400" />
              <span>Table {selectedTable.number} - {selectedTable.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(selectedTable.status)}>
                {selectedTable.status}
              </Badge>
              <Select onValueChange={handleStatusChange} value={selectedTable.status}>
                <SelectTrigger className="w-32 bg-zinc-700 border-zinc-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-zinc-700 border-zinc-600">
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Table Info & Customer Form */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-zinc-400">{selectedTable.seats} seats</p>
              <div className="flex space-x-2">
                {!isEditing && (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                )}
                {selectedTable.customer && (
                  <Button 
                    onClick={handleClearCustomer}
                    size="sm"
                    variant="destructive"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {isEditing ? (
              <div className="bg-zinc-700/50 p-4 rounded-lg space-y-4">
                <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                  <User className="h-4 w-4 text-amber-400" />
                  <span>Customer Information</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-zinc-300">Name</Label>
                    <Input
                      id="name"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="bg-zinc-600 border-zinc-500 text-white"
                      placeholder="Customer name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-zinc-300">Phone</Label>
                    <Input
                      id="phone"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="bg-zinc-600 border-zinc-500 text-white"
                      placeholder="+49 30 12345678"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-zinc-300">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="bg-zinc-600 border-zinc-500 text-white"
                      placeholder="customer@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="guests" className="text-zinc-300">Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      min="1"
                      max={selectedTable.seats}
                      value={editForm.guests}
                      onChange={(e) => setEditForm({ ...editForm, guests: parseInt(e.target.value) || 1 })}
                      className="bg-zinc-600 border-zinc-500 text-white"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button 
                    onClick={handleSaveCustomer}
                    disabled={!editForm.name || !selectedTimeSlot}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="h-4 w-4 mr-1" />
                    Save
                  </Button>
                  <Button 
                    onClick={() => setIsEditing(false)}
                    variant="outline"
                    className="border-zinc-600 text-zinc-300"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : selectedTable.customer ? (
              <div className="bg-zinc-700/50 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-3 flex items-center space-x-2">
                  <User className="h-4 w-4 text-amber-400" />
                  <span>Customer Information</span>
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-zinc-400" />
                    <span className="text-zinc-300">{selectedTable.customer.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-zinc-400" />
                    <span className="text-zinc-300">{selectedTable.customer.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-zinc-400" />
                    <span className="text-zinc-300">{selectedTable.customer.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-zinc-400" />
                    <span className="text-zinc-300">{selectedTable.customer.guests} guests</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-zinc-400" />
                    <span className="text-zinc-300">{getCurrentShiftName(selectedTable.customer.time)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-zinc-700/30 p-4 rounded-lg text-center">
                <p className="text-zinc-400 mb-3">No customer information available</p>
                <Button 
                  onClick={() => setIsEditing(true)}
                  className="bg-amber-500 hover:bg-amber-600"
                >
                  <User className="h-4 w-4 mr-1" />
                  Add Customer
                </Button>
              </div>
            )}
          </div>

          {/* Time Slots Sidebar */}
          <div className="bg-zinc-700/30 p-4 rounded-lg">
            <h4 className="font-semibold text-white mb-4 flex items-center space-x-2">
              <Clock className="h-4 w-4 text-amber-400" />
              <span>Ca làm việc</span>
            </h4>
            <div className="space-y-2">
              {timeSlots.map((slot) => (
                <div
                  key={slot.value}
                  onClick={() => onTimeSlotChange(slot.value)}
                  className={`p-3 rounded text-sm transition-colors cursor-pointer ${
                    selectedTimeSlot === slot.value
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : selectedTable.customer?.time === slot.value
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-zinc-600/50 text-zinc-300 hover:bg-zinc-600'
                  }`}
                >
                  <div className="font-medium">{slot.label}</div>
                  <div className="text-xs opacity-75">{slot.time}</div>
                  {selectedTable.customer?.time === slot.value && (
                    <div className="text-xs text-green-400 mt-1">✓ Đang phục vụ</div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-zinc-600/30 rounded-lg">
              <p className="text-xs text-zinc-400 mb-2">Ca hiện tại:</p>
              <p className="text-sm text-amber-400 font-medium">{getCurrentShiftName(getCurrentTimeSlot())}</p>
              <p className="text-xs text-zinc-300">{getCurrentTimeSlot()}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
