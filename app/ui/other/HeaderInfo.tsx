import Link from 'next/link';

const HeaderInfo = () => {
  return (
    <div className='w-full p-2 text-sm text-center text-white tracking-wider bg-sky-900 hover:underline'>
      <Link href='/products'>
        Enjoy FLASH Sale upto -18% discount. Offer valid until 31.12.2024 or,
        until stock remains.
      </Link>
    </div>
  );
};

export default HeaderInfo;
