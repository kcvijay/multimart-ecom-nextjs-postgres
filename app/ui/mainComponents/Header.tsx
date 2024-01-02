'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import HeaderInfo from '../other/HeaderInfo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CartItemsType } from '@/app/lib/definitions';

const Header = () => {
  const pathname = usePathname();
  const [cartItems, setCartItems] = useState<CartItemsType[]>([]);

  // const fetchCartProducts = async () => {
  //   const cartItems = JSON.parse(
  //     localStorage.getItem('cart') || '[]'
  //   ) as CartItemsType[];

  //   if (cartItems) {
  //     setCartItems(cartItems);
  //   }
  // };

  const totalCartItems = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  // useEffect(() => {
  //   fetchCartProducts();
  // }, []);

  return (
    <header>
      <HeaderInfo />
      <div className='flex justify-between items-center gap-6 flex-wrap shadow-md px-6 py-3'>
        <div>
          <Link href='/'>
            <div className='flex items-center gap-2 text-3xl uppercase font-extrabold text-orange-600 tracking-wider'>
              <span>multimart</span>
              <Image
                src={'/cartIcon.svg'}
                alt='cart icon'
                width={24}
                height={24}
              />
            </div>
            <span className='block uppercase tracking-widest text-sky-500'>
              variety meets convenience
            </span>
          </Link>
        </div>
        <nav className='text-slate-600'>
          <ul className='flex justify-center items-center gap-6'>
            <li>
              <Link
                className={`navlink ${pathname === '/' ? 'active' : ''}`}
                href='/'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className={`navlink ${
                  pathname === '/products' ? 'active' : ''
                }`}
                href='/products'
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                className={`navlink ${pathname === '/cart' ? 'active' : ''}`}
                href='/cart'
              >
                Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
