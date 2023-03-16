function File() {
  return (
    <div className='w-full p-2'>
      <div className='border-b p-2'>
        <h2 className='text-xl font-semibold'>Hồ sơ của tôi</h2>
        <p className='text-base'>quản lý thông tin hồ sơ của bạn</p>
      </div>
      <div className='mt-2 flex min-h-[400px] w-full'>
        <form className=''>
          <div className='grid min-w-[700px] grid-cols-7'>
            <div className='col-span-1 grid min-h-[8rem] grid-cols-1 p-2'>
              <span className='text-right text-lg text-slate-300'>Email</span>
              <span className='text-right text-lg text-slate-300'>Họ và tên</span>
              <span className='text-right text-lg text-slate-300'>Số điện thoại</span>
            </div>
            <div className='col-span-6 grid min-h-[8rem] grid-cols-1 p-2'>
              <span>a</span>
              <span>a</span>
              <span>a</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
export default File;
