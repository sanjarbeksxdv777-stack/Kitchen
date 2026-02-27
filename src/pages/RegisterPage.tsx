import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { UserPlus, User, Lock, Type } from 'lucide-react';

interface RegisterPageProps {
  onSwitchToLogin: () => void;
}

export default function RegisterPage({ onSwitchToLogin }: RegisterPageProps) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !password) {
      setError('Iltimos, barcha maydonlarni to\'ldiring');
      return;
    }

    const success = register(username, name);
    if (!success) {
      setError('Bu foydalanuvchi nomi band');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 p-4">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden"
      >
        <div className="bg-green-600 p-8 text-center">
          <div className="mx-auto bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <UserPlus className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Ro'yxatdan o'tish</h1>
          <p className="text-green-100 mt-2">Yangi hisob yarating va buyurtma bering!</p>
        </div>

        <div className="p-8">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 rounded-lg border border-red-100">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Ism-familiya</label>
              <div className="relative">
                <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Ismingizni kiriting" 
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-xl"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Foydalanuvchi nomi (Login)</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder="Login o'ylab toping" 
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-xl"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 ml-1">Parol</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  type="password" 
                  placeholder="Parol o'ylab toping" 
                  className="pl-10 bg-gray-50 border-gray-200 focus:border-green-500 focus:ring-green-500 rounded-xl"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white h-12 rounded-xl mt-6 shadow-lg shadow-green-200">
              Ro'yxatdan o'tish
            </Button>
            
            <div className="text-center mt-6">
              <button 
                type="button"
                onClick={onSwitchToLogin}
                className="text-sm text-gray-500 hover:text-green-600 font-medium transition-colors"
              >
                Hisobingiz bormi? Kirish
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
