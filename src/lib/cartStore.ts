import { atom, computed } from 'nanostores';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
  image: string;
  notes?: string;
}

// Hydrate from localStorage on init
function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('mercantile-cart');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('mercantile-cart', JSON.stringify(items));
  } catch {
    // storage full or unavailable
  }
}

export const $cartItems = atom<CartItem[]>(loadCart());

// Persist on every change
$cartItems.listen((items) => saveCart(items));

export const $cartTotal = computed($cartItems, (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const $cartCount = computed($cartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0)
);

export function addToCart(product: {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
}) {
  const current = $cartItems.get();
  const existing = current.find((item) => item.id === product.id);

  if (existing) {
    $cartItems.set(
      current.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  } else {
    $cartItems.set([...current, { ...product, quantity: 1 }]);
  }
}

export function removeFromCart(id: string) {
  $cartItems.set($cartItems.get().filter((item) => item.id !== id));
}

export function updateQuantity(id: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(id);
    return;
  }
  $cartItems.set(
    $cartItems.get().map((item) =>
      item.id === id ? { ...item, quantity } : item
    )
  );
}

export function updateNotes(id: string, notes: string) {
  $cartItems.set(
    $cartItems.get().map((item) =>
      item.id === id ? { ...item, notes } : item
    )
  );
}
