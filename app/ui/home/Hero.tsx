import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div>
      <div className='max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 justify-items-center'>
        <div className='self-center'>
          <div className='text-slate-800'>
            <p className='text-[40px] xl:text-[54px] font-extrabold tracking-wider uppercase'>
              MULTIMART
            </p>
            <div className='mt-2'>
              <p className='text-[28px] text-slate-800'>
                Shop Smart, Shop Multimart
              </p>
              <p className='text-slate-600 text-xl mt-2'>
                All Products, One Platform
              </p>
            </div>
          </div>

          <Link className='btnPrimary' href='/products'>
            Browse Products
          </Link>
        </div>
        <div className='min-w-[500px] h-auto'>
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
