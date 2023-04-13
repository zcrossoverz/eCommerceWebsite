import { nanoid } from '@reduxjs/toolkit';

export default function BreadCrumb({ path }: { path: string[] }) {
  return (
    <div className='flex'>
      {path.map((e, i) => {
        return (
          <div key={nanoid(3)} className='flex text-xs md:text-lg'>
            <span className='mx-2'>{e}</span>
            <span>{i !== path.length - 1 && '>'}</span>
          </div>
        );
      })}
    </div>
  );
}
