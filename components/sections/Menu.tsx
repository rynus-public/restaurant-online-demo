'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';

// Define shared menu item types so optional flags (spicy, vegetarian, featured) are recognized across categories
type MenuCategory = 'recommendations' | 'appetizers' | 'salads' | 'mains' | 'beverages';

interface MenuItem {
  id: string;
  name: string;
  nameEn: string;
  nameVi: string;
  description: string;
  descriptionEn: string;
  descriptionVi: string;
  price: number;
  image: string;
  category: MenuCategory;
  featured?: boolean;
  vegetarian?: boolean;
  spicy?: boolean;
}

const menuItems: Record<MenuCategory, MenuItem[]> = {
  recommendations: [
    {
      id: '310-avocado-tatar',
      name: 'Avocado-Tatar',
      nameEn: 'Avocado Tartare',
      nameVi: 'Tatar Bơ',
      description: 'Frisches Avocado-Tatar mit Limette und Koriander',
      descriptionEn: 'Fresh avocado tartare with lime and cilantro',
      descriptionVi: 'Tatar bơ tươi với chanh và rau mùi',
      price: 14.50,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      category: 'recommendations',
      featured: true,
    },
    {
      id: '119-wagyu-tatar',
      name: 'Wagyu-Tatar',
      nameEn: 'Wagyu Tartare',
      nameVi: 'Tatar Wagyu',
      description: 'mit Wachtelei und Walnussbrot',
      descriptionEn: 'with quail egg and walnut bread',
      descriptionVi: 'với trứng cút và bánh mì óc chó',
      price: 20.00,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      category: 'recommendations',
      featured: true,
    },
    {
      id: '219-carpaccio-bluefin',
      name: 'Carpaccio vom Bluefin-Tuna',
      nameEn: 'Bluefin Tuna Carpaccio',
      nameVi: 'Carpaccio Cá Ngừ Bluefin',
      description: 'Avocado, Mango, Passionsfrucht und Yuzu-Vinaigrette',
      descriptionEn: 'Avocado, mango, passion fruit and yuzu vinaigrette',
      descriptionVi: 'Bơ, xoài, chanh dây và sốt yuzu',
      price: 30.00,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      category: 'recommendations',
      featured: true,
    },
    {
      id: '160-wildfang-steinbutt',
      name: 'Wildfang Steinbutt',
      nameEn: 'Wild Turbot',
      nameVi: 'Cá Bơn Hoang Dã',
      description: 'mit Spinat & Lauchpüree',
      descriptionEn: 'with spinach & leek puree',
      descriptionVi: 'với rau bina và tỏi tây nghiền',
      price: 70.00,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      category: 'recommendations',
    },
    {
      id: '120-lauwarmer-oktopus',
      name: 'Lauwarmer Oktopus',
      nameEn: 'Warm Octopus',
      nameVi: 'Bạch Tuộc Ấm',
      description: 'mit Avocado und Gartentomaten',
      descriptionEn: 'with avocado and garden tomatoes',
      descriptionVi: 'với bơ và cà chua vườn',
      price: 23.00,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      category: 'recommendations',
    },
    {
      id: '204-wiener-schnitzel',
      name: 'Wiener Schnitzel',
      nameEn: 'Viennese Schnitzel',
      nameVi: 'Schnitzel Vienna',
      description: 'mit Röstkartoffeln, Preiselbeeren und Salat',
      descriptionEn: 'with roasted potatoes, cranberries and salad',
      descriptionVi: 'với khoai tây nướng, nam việt quất và salad',
      price: 32.00,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      category: 'recommendations',
    },
  ],
  appetizers: [
    {
      id: '116-poh-piard-tord',
      name: 'Poh Piard Tord',
      nameEn: 'Poh Piard Tord',
      nameVi: 'Poh Piard Tord',
      description: '6 hausgemachte Frühlingsrollen, vegetarisch',
      descriptionEn: '6 homemade spring rolls, vegetarian',
      descriptionVi: '6 chả giò tự làm, chay',
      price: 13.00,
      image: 'https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg',
      category: 'appetizers',
      vegetarian: true,
    },
    {
      id: '117-thunfischtatar',
      name: 'Thunfischtatar',
      nameEn: 'Tuna Tartare',
      nameVi: 'Tatar Cá Ngừ',
      description: 'pikant angemacht mit Flugfischkaviar, grüne Algen und Reisplätzchen',
      descriptionEn: 'spicy preparation with flying fish caviar, green algae and rice crackers',
      descriptionVi: 'gia vị cay với trứng cá bay, tảo xanh và bánh gạo',
      price: 26.00,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      category: 'appetizers',
    },
    {
      id: '115-ebi-fry',
      name: 'Ebi Fry',
      nameEn: 'Ebi Fry',
      nameVi: 'Ebi Fry',
      description: '5 große japanische Garnelen, gebacken',
      descriptionEn: '5 large Japanese prawns, fried',
      descriptionVi: '5 tôm Nhật lớn, chiên',
      price: 16.00,
      image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg',
      category: 'appetizers',
    },
    {
      id: '118-lachstatar',
      name: 'Lachstatar',
      nameEn: 'Salmon Tartare',
      nameVi: 'Tatar Cá Hồi',
      description: 'pikant angemacht, Lachskaviar, grüne Algen und Reisplätzchen',
      descriptionEn: 'spicy preparation, salmon caviar, green algae and rice crackers',
      descriptionVi: 'gia vị cay, trứng cá hồi, tảo xanh và bánh gạo',
      price: 22.00,
      image: 'https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg',
      category: 'appetizers',
    },
    {
      id: '114-satay-thai-gai',
      name: 'Satay Thai Gai',
      nameEn: 'Thai Chicken Satay',
      nameVi: 'Satay Gà Thái',
      description: '6 Maishähnchenspieße, Erdnusssauce und Gurken-Chili-Dip',
      descriptionEn: '6 corn chicken skewers, peanut sauce and cucumber chili dip',
      descriptionVi: '6 xiên gà, sốt đậu phộng và tương ớt dưa chuột',
      price: 13.00,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      category: 'appetizers',
    },
    {
      id: '110-shio-edamame',
      name: 'Shio Edamame',
      nameEn: 'Salted Edamame',
      nameVi: 'Đậu Nành Muối',
      description: 'gekochte japanische grüne Bohnen',
      descriptionEn: 'cooked Japanese green beans',
      descriptionVi: 'đậu xanh Nhật luộc',
      price: 7.50,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      category: 'appetizers',
      vegetarian: true,
    },
  ],
  salads: [
    {
      id: '142-yam-wun-sen',
      name: 'Yam Wun Sen',
      nameEn: 'Glass Noodle Salad',
      nameVi: 'Nộm Miến',
      description: 'Glasnudelsalat mit Wildfang-Garnelen, mild scharf',
      descriptionEn: 'Glass noodle salad with wild prawns, mildly spicy',
      descriptionVi: 'Nộm miến với tôm hoang dã, cay nhẹ',
      price: 22.00,
      image: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg',
      category: 'salads',
      spicy: true,
    },
    {
      id: '145-som-tam-pu-nim',
      name: 'Som Tam Pu Nim',
      nameEn: 'Green Papaya Salad',
      nameVi: 'Nộm Đu Đủ',
      description: 'grüner Papayasalat, mit Soft Shell Crab Tempura, scharf angemacht',
      descriptionEn: 'green papaya salad with soft shell crab tempura, spicy',
      descriptionVi: 'nộm đu đủ xanh với cua lột tempura, cay',
      price: 26.00,
      image: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg',
      category: 'salads',
      spicy: true,
    },
  ],
  mains: [
    {
      id: 'pad-thai',
      name: 'Pad Thai',
      nameEn: 'Traditional Pad Thai',
      nameVi: 'Pad Thai Truyền Thống',
      description: 'Gebratene Reisnudeln mit Garnelen, Tofu, Sojasprossen und Tamarindensauce',
      descriptionEn: 'Stir-fried rice noodles with shrimp, tofu, bean sprouts, and tamarind sauce',
      descriptionVi: 'Bánh phở xào với tôm, đậu phụ, giá đỗ và sốt me',
      price: 18.50,
      image: 'https://images.pexels.com/photos/1143754/pexels-photo-1143754.jpeg',
      category: 'mains',
      spicy: true,
    },
    {
      id: 'kung-pao',
      name: 'Kung Pao Hähnchen',
      nameEn: 'Kung Pao Chicken',
      nameVi: 'Gà Kung Pao',
      description: 'Gewürfeltes Hähnchen mit Erdnüssen, Gemüse und Chilischoten in würziger Sauce',
      descriptionEn: 'Diced chicken with peanuts, vegetables, and chili peppers in savory sauce',
      descriptionVi: 'Gà thái hạt lựu với đậu phộng, rau củ và ớt trong sốt đậm đà',
      price: 19.00,
      image: 'https://images.pexels.com/photos/2347311/pexels-photo-2347311.jpeg',
      category: 'mains',
      spicy: true,
    },
  ],
  beverages: [
    {
      id: 'thai-tea',
      name: 'Thai Eistee',
      nameEn: 'Thai Iced Tea',
      nameVi: 'Trà Thái Đá',
      description: 'Traditioneller Thai-Tee mit Kondensmilch und Eis',
      descriptionEn: 'Traditional Thai tea with condensed milk and ice',
      descriptionVi: 'Trà Thái truyền thống với sữa đặc và đá',
      price: 5.50,
      image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg',
      category: 'beverages',
      vegetarian: true,
    },
  ],
};

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('recommendations');
  const { addItem } = useCart();
  const { t, language } = useLanguage();

  const menuCategories: { id: MenuCategory; name: string }[] = [
    { id: 'recommendations', name: t('menu.recommendations') },
    { id: 'appetizers', name: t('menu.appetizers') },
    { id: 'salads', name: t('menu.salads') },
    { id: 'mains', name: t('menu.mains') },
    { id: 'beverages', name: t('menu.beverages') },
  ];

  const handleAddToCart = (item: MenuItem) => {
    const itemName = language === 'en' ? item.nameEn : language === 'vi' ? item.nameVi : item.name;
    addItem({
      id: item.id,
      name: itemName,
      price: item.price,
      image: item.image,
    });
  };

  const getItemName = (item: MenuItem) => {
    return language === 'en' ? item.nameEn : language === 'vi' ? item.nameVi : item.name;
  };

  const getItemDescription = (item: MenuItem) => {
    return language === 'en' ? item.descriptionEn : language === 'vi' ? item.descriptionVi : item.description;
  };

  return (
    <section id="menu" className="py-20 bg-zinc-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-playfair text-white mb-4">
            {t('menu.title')}
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            {t('menu.subtitle')}
          </p>
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {menuCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className={`${
                activeCategory === category.id
                  ? 'bg-amber-500 text-zinc-900 hover:bg-amber-600'
                  : 'border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-zinc-900'
              } px-6 py-2 font-semibold`}
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Featured Banner for Recommendations */}
        {activeCategory === 'recommendations' && (
          <div className="mb-12">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"
                alt="Restaurant recommendations"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-3xl font-bold text-white font-playfair">
                  {t('menu.ourRecommendations')}
                </h3>
              </div>
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems[activeCategory]?.map((item) => (
            <Card key={item.id} className="bg-zinc-800 border-zinc-700 overflow-hidden hover:border-amber-400 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={getItemName(item)}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  {item.spicy && (
                    <Badge variant="destructive" className="bg-red-600">
                      {t('menu.spicy')}
                    </Badge>
                  )}
                  {item.vegetarian && (
                    <Badge variant="secondary" className="bg-green-600 text-white">
                      {t('menu.vegetarian')}
                    </Badge>
                  )}
                  {item.featured && (
                    <Badge className="bg-amber-500 text-zinc-900">
                      {t('menu.featured')}
                    </Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white">{getItemName(item)}</h3>
                  <span className="text-amber-400 font-bold text-lg">€{item.price.toFixed(2)}</span>
                </div>
                <p className="text-zinc-400 mb-4 line-clamp-2">{getItemDescription(item)}</p>
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-900 font-semibold"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('menu.addToOrder')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}