"use client"
import Image from 'next/image';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import AuthBTN from './AuthBTN';

let navData = [
	{ name: 'Home', path: '/', key: 1 },
	{ name: 'Reviews', path: '/reviews', key: 2 },
	{ name: 'About', path: '/about', key: 3 },
	{ name: 'contact', path: '/contact', key: 4 },
];

const variants = {
	open: { opacity: 1, height: 'auto', innerWidth: 'auto', y: 0 },
	closed: { opacity: 0, height: 0, innerWidth: 0 , y: -100 , },
};

export default function Navbar() {
	const [navbarAni, setNavbarAni] = useState<boolean>(false);
	const [navbar, setNavbar] = useState<boolean>(false);
	const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);


	
	const closeNavbarWithDelay = () => {
		
		setTimeout(() => {
		  setNavbar(!navbar);
		}, 50); 
	  };

	
	  useEffect(() => {
		const handleResize = () => {
		  if (typeof window !== 'undefined') {
			setWindowWidth(window.innerWidth);
			setNavbar(window.innerWidth >= 768);
		  }
		};
	  
		handleResize();
	  
		window.addEventListener('resize', handleResize);
	  
		return () => {
		  window.removeEventListener('resize', handleResize);
		};
	  }, []);

	return (
		<>
			<nav className='sticky top-0 left-0 right-0 z-50 '>
				<div className="flex max-w-[1500px] mx-auto ">
					<div className='grow  px-2 md:px-4 shadow-sm m-2 text-black bg-white/80 dark:text-slate-200 dark:bg-slate-800/80 dark:border-slate-600 dark:shadow-slate-500/50 backdrop-blur-sm border rounded-xl flex md:items-center lg:max-w-screen-2xl items-start'>
						<div className='md:hidden py-1 flex items-center '>
							 {navbarAni ? (
							
							<motion.button
								className='p-2  rounded-md outline-none text-red-600  dark:text-red-400'
								onClick={() =>{setNavbarAni(!navbarAni); closeNavbarWithDelay() }}
								whileTap={{ scale: 0.5 }}
								whileHover={{ scale: 1.1 }}
								transition={{ type: 'spring', stiffness: 300 }}
							>
								
										
										<AiOutlineClose size={'30'} />
									
							</motion.button>
								
									
								) : ( 
									<motion.button
								className='p-2  rounded-md outline-none text-orange-500  dark:text-orange-400 '
								onClick={() =>{setNavbarAni(!navbarAni); setNavbar(true) }}
								whileTap={{ scale: 0.5 }}
								whileHover={{ scale: 1.1 }}
								transition={{ type: 'spring', stiffness: 300 }}
							>
									
										<GiHamburgerMenu size={'30'} />
							</motion.button>
								 )} 
						</div>

						<div className=' grow  justify-between   md:items-center md:flex '>

							<div className='flex items-center justify-center py-3 md:py-5 md:block'>
								<Link href='/' className='flex'>
									<Image src={'/Logo.png'} alt='' width={150} height={75} />
								</Link>

							</div>

							<motion.div
								variants={variants}
								animate={
									windowWidth < 768
										? navbarAni
											? 'open'
											: 'closed'
										: 'open'
								}
								className={`w-full md:w-auto  md:block md:pb-0 md:overflow-hidden md:max-h-screen`}
							>

								{/* md:flex-1 for center */}
								{
									navbar ?
										(
											<ul className={` pb-5 md:pb-0 items-center justify-center md:flex `}
											>

												{navData.map(link => {
													return (
														<>

															<motion.li
																key={link.key}
																whileTap={{ scale: 0.9 }}
																transition={{ type: 'spring', stiffness: 300 }}
																className={`text-l py-5 px-5 text-center `}
															>
																	<Link
																		className='inline-block w-full hover:text-orange-400 '
																		onClick={() => { windowWidth < 768 ? (

																			setNavbarAni(!navbarAni),
																			closeNavbarWithDelay()
																			) : null
																		  }}
																		href={link.path}
																	>

																		{link.name}
																	</Link>

															</motion.li>

														</>
													)
												})}
											</ul>
										)
										: null
								}




							</motion.div>

						</div>
						<div className='m-2'>
							<AuthBTN />

						</div>

					</div>
				</div>
			</nav>

		</>
	)
}
