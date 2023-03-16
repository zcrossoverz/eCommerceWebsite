import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import banner1 from 'src/assets/img/banner-1.webp';
import banner2 from 'src/assets/img/banner-2.webp';
import banner3 from 'src/assets/img/banner-3.webp';

const images = [banner1, banner2, banner3];

const variants = {
  initial: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      // scale: 0.5,
    };
  },
  animate: {
    x: 0,
    opacity: 1,
    // scale: 1,
    // transition: 'ease-in',
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => {
    return {
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      // scale: 0.5,
      // transition: 'ease-in',
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    };
  },
};

function Banner() {
  const [index, setIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  function nextStep() {
    setDirection(1);
    if (index === images.length - 1) {
      setIndex(0);
      return;
    }
    setIndex(index + 1);
  }

  function prevStep() {
    setDirection(-1);
    if (index === 0) {
      setIndex(images.length - 1);
      return;
    }
    setIndex(index - 1);
  }
  const goToSlide = (slideIndex: number) => {
    if (index > slideIndex) {
      setDirection(-1);
    } else setDirection(1);
    setIndex(slideIndex);
  };

  return (
    <div className='group'>
      <div className='relative mx-auto mt-1 aspect-video max-w-7xl overflow-hidden p-4 lg:aspect-auto lg:min-h-[600px]'>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            variants={variants}
            animate='animate'
            initial='initial'
            exit='exit'
            src={images[index]}
            alt='slides'
            className='absolute top-0 left-0 h-full w-full object-cover object-center'
            key={images[index]}
            custom={direction}
          />
        </AnimatePresence>
        {/* left Arrow */}
        <div className='btn-slide left-5'>
          <BsChevronCompactLeft onClick={prevStep} size={30} />
        </div>
        {/* Right Arrow */}
        <div className='btn-slide right-5'>
          <BsChevronCompactRight onClick={nextStep} size={30} />
        </div>
        <div className='top-4 flex items-center justify-center py-2'>
          {images.map((slide, slideIndex: number) => (
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className='hover:text-primary relative z-10 cursor-pointer text-2xl text-[#e3e3e3] lg:text-3xl'
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
