export interface Customer {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'blocked';
  registrationDate: string;
  orders: number;
  totalSpent: string;
  lastOrder: string;
  phone: string;
  address: string;
}
