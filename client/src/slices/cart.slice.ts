import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { CartItem as CartItemType } from 'src/types/cart';
import { getCartItemFromLocal, saveCartItemToLocal } from 'src/utils/cart';

interface Cart {
  cartItem: CartItemType[];
}
const getCartItem = getCartItemFromLocal();
const initialCartState: Cart = {
  cartItem: getCartItem,
};
const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItemtoCart: (state, action: PayloadAction<CartItemType>) => {
      const isExist = state.cartItem.findIndex((e) => {
        return e.option.product_option_id === action.payload.option.product_option_id;
      });
      if (isExist >= 0) {
        state.cartItem[isExist].option.quantity += action.payload.option.quantity;
        toast.success('Thêm vào giỏ hàng thành công');
        saveCartItemToLocal(state.cartItem);
      } else {
        state.cartItem.push(action.payload);
        toast.success('Thêm vào giỏ hàng thành công');
        saveCartItemToLocal(state.cartItem);
      }
    },
    removeItemFromCart: (
      state,
      action: PayloadAction<{
        id: number;
        product_option_id: number;
      }>
    ) => {
      const indexRemoveItem = state.cartItem.findIndex((e) => {
        return e.id === action.payload.id && e.option.product_option_id === action.payload.product_option_id;
      });
      const checkQuantity = state.cartItem[indexRemoveItem].option.quantity;
      if (checkQuantity === 1) {
        state.cartItem.splice(indexRemoveItem, 1);
      } else {
        state.cartItem[indexRemoveItem].option.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.cartItem = [];
    },
  },
});
export const { addItemtoCart } = cartSlice.actions;

export default cartSlice.reducer;
