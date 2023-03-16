export type User = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  default_address: string | null;
  id?: number;
  role: string;
  createAt: string;
  isActive: boolean;
  unread_message: number;
};
export type UserInfo = Pick<User, 'firstName' | 'lastName' | 'role' | 'id'>;
