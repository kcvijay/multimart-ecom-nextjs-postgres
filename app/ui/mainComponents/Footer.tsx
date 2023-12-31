import React from 'react';
import Link from 'next/link';
import { footerList } from '@/app/lib/placeholder-data';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className='bg-slate-800 p-12 text-white flex-0'>
      <div className='gap-8 flex justify-between items-start flex-wrap mx-auto'>
        <div className='text-slate-400'>
          <h2 className='text-3xl uppercase font-bold mb-2'>multimart</h2>
          <p className='uppercase tracking-widest mb-4'>
            variety meets convenience
          </p>
          <p className='text-sm'>{year} &mdash; &copy; All Rights Reserved </p>
        </div>
        <div className='flex gap-8 flex-wrap'>
          {footerList.map((list, i) => (
            <div key={i} className='text-slate-300'>
              <h2 className='font-bold text-xl mb-4 uppercase'>
                {list.footerHeader}
              </h2>
              <div className='flex flex-col gap-3 capitalize'>
                {list.footerLinks.map((footerlinks, id) => (
                  <Link
                    className='block hover:underline'
                    key={id}
                    href={footerlinks.path}
                  >
                    {footerlinks.link}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
