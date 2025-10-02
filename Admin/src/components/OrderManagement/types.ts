export interface Order {
  id: string;
  customer: string;
  store: string;
  items: number;
  total: string;
  status: string;
  orderDate: string;
  deliveryDate: string | null;
  shippingAddress: string;
  paymentMethod: string;
  subOrders: SubOrder[];
  products: Product[];
}

export interface SubOrder {
  id: string;
  status: string;
  items: number;
}

export interface Product {
  name: string;
  quantity: number;
  price: string;
}
