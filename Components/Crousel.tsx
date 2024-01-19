'use client'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Image from "next/image";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<string | null>(null);

  const slideVariants = {
    hiddenRight: {
      x: "100%",
    },
    hiddenLeft: {
      x: "-100%",
    },
    visible: {
      x: "0",
      transition: {
        duration: 0.8,
      },
    },
    exitLeft: {
      x:"100%",
      transition: {
        duration: 0.4,
      },
    },
    exitRight: {
      x:"-100%",
      transition: {
        duration: 0.4,
      },
    },
  };
  const slidersVariants = {
    hover: {
      scale: 1.2,
    },
  };
  const dotsVariants = {
    initial: {
      y: 0,
    },
    animate: {
      scale: 1.5,
      transition: { type: "spring", stiffness: 1000, damping: 10 },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 },
    },
  };

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection("left");

    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  useEffect(() => {
    const autoChangeTimeout = setTimeout(() => {
      handleNext();
    }, 10000);

    return () => clearTimeout(autoChangeTimeout);
  }, [currentIndex]);

  return (
    <div className="carousel">
      <div className="relative h-96 m-auto overflow-hidden ">
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit={direction === "right" ? "exitRight" : "exitLeft"}
            variants={slideVariants}
            className=" w-full h-full object-cover p-2 grid grid-cols-2 gap-5"
          >
            <Image src={images[currentIndex]} height={200} width={400} alt="image"
            className=" w-full h-full object-cover"
            />
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veritatis mollitia numquam fuga vero aliquid dolorum recusandae illum, delectus quae blanditiis, et ducimus quidem magni dolor earum iste enim necessitatibus!</div>
          </motion.div>
        </AnimatePresence>
        <div className="flex  justify-between">
          <motion.button
            variants={slidersVariants}
            whileHover="hover"
            className="rounded-full absolute right-12 bottom-0 bg-orange-500 text-white mb-5 p-1 "
            onClick={handlePrevious}
          >
            <FaAngleLeft size={25} />
          </motion.button>
          <motion.button
            variants={slidersVariants}
            whileHover="hover"
            className="rounded-full absolute right-2 bottom-0 bg-orange-500 text-white mb-5 p-1 "
            onClick={handleNext}
          >
            <FaAngleRight size={25} />
          </motion.button>
        </div>
      </div>
      <div className="  mt-5 flex justify-center gap-5">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`dot  w-3 h-3 rounded-full  ${currentIndex === index ? " bg-orange-500 " : " bg-slate-200"}`}
            onClick={() => handleDotClick(index)}
            initial="initial"
            animate={currentIndex === index ? "animate" : ""}
            whileHover="hover"
            variants={dotsVariants}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;

