import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div>
      <div className='max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center'>
        <div className='p-8 self-center'>
          <h2 className=' text-slate-800 uppercase drop-shadow-md'>
            <span className='block text-[40px] xl:text-[54px] font-extrabold tracking-wider'>
              Electronics to Fashion
            </span>
            <span className='block text-[28px] xl:text-[32px] text-slate-500'>
              All in One Place
            </span>
          </h2>

          <Link className='btnPrimary' href='/products'>
            Browse Collections
          </Link>
        </div>
        <div className='justify-self-start lg:justify-self-center max-w-[450px] h-auto'>
          <Image
            className='object-cover h-auto w-full'
            src='/flash-sale-50-211023.png'
            alt='flash sale poster'
            width={450}
            height={450}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
