import { Feedback, ResFeedback, ResGetFeedback } from 'src/types/product.type';
import http from 'src/utils/http';

const feedbackApi = {
  createFeedback(feedback: Feedback) {
    return http.post<ResFeedback>('/feedback/create', feedback);
  },
  getFeedback(productId: number) {
    return http.get<ResGetFeedback>(`/feedback/get_by_product/${productId}`);
  },
};
export default feedbackApi;
