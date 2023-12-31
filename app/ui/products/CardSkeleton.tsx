'use client';
import React from 'react';
import { Skeleton, Stack } from '@mui/material';

const CardSkeleton = () => {
  return (
    <div className='max-w-[500px] min-w-[320px] w-full rounded-md overflow-hidden'>
      <Stack style={{}}>
        <Skeleton
          variant='rectangular'
          height={250}
          animation='wave'
          style={{ maxWidth: '100%' }}
        />
        <Stack
          style={{
            backgroundColor: '#fff',
            padding: '24px 16px',
            maxWidth: '100%',
          }}
        >
          <Skeleton
            variant='rectangular'
            width={200}
            height={35}
            style={{
              borderRadius: '50px',
              marginBottom: '16px',
            }}
            animation='wave'
          />
          <Skeleton
            variant='rectangular'
            width={300}
            height={30}
            style={{
              borderRadius: '50px',
              marginBottom: '16px',
            }}
            animation='wave'
          />

          <Skeleton
            variant='rectangular'
            width={100}
            height={8}
            style={{
              borderRadius: '50px',
              marginBottom: '28px',
              marginLeft: 'auto',
            }}
            animation='wave'
          />
          <Skeleton
            variant='rectangular'
            style={{ borderRadius: '50px', margin: '0 auto' }}
            width={300}
            height={55}
            animation='wave'
          />
        </Stack>
      </Stack>
    </div>
  );
};

export default CardSkeleton;
