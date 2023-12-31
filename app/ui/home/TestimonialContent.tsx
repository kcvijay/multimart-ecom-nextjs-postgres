import React from 'react';
import Image from 'next/image';

interface TestimonialProps {
  id: number;
  image: string;
  name: string;
  testimonial: string;
}

const TestimonialContent = ({ image, name, testimonial }: TestimonialProps) => {
  return (
    <div className='w-full h-auto'>
      <div className='relative bg-orange-500 h-[8rem]'>
        <div className='absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-[100%]'>
          <Image
            className='h-[100px] w-[100px] rounded-full border-8 border-[#f1f1f1]'
            src={image}
            alt={name}
            width={100}
            height={100}
          />
        </div>
      </div>
      <div className='p-6 pt-16 text-center '>
        <p className='text-lg name'>{name}</p>
        <blockquote className='mt-6 text-slate-600 tracking-wide'>
          {testimonial}
        </blockquote>
      </div>
    </div>
  );
};

export default TestimonialContent;
