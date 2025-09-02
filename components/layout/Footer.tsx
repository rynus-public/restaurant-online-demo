import { Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-zinc-950 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold font-playfair text-amber-400 mb-4">
              Chang Restaurant
            </h3>
            <p className="text-zinc-400 mb-6 max-w-md">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-amber-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-zinc-400 hover:text-amber-400 transition-colors">{t('nav.home')}</a></li>
              <li><a href="#menu" className="text-zinc-400 hover:text-amber-400 transition-colors">{t('nav.menu')}</a></li>
              <li><a href="#booking" className="text-zinc-400 hover:text-amber-400 transition-colors">{t('nav.booking')}</a></li>
              <li><a href="#about" className="text-zinc-400 hover:text-amber-400 transition-colors">{t('nav.about')}</a></li>
              <li><a href="#contact" className="text-zinc-400 hover:text-amber-400 transition-colors">{t('nav.contact')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{t('footer.contact')}</h4>
            <div className="space-y-2 text-zinc-400">
              <p>Musterstraße 123</p>
              <p>12345 Berlin, Germany</p>
              <p>+49 30 12345678</p>
              <p>info@chang-restaurant.de</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-8 pt-8 text-center">
          <p className="text-zinc-400">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}