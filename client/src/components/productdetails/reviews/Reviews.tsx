import React from 'react';
import { RiUserStarLine } from 'react-icons/ri';
import Star from 'src/components/star';

function Reviews() {
  return (
    <div className='mt-4 mr-6 ml-6'>
      <div>
        <form>
          <Star ratings={5} />
          <div className='mb-4 mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 '>
            <div className='rounded-t-lg bg-white px-4 py-2 '>
              <label htmlFor='comment' className='sr-only'>
                Your comment
              </label>
              <textarea
                id='comment'
                rows={4}
                className='w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 '
                placeholder='Write a comment...'
                required
                defaultValue={''}
              />
            </div>
            <div className='flex items-center justify-between border-t px-3 py-2 '>
              <button
                type='submit'
                className='inline-flex items-center rounded-lg bg-blue-700 py-2.5 px-4 text-center text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 '
              >
                Comment
              </button>
              <div className='flex space-x-1 pl-0 sm:pl-2'>
                <button
                  type='button'
                  className='inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 '
                >
                  <svg
                    aria-hidden='true'
                    className='h-5 w-5'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <span className='sr-only'>Upload image</span>
                </button>
              </div>
            </div>
          </div>
        </form>
        <p className='ml-auto text-xs text-gray-500 '>.</p>
      </div>

      <div className='mb-4 flex items-center space-x-4'>
        <RiUserStarLine className='h-10 w-10 rounded-full' />
        <div className='space-y-1 font-medium '>
          <p>
            Jese Leos{' '}
            <time dateTime='2014-08-16 19:00' className='block text-sm text-gray-500 '>
              Joined on August 2014
            </time>
          </p>
        </div>
      </div>
      <div className='mb-1 flex items-center'>
        <svg
          aria-hidden='true'
          className='h-5 w-5 text-yellow-400'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>First star</title>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
        <svg
          aria-hidden='true'
          className='h-5 w-5 text-yellow-400'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Second star</title>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
        <svg
          aria-hidden='true'
          className='h-5 w-5 text-yellow-400'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Third star</title>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
        <svg
          aria-hidden='true'
          className='h-5 w-5 text-yellow-400'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Fourth star</title>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
        <svg
          aria-hidden='true'
          className='h-5 w-5 text-yellow-400'
          fill='currentColor'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <title>Fifth star</title>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
        <h3 className='ml-2 text-sm font-semibold text-gray-900 '>Thinking to buy another one!</h3>
      </div>
      <footer className='mb-5 text-sm text-gray-500 '>
        <p>
          Reviewed in the United Kingdom on <time dateTime='2017-03-03 19:00'>March 3, 2017</time>
        </p>
      </footer>
      <p className='mb-2 text-gray-500 '>
        This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the
        first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower
        with it to test the waterproofing.... No problems.
      </p>
      <p className='mb-3 text-gray-500 '>
        It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën
        to a Ferrari. This watch was well under £100! An absolute bargain.
      </p>
      <a href='#aa' className='mb-5 block text-sm font-medium text-blue-600 hover:underline '>
        Read more
      </a>
    </div>
  );
}

export default Reviews;
