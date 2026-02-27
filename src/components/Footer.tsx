import React from 'react';
import { UtensilsCrossed, Instagram, Send, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-white">Maktab Oshxonasi</span>
          </div>
          <p className="text-sm text-stone-400 leading-relaxed max-w-xs">
            O'quvchilar va o'qituvchilar uchun mazali, sifatli va hamyonbop taomlar. Bizning maqsadimiz - sog'lom ovqatlanishni ta'minlash.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-orange-500 transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Send className="w-5 h-5" /></a>
            <a href="#" className="hover:text-orange-500 transition-colors"><Facebook className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-bold mb-4">Foydali havolalar</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-orange-500 transition-colors">Bosh sahifa</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Menyu</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Biz haqimizda</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Bog'lanish</a></li>
            <li><a href="#" className="hover:text-orange-500 transition-colors">Maxfiylik siyosati</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold mb-4">Bog'lanish</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-orange-500" />
              <span>+998 90 123 45 67</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-orange-500" />
              <span>info@maktab-oshxonasi.uz</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Toshkent sh., Yunusobod t., 12-maktab</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
        &copy; {new Date().getFullYear()} Maktab Oshxonasi. Barcha huquqlar himoyalangan.
      </div>
    </footer>
  );
}
