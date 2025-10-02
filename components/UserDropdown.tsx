// marks file as client component
'use client'

// imports required modules and components
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar"
import {useRouter} from 'next/navigation'
import {LogOut} from "lucide-react";
import NavItems from "@/components/NavItems";
import {signOut} from "@/lib/actions/auth.actions";

// creates UserDropdown component
const UserDropdown = ({user,initialStocks}: {user:User, initialStocks:StockWithWatchlistStatus[]}) => {

    // uses useRouter hook for managing navigation to user profile
    const router = useRouter()

    // creates function for handling sign out
    const handleSignOut = async() => {
        // calls sign out function
        await signOut()

        // ads sign in route
        router.push('/sign-in');
    }


    return (
        // DropdownMenu component
        <DropdownMenu>
            {/* DropdownMenuTrigger component */}
            <DropdownMenuTrigger asChild>
                {/* Avatar button  component */}
                <Button variant="ghost" className="flex items-center gap-3 text-gray-4 hover:text-yellow-500">
                    {/* Avatar component */}
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://static.vecteezy.com/system/resources/previews/016/227/291/non_2x/bull-with-chart-bar-logo-design-finance-logo-design-free-vector.jpg" />
                        <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    {/* User info block*/}
                    <div className="hidden md:flex flex-col items-start">
                        <span className='text-base font-medium text-gray-400'>
                            {user.name}
                        </span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            {/*Dropdown menu content*/}
            <DropdownMenuContent className="text-gray-400">
                {/* Dropdown menu label*/}
                <DropdownMenuLabel>
                    <div className="flex relative items-center gap-3 py-2">
                        {/* User avatar block*/}
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://static.vecteezy.com/system/resources/previews/016/227/291/non_2x/bull-with-chart-bar-logo-design-finance-logo-design-free-vector.jpg" />
                            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                                {user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        {/* User info block*/}
                        <div className="flex flex-col">
                            <span className='text-base font-medium text-gray-400'>
                                {user.name}
                            </span>
                            <span className="text-sm text-gray-500">{user.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                {/* Dropdown separator block*/}
                <DropdownMenuSeparator className="bg-gray-600"/>
                {/* Logout button block*/}
                <DropdownMenuItem onClick={handleSignOut} className="text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
                    Logout
                </DropdownMenuItem>
                {/* Dropdown separator block*/}
                <DropdownMenuSeparator className="hidden sm:block bg-gray-600"/>
                {/* Mobile navigation block*/}
                <nav className="sm:hidden">
                    <NavItems initialStocks={initialStocks}/>
                </nav>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

// exports UserDropdown component
export default UserDropdown
