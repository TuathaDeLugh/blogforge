{
  /* <div className="flex flex-col justify-center h-screen">
	<div
		className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
		<div className="w-full md:w-1/3 bg-white grid place-items-center">
			<img src="https://images.pexels.com/photos/4381392/pexels-photo-4381392.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="tailwind logo" className="rounded-xl" />
    </div>
			<div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
				<div className="flex justify-between item-center">
					<p className="text-gray-500 font-medium hidden md:block">Vacations</p>
					<div className="flex items-center">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20"
							fill="currentColor">
							<path
								d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
						</svg>
						<p className="text-gray-600 font-bold text-sm ml-1">
							4.96
							<span className="text-gray-500 font-normal">(76 reviews)</span>
						</p>
					</div>
					<div className="">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20"
							fill="currentColor">
							<path fill-rule="evenodd"
								d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
								clip-rule="evenodd" />
						</svg>
					</div>
					<div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
						Superhost</div>
				</div>
				<h3 className="font-black text-gray-800 md:text-3xl text-xl">The Majestic and Wonderful Bahamas</h3>
				<p className="md:text-lg text-gray-500 text-base">The best kept secret of The Bahamas is the country’s sheer
					size and diversity. With 16 major islands, The Bahamas is an unmatched destination</p>
				<p className="text-xl font-black text-gray-800">
					$110
					<span className="font-normal text-gray-600 text-base">/night</span>
				</p>
			</div>
		</div>
	</div> */
}

// 	'use client'
// import Image from 'next/image';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import React, { useState, useEffect } from 'react';
// import AnimationData from '../Motion/AnimationData';

// // TypeScript interfaces
// interface BlogImage {
//   link: string;
// }

// interface BlogCreator {
//   avatar?: string;
//   createdby: string;
//   username: string;
// }

// interface Blog {
//   _id: string;
//   title: string;
//   info: string;
//   images: BlogImage[];
//   creator: BlogCreator;
//   updatedAt: string;
// }

// interface BlogProps {
//   data: Blog[];
// }

// // Carousel Component
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
//           className="rounded-full px-2 shadow-md bg-slate-500"
//         >
//           &lt;
//         </button>
//         <button
//           onClick={nextSlide}
//           className="rounded-full px-2 shadow-md bg-slate-500"
//         >
//           &gt;
//         </button>
//       </div>
//       <div className="overflow-hidden">
//         <motion.div
//           className="flex"
//           initial={false}
//           animate={{ x: `${-currentIndex * (100 / visibleSlides)}%` }}
//           transition={{ type: 'spring', stiffness: 100, damping: 20 }}
//           key={currentIndex}
//         >
//           {data.map((blog,index) => (
//             <AnimationData
//             index={index}
//               className="min-w-1/3 flex-shrink-0 px-4"
//               key={blog._id}
//               style={{ flex: `0 0 ${100 / visibleSlides}%` }}
//             >
//               <div className="border bg-white rounded-lg shadow dark:bg-gray-800 dark:border-slate-500">
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
//             </AnimationData>
//           ))}
//         </motion.div>
//       </div>
//       <div className="flex justify-center mt-4">
//         <div className="relative w-full h-1 bg-gray-600 rounded-full">
//           <motion.div
//             className="absolute h-full bg-white rounded-full"
//             style={{
//               width: `${((currentIndex + visibleSlides) / data.length) * 100}%`,
//             }}
//             initial={false}
//             animate={{
//               width: `${((currentIndex + visibleSlides) / data.length) * 100}%`,
//             }}
//             transition={{ type: 'spring', stiffness: 100, damping: 20 }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
