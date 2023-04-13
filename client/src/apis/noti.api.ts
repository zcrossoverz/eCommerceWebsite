import { ResNoti } from 'src/types/noti.type';
import http from 'src/utils/http';

const notiApi = {
  getUnreadNoti(userId: number) {
    return http.get<ResNoti>(`notification/get_unread/${userId}`);
  },
  getAllNoti(userId: number) {
    return http.get<ResNoti>(`notification/get_all/${userId}`);
  },
};
export default notiApi;
