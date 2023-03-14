import { useEffect, useRef } from 'react';

export default function useClickOutSide(callback?: () => void) {
  const nodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutSide(this: Document, ev: MouseEvent) {
      if (nodeRef.current && !nodeRef.current.contains(ev.target as Node)) {
        callback?.();
      }
    }
    document.addEventListener('click', handleClickOutSide);
    return () => {
      document.removeEventListener('click', handleClickOutSide);
    };
  }, []);
  return {
    nodeRef,
  };
}
