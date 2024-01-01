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

/***********************************************/
const ITEMS_PER_PAGE = 20;
export async function getFilteredProducts(query: string, currentPage: number) {
  noStore();
  try {
    const products = await sql<Product>`
    SELECT * FROM products
    WHERE products.title ILIKE ${`%${query}%`}
    ORDER BY rating DESC
    LIMIT ${ITEMS_PER_PAGE * currentPage}
    `;
    return products.rows;
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

/************************************************/
export async function getProducts_titleAscending() {
  noStore();

  try {
    const data = await sql<Product>`SELECT * FROM products ORDER BY title ASC`;
    return data.rows;
  } catch (error) {
    console.error(`Error while getting the data. ${error}`);
    throw new Error('Failed to fetch products and sort by title ascending.');
  }
}

export async function getProducts_titleDescending() {
  noStore();

  try {
    const data = await sql<Product>`SELECT * FROM products ORDER BY title DESC`;
    return data.rows;
  } catch (error) {
    console.error(`Error while getting the data. ${error}`);
    throw new Error('Failed to fetch products and sort by title descending.');
  }
}

export async function getProducts_priceAscending() {
  noStore();

  try {
    const data = await sql<Product>`SELECT * FROM products ORDER BY price ASC`;
    return data.rows;
  } catch (error) {
    console.error(`Error while getting the data. ${error}`);
    throw new Error('Failed to fetch products and sort by price ascending.');
  }
}

export async function getProducts_priceDescending() {
  noStore();

  try {
    const data = await sql<Product>`SELECT * FROM products ORDER BY price DESC`;
    return data.rows;
  } catch (error) {
    console.error(`Error while getting the data. ${error}`);
    throw new Error('Failed to fetch products and sort by price descending.');
  }
}

export async function getProducts_ratingAscending() {
  noStore();

  try {
    const data = await sql<Product>`SELECT * FROM products ORDER BY rating ASC`;
    return data.rows;
  } catch (error) {
    console.error(`Error while getting the data. ${error}`);
    throw new Error('Failed to fetch products and sort by rating ascending.');
  }
}

export async function getProducts_ratingDescending() {
  noStore();

  try {
    const data =
      await sql<Product>`SELECT * FROM products ORDER BY rating DESC`;
    return data.rows;
  } catch (error) {
    console.error(`Error while getting the data. ${error}`);
    throw new Error('Failed to fetch products and sort by rating descending.');
  }
}
