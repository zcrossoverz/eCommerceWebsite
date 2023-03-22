import jwtDecode from 'jwt-decode';
import { pick } from 'lodash';
import { CartItem } from 'src/types/cart';

let key: string;
const token = localStorage.getItem('token');
if (token) {
  const user = pick<{
    user_id: string;
    lastName: string;
  }>(jwtDecode(token), ['user_id', 'lastName']);
  key = user.lastName && user.user_id ? user.lastName + user.user_id : 'user';
}
export const saveCartItemToLocal = (value: CartItem[]) => {
  const saveValue = JSON.stringify(value);
  localStorage.setItem(key, saveValue);
};
export const getCartItemFromLocal = (): CartItem[] => {
  let keyOther = '';
  const token = localStorage.getItem('token');
  if (token) {
    const user = pick<{
      user_id: string;
      lastName: string;
    }>(jwtDecode(token), ['user_id', 'lastName']);
    keyOther = user.lastName && user.user_id ? user.lastName + user.user_id : 'user';
  }
  if (keyOther) {
    const result = localStorage.getItem(keyOther);
    if (result) return JSON.parse(result);
  }
  return [];
};
export const clearCartFromLocal = (key: string) => {
  localStorage.removeItem(key);
};
