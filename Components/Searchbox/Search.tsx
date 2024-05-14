'use client'
import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { FaSearch } from "react-icons/fa";
import FilterDropDown from '../Motion/FilterBtn';
import { Div } from '../Motion/Motion';
import SearchbarResult from './Result';

export default function Search() {
    const [query, setQuery] = useState<string>('');
    const [debouncedQuery, setDebouncedQuery] = useState<string>('');
    const [open, setOpen] = useState(false);

    const searchRef = useRef<HTMLDivElement>(null);

    const handleOutClick = useCallback((event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node) && query.trim() !== '') {
            setOpen(false);
        }
    }, [query]);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutClick);
        return () => {
            document.removeEventListener('mousedown', handleOutClick);
        };
    }, [handleOutClick, query]);

    const handleChange = (value: string) => {
        setQuery(value);
        setOpen(value.trim() !== '');
    };

    const handleInputClick = () => {
        if (query.trim() !== '') {
            setOpen(true);
        }
    };

    useEffect(() => {
        const typingTimeout = setTimeout(() => {
            setDebouncedQuery(query);
        }, 500);

        return () => {
            clearTimeout(typingTimeout);
        };
    }, [query]);

    return (
        <Div className="my-5 flex  items-center justify-center gap-3 px-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="relative grow md:grow-0" ref={searchRef} >
                <div className="bg-gray-300/50 dark:bg-slate-700/50 rounded-lg w-full md:w-[30rem] flex shadow dark:shadow-slate-700 backdrop-blur-md">
                    <form className="search-container inline-block relative w-4/5">
                        <input
                            type="text"
                            autoComplete="off"
                            placeholder="Search Blog"
                            name='search'
                            className='bg-transparent w-full outline-none p-3 md:p-4'
                            value={query}
                            onClick={handleInputClick}
                            onChange={(e) => handleChange(e.target.value)}
                            required
                        />
                        <button type="submit" className='absolute right-5 top-0 bottom-0 opacity-50'><FaSearch size={20} /></button>
                    </form>
                    <FilterDropDown />
                </div>
                {open && (
                    <div className="absolute mt-3 z-10 left-0 border dark:border-slate-600 w-full rounded-lg p-3 bg-slate-50/90  dark:bg-slate-800/90">
                        <Suspense fallback={
                            <div className="flex overflow-y-auto">
                                <div className="flex gap-2 flex-wrap w-full">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="flex w-full items-center p-2 border border-slate-300 dark:border-slate-500 rounded-md animate-pulse duration-300">
                                            <div className="w-28 h-20 mr-2 object-cover border dark:border-slate-500 bg-slate-200 dark:bg-slate-700 rounded" />
                                            <div className='grow'>
                                                <h2 className="font-semibold p-3 mb-2 w-[95%] rounded-full bg-slate-300 dark:bg-slate-600"></h2>
                                                <p className="text-gray-400 p-2 w-16 rounded-full bg-slate-300 dark:bg-slate-600"></p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }>
                            <SearchbarResult query={debouncedQuery} />
                        </Suspense>
                    </div>
                )}
            </div>
        </Div>
    );
}
