import BreadCrumb from '../breadcrumb';

export default function UserDashboard() {
  return (
    <div className='mt-4'>
      <BreadCrumb path={['Product', 'Manage Product']} />
      <div className='mt-4 grid grid-cols-6'>
        <div className='col-span-2 mr-4'>
          <input
            className='w-full appearance-none rounded-lg border-2 border-gray-50 bg-gray-50 py-3 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:shadow-md focus:shadow-purple-300 focus:outline-none'
            id='inline-full-name'
            type='text'
            placeholder='search'
          />
        </div>
        <div className='col-span-1'>
          <select className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-300 focus:ring-blue-500'>
            <option className='mt-1' selected>
              Sort by
            </option>
            <option className='mt-1' value='sale'>
              tên
            </option>
            <option className='mt-1' value='stock'>
              email
            </option>
            <option className='mt-1' value='stock'>
              sđt
            </option>
          </select>
        </div>
        <div className='col-span-1 col-end-7'>
          <button className='rounded-xl bg-blue-900 py-3 px-8 text-gray-400 hover:bg-blue-600 hover:text-white hover:shadow-primary hover:shadow-lg'>
            CREATE
          </button>
        </div>
      </div>
      <div>
        <div className='mt-4 flex flex-col'>
          <div className='overflow-x-auto'>
            <div className='inline-block w-full align-middle'>
              <div className='overflow-hidden rounded-xl border'>
                <table className='min-w-full divide-y divide-gray-200 bg-white'>
                  <thead className='bg-pink-400/20'>
                    <tr>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                        ID
                      </th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                        Name
                      </th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                        Email
                      </th>
                      <th scope='col' className='px-6 py-3 text-left text-xs font-bold uppercase text-gray-500 '>
                        Sđt
                      </th>

                      <th scope='col' className='px-6 py-3 text-right text-xs font-bold uppercase text-gray-500 '>
                        Địa chỉ
                      </th>
                      <th scope='col' className='px-6 py-3 text-right text-xs font-bold uppercase text-gray-500 '>
                        Edit
                      </th>
                      <th scope='col' className='px-6 py-3 text-right text-xs font-bold uppercase text-gray-500 '>
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-gray-200'>
                    <tr>
                      <td className='whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800'></td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'></td>
                      <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-800'></td>
                      <td className='whitespace-nowrap px-6 py-4 text-right text-sm font-medium'></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
