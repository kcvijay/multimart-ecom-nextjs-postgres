'use client';
import { Product } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import { findOriginalPrice } from '@/app/utils/utilities';

export function SingleProductWrapper(props: Product) {
  return (
    <div className='flex justify-center'>
      <div className='bg-white shadow-md max-w-[400px] min-w-[300px] rounded-md p-4'>
        <figure className='w-full h-auto pb-4'>
          <Image
            className='w-full h-auto rounded-md object-cover'
            src={props.thumbnail}
            alt='images'
            width={400}
            height={100}
          />
        </figure>
        <figure className='flex gap-4 overflow-x-auto pb-2'>
          {props.images.map((image: string) => (
            <ProductImage key={image} image={image} />
          ))}
        </figure>

        <h2 className='title text-xl font-bold text-slate-800 mt-6 capitalize'>
          {props.title}
        </h2>
        <section className='mt-4'>
          <table className='w-full border shadow'>
            <thead>
              <th className='flex border-b py-2 text-slate-600 font-bold'>
                <td className='flex-1 text-center'>Brand</td>
                <td className='flex-1 text-center'>Category</td>
                <td className='flex-1 text-center'>Rating</td>
              </th>
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

export function ProductImage({ image }: { image: string }) {
  return (
    <Image
      className='rounded-md w-full flex-grow object-cover border shadow-md p-2'
      src={image}
      alt='images'
      width={80}
      height={50}
    />
  );
}
