'use client';
import { useEffect, useState } from 'react';
import CardSkeleton from '@/app/ui/products/CardSkeleton';
import ProductCard from '@/app/ui/products/ProductCard';

import {
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  SelectChangeEvent,
  Divider,
  TextField,
} from '@mui/material';
import { productSortOptions } from '@/app/lib/placeholder-data';
import { getAllProducts } from '../ui/route';
interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSorting, setSelectedSorting] = useState<string>('');
  const [filterText, setFilterText] = useState<string>('');

  const skeletopMappingHandler = (i: number) => {
    const mappingArray = Array.from({ length: i }, (_, index) => (
      <CardSkeleton key={index} />
    ));
    return mappingArray;
  };

  const fetchAllProducts = async () => {
    try {
      const data = await getAllProducts();
      if (data) {
        setProducts(data);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const sortByPriceAscending = (data: ProductData[]) => {
    return [...data].sort((a, b) => a.price - b.price);
  };
  const sortByPriceDescending = (data: ProductData[]) => {
    return [...data].sort((a, b) => b.price - a.price);
  };
  const sortByTitleAscending = (data: ProductData[]) => {
    return [...data].sort((a, b) => a.title.localeCompare(b.title));
  };
  const sortByTitleDescending = (data: ProductData[]) => {
    return [...data].sort((a, b) => b.title.localeCompare(a.title));
  };
  const sortByRatingAscending = (data: ProductData[]) => {
    return [...data].sort((a, b) => a.rating - b.rating);
  };
  const sortByRatingDescending = (data: ProductData[]) => {
    return [...data].sort((a, b) => b.rating - a.rating);
  };

  const handleFilterTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilterText(event.target.value);
  };

  const handleSortingChange = (e: SelectChangeEvent) => {
    const selectedOption = e.target.value;
    setSelectedSorting(selectedOption);
  };
  const filteredProducts = products.filter((product: { title: string }) => {
    return product.title.toLowerCase().includes(filterText.toLowerCase());
  });

  const sortProducts = (filteredProducts: ProductData[]) => {
    let sortedProducts = [...filteredProducts];

    switch (selectedSorting) {
      case 'price:asc':
        sortedProducts = sortByPriceAscending(sortedProducts);
        break;

      case 'price:desc':
        sortedProducts = sortByPriceDescending(sortedProducts);
        break;

      case 'title:asc':
        sortedProducts = sortByTitleAscending(sortedProducts);
        break;

      case 'title:desc':
        sortedProducts = sortByTitleDescending(sortedProducts);
        break;

      case 'rating:asc':
        sortedProducts = sortByRatingAscending(sortedProducts);
        break;

      case 'rating:desc':
        sortedProducts = sortByRatingDescending(sortedProducts);
        break;
      default:
    }
    return sortedProducts;
  };

  return (
    <div className='my-12'>
      <form className='mb-8'>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 8px',
            fontFamily: 'inherit',
          }}
        >
          <TextField
            sx={{
              width: 300,
              minWidth: 150,
              backgroundColor: '#fff',
            }}
            label='Search by Title'
            onChange={handleFilterTextChange}
          />
          <Divider sx={{ height: 50, m: 1 }} orientation='vertical' />{' '}
          <FormControl
            sx={{
              width: 300,
              minWidth: 150,
              backgroundColor: '#fff',
            }}
          >
            <InputLabel id='sortingOptionsLabel'>Sort</InputLabel>
            <Select
              labelId='sortingOptionsLabel'
              id='sortingOptions'
              value={selectedSorting}
              label='Sort'
              onChange={handleSortingChange}
              sx={{ fontFamily: 'inherit' }}
            >
              {productSortOptions.map((option) => (
                <MenuItem
                  key={option.id}
                  value={option.value}
                  sx={{ fontFamily: 'inherit' }}
                >
                  {option.text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </form>

      <div className='grid-autofit'>
        {loading
          ? skeletopMappingHandler(6)
          : sortProducts(filteredProducts).map((product) => (
              <ProductCard
                key={product?.id}
                id={product?.id}
                brand={product?.brand}
                title={product?.title}
                thumbnail={product?.thumbnail}
                images={product?.images}
                price={product?.price}
                stock={product?.stock}
                discountPercentage={product?.discountPercentage}
                rating={product?.rating}
                description={product?.description}
                category={product?.category}
              />
            ))}
      </div>
    </div>
  );
};

export default Products;
