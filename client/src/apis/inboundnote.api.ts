import { ResGetAllInboundNote, ResGetOneInboundNote } from 'src/types/inventory.type';
import { ProductListConfig } from 'src/types/product.type';
import http from 'src/utils/http';

const inboundNoteApi = {
  getAllInboundNote(params: ProductListConfig) {
    return http.get<ResGetAllInboundNote>('/inventory/inbound_note', {
      params,
    });
  },
  getOneById(id: string) {
    return http.get<ResGetOneInboundNote>(`/inventory/inbound_note/${id}`);
  },
};
export default inboundNoteApi;
