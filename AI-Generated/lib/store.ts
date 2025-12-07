import { create } from 'zustand';
import { Order, initialOrders, MenuItem } from './menuData';

interface CartItem extends MenuItem {
  quantity: number;
}

interface User {
  name: string;
  uid: string;
  role: 'customer' | 'waiter' | 'owner' | 'rider';
}

interface StoreState {
  cart: CartItem[];
  orders: Order[];
  currentUser: User | null;
  isDeliveryMode: boolean;
  deliveryInfo: {
    name: string;
    phone: string;
    address: string;
  };
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, delta: number) => void;
  clearCart: () => void;
  placeOrder: () => Order | null;
  setUser: (user: User | null) => void;
  updateOrderStatus: (orderId: number, status: Order['status']) => void;
  assignRider: (orderId: number, riderName: string) => void;
  setDeliveryMode: (isDelivery: boolean) => void;
  setDeliveryInfo: (info: { name: string; phone: string; address: string }) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  orders: initialOrders,
  currentUser: null,
  isDeliveryMode: false,
  deliveryInfo: { name: '', phone: '', address: '' },

  addToCart: (item) => {
    set((state) => {
      const existing = state.cart.find((c) => c.id === item.id);
      if (existing) {
        return {
          cart: state.cart.map((c) =>
            c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
          ),
        };
      }
      return { cart: [...state.cart, { ...item, quantity: 1 }] };
    });
  },

  removeFromCart: (itemId) => {
    set((state) => ({
      cart: state.cart.filter((c) => c.id !== itemId),
    }));
  },

  updateQuantity: (itemId, delta) => {
    set((state) => {
      const item = state.cart.find((c) => c.id === itemId);
      if (!item) return state;
      
      const newQuantity = item.quantity + delta;
      if (newQuantity <= 0) {
        return { cart: state.cart.filter((c) => c.id !== itemId) };
      }
      return {
        cart: state.cart.map((c) =>
          c.id === itemId ? { ...c, quantity: newQuantity } : c
        ),
      };
    });
  },

  clearCart: () => set({ cart: [] }),

  placeOrder: () => {
    const { cart, currentUser, isDeliveryMode, deliveryInfo } = get();
    if (cart.length === 0) return null;

    const itemsDesc = cart.map((i) => `${i.name} x${i.quantity}`).join(', ');
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order: Order = {
      id: Math.floor(Math.random() * 9000) + 1000,
      date: new Date().toISOString().split('T')[0],
      items: itemsDesc,
      total,
      status: 'pending',
      isDelivery: isDeliveryMode,
      ...(isDeliveryMode
        ? {
            address: deliveryInfo.address,
            customerName: deliveryInfo.name,
            customerPhone: deliveryInfo.phone,
          }
        : {
            tableNo: 'T' + (Math.floor(Math.random() * 10) + 1),
            waiter: currentUser?.role === 'waiter' ? currentUser.name : 'Unassigned',
          }),
    };

    set((state) => ({
      orders: [order, ...state.orders],
      cart: [],
      deliveryInfo: { name: '', phone: '', address: '' },
    }));

    return order;
  },

  setUser: (user) => set({ currentUser: user }),

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, status } : o
      ),
    }));
  },

  assignRider: (orderId, riderName) => {
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === orderId ? { ...o, rider: riderName, status: 'delivering' } : o
      ),
    }));
  },

  setDeliveryMode: (isDelivery) => set({ isDeliveryMode: isDelivery }),

  setDeliveryInfo: (info) => set({ deliveryInfo: info }),
}));
