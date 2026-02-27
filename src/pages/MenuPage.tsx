import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { INITIAL_MENU } from '../data/menu';
import { MenuItem } from '../types';
import { Button } from '../components/ui/button';
import { LogOut, Plus, Search, Trash2, ShoppingBag } from 'lucide-react';
import { Input } from '../components/ui/input';
import { cn } from '@/lib/utils';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';

export default function MenuPage() {
  const { user, logout } = useAuth();
  const { addToCart, itemCount, setIsOpen } = useCart();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(INITIAL_MENU);
  const [filter, setFilter] = useState<'all' | 'meals' | 'drinks' | 'snacks'>('all');
  const [search, setSearch] = useState('');
  
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    category: 'meals',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'
  });

  const handleDelete = (id: string) => {
    if (confirm('Rostdan ham o\'chirmoqchimisiz?')) {
      setMenuItems(prev => prev.filter(item => item.id !== id));
      toast.success("Taom o'chirildi");
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.name || !newItem.price) return;

    const item: MenuItem = {
      id: Date.now().toString(),
      name: newItem.name,
      description: newItem.description || '',
      price: Number(newItem.price),
      category: newItem.category as any,
      image: newItem.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop'
    };

    setMenuItems(prev => [item, ...prev]);
    setIsAdding(false);
    setNewItem({ category: 'meals', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop' });
    toast.success("Yangi taom qo'shildi");
  };

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
    toast.success(`${item.name} savatga qo'shildi`);
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <CartDrawer />
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-orange-200">
              M
            </div>
            <div>
              <span className="font-bold text-stone-800 text-lg leading-none block">Maktab</span>
              <span className="text-stone-500 text-xs font-medium uppercase tracking-wider">Oshxonasi</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs text-stone-400 font-medium uppercase tracking-wider">Foydalanuvchi</span>
              <span className="font-bold text-stone-800">{user?.name}</span>
            </div>
            
            <div className="h-8 w-px bg-stone-200 hidden md:block"></div>

            <button 
              onClick={() => setIsOpen(true)}
              className="relative p-3 bg-stone-100 hover:bg-orange-50 text-stone-600 hover:text-orange-600 rounded-xl transition-colors group"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {itemCount}
                </span>
              )}
            </button>

            <Button variant="ghost" size="sm" onClick={logout} className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-xl">
              <LogOut className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Chiqish</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {/* Hero Section */}
        <div className="mb-10 bg-stone-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-500/20 to-transparent"></div>
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Bugun nima <br/><span className="text-orange-400">tanovul qilasiz?</span></h1>
            <p className="text-stone-300 text-lg mb-8 max-w-lg">Bizning oshxonamizda har kuni yangi va mazali taomlar tayyorlanadi.</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <input 
                  placeholder="Taomlarni qidirish..." 
                  className="w-full pl-12 pr-4 h-14 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-6 mb-8 justify-between items-start md:items-center sticky top-24 z-20 bg-stone-50/95 backdrop-blur-sm py-4 -mx-4 px-4 md:mx-0 md:px-0 transition-all">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>Barchasi</FilterButton>
            <FilterButton active={filter === 'meals'} onClick={() => setFilter('meals')}>Taomlar</FilterButton>
            <FilterButton active={filter === 'snacks'} onClick={() => setFilter('snacks')}>Yeguliklar</FilterButton>
            <FilterButton active={filter === 'drinks'} onClick={() => setFilter('drinks')}>Ichimliklar</FilterButton>
          </div>

          {user?.role === 'admin' && (
            <Button 
              onClick={() => setIsAdding(!isAdding)}
              className={isAdding ? "bg-stone-200 text-stone-800 hover:bg-stone-300 rounded-xl" : "bg-green-600 hover:bg-green-700 rounded-xl shadow-lg shadow-green-200"}
            >
              {isAdding ? "Bekor qilish" : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Yangi taom qo'shish
                </>
              )}
            </Button>
          )}
        </div>

        {/* Add Item Form */}
        <AnimatePresence>
          {isAdding && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleAddItem}
              className="mb-8 overflow-hidden"
            >
              <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-600">Taom nomi</label>
                  <Input 
                    placeholder="Masalan: Osh" 
                    required
                    className="h-12 rounded-xl"
                    value={newItem.name || ''}
                    onChange={e => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-600">Narxi</label>
                  <Input 
                    placeholder="So'mda kiriting" 
                    type="number"
                    required
                    className="h-12 rounded-xl"
                    value={newItem.price || ''}
                    onChange={e => setNewItem({...newItem, price: Number(e.target.value)})}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-stone-600">Tavsif</label>
                  <Input 
                    placeholder="Taom haqida qisqacha ma'lumot" 
                    className="h-12 rounded-xl"
                    value={newItem.description || ''}
                    onChange={e => setNewItem({...newItem, description: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-600">Kategoriya</label>
                  <select 
                    className="flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={newItem.category}
                    onChange={e => setNewItem({...newItem, category: e.target.value as any})}
                  >
                    <option value="meals">Taomlar</option>
                    <option value="snacks">Yeguliklar</option>
                    <option value="drinks">Ichimliklar</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-600">Rasm URL</label>
                  <Input 
                    placeholder="https://..." 
                    className="h-12 rounded-xl"
                    value={newItem.image || ''}
                    onChange={e => setNewItem({...newItem, image: e.target.value})}
                  />
                </div>
                <Button type="submit" className="md:col-span-2 bg-orange-600 hover:bg-orange-700 text-white h-12 rounded-xl mt-2">
                  Saqlash
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-stone-100">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-sm font-bold text-stone-800 shadow-sm border border-white/50">
                  {item.price.toLocaleString()} so'm
                </div>
                {user?.role === 'admin' && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item.id);
                    }}
                    className="absolute top-3 left-3 bg-white/90 backdrop-blur-md p-2 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm border border-white/50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="p-5 flex flex-col flex-1">
                <div className="mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                    {item.category === 'meals' ? 'Taom' : item.category === 'drinks' ? 'Ichimlik' : 'Yegulik'}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-stone-800 mb-2 line-clamp-1">{item.name}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                  {item.description}
                </p>
                <Button 
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-stone-900 hover:bg-stone-800 text-white rounded-xl h-11 shadow-lg shadow-stone-200 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Savatga qo'shish
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-stone-300" />
            </div>
            <h3 className="text-xl font-bold text-stone-800">Hech narsa topilmadi</h3>
            <p className="text-stone-500 mt-2">Boshqa so'z bilan qidirib ko'ring</p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}

function FilterButton({ active, children, onClick }: { active: boolean, children: React.ReactNode, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-5 py-2.5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
        active 
          ? "bg-stone-900 text-white shadow-lg shadow-stone-200 scale-105" 
          : "bg-white text-stone-500 hover:bg-stone-50 hover:text-stone-800 border border-stone-200"
      )}
    >
      {children}
    </button>
  );
}
