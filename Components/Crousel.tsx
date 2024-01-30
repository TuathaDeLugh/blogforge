'use client'
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Image from "next/image";
import { H1, P } from "./Motion/Motion";
import Link from "next/link";

interface CarouselProps {
  trending: {
    title: string;
    data: string;
    image: {
      link: string;
      name: string;
    } ;
    id : string ;
  }[];
}

const Carousel: React.FC<CarouselProps> = ({ trending }) => {
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
      prevIndex + 1 === trending.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection("left");

    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? trending.length - 1 : prevIndex - 1
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
    <div className=" w-full  max-w-[1500px] mx-auto lg:h-auto px-2 ">
      <div className="relative w-full h-[35rem] m-auto overflow-hidden rounded-lg  ">
        <AnimatePresence>
          <motion.div
            key={currentIndex}

            initial={direction === "right" ? "fromright" : "fromleft"}
            animate="visible"
            exit='exit'
            variants={slideVariants}
            className=" w-full h-full relative grid lg:grid-cols-2 gap-3 bg-slate-800 lg:bg-transparent"
          >
            <div className="h-full w-full absolute lg:relative lg:py-2">
                <Image src={trending[currentIndex].image?.link} height={600} width={800} alt="image"
                  className="h-full w-full bg-slate-200 dark:bg-slate-600 opacity-20 lg:opacity-100 object-cover lg:rounded-xl shadow-md border dark:border-slate-500/50 dark:shadow-slate-600/50 "
                />
            </div>
            <div className="z-10 text-slate-200 lg:dark:text-slate-200  lg:text-slate-700 px-10 lg:p-4 mt-7 lg:mt-10">
              <div className="relative ">
                <H1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 0.1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="absolute -top-16 lg:-top-20   left-0 lg:text-[100px] text-gray-900 font-bold  dark:text-gray-200 opacity-5 lg:block hidden">
                  Tranding
                </H1>
                <H1

                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="pl-2 text-3xl font-bold border-l-8 border-orange-400 lg:text-5xl dark:text-white">
                  {trending[currentIndex].title}
                </H1>
              </div>
              <P
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-6 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400 text-justify">
                {trending[currentIndex].data}
              </P>
              <Link href={`/blogs/${trending[currentIndex].id}`} className="rounded p-1 text-sm absolute bottom-5 bg-orange-500 text-white" >View Article</Link>
            </div>
          </motion.div>
        </AnimatePresence>
          <motion.button
            whileHover={
              {
                scale: 1.2,
              }
            }
            className="absolute left-3 lg:left-auto lg:top-auto lg:right-14 lg:bottom-5 lg:border rounded-md top-0 bottom-0 p-1 text-gray-500/50 border-gray-500/50 hover:text-orange-500 "
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
            className=" absolute right-3 top-0 bottom-0 lg:top-auto lg:border rounded-md lg:bottom-5 text-gray-500/50 border-gray-500/50  p-1 hover:text-orange-500 "
            onClick={handleNext}
          >
            <FaAngleRight size={25} />
          </motion.button>
      <div className="hidden absolute z-20  lg:flex flex-col m-5 top-0 bottom-0 left-0  justify-center gap-6">
        {trending.map((_, index) => (
          <motion.div
            key={index}
            className={`dot  w-3 h-3 rounded-full  ${currentIndex === index ? " bg-orange-500" : " bg-slate-200 dark:bg-slate-400/30"} backdrop-blur`}
            onClick={() => handleDotClick(index)}
            initial="initial"
            animate={currentIndex === index ? "animate" : ""}
            whileHover="hover"
            variants={dotsVariants}
          ></motion.div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Carousel;

