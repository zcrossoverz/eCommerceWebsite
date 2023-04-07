import {
  type QueryObserverResult,
  type RefetchOptions,
  type RefetchQueryFilters,
  useMutation,
} from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import feedbackApi from 'src/apis/feedback.api';
import Loading from 'src/components/loading';
import Star from 'src/components/star';
import { Feedback, Product, ResGetFeedback } from 'src/types/product.type';
import convertDate from 'src/utils/convertDate';
type Props = {
  rating: number;
  canRate: {
    success: boolean;
    isRated: boolean;
  };
  productId?: number;
  userId?: number;
  feedbackOfProduct?: ResGetFeedback;
  numFeedback?: number;
  refetchCanRate: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<
    QueryObserverResult<
      AxiosResponse<
        {
          is_done: boolean;
          can_rate: boolean;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any
      >,
      unknown
    >
  >;
  refetchGetFeed: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<QueryObserverResult<AxiosResponse<ResGetFeedback, any>, unknown>>;
  refetchUser: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<QueryObserverResult<AxiosResponse<Product, any>, unknown>>;
  isLoadFeed: boolean;
};
enum modeEnum {
  'COMMENT',
  'EDIT',
}
function Comments({
  rating,
  refetchUser,
  refetchGetFeed,
  refetchCanRate,
  canRate,
  productId,
  userId,
  feedbackOfProduct,
  numFeedback,
  isLoadFeed,
}: Props) {
  const [feedback, setFeedback] = useState<Feedback>({
    comment: '',
    product_id: 0,
    rate: 5,
    user_id: 0,
  });
  const [edit, setEdit] = useState<boolean>(false);
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFeedback({
      ...feedback,
      rate: rating || 5,
      product_id: Number(productId),
      user_id: Number(userId),
    });
    // setEdit(canRate.isRated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, userId, rating, canRate]);
  const feedbackMutation = useMutation({
    mutationFn: (feedback: Feedback) => feedbackApi.createFeedback(feedback),
  });
  const updateFeedbackMutation = useMutation({
    mutationFn: (body: { rate: number; comment: string; productId: number }) =>
      feedbackApi.updateFeedback(body.productId, {
        rate: body.rate,
        comment: body.comment,
      }),
  });
  // const handleEditComment = () => {};
  const handleSubmit = (e: FormEvent<HTMLFormElement>, mode: string) => {
    e.preventDefault();
    if (mode && mode === modeEnum[1]) {
      if (productId && feedback.comment && feedback.rate) {
        updateFeedbackMutation.mutate(
          {
            productId,
            comment: feedback.comment,
            rate: feedback.rate,
          },
          {
            onSuccess: () => {
              toast.success('Cập nhật bình luận thành công', { autoClose: 1000 });
              setEdit(false);
              Promise.all([refetchGetFeed(), refetchUser(), refetchCanRate()]);
            },
          }
        );
      }
    }
    if (feedback && mode === modeEnum[0]) {
      feedbackMutation.mutate(feedback, {
        onSuccess: () => {
          toast.success('Bình luận đã được ghi nhận', { autoClose: 1000 });
          setFeedback({
            ...feedback,
            comment: '',
          });
          Promise.all([refetchGetFeed(), refetchUser(), refetchCanRate()]);
        },
      });
    }
  };
  const handleClickEdit = (data: { content: string; rate: number }) => {
    setEdit(!edit);
    setFeedback({ ...feedback, comment: data.content, rate: data.rate });
  };
  useEffect(() => {
    if (commentRef.current && edit) {
      commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [edit]);
  return (
    <section className='bg-white/60 py-8 lg:py-16'>
      {!isLoadFeed && (
        <div className='mx-auto max-w-2xl px-4'>
          <div className='mb-6 flex items-center justify-between' ref={commentRef}>
            {!numFeedback ? (
              <h2 className='w-full text-center text-lg font-bold text-gray-500 lg:text-2xl'>
                Sản phẩm chưa có đánh giá
              </h2>
            ) : (
              <h2 className='text-lg font-bold text-gray-500 lg:text-2xl'>Đánh giá ({numFeedback || 0})</h2>
            )}
          </div>
          <AnimatePresence>
            {canRate.success && !canRate.isRated && (
              <motion.form
                className='mb-6'
                onSubmit={(e) => handleSubmit(e, modeEnum[0])}
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.2 }}
              >
                <div className='mb-2 rounded-lg rounded-t-lg border border-gray-200 bg-white py-2 px-4 '>
                  <label htmlFor='comment' className='sr-only'>
                    Your comment
                  </label>
                  <textarea
                    id='comment'
                    rows={6}
                    className='w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 '
                    placeholder='Write a comment...'
                    value={feedback.comment}
                    required
                    onChange={(e) => {
                      setFeedback({ ...feedback, comment: e.target.value });
                    }}
                  />
                </div>
                {/* STAR */}
                <div className='flex items-center px-1'>
                  <span className='mr-2 text-sm font-medium text-slate-500'>Chất lượng sản phẩm: </span>
                  <Star size='2xl' ratings={feedback.rate} mode={modeEnum[0]} />
                </div>
                <button
                  type='submit'
                  className='mt-2 inline-flex items-center rounded-lg bg-orange-400 py-2.5 px-4 text-center text-xs font-medium text-white hover:bg-orange-600'
                >
                  Bình luận
                </button>
              </motion.form>
            )}
            {canRate.success && edit && (
              <motion.form
                className='mb-6'
                onSubmit={(e) => handleSubmit(e, modeEnum[1])}
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.2 }}
              >
                <div className='mb-2 rounded-lg rounded-t-lg border border-gray-200 bg-white py-2 px-4 '>
                  <label htmlFor='comment' className='sr-only'>
                    Your comment
                  </label>
                  <textarea
                    id='comment'
                    rows={6}
                    className='w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 '
                    placeholder='Write a comment...'
                    value={feedback.comment}
                    required
                    onChange={(e) => {
                      setFeedback({ ...feedback, comment: e.target.value });
                    }}
                  />
                </div>
                {/* STAR */}
                <div className='flex items-center px-1'>
                  <span className='mr-2 text-sm font-medium text-slate-500'>Chất lượng sản phẩm: </span>
                  <Star size='2xl' ratings={feedback.rate} mode={modeEnum[0]} />
                </div>
                <button
                  type='submit'
                  className='mt-2 inline-flex items-center rounded-lg bg-orange-400 py-2.5 px-4 text-center text-xs font-medium text-white hover:bg-orange-600'
                >
                  Cập nhật
                </button>
              </motion.form>
            )}
          </AnimatePresence>
          {feedbackOfProduct &&
            feedbackOfProduct.data &&
            feedbackOfProduct.data.map((comment) => (
              <article key={comment.id} className='relative mb-6 border-t border-gray-200 bg-white p-6 text-base '>
                <footer className='mb-2 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <p className='mr-3 inline-flex items-center text-sm text-gray-900 '>
                      {comment.user.firstName + ' ' + comment.user.lastName}
                    </p>
                    <p className='text-sm text-gray-600 '>
                      <time dateTime={comment.create_at} title={comment.create_at}>
                        {convertDate(comment.create_at)}
                      </time>
                    </p>
                  </div>
                  {canRate.isRated ? (
                    <button
                      className='inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 '
                      type='button'
                      onClick={() =>
                        handleClickEdit({
                          content: comment.comment,
                          rate: comment.rate,
                        })
                      }
                    >
                      <span className='text-orange-400'>Chỉnh sửa</span>
                      <span className='sr-only'>Comment settings</span>
                    </button>
                  ) : (
                    <button
                      className='inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none '
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
                  )}
                  {/* Dropdown menu */}
                </footer>
                <p className='text-justify text-gray-500'>{comment.comment}</p>
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
                  <Star ratings={comment.rate} />
                </div>
              </article>
            ))}
        </div>
      )}
      {isLoadFeed && (
        <div className='flex w-full items-center justify-center'>
          <Loading />
        </div>
      )}
    </section>
  );
}
export default Comments;
