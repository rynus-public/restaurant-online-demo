'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Utensils, 
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Leaf,
  Flame,
  Settings,
  Eye,
  EyeOff
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAdminData, MenuItem } from '../components/AdminDataProvider';

export default function MenuPage() {
  const { t } = useLanguage();
  const { menuItems, setMenuItems, toggleMenuItemAvailability } = useAdminData();
  const [isAddMenuItemDialogOpen, setIsAddMenuItemDialogOpen] = useState(false);

  const [newMenuItem, setNewMenuItem] = useState({
    name: '',
    nameEn: '',
    nameVi: '',
    description: '',
    descriptionEn: '',
    descriptionVi: '',
    price: 0,
    category: 'appetizers',
    vegetarian: false,
    spicy: false,
    image: ''
  });

  const availableItems = menuItems.filter(item => item.available).length;
  const unavailableItems = menuItems.filter(item => !item.available).length;
  const vegetarianItems = menuItems.filter(item => item.vegetarian).length;
  const spicyItems = menuItems.filter(item => item.spicy).length;

  const handleAddMenuItem = () => {
    const menuItem: MenuItem = {
      id: Date.now().toString(),
      name: newMenuItem.name,
      nameEn: newMenuItem.nameEn,
      nameVi: newMenuItem.nameVi,
      description: newMenuItem.description,
      descriptionEn: newMenuItem.descriptionEn,
      descriptionVi: newMenuItem.descriptionVi,
      price: newMenuItem.price,
      category: newMenuItem.category,
      available: true,
      vegetarian: newMenuItem.vegetarian,
      spicy: newMenuItem.spicy,
      image: newMenuItem.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
    };
    setMenuItems([...menuItems, menuItem]);
    setNewMenuItem({
      name: '',
      nameEn: '',
      nameVi: '',
      description: '',
      descriptionEn: '',
      descriptionVi: '',
      price: 0,
      category: 'appetizers',
      vegetarian: false,
      spicy: false,
      image: ''
    });
    setIsAddMenuItemDialogOpen(false);
  };

  const handleDeleteMenuItem = (itemId: string) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId));
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Utensils className="h-8 w-8 text-amber-400" />
          <h1 className="text-3xl font-bold text-white">{t('admin.menuManagement')}</h1>
        </div>
        <Dialog open={isAddMenuItemDialogOpen} onOpenChange={setIsAddMenuItemDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-amber-500 hover:bg-amber-600 text-zinc-900">
              <Plus className="h-4 w-4 mr-2" />
              {t('admin.addNewDish')}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-800 border-zinc-700 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-amber-400" />
                <span>{t('admin.addNewDish')}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Names in different languages */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="dishName">{t('admin.dishName')} (Deutsch)</Label>
                  <Input
                    id="dishName"
                    value={newMenuItem.name}
                    onChange={(e) => setNewMenuItem({...newMenuItem, name: e.target.value})}
                    className="bg-zinc-700 border-zinc-600 text-white"
                    placeholder="z.B. Pad Thai"
                  />
                </div>
                <div>
                  <Label htmlFor="dishNameEn">{t('admin.dishName')} (English)</Label>
                  <Input
                    id="dishNameEn"
                    value={newMenuItem.nameEn}
                    onChange={(e) => setNewMenuItem({...newMenuItem, nameEn: e.target.value})}
                    className="bg-zinc-700 border-zinc-600 text-white"
                    placeholder="e.g. Traditional Pad Thai"
                  />
                </div>
                <div>
                  <Label htmlFor="dishNameVi">{t('admin.dishName')} (Tiếng Việt)</Label>
                  <Input
                    id="dishNameVi"
                    value={newMenuItem.nameVi}
                    onChange={(e) => setNewMenuItem({...newMenuItem, nameVi: e.target.value})}
                    className="bg-zinc-700 border-zinc-600 text-white"
                    placeholder="ví dụ: Pad Thai Truyền Thống"
                  />
                </div>
              </div>

              {/* Descriptions */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="description">{t('admin.description')} (Deutsch)</Label>
                  <Textarea
                    id="description"
                    value={newMenuItem.description}
                    onChange={(e) => setNewMenuItem({...newMenuItem, description: e.target.value})}
                    className="bg-zinc-700 border-zinc-600 text-white"
                    placeholder="Beschreibung des Gerichts..."
                  />
                </div>
                <div>
                  <Label htmlFor="descriptionEn">{t('admin.description')} (English)</Label>
                  <Textarea
                    id="descriptionEn"
                    value={newMenuItem.descriptionEn}
                    onChange={(e) => setNewMenuItem({...newMenuItem, descriptionEn: e.target.value})}
                    className="bg-zinc-700 border-zinc-600 text-white"
                    placeholder="Description of the dish..."
                  />
                </div>
                <div>
                  <Label htmlFor="descriptionVi">{t('admin.description')} (Tiếng Việt)</Label>
                  <Textarea
                    id="descriptionVi"
                    value={newMenuItem.descriptionVi}
                    onChange={(e) => setNewMenuItem({...newMenuItem, descriptionVi: e.target.value})}
                    className="bg-zinc-700 border-zinc-600 text-white"
                    placeholder="Mô tả món ăn..."
                  />
                </div>
              </div>

              {/* Price and Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">{t('admin.price')} (€)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.50"
                    value={newMenuItem.price}
                    onChange={(e) => setNewMenuItem({...newMenuItem, price: parseFloat(e.target.value) || 0})}
                    className="bg-zinc-700 border-zinc-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="category">{t('admin.category')}</Label>
                  <Select value={newMenuItem.category} onValueChange={(value) => setNewMenuItem({...newMenuItem, category: value})}>
                    <SelectTrigger className="bg-zinc-700 border-zinc-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-700 border-zinc-600">
                      <SelectItem value="recommendations">Recommendations</SelectItem>
                      <SelectItem value="appetizers">Appetizers</SelectItem>
                      <SelectItem value="salads">Salads</SelectItem>
                      <SelectItem value="mains">Main Courses</SelectItem>
                      <SelectItem value="beverages">Beverages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={newMenuItem.image}
                  onChange={(e) => setNewMenuItem({...newMenuItem, image: e.target.value})}
                  className="bg-zinc-700 border-zinc-600 text-white"
                  placeholder="https://images.pexels.com/..."
                />
              </div>

              {/* Options */}
              <div className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="vegetarian"
                    checked={newMenuItem.vegetarian}
                    onCheckedChange={(checked) => setNewMenuItem({...newMenuItem, vegetarian: checked})}
                  />
                  <Label htmlFor="vegetarian" className="flex items-center space-x-1">
                    <Leaf className="h-4 w-4 text-green-400" />
                    <span>{t('menu.vegetarian')}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="spicy"
                    checked={newMenuItem.spicy}
                    onCheckedChange={(checked) => setNewMenuItem({...newMenuItem, spicy: checked})}
                  />
                  <Label htmlFor="spicy" className="flex items-center space-x-1">
                    <Flame className="h-4 w-4 text-red-400" />
                    <span>{t('menu.spicy')}</span>
                  </Label>
                </div>
              </div>

              <Button
                onClick={handleAddMenuItem}
                className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-900"
                disabled={!newMenuItem.name || !newMenuItem.nameEn || !newMenuItem.nameVi || newMenuItem.price <= 0}
              >
                {t('admin.addDish')}
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
                <p className="text-2xl font-bold text-green-400">{availableItems}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Eye className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 hover:border-red-400/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Unavailable</p>
                <p className="text-2xl font-bold text-red-400">{unavailableItems}</p>
              </div>
              <div className="bg-red-500/20 p-3 rounded-lg">
                <EyeOff className="h-8 w-8 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 hover:border-green-400/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Vegetarian</p>
                <p className="text-2xl font-bold text-green-400">{vegetarianItems}</p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Leaf className="h-8 w-8 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-800 border-zinc-700 hover:border-red-400/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-zinc-400 text-sm font-medium">Spicy</p>
                <p className="text-2xl font-bold text-red-400">{spicyItems}</p>
              </div>
              <div className="bg-red-500/20 p-3 rounded-lg">
                <Flame className="h-8 w-8 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Card key={item.id} className="bg-zinc-800 border-zinc-700 hover:border-amber-400 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <ImageIcon className="h-5 w-5 text-amber-400" />
                    <h3 className="font-semibold text-white">{item.name}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3 line-clamp-2">{item.description}</p>
                  <p className="text-lg font-bold text-amber-400 mb-3">€{item.price.toFixed(2)}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-zinc-600 text-zinc-300 text-xs">
                      {item.category}
                    </Badge>
                    {item.vegetarian && (
                      <Badge className="bg-green-500/20 text-green-400 text-xs">
                        <Leaf className="h-3 w-3 mr-1" />
                        {t('menu.vegetarian')}
                      </Badge>
                    )}
                    {item.spicy && (
                      <Badge className="bg-red-500/20 text-red-400 text-xs">
                        <Flame className="h-3 w-3 mr-1" />
                        {t('menu.spicy')}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge className={item.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}>
                    {item.available ? t('admin.available') : t('admin.unavailable')}
                  </Badge>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleMenuItemAvailability(item.id)}
                  className="flex-1 border-zinc-600 text-zinc-300 hover:bg-zinc-700"
                >
                  {item.available ? <EyeOff className="h-4 w-4 mr-1" /> : <Eye className="h-4 w-4 mr-1" />}
                  {item.available ? 'Disable' : 'Enable'}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDeleteMenuItem(item.id)}
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
