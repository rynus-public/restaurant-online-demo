import { Card, CardContent } from '@/components/ui/card';
import { Award, Heart, Utensils } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg"
              alt="Chef preparing food"
              className="w-full h-96 object-cover rounded-lg shadow-xl"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl font-bold font-playfair text-amber-400">
              {t('about.story')}
            </h3>
            <p className="text-zinc-300 text-lg leading-relaxed">
              {t('about.storyText1')}
            </p>
            <p className="text-zinc-300 text-lg leading-relaxed">
              {t('about.storyText2')}
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-zinc-800 border-zinc-700 text-center">
            <CardContent className="p-8">
              <Award className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">{t('about.awardWinning')}</h3>
              <p className="text-zinc-400">
                {t('about.awardText')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800 border-zinc-700 text-center">
            <CardContent className="p-8">
              <Heart className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">{t('about.madeWithLove')}</h3>
              <p className="text-zinc-400">
                {t('about.loveText')}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-zinc-800 border-zinc-700 text-center">
            <CardContent className="p-8">
              <Utensils className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">{t('about.freshIngredients')}</h3>
              <p className="text-zinc-400">
                {t('about.freshText')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}