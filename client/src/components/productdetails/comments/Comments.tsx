import Star from 'src/components/star';
type Props = {
  rating: number;
};
enum modeEnum {
  'COMMENT',
}
function Comments({ rating }: Props) {
  console.log(rating);
  return (
    <section className='bg-white/60 py-8 lg:py-16'>
      <div className='mx-auto max-w-2xl px-4'>
        <div className='mb-6 flex items-center justify-between'>
          <h2 className='text-lg font-bold text-gray-900 lg:text-2xl'>Discussion (20)</h2>
        </div>
        <form className='mb-6'>
          <div className='mb-2 rounded-lg rounded-t-lg border border-gray-200 bg-white py-2 px-4 '>
            <label htmlFor='comment' className='sr-only'>
              Your comment
            </label>
            <textarea
              id='comment'
              rows={6}
              className='w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 '
              placeholder='Write a comment...'
              required
            />
          </div>
          {/* STAR */}
          <div className='flex items-center px-1'>
            <span className='mr-2 text-sm font-medium text-slate-500'>Chất lượng sản phẩm: </span>
            <Star size='2xl' ratings={rating} mode={modeEnum[0]} />
          </div>
          <button
            type='submit'
            className='mt-2 inline-flex items-center rounded-lg bg-orange-400 py-2.5 px-4 text-center text-xs font-medium text-white hover:bg-orange-600 focus:ring-4'
          >
            Post comment
          </button>
        </form>

        <article className='mb-6 border-t border-gray-200 bg-white p-6 text-base '>
          <footer className='mb-2 flex items-center justify-between'>
            <div className='flex items-center'>
              <p className='mr-3 inline-flex items-center text-sm text-gray-900 '>
                <img
                  className='mr-2 h-6 w-6 rounded-full'
                  src='https://flowbite.com/docs/images/people/profile-picture-3.jpg'
                  alt='Bonnie Green'
                />
                Bonnie Green
              </p>
              <p className='text-sm text-gray-600 '>
                <time dateTime='2022-03-12' title='March 12th, 2022'>
                  Mar. 12, 2022
                </time>
              </p>
            </div>
            <button
              id='dropdownComment3Button'
              data-dropdown-toggle='dropdownComment3'
              className='inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 '
              type='button'
            >
              <svg
                className='h-5 w-5'
                aria-hidden='true'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z'></path>
              </svg>
              <span className='sr-only'>Comment settings</span>
            </button>
            {/* Dropdown menu */}
            <div id='dropdownComment3' className='z-10 hidden w-36 divide-y divide-gray-100 rounded bg-white shadow '>
              <ul className='py-1 text-sm text-gray-700' aria-labelledby='dropdownMenuIconHorizontalButton'>
                <li>
                  <a href='#aa' className='block py-2 px-4 hover:bg-gray-100 '>
                    Edit
                  </a>
                </li>
                <li>
                  <a href='#aa' className='block py-2 px-4 hover:bg-gray-100 '>
                    Remove
                  </a>
                </li>
                <li>
                  <a href='#aa' className='block py-2 px-4 hover:bg-gray-100 '>
                    Report
                  </a>
                </li>
              </ul>
            </div>
          </footer>
          <p className='text-gray-500 '>
            The article covers the essentials, challenges, myths and stages the UX designer should consider while
            creating the design strategy.
          </p>
          <div className='mt-4 flex items-center space-x-4'>
            <button type='button' className='flex items-center text-sm text-gray-500 hover:underline '>
              <svg
                aria-hidden='true'
                className='mr-1 h-4 w-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                />
              </svg>
              Reply
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
export default Comments;
