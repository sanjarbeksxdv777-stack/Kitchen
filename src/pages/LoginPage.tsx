import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { UtensilsCrossed, ChefHat, User } from 'lucide-react';

interface LoginPageProps {
  onSwitchToRegister: () => void;
}

export default function LoginPage({ onSwitchToRegister }: LoginPageProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    // Attempt login with admin/admin or registered user
    // For demo simplicity, if it's admin/admin we pass 'admin' role
    // If it's anything else, we try to find it in registered users or just let them in as student
    let role: 'admin' | 'student' = 'student';
    if (username === 'admin' && password === 'admin') {
      role = 'admin';
    }
    
    // In a real app, login would return success/fail based on password check
    // Here we just simulate it
    login(username, role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="bg-orange-600 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-10"></div>
          <div className="relative z-10">
            <div className="mx-auto bg-white/20 w-20 h-20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-md shadow-inner border border-white/30">
              <UtensilsCrossed className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Maktab Oshxonasi</h1>
            <p className="text-orange-100 mt-2 font-medium">Mazali taomlar sizni kutmoqda!</p>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Foydalanuvchi nomi</label>
              <div className="relative group">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <Input 
                  type="text" 
                  placeholder="admin yoki o'quvchi" 
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl transition-all"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 ml-1">Parol</label>
              <div className="relative group">
                <ChefHat className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <Input 
                  type="password" 
                  placeholder="******" 
                  className="pl-10 h-12 bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-xl transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 rounded-xl mt-6 shadow-lg shadow-orange-200 font-semibold text-lg">
              Kirish
            </Button>
            
            <div className="flex flex-col items-center gap-4 mt-6 pt-6 border-t border-gray-100">
              <button 
                type="button"
                onClick={onSwitchToRegister}
                className="text-sm text-gray-500 hover:text-orange-600 font-medium transition-colors"
              >
                Hisobingiz yo'qmi? <span className="text-orange-600 underline decoration-orange-200 underline-offset-2">Ro'yxatdan o'tish</span>
              </button>
              
              <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                Demo: <b>admin/admin</b>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
