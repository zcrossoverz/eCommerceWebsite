import http from 'src/utils/http';
import { User, UserInfoWhenUpdate } from 'src/types/user.type';
const userApi = {
  getUserByid(id: number) {
    return http.get<User>(`/user/${id}`);
  },
  updateInfo(id: number, body: UserInfoWhenUpdate) {
    return http.put(`/user/${id}`, body);
  },
  addAddress(id: number, address: string) {
    return http.post<{
      id: string;
      address: string;
    }>(`user/${id}/add_address`, { address });
  },
  deleteAddress(idUser: number, idAddress: number) {
    return http.delete<{
      message: string;
    }>(`user/${idUser}/delete_address/${idAddress}`);
  },
  updateAddress(idUser: number, address: string, idAddress: number) {
    return http.put<{
      message: string;
    }>(`user/${idUser}/update_address/${idAddress}`, { address });
  },
  setDefaultAddress(idUser: number, idAddress: number) {
    return http.patch<{
      message: string;
    }>(`user/${idUser}/set_default_address`, { id_address: idAddress });
  },
  changePassword(old_password: string, new_password: string) {
    return http.patch<{
      message: string;
    }>('/user/change_password', {
      old_password,
      new_password,
    });
  },
};
export default userApi;
