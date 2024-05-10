import { create, SetState } from 'zustand';

interface CartState {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (index: number) => void;
  incrementQuantity: (index: number) => void;
  decrementQuantity: (index: number) => void;
  clearCart: () => void;
}

interface Item {
  title: string;
  price: number;
  quantity: number;
}

const useCartStore = create<CartState>((set: SetState<CartState>) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      ...state,
      items: state.items.some((i) => i.title === item.title)
        ? state.items.map((i) =>
            i.title === item.title ? { ...i, quantity: i.quantity + 1 } : i
          )
        : [...state.items, { ...item, quantity: 1 }],
    })),

  removeItem: (index) =>
    set((state) => ({
      ...state,
      items: state.items.filter((_, i) => i !== index),
    })),

  incrementQuantity: (index) =>
    set((state) => ({
      ...state,
      items: state.items.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  decrementQuantity: (index) =>
    set((state) => ({
      ...state,
      items: state.items.map((item, i) =>
        i === index
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      ),
    })),

  clearCart: () => set({ items: [] }),
}));

export default useCartStore;
