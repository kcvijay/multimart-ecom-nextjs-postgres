import React from 'react';
import Image from 'next/image';
import { CartItemsType } from '@/app/lib/definitions';

const CartRow = (props: CartItemsType & { children: React.ReactNode }) => {
  const calcOriginalPrice = (
    discountedPrice: number,
    discountPercent: number
  ) => {
    return discountedPrice / ((100 - discountPercent) / 100);
  };

  return (
    <div className='flex items-center justify-between flex-wrap gap-6 shadow mb-3 p-3'>
      <div>
        <Image
          className='object-scale-down'
          src={props.thumbnail}
          width={80}
          height={40}
          alt='product image'
        />
      </div>
      <div>
        <p className='text-xl text-slate-700 capitalize'>{props.title}</p>
        <p className='text-sm text-slate-400 mb-2'>
          <span className='inline-block w-[60px]'>Item ID:</span>
          {props.id}
        </p>
        <div>{props.children}</div>
      </div>

      <div className='text-end flex-grow'>
        <div>
          {props.discountPercentage > 0 && (
            <>
              <p className='inline-block bg-orange-300 py-1 px-2 text-sm rounded-md'>
                <span>-{Math.round(props.discountPercentage)}% Offer</span>
              </p>
              <p className='line-through text-orange-700'>
                {Math.floor(
                  calcOriginalPrice(props.price, props.discountPercentage)
                )}{' '}
                €
              </p>
            </>
          )}
          <div className=''>
            <p className='text-slate-500 text-lg'>
              {props.price} € &times; {props.quantity}
            </p>
            <p className='text-xl text-slate-700'>
              {(props.price * props.quantity).toLocaleString()} €
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartRow;
