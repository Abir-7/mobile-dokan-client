import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartItem {
  productId: string;
  brand: string;
  model: string;
  image: string; // URL or path to the product image
  variant: {
    storage: string;
    ram: string;
    color: string; // Single color as a string
    price: number; // Price per unit
    stockQuantity: number;
    _id: string; // Variant ID
  };
  quantity: number; // Number of items in the cart
}

interface CartState {
  items: ICartItem[];
  totalAmount: number; // Total price of all items in the cart
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const { productId, variant, quantity } = action.payload;

      // Check if the product already exists in the cart
      const existingItem = state.items.find(
        (item) =>
          item.productId === productId &&
          item.variant.ram === variant.ram &&
          item.variant.storage === variant.storage &&
          item.variant.color === variant.color
      );

      if (existingItem) {
        // If exists, update the quantity
        existingItem.quantity += quantity;
      } else {
        // If not, add a new item to the cart
        state.items.push(action.payload);
      }

      // Recalculate total cart amount
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.quantity * item.variant.price,
        0
      );
    },
    removeFromCart(
      state,
      action: PayloadAction<{
        productId: string;
        ram: string;
        storage: string;
        color: string;
      }>
    ) {
      const { productId, ram, storage, color } = action.payload;

      // Remove the item matching the criteria
      state.items = state.items.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.variant.ram === ram &&
            item.variant.storage === storage &&
            item.variant.color === color
          )
      );

      // Recalculate total cart amount
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.quantity * item.variant.price,
        0
      );
    },
    updateQuantity(
      state,
      action: PayloadAction<{
        productId: string;
        ram: string;
        storage: string;
        color: string;
        quantity: number;
      }>
    ) {
      const { productId, ram, storage, color, quantity } = action.payload;

      // Find the item matching the criteria
      const existingItem = state.items.find(
        (item) =>
          item.productId === productId &&
          item.variant.ram === ram &&
          item.variant.storage === storage &&
          item.variant.color === color
      );

      if (existingItem && quantity > 0) {
        // Update the quantity
        existingItem.quantity = quantity;
      } else {
        // If quantity is 0 or less, remove the item
        state.items = state.items.filter(
          (item) =>
            !(
              item.productId === productId &&
              item.variant.ram === ram &&
              item.variant.storage === storage &&
              item.variant.color === color
            )
        );
      }

      // Recalculate total cart amount
      state.totalAmount = state.items.reduce(
        (sum, item) => sum + item.quantity * item.variant.price,
        0
      );
    },
    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
