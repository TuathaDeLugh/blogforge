'use client'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Image from "next/image";
import { Div, H1, P } from "./Motion/Motion";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<string | null>(null);

  const slideVariants = {
    fromright: {
      x: "100%",
    },
    fromleft: {
      x: "-100%",
    },
    visible: {
      x: "0",
      transition: {
        duration: 0.8,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  const dotsVariants = {
    initial: {
      y: 0,
    },
    animate: {
      scale: 1.3,
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
    <div className="carousel max-w-[1500px] mx-auto">
      <div className="relative h-[50vh] m-auto overflow-hidden ">
        <AnimatePresence>
          <motion.div
            key={currentIndex}

            initial={direction === "right" ? "fromright" : "fromleft"}
            animate="visible"
            exit='exit'
            variants={slideVariants}
            className=" w-full h-full relative p-2 grid gap-4 md:grid-cols-2 bg-slate-800 md:bg-transparent"
          >
            <div className="h-full w-full absolute md:relative md:m-10 ">
                <div className="mx-auto md:w-[85%] relative">

              <Image src={images[currentIndex]} height={200} width={400} alt="image"
                className=" h-full bg-slate-200 dark:bg-slate-600 md:rounded-br-[80px] md:rounded-tl-[80px] md:h-[40vh]  opacity-20 md:opacity-100 w-full object-cover md:rounded shadow border dark:border-slate-500/50 dark:shadow-slate-600/50"
                />
              <Div
                initial={{ opacity: 0, x: 20, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -z-10 hidden h-[40vh] w-full md:rounded-br-[80px] md:rounded-tl-[80px] bg-orange-400 rounded top-5 left-5 md:block">
              </Div>
                  </div>
            </div>
            <div className="z-10 text-slate-200 md:dark:text-slate-200  md:text-slate-700 p-4">
              <div className="relative lg:mt-10 ">
                <H1
                  initial={{ opacity: 0,  x: -20 }}
                  animate={{ opacity: 0.1,  x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute -top-20   left-0 text-[20px] lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 lg:block hidden">
                  Tranding
                </H1>
                <H1

                  initial={{ opacity: 0,  x: -20 }}
                  animate={{ opacity: 1,  x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="pl-2 text-3xl font-bold border-l-8 border-orange-400 md:text-5xl dark:text-white">
                  Title
                </H1>
              </div>
              <P
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-6 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400 text-justify">
                DATA
              </P>
              <button className="rounded p-1 text-sm absolute bottom-12 bg-orange-500 text-white " >View Article</button>
            </div>
          </motion.div>
        </AnimatePresence>
        <div>
          <motion.button
            whileHover={
              {
                scale: 1.2,
              }
            }
            className="absolute left-3 top-0 bottom-0 p-1 text-gray-500/50 hover:text-orange-500 "
            onClick={handlePrevious}
          >
            <FaAngleLeft size={25} />
          </motion.button>
          <motion.button
            whileHover={
              {
                scale: 1.2,
              }
            }
            className=" absolute right-3 top-0 bottom-0 text-gray-500/50  p-1 hover:text-orange-500 "
            onClick={handleNext}
          >
            <FaAngleRight size={25} />
          </motion.button>
        </div>
      </div>
      <div className="hidden md:flex  mt-5  justify-center gap-5">
        {images.map((_, index) => (
          <motion.div
            key={index}
            className={`dot  w-3 h-3 rounded-full  ${currentIndex === index ? " bg-orange-500 " : " bg-slate-200 dark:bg-slate-600/50"}`}
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

