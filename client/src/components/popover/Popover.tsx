import React from 'react';
import { createPortal } from 'react-dom';
import { Coords, Position } from 'src/types/global';
interface PopoverProps {
  coords: Coords;
  position: Position;
  children?: React.ReactNode;
  className?: string;
}
function Popover({ coords, position = 'left', children, className = 'z-10' }: PopoverProps) {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <div
      style={{
        left: position === 'right' ? coords.x + coords.width : coords.x,
        top: coords.y + coords.height * 1.5,
      }}
      className={`absolute top-full z-10 ${position === 'right' ? '-translate-x-full' : ''} ${className}`}
    >
      <div className='absolute -top-[12px] right-0.5 h-0 w-0 border-l-[10px] border-b-[15px] border-r-[10px] border-l-transparent border-b-white border-r-transparent'></div>
      {children}
    </div>,
    document.getElementById('root') as HTMLElement
  );
}

export default Popover;
