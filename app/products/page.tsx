'use server';
import ProductCard from '@/app/ui/products/ProductCard';
import { getFilteredProducts, getProductsPages } from '../lib/data';
import LoadMoreBtn from '../ui/products/LoadMoreBtn';
import ProductSorting from './ProductSorting';

export default async function Products({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; order?: string };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const order = searchParams?.order || '';
  const allProducts = await getFilteredProducts(query, currentPage, order);
  const totalPages = await getProductsPages(query);

  return (
    <div className='relative my-12'>
      <ProductSorting />
      <div className='grid-autofit justify-items-center place-items-center'>
        {allProducts.map((product) => (
          <ProductCard key={product?.pid} {...product} />
        ))}
      </div>
      <LoadMoreBtn
        buttonText={
          allProducts.length === 100
            ? 'All products are loaded !'
            : 'Load More...'
        }
        currentPage={currentPage}
        totalPages={totalPages}
        allProducts={allProducts}
      />
    </div>
  );
}
