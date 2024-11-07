"use client"

import Image from 'next/image'
import { FileClock, Home, Settings, WalletCards, User } from 'lucide-react'
import React, { useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import UsageTrack from './UsageTrack'

const SideNav = () => {
    const menuList = [
        {
            name: 'Home',
            icon: Home,
            path: '/dashboard'
        },
        {
            name: 'History',
            icon: FileClock,
            path: '/dashboard/history'
        },
        {
            name: 'Billing',
            icon: WalletCards,
            path: '/dashboard/billing'
        },
        {
            name: 'User Profile',
            icon: User,
            path: '/dashboard/user-profile'
        }
    ]

    const path = usePathname();
    return (
        <div className='h-screen relative p-5 shadow-sm border bg-white'>
            <div className='flex justify-center'>
                {/* <Image src='./logo.svg' alt='logo' width={120} height={100} priority /> */}
                <p className='text-transparent text-2xl bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600'>Generator</p>
            </div>

            {/* <hr className='my-1 border' /> */}

            <div className='mt-7'>
                {menuList.map((item, index) => {
                    return (
                        <Link href={item.path} key={item.name + '-' + index}>
                            <div key={index} className={`flex gap-2 mb-2 p-3 hover:bg-purple-600 hover:text-white rounded-lg cursor-pointer ${path === item.path ? "bg-purple-600 text-white" : ""}`} >
                                <item.icon />
                                <h2>{item.name}</h2>
                            </div>
                        </Link>
                    )
                })}
            </div>
            <div className="absolute bottom-10 left-0 w-full">
                <UsageTrack />
            </div>
        </div>
    )
}

export default SideNav
