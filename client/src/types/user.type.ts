export type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  default_address: number | null;
  id?: number;
  role: string;
  createAt: string;
  isActive: boolean;
  unread_message: number;
  address: {
    id: number;
    address: string;
  }[];
};
export interface ResGetAllUser {
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  last_page: number;
  data_per_page: number;
  total: number;
  data: User[];
}
export type UserInfo = Pick<User, 'firstName' | 'lastName' | 'role' | 'id'>;
export type UserInfoWhenUpdate = Pick<User, 'firstName' | 'lastName' | 'phone'>;
