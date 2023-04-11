import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import inboundNoteApi from 'src/apis/inboundnote.api';
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
                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>{data.data.status}</dd>
                </div>
              </dl>
            </div>
          </aside>
          <article>
            <div>
              {data.data.items && (
                <div>
                  <span>iphone 12 promax</span>
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
