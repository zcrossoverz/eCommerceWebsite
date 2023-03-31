import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import userApi from 'src/apis/user.api';
import { isAxiosErr } from 'src/utils/error';
import { ChangePass, changePassSchema } from 'src/utils/rulesValidateForm';
import { useTranslation } from 'react-i18next';

function Password() {
  const { t } = useTranslation('password');
  const changePassMutation = useMutation({
    mutationFn: (body: { oldPass: string; newPass: string }) => userApi.changePassword(body.oldPass, body.newPass),
    onSuccess: () => {
      toast.success(t('password.change password successfully'), {
        autoClose: 2000,
      });
      reset();
    },
    onError: (err) => {
      if (
        isAxiosErr<{
          message: string;
        }>(err)
      ) {
        if (err.response?.data.message === 'old password is not correct') {
          toast.error(t('pasword.old password is incorrect'), { autoClose: 2000 });
        }
      }
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePass>({
    resolver: yupResolver(changePassSchema),
  });
  const onSubmitChange = handleSubmit((data) => {
    const formData = {
      oldPass: data.oldPassword,
      newPass: data.newPassword,
    };
    changePassMutation.mutate(formData);
  });

  return (
    <div className='my-2 py-4'>
      <form className='md:min-w-[680px]' onSubmit={onSubmitChange}>
        <div className='mb-6 min-h-[4rem] md:flex md:items-center'>
          <div className='md:w-1/3'>
            <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right' htmlFor='inline-full-name'>
              {t('password.old password')}
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
              id='inline-full-name'
              {...register('oldPassword')}
              type='password'
              placeholder={t('password.old password') || 'Mật khẩu cũ'}
            />
            {errors.oldPassword?.message && (
              <span className='text-xs italic text-red-500'>{t('password.password is required')}</span>
            )}
          </div>
        </div>
        <div className='mb-6 min-h-[4rem] md:flex md:items-center'>
          <div className='md:w-1/3'>
            <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right' htmlFor='inline-password'>
              {t('password.new password')}
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
              id='inline-password'
              {...register('newPassword')}
              type='password'
              placeholder={t('password.new password') || 'Mật khẩu mới'}
            />
            {errors.newPassword?.message && (
              <span className='text-xs italic text-red-500'>{t('password.password is required')}</span>
            )}
          </div>
        </div>
        <div className='mb-6 min-h-[4rem] md:flex md:items-center '>
          <div className='md:w-1/3'>
            <label className='mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right' htmlFor='inline-password'>
              {t('password.enter a new password')}
            </label>
          </div>
          <div className='md:w-2/3'>
            <input
              className='w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 py-2 px-4 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none'
              id='inline-password'
              type='password'
              {...register('confirmNewPassword')}
              placeholder={t('password.enter a new password') || 'Nhập lại mật khẩu mới'}
            />
            {errors.confirmNewPassword?.message && (
              <span className='text-xs italic text-red-500'>{t('password.password re-enter is required')}</span>
            )}
          </div>
        </div>

        <div className='md:flex md:items-center'>
          <div className='md:w-1/3' />
          <div className='md:w-2/3'>
            <button
              type='submit'
              className='rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-4 py-2 text-center text-sm font-medium text-white hover:bg-gradient-to-bl focus:outline-none'
            >
              {t('password.change password')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Password;
