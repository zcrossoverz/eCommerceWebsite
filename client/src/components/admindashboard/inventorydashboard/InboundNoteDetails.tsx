import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import inboundNoteApi from 'src/apis/inboundnote.api';
import { baseURL } from 'src/constants/constants';
import convertDate from 'src/utils/convertDate';
import { isAxiosErr } from 'src/utils/error';
import BreadCrumb from '../breadcrumb';
import HelmetSEO from 'src/components/Helmet';
import { useTranslation } from 'react-i18next';

function InboundNoteDetails() {
  const { t } = useTranslation('addashboard');
  const params = useParams<{
    id: string;
  }>();
  const { data, refetch } = useQuery({
    queryKey: ['getOneInboundNote', params.id],
    queryFn: () => inboundNoteApi.getOneById(params.id || '0'),
    enabled: Boolean(params.id),
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const updateStatusMutation = useMutation({
    mutationFn: (body: { id: string; accept: boolean }) => inboundNoteApi.processInboundNote(body.id, body.accept),
    retry: 1,
    onSuccess() {
      toast.success(t('inventory.updatesuccess'), { autoClose: 2000 });
      refetch();
    },
    onError(err) {
      if (isAxiosErr<{ error: string }>(err)) {
        toast.error(err.response?.data.error, { autoClose: 2000 });
      }
    },
  });
  const handleChangeStatus = (id: string, accept: boolean) => {
    if (id && accept) {
      updateStatusMutation.mutate({
        id,
        accept,
      });
    }
  };

  return (
    <section>
      <HelmetSEO title={t('inventory.invoicedetail')} />
      <BreadCrumb
        path={[
          'Fstore',
          t('maindashboard.admin'),
          t('maindashboard.inventory'),
          t('inventory.inboundnote'),
          t('inventory.no') + String(data?.data.id),
        ]}
      />
      {data?.data && (
        <div>
          <aside className='mt-2 max-w-2xl overflow-hidden bg-white shadow sm:rounded-lg'>
            <div className='px-4 py-5 sm:px-6'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>{t('inventory.infoinvoice')}</h3>
            </div>
            <div className='border-t border-gray-200'>
              <dl>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>{t('inventory.invoicename')}</dt>
                  <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                    {t('inventory.no')} {data.data.id}
                  </dd>
                </div>
                <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>{t('inventory.invoicedate')}</dt>
                  <dd className='mt-1 flex items-center justify-start text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                    <span>{convertDate(data.data.create_at)}</span>
                  </dd>
                </div>
                <div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
                  <dt className='text-sm font-medium text-gray-500'>{t('inventory.status')}</dt>
                  <dd className='mt-1 flex items-center text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
                    <span>{data.data.status}</span>
                    {data.data.status === 'PENDING' && (
                      <div>
                        <button
                          onClick={() => handleChangeStatus(String(data.data.id), true)}
                          className='ml-2 rounded-sm bg-green-400 px-3 py-1.5 text-white hover:bg-green-600'
                        >
                          {t('product.confirm')}
                        </button>
                        <button
                          onClick={() => handleChangeStatus(String(data.data.id), false)}
                          className='ml-2 rounded-sm bg-red-400 px-3 py-1.5 text-white hover:bg-red-600'
                        >
                          {t('inventory.refuse')}
                        </button>
                      </div>
                    )}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>

          <article className='mt-6'>
            <h2 className='my-2 text-lg font-semibold text-cyan-600'>{t('inventory.proininvoice')}:</h2>
            <div className='overflow-x-auto rounded-md shadow-md'>
              {data.data.items && (
                <div>
                  <table className='w-full text-left text-sm text-gray-500'>
                    <thead className='bg-cyan-400 text-xs uppercase text-white md:text-sm'>
                      <tr>
                        <th className='px-4 py-3'>{t('inventory.no.')}</th>
                        <th className='px-6 py-3'>{t('product.name')}</th>
                        <th className='px-6 py-3'>{t('detailproduct.image')}</th>
                        <th className='px-6 py-3'>{t('inventory.configuration')}</th>
                        <th className='px-6 py-3'>{t('orders.quantity')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.data.items.map((e) => {
                        return (
                          <tr className='border-b bg-white' key={e.product_option_id}>
                            <th className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
                              {e.product_option_id}
                            </th>
                            <td className='px-6 py-4'>{e.name}</td>
                            <td className='px-6 py-4'>
                              <img
                                className='max-h-[6rem] text-left'
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
