export interface Chat {
  id: number;
  name: string;
  status: "active" | "closed";
  assignedAgent: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  phone: string;
  email: string;
  messages: Message[];
  cartItems?: CartItem[];
}

export interface Message {
  id: number;
  content: string;
  timestamp: string;
  sender: "customer" | "agent";
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
