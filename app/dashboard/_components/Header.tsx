import { Search } from 'lucide-react'
import React from 'react'
import { UserButton } from '@clerk/nextjs'

const Header = () => {
    return (
        <div className='p-5 shadow-sm border-b-2 flex justify-end items-center bg-white'>
            {/* <div className='flex gap-2 items-center p-2 border rounded-md max-w-lg bg-white'>
                <Search />
                <input type="search" name="" id="" placeholder='Search...' className='outline-none' />
            </div> */}
            <div>
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    )
}

export default Header
