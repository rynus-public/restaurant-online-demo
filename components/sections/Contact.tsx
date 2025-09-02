import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 bg-zinc-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-zinc-900 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-amber-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{t('contact.address')}</h3>
                    <p className="text-zinc-300">
                      Musterstraße 123<br />
                      12345 Berlin<br />
                      Germany
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-amber-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{t('contact.phone')}</h3>
                    <p className="text-zinc-300">+49 30 12345678</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-amber-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{t('contact.email')}</h3>
                    <p className="text-zinc-300">info@chang-restaurant.de</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-amber-400 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{t('contact.hours')}</h3>
                    <div className="text-zinc-300 space-y-1">
                      <p>Mon-Thu: 17:00 - 22:00</p>
                      <p>Fri-Sat: 17:00 - 23:00</p>
                      <p>Sunday: 17:00 - 21:30</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map Placeholder */}
          <div className="bg-zinc-700 rounded-lg overflow-hidden h-96 lg:h-full">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-16 w-16 text-amber-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{t('contact.findUs')}</h3>
                <p className="text-zinc-400">{t('contact.mapComing')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}