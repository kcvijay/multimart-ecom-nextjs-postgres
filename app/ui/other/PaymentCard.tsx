import React, { ChangeEvent, useState } from 'react';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import Link from 'next/link';
import Image from 'next/image';
import { Alert } from '@mui/material';

interface PaymentCardProps {
  totalPrice: number;
  handleClose: () => void;
}

const PaymentCard = ({ totalPrice, handleClose }: PaymentCardProps) => {
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false);
  const [shippingAddress, setShippingAddress] = useState(false);
  const [cardNumber, setCardNumber] = useState<string>('');
  const [cardValidity, setCardValidity] = useState<string>('');

  const handleCardNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numbersOnlyInput = input.replace(/\D/g, '');
    const formattedNumber = numbersOnlyInput.replace(/(\d{4})/g, '$1 ');
    setCardNumber(formattedNumber);
  };

  const handleExpiryDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const numbersOnly = input.replace(/\D/g, '');
    const formattedValidity = numbersOnly.replace(
      /(\d{2})(\d{0,2})/,
      (match, part1, part2) => {
        if (part1) {
          return part2 ? `${part1} / ${part2}` : `${part1}`;
        }
        return '';
      }
    );

    setCardValidity(formattedValidity);
  };

  const cardIssuerIcons: { [key: string]: string } = {
    '34': '/amex.png',
    '37': '/amex.png',
    '49': '/visa.png',
    '51': '/mastercard.png',
    '52': '/mastercard.png',
    '53': '/mastercard.png',
    '54': '/mastercard.png',
  };

  const cardInitialNumbers = cardNumber.slice(0, 2);
  const areInitialNumbersInObject = Object.keys(cardIssuerIcons).some(
    (key) => key === cardInitialNumbers
  );
  return (
    <div className='text-[16px] max-w-screen h-[100svh] overflow-y-scroll border bg-[#f0f0f0] border-slate-200 text-slate-600 p-[1em] flex flex-col gap-[1.2em] shadow-lg z-[9999]'>
      <Alert severity='warning'>
        This is a demo page. Don&apos;t insert your bank card details !
      </Alert>
      <div>
        <p className='text-[1.3em]'>Total {totalPrice} €</p>
      </div>
      <div>
        <p className='text-[1.2em] font-bold mb-3'>Payment Method</p>
        <p className='text-[1em] mb-[0.5em]'>Card Information</p>
        <form className='flex flex-col'>
          <div className='w-full mb-[1.5em]'>
            <div className='relative'>
              <input
                id='cardNumber'
                name='cardNumber'
                className='w-full border border-slate-200 rounded-t-lg p-[0.5em] mb-[0.25em]'
                type='text'
                inputMode='numeric'
                placeholder='1234 1234 1234 1234'
                maxLength={19}
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
              {areInitialNumbersInObject && cardNumber.length >= 2 ? (
                <Image
                  className='absolute right-2 top-2'
                  src={cardIssuerIcons[cardInitialNumbers]}
                  width={24}
                  height={7}
                  alt=''
                />
              ) : (
                ''
              )}
            </div>

            <div className='flex gap-1'>
              <input
                id='cardValidity'
                name='cardValidity'
                className='w-full border border-slate-200 rounded-bl-lg p-[0.5em]'
                type='text'
                inputMode='numeric'
                placeholder='MM / YY'
                maxLength={7}
                autoComplete='cc-exp'
                value={cardValidity}
                onChange={handleExpiryDateChange}
              />
              <input
                id='cardCvc'
                name='cardCvc'
                className='w-full border border-slate-200 rounded-br-lg p-[0.5em]'
                type='text'
                inputMode='numeric'
                placeholder='CVC'
                maxLength={3}
              />
            </div>
          </div>
          <div className='w-full mb-[1.5em]'>
            <label className='block text-[1em] mb-1' htmlFor='cardholderName'>
              Cardholder&apos;s Name
            </label>
            <input
              className='w-full border border-slate-200 p-[0.5em] rounded-lg'
              type='text'
              name='cardholderName'
              id='cardholderName'
              placeholder='Jane Doe'
            />
          </div>
          <div className='mb-[1.5em] flex justify-start items-center gap-4'>
            <input
              className='block h-4 w-4'
              id='termsAgree'
              name='termsAgree'
              type='checkbox'
              onChange={() => setShippingAddress(!shippingAddress)}
            />
            <label className='block' htmlFor='termsAgree'>
              My billing and shipping addresses are different.
            </label>
          </div>
          <div className='w-full mb-[1.5em]'>
            <p className='text-[1em] mb-1'>
              Billing {!shippingAddress && '+ Shipping'} Address
            </p>
            <div className='flex flex-col gap-1'>
              <input
                className='border border-slate-200 p-[0.5em] rounded-t-lg'
                type='text'
                name='addressOne'
                id='addressOne'
                placeholder='Street Address'
              />
              <input
                className='border border-slate-200 p-[0.5em]'
                type='text'
                name='addressTwo'
                id='addressTwo'
                placeholder='Zip code & city'
              />
              <input
                className={`border border-slate-200 p-[0.5em] ${
                  shippingAddress && 'rounded-b-lg'
                }`}
                type='text'
                name='addressThree'
                id='addressThree'
                placeholder='Country'
              />
              {!shippingAddress && (
                <input
                  className=' border border-slate-200 p-[0.5em] rounded-b-lg'
                  type='text'
                  name='phone'
                  id='phone'
                  placeholder='+358 44 123 4567'
                />
              )}
            </div>
          </div>

          {shippingAddress && (
            <div className='w-3/4 mb-[1.5em]'>
              <p className='text-[1em] mb-1'>Shipping Address</p>
              <div className='flex flex-col gap-1'>
                <input
                  className='border border-slate-200 p-[0.5em] rounded-t-lg'
                  type='text'
                  name='addressOne'
                  id='addressOne'
                  placeholder='Street Address'
                />
                <input
                  className='border border-slate-200 p-[0.5em]'
                  type='text'
                  name='addressTwo'
                  id='addressTwo'
                  placeholder='Zip code & city'
                />
                <input
                  className='border border-slate-200 p-[0.5em] '
                  type='text'
                  name='addressThree'
                  id='addressThree'
                  placeholder='Country'
                />
                {shippingAddress && (
                  <input
                    className=' border border-slate-200 p-[0.5em] rounded-b-lg'
                    type='text'
                    name='phone'
                    id='phone'
                    placeholder='+358 44 123 4567'
                  />
                )}
              </div>
            </div>
          )}
          <div className='mb-[1.5em] flex justify-start items-center gap-4'>
            <input
              className='block h-4 w-4'
              id='termsAgree'
              name='termsAgree'
              type='checkbox'
              onChange={() => setAgreedTerms(!agreedTerms)}
            />
            <label className='block' htmlFor='termsAgree'>
              I agree with{' '}
              <Link className='underline' href='/'>
                Terms & Conditions.
              </Link>
            </label>
          </div>
          <div className='flex gap-[1em]'>
            <button
              disabled={!agreedTerms}
              type='submit'
              className={`btnPrimary flex-1 ${
                !agreedTerms ? 'btnDisabled' : ''
              }`}
            >
              <PaymentOutlinedIcon />
              <span>Pay</span>
            </button>
            <button
              type='reset'
              className='btnSecondary flex-1 inline-flex gap-2'
              onClick={handleClose}
            >
              <CancelIcon />
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentCard;
