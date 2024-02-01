import Link from 'next/link';
import React from 'react'
import { GrLinkNext,GrLinkPrevious } from "react-icons/gr";

interface PaginationProps {
    pagedata: {
      currentPage: number;
      totalPages: number;
      hasNextPage: boolean;
    };
  }

export default function Pagination({pagedata}:PaginationProps) {
const currentPage =  pagedata.currentPage;
const totalPages = pagedata.totalPages;
const hasNextPage = pagedata.hasNextPage;
    const getPagesToShow = () => {
		let startPage = currentPage - 2;
		let endPage = currentPage + 2;

		if (currentPage <= 3) {
			startPage = 1;
			endPage = Math.min(totalPages, 5);
		} else if (currentPage >= totalPages - 2) {
			startPage = totalPages - 4;
			endPage = totalPages;
		}

		return Array.from(
			{ length: endPage - startPage + 1 },
			(_, i) => startPage + i,
		);
	};

	const pages = getPagesToShow();
    
    if (totalPages > 1) {
  return (
    <div className="mt-5 flex items-center justify-center space-x-6 text-slate-600  dark:text-slate-200 ">
			<Link
				className={`${currentPage === 1 ? 'pointer-events-none bg-gray-100 dark:bg-gray-700 text-slate-400' : ''} hidden md:block rounded-lg border border-gray-300 dark:border-gray-500 px-3 py-2 text-sm font-medium hover:bg-purple-500 dark:hover:bg-purple-400 hover:text-white`}
				href={`?page=${currentPage - 1}`}
			>
				<GrLinkPrevious size={15} />
			</Link>
<nav className="relative z-0 inline-flex">
  {pages.map((p, i) => (
    <Link
      key={p}
      className={`
        ${p === currentPage ? 'pointer-events-none bg-purple-400 dark:bg-purple-600 text-white' : ''} 
        ${i === 0 ? 'rounded-l-lg' : ''}
        relative inline-flex items-center border 
        ${i > 0 ? 'border-l-0' : ''}
        ${i === pages.length - 1 ? 'rounded-r-lg ' : ''}
        border-gray-300 dark:border-gray-500 px-4 py-2 text-sm font-medium 
        hover:bg-purple-500 dark:hover:bg-purple-400 hover:text-white
      `}
      href={`?page=${p}`}
    >
      {p}
    </Link>
  ))}
</nav>
			<Link
				className={`${!hasNextPage ? 'pointer-events-none bg-gray-100 dark:bg-gray-700 text-slate-400' : ''} hidden md:block rounded-lg border border-gray-300 dark:border-gray-500  px-3 py-2 text-sm font-medium hover:bg-purple-500 dark:hover:bg-purple-400 hover:text-white`}
				href={`?page=${currentPage + 1}`}
			>
				<GrLinkNext size={15} />
			</Link>
		</div>
  )
    }
}