import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import inboundNoteApi from 'src/apis/inboundnote.api';
import { baseURL } from 'src/constants/constants';
import convertDate from 'src/utils/convertDate';

function InboundNoteDetails() {
  const params = useParams<{
    id: string;
  }>();
  const { data } = useQuery({
    queryKey: ['getOneInboundNote', params.id],
    queryFn: () => inboundNoteApi.getOneById(params.id || '0'),
    enabled: Boolean(params.id),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const handleChangeStatus = () => {
    return;
  };
  return (
    <section>
      {data?.data && (
        <div>
          <aside className='mt-2 max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>Thông tin chi tiết phiếu nhập</h3>
            </div>
            <div className='border-t border-gray-200'>
              <dl>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Tên phiếu</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>Phiếu số {data.data.id}</dd>
                </div>
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Ngày lập phiếu</dt>
                  <dd className='mt-1 flex items-center justify-start text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                    <span>{convertDate(data.data.create_at)}</span>
                  </dd>
                </div>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>Tình trạng</dt>
                  <dd className='mt-1 flex items-center text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                    <span>{data.data.status}</span>
                    {data.data.status === 'PENDING' && (
                      <div>
                        <button className='ml-2 rounded-sm bg-green-400 px-3 py-1.5 text-white hover:bg-green-600'>
                          Xác nhận
                        </button>
                        <button className='ml-2 rounded-sm bg-red-400 px-3 py-1.5 text-white hover:bg-red-600'>
                          Từ chối
                        </button>
                      </div>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
          <article className='mt-6'>
            <h2 className='my-2 text-lg font-semibold text-cyan-600'>Sản phẩm trong phiếu nhập:</h2>
            <div className='overflow-x-auto rounded-md shadow-md'>
              {data.data.items && (
                <div>
                  <table className='w-full text-left text-sm text-gray-500'>
                    <thead className='bg-cyan-400 text-sm uppercase text-white'>
                      <tr>
                        <th className='px-2 py-3'>ID Option</th>
                        <th className='px-6 py-3'>Image</th>
                        <th className='px-6 py-3'>Specifications</th>
                        <th className='px-6 py-3'>Số lượng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.items.map((e, i) => {
                        return (
                          <tr className='border-b bg-white' key={e.product_option_id}>
                            <th className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
                              {e.product_option_id}
                            </th>
                            <td className='px-6 py-4'>
                              <img
                                className='w-22 h-24 text-left'
                                src={`${baseURL}/${e.image}`}
                                alt={`product_image`}
                              />
                            </td>
                            <td className='px-6 py-4'>{`${e.ram}/${e.rom} - ${e.color}`}</td>
                            <td className='px-6 py-4'>{e.quantity}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
export default InboundNoteDetails;
