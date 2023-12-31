'use client';
import { useState, useEffect } from 'react';
import CartRow from '@/app/ui/cart/CartRow';
import PaymentCard from '@/app/ui/other/PaymentCard';
import { Backdrop } from '@mui/material';
import { CartItemsType, ProductDataType } from '@/app/lib/definitions';
import UnitPicker from '@/app/ui/cart/UnitPicker';

const Cart = () => {
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemsType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBackdropOpen = () => {
    setOpenBackdrop(true);
  };

  const handleBackdropClose = () => {
    setOpenBackdrop(false);
  };

  const getCartItemsHandler = async () => {
    try {
      setLoading(true);
      const storedCart = JSON.parse(
        localStorage.getItem('cart') || '[]'
      ) as ProductDataType[];
      const groupedCartItems: CartItemsType[] = [];

      storedCart.forEach((product) => {
        const existingItem = groupedCartItems.find(
          (item) => item.id === product.id
        );
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          groupedCartItems.push({ ...product, quantity: 1 });
        }
      });

      setCartItems(groupedCartItems);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartItemsHandler();
  }, []);

  const handleClearCart = () => {
    if (window.confirm('Do you want to delete all items in cart?')) {
      localStorage.removeItem('cart');
      setCartItems([]);
      alert('Cart is cleared.');
    }
  };

  const handleAddToCart = (product: ProductDataType) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);
    if (existingCartItem) {
      // If the item is already in the cart, increment the quantity
      const updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      const updatedCart = [...cartItems, { ...product, quantity: 1 }];
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }

    alert('Product added to cart!');
  };

  const handleRemoveFromCart = (productId: number) => {
    const updatedCart = cartItems
      .map((item) => {
        if (item.id === productId) {
          // If quantity is more than 1, decrement the quantity
          if (item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Product removed from cart!');
  };

  const totalPrice = cartItems.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  if (loading) {
    <div className='mt-12 py-12'>
      <p>Getting cart items...</p>
    </div>;
  }

  return (
    <div className='max-w-[1440px] mx-auto'>
      <h2 className='text-3xl text-slate-500 text-center mb-12 font-bold'>
        CART
      </h2>
      {cartItems.length > 0 ? (
        <>
          <div className='flex flex-col gap-4'>
            {cartItems.map((item) => (
              <CartRow key={item.id} {...item}>
                <UnitPicker
                  removeFromCart={() => handleRemoveFromCart(item.id)}
                  addToCart={() => handleAddToCart(item)}
                />
              </CartRow>
            ))}
          </div>

          <div className='flex justify-between items-center mt-4'>
            <button
              className='flex gap-2 items-center px-6 py-3 border uppercase tracking-wide rounded-md hover:bg-[#fff] active:text-slate-500 transition-all '
              onClick={() => handleClearCart()}
            >
              <span>Clear Cart</span>
              <span className='text-2xl'>&times;</span>
            </button>
            <p className='text-2xl'>
              <span className='inline-block w-[75px] text-slate-700 font-bold'>
                Total
              </span>
              <span className='ml-2 text-slate-700'>
                {totalPrice.toLocaleString()} €
              </span>
            </p>
          </div>

          <div className='flex justify-end'>
            <button className='btnPrimary' onClick={handleBackdropOpen}>
              <span>Proceed to Pay</span>
            </button>
          </div>
        </>
      ) : (
        <div className='w-[300px] max-w-[500px] mx-auto bg-yellow-400 text-center py-3'>
          <p>Cart is empty !</p>
        </div>
      )}

      <Backdrop
        sx={{
          color: '#fff',
          zIndex: '999',
        }}
        open={openBackdrop}
      >
        <PaymentCard
          totalPrice={totalPrice}
          handleClose={handleBackdropClose}
        />
      </Backdrop>
    </div>
  );
};

export default Cart;
