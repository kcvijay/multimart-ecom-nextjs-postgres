import { sql } from '@vercel/postgres';
import { Product } from './definitions';

import { unstable_noStore as noStore } from 'next/cache';

export async function getAllProducts() {
  noStore();

  try {
    const data = await sql<Product>`SELECT * FROM products`;
    return data.rows;
  } catch (error) {
    console.error(`Error while getting the data. ${error}`);
    throw new Error('Failed to fetch products.');
  }
}

const ITEMS_PER_PAGE = 20;
export async function getFilteredProducts(
  query: string,
  currentPage: number,
  order: string
) {
  noStore();

  try {
    const products = await sql<Product>`
      SELECT * FROM products
      WHERE products.title ILIKE ${`%${query}%`}
      LIMIT ${ITEMS_PER_PAGE * currentPage}
    `;
    const sortedProducts = sortProducts(products.rows, order);
    return sortedProducts;
  } catch (error) {
    console.error(`Error while getting the data. ${error}`);
    throw new Error('Failed to fetch products.');
  }
}

export async function getProductsPages(query: string) {
  noStore();

  try {
    const count = await sql`
    SELECT COUNT(*) FROM products
    WHERE products.title ILIKE ${`%${query}%`}`;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error(`Error while getting the data. ${error}`);
    throw new Error('Failed to fetch total pages count.');
  }
}

export async function getProductById(id: string) {
  noStore();
  try {
    const product = await sql<Product>`
    SELECT * FROM products
    WHERE products.pid = ${id}
    LIMIT 1
    `;
    return product.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

// An alternative to ORDER BY query.
function sortProducts(products: Product[], order: string): Product[] {
  switch (order) {
    case 'title-asc':
      return products.sort((a, b) => a.title.localeCompare(b.title));
    case 'title-desc':
      return products.sort((a, b) => b.title.localeCompare(a.title));
    case 'price-asc':
      return products.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return products.sort((a, b) => b.price - a.price);
    case 'rating-asc':
      return products.sort((a, b) => a.rating - b.rating);
    case 'rating-desc':
      return products.sort((a, b) => b.rating - a.rating);
    default:
      return products;
  }
}
