'use client';
import { useEffect, useState } from 'react';
import HeaderInfo from '../other/HeaderInfo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CartItemsTooltip from '../cart/CartItemsTooltip';
import { CartItemsType } from '@/app/lib/definitions';

const Header = () => {
  const pathname = usePathname();
  const [cartItems, setCartItems] = useState<CartItemsType[]>([]);

  const fetchCartProducts = async () => {
    const cartItems = JSON.parse(
      localStorage.getItem('cart') || '[]'
    ) as CartItemsType[];

    if (cartItems) {
      setCartItems(cartItems);
    }
  };

  const totalCartItems = cartItems.reduce((acc, item) => {
    return acc + item.quantity;
  }, 0);

  // useEffect(() => {
  //   fetchCartProducts();
  // }, []);

  return (
    <header className='text-center bg-white flex flex-col gap-4 shadow-md'>
      <HeaderInfo />
      <div className='header-logo '>
        <Link href='/'>
          <span className='block text-3xl uppercase font-extrabold text-orange-600 tracking-wider'>
            multimart
          </span>
          <span className='block uppercase tracking-widest text-sky-500'>
            variety meets convenience
          </span>
        </Link>
      </div>
      <nav className='text-slate-600'>
        <ul className='flex justify-center items-center'>
          <li className='w-[300px] min-w-[80px]'>
            <Link
              className={`navlink ${pathname === '/' ? 'active' : ''}`}
              href='/'
            >
              Home
            </Link>
          </li>
          <li className='w-[300px] min-w-[80px]'>
            <Link
              className={`navlink ${pathname === '/products' ? 'active' : ''}`}
              href='/products'
            >
              Shop
            </Link>
          </li>
          <li className='relative w-[300px] min-w-[80px]'>
            <Link
              className={`flexNavlink ${pathname === '/cart' ? 'active' : ''}`}
              href='/cart'
            >
              Cart
            </Link>
            {/* {cartItems && cartItems.length > 0 && (
              <CartItemsTooltip cartItemNumber={totalCartItems} />
            )} */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
