import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface EventItem {
  id: number;
  title: string;
  date: string;
  location: string;
  price: number;
  earlyBirdPrice?: number;
  industryPrice?: number;
  industryEarlyBird?: number;
  consultingPrice?: number;
  consultingEarlyBird?: number;
  category: string;
  duration: string;
  seats: string;
  registered: number;
  featured: boolean;
  description: string;
  benefits: string[];
  selectedPrice?: number;
  selectedType?: 'Industry' | 'Consulting';
}

interface CartState {
  items: EventItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<EventItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (!existingItem) {
        state.items.push(action.payload);
        state.totalAmount = state.items.reduce((total, item) => {
          return total + (item.selectedPrice || item.price || 0);
        }, 0);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.totalAmount = state.items.reduce((total, item) => {
        return total + (item.selectedPrice || item.price || 0);
      }, 0);
    },
    updateCartItem: (state, action: PayloadAction<{ id: number; selectedPrice?: number; selectedType?: 'Industry' | 'Consulting' }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        if (action.payload.selectedPrice !== undefined) {
          item.selectedPrice = action.payload.selectedPrice;
        }
        if (action.payload.selectedType !== undefined) {
          item.selectedType = action.payload.selectedType;
        }
        state.totalAmount = state.items.reduce((total, item) => {
          return total + (item.selectedPrice || item.price || 0);
        }, 0);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

