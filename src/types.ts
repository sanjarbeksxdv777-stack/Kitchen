export type UserRole = 'admin' | 'student' | 'teacher';

export interface User {
  username: string;
  role: UserRole;
  name: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'meals' | 'drinks' | 'snacks';
  image: string;
}
