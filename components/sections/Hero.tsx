import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-bold font-playfair text-white mb-6">
          {t('hero.title').split(' ')[0]}
          <span className="block text-amber-400">{t('hero.title').split(' ')[1]}</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-200 mb-8 max-w-3xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold px-8 py-4 text-lg"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('hero.reserve')}
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-zinc-900 px-8 py-4 text-lg"
            onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('hero.menu')}
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <ArrowDown className="h-6 w-6 text-amber-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
}