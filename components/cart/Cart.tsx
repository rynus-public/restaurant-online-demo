'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Minus, Plus, Trash2, ShoppingBag, X, Edit, Clock, CreditCard } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryMethod: 'pickup', // pickup or delivery
    address: '',
    paymentMethod: 'cash', // cash or card
    notes: ''
  });

  const taxRate = 0.07; // 7% MwSt/USt
  const subtotal = getTotalPrice();
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    const orderDetails = {
      items: items.map(item => `${item.quantity}x ${item.name}`).join(', '),
      total: total.toFixed(2),
      contact: contactInfo.name,
      phone: contactInfo.phone,
      method: contactInfo.deliveryMethod === 'pickup' ? t('cart.pickup') : t('cart.delivery')
    };
    
    const message = t('cart.orderSuccess')
      .replace('{items}', orderDetails.items)
      .replace('{total}', orderDetails.total)
      .replace('{contact}', orderDetails.contact)
      .replace('{method}', orderDetails.method);
    
    alert(message);
    clearCart();
    setCurrentStep(1);
    setContactInfo({
      name: '',
      phone: '',
      email: '',
      deliveryMethod: 'pickup',
      address: '',
      paymentMethod: 'cash',
      notes: ''
    });
    onClose();
  };

  const canProceedToCheckout = () => {
    return contactInfo.name && contactInfo.phone && 
           (contactInfo.deliveryMethod === 'pickup' || contactInfo.address);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="bg-white border-gray-200 w-full sm:max-w-lg p-0">
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                <ShoppingBag className="h-4 w-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">CHANG RESTAURANT</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {currentStep === 1 ? (
            // Step 1: Order Review
            <div className="p-6">
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">{t('cart.empty')}</p>
                  <p className="text-gray-400">{t('cart.emptySubtext')}</p>
                </div>
              ) : (
                <>
                  {/* Progress Steps */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        1
                      </div>
                      <div className="w-12 h-0.5 bg-gray-300"></div>
                      <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">
                        2
                      </div>
                      <div className="w-12 h-0.5 bg-gray-300"></div>
                      <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">
                        3
                      </div>
                    </div>
                  </div>

                  {/* Contact Info Section */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Edit className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-800">{t('cart.contactInfo')}</h3>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-4 border-dashed"
                      onClick={() => setCurrentStep(2)}
                    >
                      <div className="text-gray-600">
                        {contactInfo.name ? (
                          <div>
                            <p className="font-medium">{contactInfo.name}</p>
                            <p className="text-sm">{contactInfo.phone}</p>
                          </div>
                        ) : (
                          <p>{t('cart.addContactInfo')}</p>
                        )}
                      </div>
                    </Button>
                  </div>

                  {/* Delivery Method */}
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Clock className="h-5 w-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-800">{t('cart.deliveryMethod')}</h3>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto p-4 border-dashed"
                      onClick={() => setCurrentStep(2)}
                    >
                      <div className="text-gray-600">
                        {contactInfo.deliveryMethod ? (
                          <p className="font-medium">
                            {contactInfo.deliveryMethod === 'pickup' ? t('cart.pickup') : t('cart.delivery')}
                          </p>
                        ) : (
                          <p>{t('cart.selectDeliveryMethod')}</p>
                        )}
                      </div>
                    </Button>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('cart.orderItems')}</h3>
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">€{item.price.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="text-gray-800 font-semibold w-8 text-center">
                            {item.quantity}x
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>{t('cart.subtotal')}</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>{t('cart.tax')} (7%)</span>
                      <span>€{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-gray-200">
                      <span>{t('cart.total')}</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : currentStep === 2 ? (
            // Step 2: Contact & Delivery Information
            <div className="p-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div className="w-12 h-0.5 bg-orange-500"></div>
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div className="w-12 h-0.5 bg-gray-300"></div>
                  <div className="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-6">{t('cart.contactInfo')}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('cart.fullName')} *
                  </label>
                  <input
                    type="text"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({...contactInfo, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder={t('cart.enterName')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('cart.phone')} *
                  </label>
                  <input
                    type="tel"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="+49 30 12345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('cart.email')}
                  </label>
                  <input
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Delivery Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t('cart.deliveryMethod')} *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setContactInfo({...contactInfo, deliveryMethod: 'pickup'})}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        contactInfo.deliveryMethod === 'pickup'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="font-medium">{t('cart.pickup')}</div>
                      <div className="text-sm text-gray-500">{t('cart.pickupTime')}</div>
                    </button>
                    <button
                      onClick={() => setContactInfo({...contactInfo, deliveryMethod: 'delivery'})}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        contactInfo.deliveryMethod === 'delivery'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="font-medium">{t('cart.delivery')}</div>
                      <div className="text-sm text-gray-500">{t('cart.deliveryTime')}</div>
                    </button>
                  </div>
                </div>

                {/* Address for delivery */}
                {contactInfo.deliveryMethod === 'delivery' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('cart.deliveryAddress')} *
                    </label>
                    <textarea
                      value={contactInfo.address}
                      onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      rows={3}
                      placeholder={t('cart.enterAddress')}
                    />
                  </div>
                )}

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {t('cart.paymentMethod')} *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setContactInfo({...contactInfo, paymentMethod: 'cash'})}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        contactInfo.paymentMethod === 'cash'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="font-medium">{t('cart.cash')}</div>
                      <div className="text-sm text-gray-500">{t('cart.payOnDelivery')}</div>
                    </button>
                    <button
                      onClick={() => setContactInfo({...contactInfo, paymentMethod: 'card'})}
                      className={`p-3 rounded-lg border-2 text-left transition-all ${
                        contactInfo.paymentMethod === 'card'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="font-medium">{t('cart.card')}</div>
                      <div className="text-sm text-gray-500">{t('cart.payOnline')}</div>
                    </button>
                  </div>
                </div>

                {/* Special Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('cart.specialNotes')}
                  </label>
                  <textarea
                    value={contactInfo.notes}
                    onChange={(e) => setContactInfo({...contactInfo, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows={3}
                    placeholder={t('cart.notesPlaceholder')}
                  />
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex space-x-3 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="flex-1"
                >
                  {t('cart.back')}
                </Button>
                <Button
                  onClick={() => setCurrentStep(3)}
                  disabled={!canProceedToCheckout()}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {t('cart.continue')}
                </Button>
              </div>
            </div>
          ) : (
            // Step 3: Order Confirmation
            <div className="p-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div className="w-12 h-0.5 bg-green-500"></div>
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div className="w-12 h-0.5 bg-orange-500"></div>
                  <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-6">{t('cart.orderSummary')}</h3>

              {/* Order Details */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <div className="flex-1">
                      <span className="font-medium text-gray-800">{item.quantity}x</span>
                      <span className="ml-2 text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-gray-800 font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal')}</span>
                  <span>€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.tax')} (7%)</span>
                  <span>€{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t border-gray-200">
                  <span>{t('cart.total')}</span>
                  <span className="text-orange-600">€{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Contact & Delivery Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">{t('cart.deliveryInfo')}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>{t('cart.contact')}:</strong> {contactInfo.name}</p>
                  <p><strong>{t('cart.phone')}:</strong> {contactInfo.phone}</p>
                  <p><strong>{t('cart.method')}:</strong> {contactInfo.deliveryMethod === 'pickup' ? t('cart.pickup') : t('cart.delivery')}</p>
                  {contactInfo.deliveryMethod === 'delivery' && contactInfo.address && (
                    <p><strong>{t('cart.address')}:</strong> {contactInfo.address}</p>
                  )}
                  <p><strong>{t('cart.payment')}:</strong> {contactInfo.paymentMethod === 'cash' ? t('cart.cash') : t('cart.card')}</p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1"
                >
                  {t('cart.back')}
                </Button>
                <Button
                  onClick={handleCheckout}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold"
                >
                  {t('cart.placeOrder')}
                </Button>
              </div>

              {/* Terms */}
              <p className="text-xs text-gray-500 text-center mt-4">
                {t('cart.termsNote')}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Action Button for Step 1 */}
        {currentStep === 1 && items.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <Button
              onClick={() => setCurrentStep(2)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 text-lg"
            >
              {t('cart.continue')} • €{total.toFixed(2)}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}