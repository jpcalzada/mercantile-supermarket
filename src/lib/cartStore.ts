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

let saveTimer: ReturnType<typeof setTimeout> | null = null;
function debouncedSave(items: CartItem[]) {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveCart(items), 300);
}

export const $cartItems = atom<CartItem[]>(loadCart());

// Persist with debounce to avoid excessive writes
$cartItems.listen((items) => debouncedSave(items));

export const $cartTotal = computed($cartItems, (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

export const $cartCount = computed($cartItems, (items) => items.length);

export function addToCart(product: {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
}, qty = 1) {
  const current = $cartItems.get();
  const existing = current.find((item) => item.id === product.id);

  if (existing) {
    $cartItems.set(
      current.map((item) =>
        item.id === product.id
          ? { ...item, quantity: Math.min(item.quantity + qty, 100) }
          : item
      )
    );
  } else {
    $cartItems.set([...current, { ...product, quantity: Math.min(qty, 100) }]);
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
  const capped = Math.min(quantity, 100);
  $cartItems.set(
    $cartItems.get().map((item) =>
      item.id === id ? { ...item, quantity: capped } : item
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

export function clearCart() {
  $cartItems.set([]);
}
