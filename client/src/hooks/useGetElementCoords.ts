import { useEffect, useRef, useState } from 'react';
import { Coords } from '../types/global';
function handleSetElementCoords(node: HTMLElement, callback: (item: Coords) => void) {
  const clientRect = node.getBoundingClientRect() as DOMRect;
  callback({
    x: clientRect.left,
    y: clientRect.top + window?.scrollY,
    width: clientRect.width,
    height: clientRect.height,
  });
}
export default function useGetElementCoords() {
  const elmRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState<Coords>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const handleGetElementCoords = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleSetElementCoords(e.target as HTMLElement, setCoords);
  };
  useEffect(() => {
    function handleElementResize() {
      if (elmRef.current) {
        handleSetElementCoords(elmRef.current, setCoords);
      }
    }
    window.addEventListener('resize', handleElementResize);
    return () => {
      window.removeEventListener('resize', handleElementResize);
    };
  }, []);
  return {
    coords,
    elmRef,
    handleGetElementCoords,
  };
}
