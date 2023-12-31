'use client';
import React, { useRef } from 'react';

interface CartItemsProps {
  cartItemNumber: number;
}

const CartItemsTooltip = ({ cartItemNumber }: CartItemsProps) => {
  const cartItemRef = useRef(null);
  return (
    <p
      ref={cartItemRef}
      className={
        'absolute inline-flex justify-center items-center font-bold border-[3px] border-white text-white w-[32px] h-[32px] text-sm-[30px] rounded-full -top-[2px] left-[60%] -translate-x-[50%] -translate-y-[50%] bg-orange-400'
      }
    >
      {cartItemNumber}
    </p>
  );
};

export default CartItemsTooltip;
