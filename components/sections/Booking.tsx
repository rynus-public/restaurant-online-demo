'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, Clock, Users, ChevronLeft, ChevronRight, Mail, Phone, User } from 'lucide-react';

const Booking = () => {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPersons, setSelectedPersons] = useState<number>(2);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [contactInfo, setContactInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const translations = {
    en: {
      title: 'Table Reservation at Chang Bistro',
      poweredBy: 'POWERED BY RESERV.ON',
      date: 'Date',
      persons: 'Number of Persons',
      availableTimes: 'Available Times',
      continue: 'CONTINUE',
      back: 'BACK',
      contactInfo: 'Contact Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      specialRequests: 'Special Requests',
      confirmReservation: 'CONFIRM RESERVATION',
      reservationConfirmed: 'Reservation Confirmed!',
      thankYou: 'Thank you for your reservation.',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      moreThan10: 'More than 10 people?'
    },
    de: {
      title: 'Tischreservierung im Restaurant Chang Bistro',
      poweredBy: 'POWERED BY RESERV.ON',
      date: 'Datum',
      persons: 'Personenzahl',
      availableTimes: 'Verfügbare Uhrzeiten',
      continue: 'WEITER',
      back: 'ZURÜCK',
      contactInfo: 'Kontaktinformationen',
      firstName: 'Vorname',
      lastName: 'Nachname',
      email: 'E-Mail',
      phone: 'Telefon',
      specialRequests: 'Besondere Wünsche',
      confirmReservation: 'RESERVIERUNG BESTÄTIGEN',
      reservationConfirmed: 'Reservierung bestätigt!',
      thankYou: 'Vielen Dank für Ihre Reservierung.',
      months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
      weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      moreThan10: 'Mehr als 10 Personen?'
    },
    vi: {
      title: 'Đặt Bàn tại Nhà Hàng Chang Bistro',
      poweredBy: 'POWERED BY RESERV.ON',
      date: 'Ngày',
      persons: 'Số Người',
      availableTimes: 'Giờ Có Sẵn',
      continue: 'TIẾP TỤC',
      back: 'QUAY LẠI',
      contactInfo: 'Thông Tin Liên Lạc',
      firstName: 'Tên',
      lastName: 'Họ',
      email: 'Email',
      phone: 'Số Điện Thoại',
      specialRequests: 'Yêu Cầu Đặc Biệt',
      confirmReservation: 'XÁC NHẬN ĐẶT BÀN',
      reservationConfirmed: 'Đặt Bàn Thành Công!',
      thankYou: 'Cảm ơn bạn đã đặt bàn.',
      months: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
      weekdays: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
      moreThan10: 'Hơn 10 người?'
    }
  };

  const currentTranslations = translations[language as keyof typeof translations];

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - (firstDay.getDay() + 6) % 7);

    const days = [];
    const currentDate = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
  };

  const isDateSelectable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };

  const availableTimes = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  const handleDateSelect = (date: Date) => {
    if (isDateSelectable(date) && isCurrentMonth(date)) {
      setSelectedDate(date);
      setSelectedTime('');
    }
  };

  const handleContinue = () => {
    if (currentStep === 1 && selectedDate && selectedTime && selectedPersons) {
      setCurrentStep(2);
    } else if (currentStep === 2 && contactInfo.firstName && contactInfo.lastName && contactInfo.email && contactInfo.phone) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  if (currentStep === 3) {
    return (
      <section id="booking" className="py-20 bg-zinc-800">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl p-12">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                {currentTranslations.reservationConfirmed}
              </h2>
              <p className="text-zinc-300 mb-8">
                {currentTranslations.thankYou}
              </p>
              <div className="bg-zinc-800 rounded-lg p-6 text-left">
                <h3 className="font-semibold text-white mb-4">Reservation Details:</h3>
                <div className="space-y-2 text-sm text-zinc-300">
                  <p><strong>Date:</strong> {selectedDate?.toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {selectedTime}</p>
                  <p><strong>Persons:</strong> {selectedPersons}</p>
                  <p><strong>Name:</strong> {contactInfo.firstName} {contactInfo.lastName}</p>
                  <p><strong>Email:</strong> {contactInfo.email}</p>
                  <p><strong>Phone:</strong> {contactInfo.phone}</p>
                  {contactInfo.specialRequests && (
                    <p><strong>Special Requests:</strong> {contactInfo.specialRequests}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 bg-zinc-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">
            {currentTranslations.title}
          </h2>
          <p className="text-sm text-zinc-400 uppercase tracking-wider">
            {currentTranslations.poweredBy}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
            {currentStep === 1 ? (
              <>
                {/* Step 1: Date, Person Count, and Time Selection */}
                <div className="grid md:grid-cols-3 gap-8 p-8">
                  {/* Date Selection */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 text-center">
                      {currentTranslations.date}
                    </h3>
                    <div className="bg-zinc-800 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <button
                          onClick={prevMonth}
                          className="p-2 hover:bg-zinc-700 rounded-full transition-colors text-zinc-300 hover:text-white"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h4 className="font-semibold text-white">
                          {currentTranslations.months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </h4>
                        <button
                          onClick={nextMonth}
                          className="p-2 hover:bg-zinc-700 rounded-full transition-colors text-zinc-300 hover:text-white"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {currentTranslations.weekdays.map((day) => (
                          <div key={day} className="text-center text-xs font-medium text-zinc-400 p-2">
                            {day}
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1">
                        {generateCalendar().map((date, index) => (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(date)}
                            disabled={!isDateSelectable(date) || !isCurrentMonth(date)}
                            className={`
                              p-2 text-sm rounded-lg transition-all duration-200
                              ${!isCurrentMonth(date) ? 'text-zinc-500' : ''}
                              ${!isDateSelectable(date) ? 'text-zinc-500 cursor-not-allowed' : 'hover:bg-amber-500/20 text-white'}
                              ${selectedDate?.toDateString() === date.toDateString() ? 'bg-amber-500 text-white' : ''}
                              ${isDateSelectable(date) && isCurrentMonth(date) ? 'text-zinc-300' : ''}
                            `}
                          >
                            {date.getDate()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Person Count Selection */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 text-center">
                      {currentTranslations.persons}
                    </h3>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <button
                          key={num}
                          onClick={() => setSelectedPersons(num)}
                          className={`
                            p-4 rounded-lg border-2 transition-all duration-200 font-semibold
                            ${selectedPersons === num 
                              ? 'border-amber-500 bg-amber-500/20 text-amber-400' 
                              : 'border-zinc-600 text-zinc-300 hover:border-amber-400 hover:bg-amber-500/10'
                            }
                          `}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-zinc-400 mb-3">{currentTranslations.moreThan10}</p>
                      <div className="flex justify-center space-x-4">
                        <button className="p-3 bg-amber-500 text-zinc-900 rounded-lg hover:bg-amber-600 transition-colors">
                          <Mail className="w-5 h-5" />
                        </button>
                        <button className="p-3 bg-amber-500 text-zinc-900 rounded-lg hover:bg-amber-600 transition-colors">
                          <Phone className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Available Times */}
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-6 text-center">
                      {currentTranslations.availableTimes}
                    </h3>
                    {selectedDate ? (
                      <div className="grid grid-cols-2 gap-3">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`
                              p-3 rounded-lg border-2 transition-all duration-200 font-medium
                              ${selectedTime === time 
                                ? 'border-amber-500 bg-amber-500/20 text-amber-400' 
                                : 'border-zinc-600 text-zinc-300 hover:border-amber-400 hover:bg-amber-500/10'
                              }
                            `}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center text-zinc-400 py-8">
                        <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>{t('booking.selectDate')}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-zinc-800 border-t border-zinc-700 px-8 py-6 flex justify-end">
                  <button
                    onClick={handleContinue}
                    disabled={!selectedDate || !selectedTime || !selectedPersons}
                    className={`
                      px-8 py-3 rounded-lg font-semibold transition-all duration-200
                      ${selectedDate && selectedTime && selectedPersons
                        ? 'bg-amber-500 text-zinc-900 hover:bg-amber-600 shadow-lg hover:shadow-xl'
                        : 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                      }
                    `}
                  >
                    {currentTranslations.continue}
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Contact Information */}
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-white mb-8 text-center">
                    {currentTranslations.contactInfo}
                  </h3>
                  
                  <div className="max-w-2xl mx-auto space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          {currentTranslations.firstName} *
                        </label>
                        <input
                          type="text"
                          value={contactInfo.firstName}
                          onChange={(e) => setContactInfo({...contactInfo, firstName: e.target.value})}
                          className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-zinc-300 mb-2">
                          {currentTranslations.lastName} *
                        </label>
                        <input
                          type="text"
                          value={contactInfo.lastName}
                          onChange={(e) => setContactInfo({...contactInfo, lastName: e.target.value})}
                          className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        {currentTranslations.email} *
                      </label>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                        className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        {currentTranslations.phone} *
                      </label>
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-300 mb-2">
                        {currentTranslations.specialRequests}
                      </label>
                      <textarea
                        value={contactInfo.specialRequests}
                        onChange={(e) => setContactInfo({...contactInfo, specialRequests: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                        placeholder="Allergies, dietary restrictions, special occasions..."
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-zinc-800 border-t border-zinc-700 px-8 py-6 flex justify-between">
                  <button
                    onClick={handleBack}
                    className="px-6 py-3 border border-zinc-600 text-zinc-300 rounded-lg hover:bg-zinc-700 transition-colors font-medium"
                  >
                    {currentTranslations.back}
                  </button>
                  <button
                    onClick={handleContinue}
                    disabled={!contactInfo.firstName || !contactInfo.lastName || !contactInfo.email || !contactInfo.phone}
                    className={`
                      px-8 py-3 rounded-lg font-semibold transition-all duration-200
                      ${contactInfo.firstName && contactInfo.lastName && contactInfo.email && contactInfo.phone
                        ? 'bg-amber-500 text-zinc-900 hover:bg-amber-600 shadow-lg hover:shadow-xl'
                        : 'bg-zinc-600 text-zinc-400 cursor-not-allowed'
                      }
                    `}
                  >
                    {currentTranslations.confirmReservation}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;