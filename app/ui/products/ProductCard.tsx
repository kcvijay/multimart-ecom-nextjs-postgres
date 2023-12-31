'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { ProductDataType } from '@/app/lib/definitions';

interface Props {
  id: number;
  brand: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  images: string[];
  price: number;
  stock: number;
  discountPercentage: number;
  rating: number;
}

const ProductCard = ({
  id,
  brand,
  title,
  thumbnail,
  price,
  stock,
  discountPercentage,
  rating,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const addToCartHandler = () => {
    try {
      const existingCart = JSON.parse(
        localStorage.getItem('cart') || '[]'
      ) as ProductDataType[];
      const updatedCart = [
        ...existingCart,
        { id, brand, thumbnail, title, price, discountPercentage },
      ];
      setLoading(true);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      alert('Product added to cart!');
      setLoading(false);
    } catch (error) {
      alert('Error: ' + error);
    }
  };
  return (
    <div className='max-w-[500px] min-w-[320px] w-full shadow-md rounded-md hover:shadow-none transition-all duration-300 overflow-hidden'>
      <div className='w-full h-[250px] relative overflow-hidden'>
        <Image
          className='object-cover w-full h-full transition-all duration-200'
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
            discountPercentage ? 'flex' : 'hidden'
          } absolute justify-center items-center -bottom-[24px] -left-[24px] bg-orange-600 w-[100px] h-[100px] text-white rounded-full -rotate-12 shadow-lg`}
        >
          <p className='text-2xl pl-4'>-{Math.ceil(discountPercentage)}%</p>
        </div>
      </div>
      <div className='p-6 flex flex-col gap-3 bg-white'>
        <div className='flex justify-start items-end gap-4'>
          <p className='text-2xl text-sky-800'>{price} €</p>
          <p
            className={`${
              discountPercentage ? 'block' : 'hidden'
            } text-lg text-orange-600 line-through`}
          >
            {Math.floor(price / ((100 - discountPercentage) / 100))} €
          </p>
        </div>

        <h2 className='text-lg capitalize whitespace-nowrap overflow-hidden overflow-ellipsis'>
          {title}
        </h2>

        <div className='flex justify-end gap-3 items-center text-sm text-slate-600'>
          <Rating
            name='read-only'
            value={rating}
            precision={0.5}
            style={{ fontSize: '16px' }}
            emptyIcon={<StarIcon style={{ opacity: 0.7, fontSize: '16px' }} />}
            readOnly
          />
          <p className='border p-1 rounded-md'>{rating}</p>
        </div>

        {stock > 0 ? (
          loading ? (
            <button disabled className='btnDisabled'>
              <span>Adding to Cart...</span>
            </button>
          ) : (
            <button className='btnAddCart' onClick={() => addToCartHandler()}>
              <AddShoppingCartOutlinedIcon />
              <span>Add to Cart</span>
            </button>
          )
        ) : (
          <button disabled className='btnDisabled'>
            <span>Out of Stock</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
