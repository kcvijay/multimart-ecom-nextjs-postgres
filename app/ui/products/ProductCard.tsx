'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import Link from 'next/link';

const loading = false;

interface Props {
  pid: string;
  brand: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  price: number;
  stock: number;
  discountpercentage: number;
  rating: number;
}

export default function ProductCard({
  pid,
  brand,
  title,
  thumbnail,
  price,
  stock,
  discountpercentage,
  rating,
}: Props) {
  return (
    <div className='max-w-[500px] min-w-[320px] w-full shadow rounded-md hover:shadow-none transition-all duration-300 overflow-hidden'>
      <div className='w-full h-[250px] relative overflow-hidden'>
        <Image
          className='object-cover w-full h-auto transition-all duration-200'
          src={thumbnail}
          alt={title}
          width={600}
          height={250}
        />
        <div className='absolute top-3 right-3 bg-slate-700 outline outline-[2px] px-2 py-1 text-white text-sm rounded-full'>
          <p className='capitalize'>{brand.toLowerCase()}</p>
        </div>
        <div
          className={`${
            discountpercentage ? 'flex' : 'hidden'
          } absolute justify-center items-center -bottom-[24px] -left-[24px] bg-orange-600 w-[100px] h-[100px] text-white rounded-full -rotate-12 shadow-lg`}
        >
          <p className='text-2xl pl-4'>-{Math.ceil(discountpercentage)}%</p>
        </div>
      </div>
      <div className='p-6 flex flex-col gap-3 bg-white'>
        <div className='flex justify-start items-end gap-4'>
          <p className='text-2xl text-sky-800'>{price} €</p>
          <p
            className={`${
              discountpercentage ? 'block' : 'hidden'
            } text-lg text-orange-600 line-through`}
          >
            {Math.floor(price / ((100 - discountpercentage) / 100))} €
          </p>
        </div>

        <h2 className='text-lg capitalize whitespace-nowrap overflow-hidden overflow-ellipsis'>
          {title}
        </h2>

        <div className='flex justify-end gap-3 items-center text-sm text-slate-600'>
          <Rating
            name='read-only'
            value={+rating}
            precision={0.5}
            style={{ fontSize: '16px' }}
            emptyIcon={<StarIcon style={{ opacity: 0.7, fontSize: '16px' }} />}
            readOnly
          />
          <p className='border p-1 rounded-md'>{+rating}</p>
        </div>

        <div className='flex gap-4 flex-wrap'>
          <Link className='flex-1 btnProductView' href={`/products/${pid}`}>
            View
          </Link>
          {stock > 0 ? (
            loading ? (
              <button disabled className='btnDisabled'>
                <span>Adding to Cart...</span>
              </button>
            ) : (
              <button disabled className='btnAddCart btnDisabled flex-1'>
                <AddShoppingCartOutlinedIcon />
                <span>Add</span>
              </button>
            )
          ) : (
            <button disabled className='btnDisabled'>
              <span>Out of Stock</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// const addToCartHandler = () => {
//   try {
//     const existingCart = JSON.parse(
//       localStorage.getItem('cart') || '[]'
//     ) as ProductDataType[];
//     const updatedCart = [
//       ...existingCart,
//       { pid, brand, thumbnail, title, price, discountpercentage },
//     ];
//     setLoading(true);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     alert('Product added to cart!');
//     setLoading(false);
//   } catch (error) {
//     alert('Error: ' + error);
//   }
// };
