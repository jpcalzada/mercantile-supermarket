export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  phone: string;
  items: OrderItem[];
  total: number;
  status: 'received' | 'baking' | 'ready' | 'delivered';
  createdAt: string;
}

// In-memory store keyed by phone number
const orders = new Map<string, Order[]>();

function generateOrderId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `MRC-${code}`;
}

export function saveOrder(phone: string, items: OrderItem[], total: number): Order {
  const order: Order = {
    id: generateOrderId(),
    phone,
    items,
    total,
    status: 'received',
    createdAt: new Date().toISOString(),
  };

  const existing = orders.get(phone) || [];
  existing.push(order);
  orders.set(phone, existing);

  return order;
}

export function getLatestOrder(phone: string): Order | null {
  const userOrders = orders.get(phone);
  if (!userOrders || userOrders.length === 0) return null;
  return userOrders[userOrders.length - 1];
}

export function getAllOrders(phone: string): Order[] {
  const userOrders = orders.get(phone);
  if (!userOrders || userOrders.length === 0) return [];
  return [...userOrders].reverse();
}

export function getActiveOrders(phone: string): Order[] {
  const userOrders = orders.get(phone);
  if (!userOrders || userOrders.length === 0) return [];
  return [...userOrders].filter((o) => o.status !== 'delivered').reverse();
}
