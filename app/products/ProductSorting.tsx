'use client';
import {
  Box,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
  Divider,
  TextField,
  SelectChangeEvent,
} from '@mui/material';
import { productSortOptions } from '../lib/placeholder-data';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import React from 'react';

export default function ProductSorting() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleProductSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    const params = new URLSearchParams(searchParams);
    const orderValue = event.target.value;
    params.set('page', '1');

    if (orderValue) {
      params.set('order', event.target.value);
    } else {
      params.delete('order');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
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
            label='Search by Product Title'
            onChange={(e) => handleProductSearch(e.target.value)}
          />
          <Divider sx={{ height: 50, m: 1 }} orientation='vertical' />{' '}
          <FormControl
            sx={{
              width: 300,
              minWidth: 150,
              backgroundColor: '#fff',
            }}
          >
            <InputLabel id='sortingOptionsLabel'>Sort By</InputLabel>
            <Select
              labelId='sortingOptionsLabel'
              id='sortingOptions'
              label='Sort By'
              value={searchParams?.get('order') || ''}
              sx={{ fontFamily: 'inherit' }}
              onChange={handleSortChange}
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
    </div>
  );
}
