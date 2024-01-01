'use server';
import ProductCard from '@/app/ui/products/ProductCard';
import { getFilteredProducts, getProductsPages } from '../lib/data';
import LoadMoreBtn from '../ui/products/LoadMoreBtn';
import ProductSorting from './ProductSorting';

export default async function Products({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getProductsPages(query);
  const allProducts = await getFilteredProducts(query, currentPage);

  return (
    <div className='my-12'>
      <ProductSorting />
      <div className='grid-autofit justify-items-center place-items-center'>
        {allProducts.map((product) => (
          <ProductCard key={product?.pid} {...product} />
        ))}
      </div>
      <LoadMoreBtn
        buttonText={
          currentPage === totalPages
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
// const sortByPriceAscending = (data: Product[]) => {
//   return [...data].sort((a, b) => a.price - b.price);
// };
// const sortByPriceDescending = (data: Product[]) => {
//   return [...data].sort((a, b) => b.price - a.price);
// };
// const sortByTitleAscending = (data: Product[]) => {
//   return [...data].sort((a, b) => a.title.localeCompare(b.title));
// };
// const sortByTitleDescending = (data: Product[]) => {
//   return [...data].sort((a, b) => b.title.localeCompare(a.title));
// };
// const sortByRatingAscending = (data: Product[]) => {
//   return [...data].sort((a, b) => a.rating - b.rating);
// };
// const sortByRatingDescending = (data: Product[]) => {
//   return [...data].sort((a, b) => b.rating - a.rating);
// };

// const sortProducts = (filteredProducts: Product[]) => {
//   let sortedProducts = [...filteredProducts];

//   switch (selectedSorting) {
//     case 'price:asc':
//       sortedProducts = sortByPriceAscending(sortedProducts);
//       break;

//     case 'price:desc':
//       sortedProducts = sortByPriceDescending(sortedProducts);
//       break;

//     case 'title:asc':
//       sortedProducts = sortByTitleAscending(sortedProducts);
//       break;

//     case 'title:desc':
//       sortedProducts = sortByTitleDescending(sortedProducts);
//       break;

//     case 'rating:asc':
//       sortedProducts = sortByRatingAscending(sortedProducts);
//       break;

//     case 'rating:desc':
//       sortedProducts = sortByRatingDescending(sortedProducts);
//       break;
//     default:
//   }
//   return sortedProducts;
// };
