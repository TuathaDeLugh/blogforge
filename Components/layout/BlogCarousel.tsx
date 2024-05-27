// 'use client'
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import React, { useState, useEffect } from 'react';


// interface Image {
//   link: string;
// }

// interface Creator {
//   avatar?: string;
//   createdby: string;
//   username: string;
// }

// interface Blog {
//   _id: string;
//   title: string;
//   info: string;
//   images: Image[];
//   creator: Creator;
//   updatedAt: string;
// }

// interface BlogProps {
//   data: Blog[];
// }

// export default function BlogCarousel({ data }: BlogProps) {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [visibleSlides, setVisibleSlides] = useState(3); 

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => {
//       const newIndex = prevIndex + 1;
//       if (newIndex > data.length - visibleSlides) {
//         return data.length - visibleSlides;
//       }
//       return newIndex;
//     });
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) {
//         setVisibleSlides(1);
//       } else if (window.innerWidth < 1024) {
//         setVisibleSlides(2);
//       } else {
//         setVisibleSlides(3);
//       }
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (currentIndex > data.length - visibleSlides) {
//       setCurrentIndex(data.length - visibleSlides);
//     }
//   }, [visibleSlides, data.length, currentIndex]);

//   return (
//     <div className="relative overflow-hidden w-full h-full p-4">
//       <div className="flex items-center justify-between absolute top-1/2 transform left-0 -translate-y-1/2 w-full z-10 p-2">
//         <button
//           onClick={prevSlide}
//           className="rounded-full px-2 shadow-md bg-slate-200 dark:bg-slate-600"
//         >
//           &lt;
//         </button>
//         <button
//           onClick={nextSlide}
//           className=" rounded-full px-2 shadow-md bg-slate-200 dark:bg-slate-600 "
//         >
//           &gt;
//         </button>
//       </div>
//       <div className="overflow-hidden">
//         <motion.div
//           className="flex"
//           initial={{ x: 0 }}
//           animate={{ x: currentIndex * -100 / visibleSlides + '%' }}
//           transition={{ type: 'spring', stiffness: 100, damping: 20 }}
//           key={currentIndex}
//         >
//           {data.map((blog) => (
//             <div
//               className="min-w-1/3 flex-shrink-0 px-4"
//               key={blog._id}
//               style={{ flex: `0 0 ${100 / visibleSlides}%` }}
//             >
//               <div
//                 className="border bg-white rounded-lg shadow dark:bg-gray-800 dark:border-slate-500"
//               >
//                 <div className="flex flex-col space-y-3 p-6 rounded-t-lg bg-white dark:bg-gray-800">
//                   <Image
//                     src={blog.images[0].link}
//                     alt="AI Image"
//                     className="w-full h-48 object-cover mb-4 rounded bg-slate-200 dark:bg-slate-700"
//                     width={300}
//                     height={200}
//                   />
//                   <h3 className="text-2xl font-semibold leading-none tracking-tight text-ellipsis text-orange-500 dark:text-orange-400">
//                     {blog.title}
//                   </h3>
//                   <p className="mt-2 text-gray-900 dark:text-white text-ellipsis">
//                     {blog.info}
//                   </p>
//                 </div>
//                 <div className="px-6 bg-white dark:bg-gray-800">
//                   <p className="text-sm text-gray-500 dark:text-gray-400 flex gap-2 text-ellipsis">
//                     {blog.creator.avatar ? (
//                       <Image
//                         className="rounded-full border dark:border-slate-500"
//                         src={blog.creator.avatar}
//                         width={23}
//                         height={23}
//                         alt={blog.creator.createdby}
//                       />
//                     ) : null}
//                     {blog.creator.username +
//                       ' at ' +
//                       new Date(blog.updatedAt).toLocaleString('en-IN', {
//                         timeZone: 'Asia/Kolkata',
//                       })}
//                   </p>
//                 </div>
//                 <div className="flex items-center p-6 rounded-b-lg bg-white dark:bg-gray-800">
//                   <Link
//                     className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-9 rounded-md px-3 text-white bg-orange-400 hover:bg-orange-400/80 dark:bg-orange-500/80 dark:hover:bg-orange-500/50"
//                     href={`/blogs/${blog._id}`}
//                   >
//                     Read Blog
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </motion.div>
//       </div>
//       <div className="flex justify-center mt-4">
//         <div className="relative w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-full">
//           <motion.div
//             className="absolute h-full bg-slate-400 dark:bg-slate-600 rounded-full"
//             style={{
//               width: `${
//                 ((currentIndex + visibleSlides) / data.length) * 100
//               }%`,
//             }}
//             initial={{ width: 0 }}
//             animate={{
//               width: `${
//                 ((currentIndex + visibleSlides) / data.length) * 100
//               }%`,
//             }}
//             transition={{ type: 'spring', stiffness: 100, damping: 20 }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
// ImageSlider.tsx
'use client'
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
interface Image {
  id: number;
  name: string;
  link: string;
}
// ImageSlider.tsx


interface ImageSliderProps {
  images: Image[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const imageListRef = useRef<HTMLUListElement>(null);
  const scrollbarThumbRef = useRef<HTMLDivElement>(null);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const [maxThumbPosition, setMaxThumbPosition] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (imageListRef.current) {
        setMaxScrollLeft(imageListRef.current.scrollWidth - imageListRef.current.clientWidth);
      }
      if (scrollbarThumbRef.current && imageListRef.current) {
        setMaxThumbPosition(imageListRef.current.clientWidth - scrollbarThumbRef.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollbarThumbDrag = (e: React.MouseEvent) => {
    if (!imageListRef.current || !scrollbarThumbRef.current) return;

    const startX = e.clientX;
    const thumbPosition = scrollbarThumbRef.current.offsetLeft;
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      const boundedPosition = Math.max(0, Math.min(maxThumbPosition, newThumbPosition));
      const scrollPosition = (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumbRef.current!.style.left = `${boundedPosition}px`;
      imageListRef.current!.scrollLeft = scrollPosition;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleSlideButtonClick = (direction: number) => {
    if (!imageListRef.current) return;

    const scrollAmount = imageListRef.current.clientWidth * direction;
    imageListRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleImageListScroll = () => {
    if (!imageListRef.current || !scrollbarThumbRef.current) return;

    const scrollPosition = imageListRef.current.scrollLeft;
    const thumbPosition = (scrollPosition / maxScrollLeft) * maxThumbPosition;
    scrollbarThumbRef.current.style.left = `${thumbPosition}px`;
  };

  return (
    <div className="max-w-screen-lg w-11/12 mx-auto">
      <div className="relative">
        <button 
          id="prev-slide" 
          className="absolute top-1/2 transform -translate-y-1/2 outline-none border-none h-12 w-12 z-10 text-white cursor-pointer text-4xl bg-black items-center justify-center rounded-full hover:bg-gray-800 hidden md:flex" 
          onClick={() => handleSlideButtonClick(-1)}
        >
          chevron_left
        </button>
        <ul 
          className="grid grid-cols-10 gap-4 overflow-x-auto no-scrollbar mb-6 snap-x" 
          ref={imageListRef} 
          onScroll={handleImageListScroll}
        >
          {images.map((image) => (
            <motion.li key={image.id} className="snap-start">
              <img 
                className="w-80 h-96 object-cover" 
                src={image.link} 
                alt={image.name} 
              />
            </motion.li>
          ))}
        </ul>
        <button 
          id="next-slide" 
          className="absolute top-1/2 transform -translate-y-1/2 right-0 outline-none border-none h-12 w-12 z-10 text-white cursor-pointer text-4xl bg-black items-center justify-center rounded-full hover:bg-gray-800 hidden md:flex" 
          onClick={() => handleSlideButtonClick(1)}
        >
          chevron_right
        </button>
      </div>
      <div className="flex items-center h-6 w-full">
        <div className="bg-gray-300 w-full h-0.5 flex items-center rounded relative hover:h-1">
          <motion.div 
            className="absolute bg-black top-0 bottom-0 w-1/2 h-full cursor-grab rounded" 
            ref={scrollbarThumbRef} 
            onMouseDown={handleScrollbarThumbDrag}
            whileTap={{ cursor: 'grabbing', height: '0.75rem', top: '-0.125rem' }}
          ></motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
