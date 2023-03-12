import { memo, useState } from 'react';
import Popover from './Popover';
import useClickOutSide from 'src/hooks/useClickOutSide';
import useGetElementCoords from 'src/hooks/useGetElementCoords';
import { BsCart } from 'react-icons/bs';
// React Portal
// getBoundingClientRect

function TempletePopover() {
  const [isShowSettings, setIsShowSettings] = useState<boolean>(false);
  const { nodeRef } = useClickOutSide(() => setIsShowSettings(false));
  const { coords, elmRef, handleGetElementCoords } = useGetElementCoords();
  const handleToggleSettings = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsShowSettings((s) => !s);
    handleGetElementCoords(e);
  };
  return (
    <div className='flex items-center justify-center'>
      <div className='relative' ref={nodeRef}>
        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles*/}
        <button
          className='hover:text-orange-6 00 flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] duration-300 hover:bg-gray-100 hover:text-orange-600'
          onClick={handleToggleSettings}
          ref={elmRef}
          role='button'
        >
          <BsCart className='text-2xl' />
        </button>
        {isShowSettings && (
          <Popover coords={coords} position='right' className='rounded-2xl bg-white shadow'>
            <SettingsContentMemo></SettingsContentMemo>
          </Popover>
        )}
      </div>
    </div>
  );
}

const SettingsContentMemo = memo(SettingsContent);
function SettingsContent() {
  return <div className='min-h-[5rem] min-w-[10rem] rounded-sm bg-slate-200'></div>;
}

export default TempletePopover;
