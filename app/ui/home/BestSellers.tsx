'use client';
import ContainerHeader from '../other/ContainerHeader';
import ProductCard from '../products/ProductCard';

const BestSellers = () => {
  return (
    <div className='mt-24 text-slate-700'>
      <div className='text-center'>
        <ContainerHeader headerText={'Featured Products'} />
      </div>
      <div className='flex flex-wrap justify-center items-center gap-8'></div>
    </div>
  );
};

export default BestSellers;
