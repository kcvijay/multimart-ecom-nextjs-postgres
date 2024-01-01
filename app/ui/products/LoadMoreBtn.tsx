'use client';
import { Product } from '@/app/lib/definitions';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function LoadMoreBtn({
  buttonText,
  currentPage,
  totalPages,
  allProducts,
}: {
  buttonText: string;
  currentPage: number;
  totalPages: number;
  allProducts: Product[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleLoadMoreProducts = () => {
    const params = new URLSearchParams(searchParams);
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      params.set('page', nextPage.toString());
      replace(`${pathname}?${params}`);
    }
    window.scrollTo(0, document.body.scrollHeight);
  };

  return (
    <div className='mt-12'>
      <p className='text-slate-500 text-lg text-center py-8'>
        {allProducts.length}/100 products are loaded.
      </p>
      <div className='relative flex justify-center items-center'>
        <div className='bg-slate-300 w-full h-[2px]' />
        <button
          disabled={currentPage === totalPages}
          className='absolute bg-gray-100 px-6 py-3 border-2 border-slate-300 hover:bg-white active:text-slate-300 transition-all'
          onClick={() => handleLoadMoreProducts()}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
