import React from 'react'
import { FaShare } from 'react-icons/fa'
import { IoHeartCircleOutline } from 'react-icons/io5'

export default function Writer() {
    return (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1500px] mx-auto p-4 md:p-6">
            <div className="bg-white rounded-lg overflow-hidden shadow-md dark:bg-gray-950">
                <div className="p-4">
                    <div className="flex items-center space-x-4">
                        <img
                            alt="User Avatar"
                            className="rounded-full"
                            height={48}
                            src="/placeholder.svg"
                            style={{
                                aspectRatio: "48/48",
                                objectFit: "cover",
                            }}
                            width={48}
                        />
                        <div className="space-y-1">
                            <p className="font-medium">John Doe</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">@johndoe</p>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                            <FaShare className="w-4 h-4 fill-primary" />
                            <span className="text-sm font-medium">1.2K</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <IoHeartCircleOutline className="w-4 h-4 fill-primary" />
                            <span className="text-sm font-medium">500</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Joined 2 months </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Posts: 25</p>
                    </div>
                </div>
            </div>
            
        </section>
    )
}
