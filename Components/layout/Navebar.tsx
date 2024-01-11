"use client"
import Image from 'next/image';
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from 'react-icons/ai'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';

let navData = [
	{ name: 'Home', path: '/', key: 1 },
	{ name: 'About', path: '/about', key: 2 },
	{ name: 'Project', path: '/project', key: 3 },
	{ name: 'contact', path: '/contact', key: 4 },
];

const variants = {
	open: { opacity: 1, height: 'auto' },
	closed: { opacity: 0, height: 0 },
};

export default function Navbar() {
	const [navbar, setNavbar] = useState<boolean>(false);


	useEffect(() => {
		const handleResize = () => {
			if (typeof window !== 'undefined' && window.innerWidth <= 768) {
				setNavbar(true);
			}
			if (typeof window !== 'undefined' && window.innerWidth > 768) {
				setNavbar(false);
			}

		};
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [])

	return (
		<>
			<nav className='sticky top-0 left-0 right-0 z-50 '>
				<div className="flex max-w-[1500px] mx-auto">
					<div className='grow  px-4 shadow-sm m-2 text-black bg-white/80 dark:text-slate-200 dark:bg-gray-700/80 backdrop-blur-sm border rounded-xl flex md:items-center lg:max-w-screen-2xl items-start'>
					<div className='md:hidden py-1'>
							<motion.button
								className='p-2 text-purple-500 rounded-md outline-none'
								onClick={() => setNavbar(!navbar)}
								whileTap={{ scale: 0.9 }}
								transition={{ type: 'spring', stiffness: 300 }}
							>
								{navbar ? (
									<motion.div whileHover={{ scale: 1.1 }}>
										<AiOutlineClose size={'25'} />
									</motion.div>
								) : (
									<motion.div whileHover={{ scale: 1.1 }}>
										<GiHamburgerMenu size={'25'} />
									</motion.div>
								)}
							</motion.button>
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
									typeof window !== 'undefined'
										? window.innerWidth <= 768
											? navbar
												? 'open'
												: 'closed'
											: 'open'
										: 'open'
								}
								className={`w-full md:w-auto md:flex-1 md:block md:pb-0 md:overflow-hidden md:max-h-screen`}
							>
								<ul className=' delay-1000 pb-5 md:pb-0 items-center justify-center md:flex '>
									{navData.map(link => {
										return (
											<li
												key={link.key}
												className={`text-l py-5 px-5 text-center 
													`}
											>
												<Link
													className='inline-block w-full'
													onClick={() => setNavbar(!navbar)}
													href={link.path}
												>
													{link.name}
												</Link>
											</li>
										)
									})}


								</ul>
							</motion.div>

						</div>
						<div className='py-3 px-5 md:pr-2'>
							O
						</div>
						
					</div>
				</div>
			</nav>

		</>
	)
}
