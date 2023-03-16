export default function BreadCrumb({ path }: { path: string[] }) {
  return (
    <div className='text-md flex text-lg'>
      {path.map((e, i) => {
        return (
          <>
            <div key={i.toString()} className='mx-2'>
              {e}
            </div>
            <div>{i !== path.length - 1 && '>'}</div>
          </>
        );
      })}
    </div>
  );
}
