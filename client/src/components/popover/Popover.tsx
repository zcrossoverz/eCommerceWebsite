import React from 'react';
import { createPortal } from 'react-dom';
import { Coords, Position } from 'src/types/global';
import { motion } from 'framer-motion';
interface PopoverProps {
  coords: Coords;
  position: Position;
  children?: React.ReactNode;
  className?: string;
}
function Popover({ coords, position = 'left', children, className = 'z-10' }: PopoverProps) {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <motion.div
      style={{
        left: position === 'right' ? coords.x + coords.width - 7 : coords.x,
        top: coords.y + coords.height * 1.2,
      }}
      initial={{ opacity: 0, transform: 'scale(0) ' }}
      animate={{ opacity: 1, transform: 'scale(1) translateX(-100%)' }}
      exit={{ opacity: 0, transform: 'scale(0) ' }}
      transition={{ duration: 0.2 }}
      className={`absolute top-full z-10 ${position === 'right' ? '-translate-x-full' : ''} ${className}`}
    >
      <div className='absolute -top-[12px] right-0.5 h-0 w-0 border-l-[10px] border-b-[15px] border-r-[10px] border-l-transparent border-b-white border-r-transparent'></div>
      {children}
    </motion.div>,
    document.getElementById('root') as HTMLElement
  );
}

export default Popover;
