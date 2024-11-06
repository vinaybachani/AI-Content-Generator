import { Search } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const SearchSection = ({onSearchInput}:any) => {
    return (
        <div className='p-10 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex justify-center items-center flex-col'>
            <h2 className='text-3xl font-bold text-white'>Browse All Templates</h2>
            <p className='text-white'>What would you like to create today</p>
            <div className='w-full flex justify-center items-center'>
                <div className="flex gap-2 items-center p-2 border rounded-md bg-white my-5 w-[50%]">
                    <Search className='text-purple-600' />
                    <input type="search" name="" id="" placeholder='Search' className='bg-transparent w-full outline-none text-black' onChange={(event) => onSearchInput(event.target.value)} />
                </div>
            </div>
        </div>
    )
}

export default SearchSection
