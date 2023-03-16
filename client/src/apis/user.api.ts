import http from 'src/utils/http';
import { User } from 'src/types/user.type';
const userApi = {
  getUserByid(id: number) {
    return http.get<User>(`/user/${id}`);
  },
};
export default userApi;
