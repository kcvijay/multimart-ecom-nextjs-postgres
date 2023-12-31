'use client';
import React, { useEffect, useState, useRef } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TestimonialContent from './TestimonialContent';
import { testimonials } from '@/app/lib/placeholder-data';

const Testimonials = () => {
  const testimonialRef = useRef<HTMLDivElement>(null);
  const [showScollLeft, setShowScrollLeft] = useState(false);
  const [showScrollRight, setShowScrollRight] = useState(true);

  const handleScrollLeft = () => {
    if (testimonialRef.current) {
      testimonialRef.current.scrollBy({
        left: -testimonialRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (testimonialRef.current) {
      testimonialRef.current.scrollBy({
        left: testimonialRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const currentTestimonialRef = testimonialRef.current;

    const handleScroll = () => {
      if (currentTestimonialRef) {
        const { scrollLeft, scrollWidth, clientWidth } = currentTestimonialRef;
        setShowScrollLeft(scrollLeft > 0);
        setShowScrollRight(scrollLeft + clientWidth < scrollWidth);
      }
    };

    if (currentTestimonialRef) {
      currentTestimonialRef.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (currentTestimonialRef) {
        currentTestimonialRef.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className='max-w-[1440px] mx-auto my-32'>
      <h2 className='text-3xl font-bold text-center mb-12'>
        What our clients say?
      </h2>
      <section className='max-w-[976px] mx-auto testimonial-container relative'>
        <div className='testimonial-items' ref={testimonialRef}>
          {testimonials.map((content) => (
            <TestimonialContent
              key={content.id}
              image={content.image}
              name={content.name}
              testimonial={content.testimonial}
              id={content.id}
            />
          ))}
        </div>

        <button
          className={`${
            showScollLeft ? 'visible' : 'invisible'
          } absolute top-1/2 left-2 -translate-y-1/2 left-button bg-[#00000084] text-white w-8 h-8 flex justify-center items-center rounded-full text-xl transition-all active:bg-black`}
          onClick={handleScrollLeft}
        >
          <ChevronLeftIcon />
        </button>

        <button
          className={`${
            showScrollRight ? 'visible' : 'invisible'
          } absolute top-1/2 -translate-y-1/2 right-2 right-btn bg-[#00000084] text-white w-8 h-8 flex justify-center items-center rounded-full text-xl transition-all active:bg-black`}
          onClick={handleScrollRight}
        >
          <ChevronRightIcon />
        </button>
      </section>
    </div>
  );
};

export default Testimonials;
