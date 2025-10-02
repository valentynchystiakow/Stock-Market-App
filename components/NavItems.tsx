// marks file as a client component
'use client'
// imports required modules and components
import React from 'react'
import Link from 'next/link'
import {NAV_ITEMS} from "@/lib/constants";
import {usePathname} from 'next/navigation'
import SearchCommand from "@/components/SearchCommand";



// creates NavItems component
const NavItems = ({initialStocks}: {initialStocks: StockWithWatchlistStatus[]}) => {

    // uses usePathname hook from next/navigation to get the current path
    const pathname = usePathname()

    // creates isActive function for managing active state of navigation items
    const isActive = (path:string) => {
        // checks if the current path is the same as the path of the navigation item
        if ( path === '/') return pathname === '/'
            return pathname.startsWith(path);

    }

    // returns list of navigation items
    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {NAV_ITEMS.map(({ href, label }) => {
                //  if href is /search, return SearchCommand component
                if(href === '/search') return (
                    <li key="search-trigger">
                        <SearchCommand
                            renderAs="text"
                            label="Search"
                            initialStocks={initialStocks}
                        />
                    </li>
                )

                return <li key={href}>
                    <Link href={href} className={`hover:text-yellow-500 transition-colors ${
                        isActive(href) ? 'text-gray-100' : ''
                    }`}>
                        {label}
                    </Link>
                </li>
            })}
        </ul>
    )
}

export default NavItems
