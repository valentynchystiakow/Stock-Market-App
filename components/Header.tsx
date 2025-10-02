// imports required modules and components
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavItems from './NavItems'
import UserDropdown from './UserDropdown'
import {searchStocks} from "@/lib/actions/finnhub.actions";

// creates Header component
const Header = async ({user}: {user:User}) => {

    // gets initial stocks for user using searchStocks function
    const initialStocks = await searchStocks();

    return (
        <header className="sticky top-0 header">
                <div className="container header-wrapper">
                    {/* logo */}
                        <Link href="/">
                            <Image src="/assets/icons/logo.svg" alt = "Signalist logo" width = {140} height = {32} className = "h-8 w-auto cursor-pointer"/>
                        </Link>
                    {/* Nav Items components, will be hidden on small screens*/}
                    <nav className="hidden sm:block">
                        <NavItems initialStocks={initialStocks}/>
                    </nav>
                        {/* User dropdown component */}
                    <UserDropdown user={user} initialStocks={initialStocks}/>
                </div>
        </header>
    )
}

// exports Header component
export default Header
