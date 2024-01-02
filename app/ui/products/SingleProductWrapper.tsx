'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/app/lib/definitions';
import Image from 'next/image';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { findOriginalPrice } from '@/app/utils/utilities';

export function SingleProductWrapper(props: Product) {
  const [selectedImage, setSelectedImage] = useState(props.thumbnail);

  const handleMiniImageClick = (image: string) => {
    setSelectedImage(image);
  };
  return (
    <div className='flex justify-center'>
      <div className='bg-white shadow-md max-w-[500px] min-w-[300px] rounded-md p-6'>
        <figure className='w-full h-[300px] pb-4 overflow-hidden'>
          <Image
            className='w-full h-full rounded-md'
            src={selectedImage}
            alt='images'
            width={500}
            height={200}
          />
        </figure>
        <figure className='flex gap-4 overflow-x-auto pb-2'>
          {props.images.map((image: string) => (
            <ProductImage
              key={image}
              image={image}
              handleClick={() => handleMiniImageClick(image)}
            />
          ))}
        </figure>

        <h2 className='title text-xl font-bold text-slate-800 mt-6 capitalize'>
          {props.title}
        </h2>
        <section className='mt-4'>
          <table className='w-full border shadow'>
            <thead>
              <tr className='flex border-b py-2 text-slate-600 font-bold'>
                <th className='flex-1 text-center'>Brand</th>
                <th className='flex-1 text-center'>Category</th>
                <th className='flex-1 text-center'>Rating</th>
              </tr>
            </thead>
            <tbody className='text-slate-500'>
              <tr className='flex py-2'>
                <td className='flex-1 text-center capitalize'>{props.brand}</td>
                <td className='flex-1 text-center capitalize'>
                  {props.category}
                </td>
                <td className='flex-1 text-center capitalize'>
                  {props.rating}/5
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <p className='description mt-6 text-slate-800 first-letter:capitalize'>
          {props.description}
        </p>

        <section className='mt-4'>
          <p className='text-slate-500'>{props.stock} items in stock.</p>
        </section>
        <section className='mt-4 flex gap-4 justify-end items-start'>
          <p className='text-lime-600 text-3xl'>
            {props.price}
            <span className='text-base align-top'>€</span>
          </p>
          <p className='text-red-500 line-through'>
            {findOriginalPrice(props.price, props.discountpercentage)} €
          </p>
          <p className='text-orange-500'>
            (-{Math.round(props.discountpercentage)}%)
          </p>
        </section>
        <section className='pt-4 flex gap-4 flex-wrap'>
          <Link className='btnSecondary flex-1 w-full' href={`/products`}>
            &larr; Return
          </Link>
          {props.stock > 0 ? (
            <button className='btnAddCart flex-1 w-full'>
              <AddShoppingCartOutlinedIcon />
              <span>Add</span>
            </button>
          ) : (
            <button disabled className='btnDisabled flex-1 w-full'>
              <span>No Stock</span>
            </button>
          )}
        </section>
      </div>
    </div>
  );
}

export function ProductImage({
  image,
  handleClick,
}: {
  image: string;
  handleClick: () => void;
}) {
  return (
    <Image
      className='rounded-md w-full flex-grow object-cover border shadow-md p-2 cursor-pointer active:bg-slate-200 transition-all'
      src={image}
      alt='images'
      width={80}
      height={50}
      onClick={handleClick}
    />
  );
}
