'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Hero from '@/components/sections/Hero';
import Menu from '@/components/sections/Menu';
import Booking from '@/components/sections/Booking';
import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';
import Cart from '@/components/cart/Cart';

export default function Home() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-900">
      <Header onCartClick={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <Menu />
        <Booking />
        <About />
        <Contact />
      </main>
      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}