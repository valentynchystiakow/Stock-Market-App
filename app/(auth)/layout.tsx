// imports libraries(components)
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";

// creates Main Layout component
const Layout =  async ({children}: {children: React.ReactNode}) => {

    // checks for existing session
    const session = await auth.api.getSession({headers: await headers()});

    // checks if user in session exists and redirects to dashboard
    if (session?.user) {
        redirect('/');
    }

    return (
        // Authentication layout block
        <main className = "auth-layout" >
            {/* left auth section */}
            <section className="auth-left-section scrollbar-hide-default">
                {/* Authentication logo*/}
                <Link href = "/" className = "auth-logo">
                    <Image src = "/assets/icons/logo.svg" alt = "Signalist logo" width = {140} height = {32} className = 'h-8'/>
                </Link>
                {/* children section*/}
                <div className="pb-6 lg:pb-8 flex-1">{children}</div>
            </section>
            {/* right auth section */}
            <section className="auth-right-section">
                {/* quote block*/}
                <div className="z-10 relative lg:mt-4 lg:mb-16">
                    <blockquote className = "auth-blockquote">
                        Signalist turned my watchlist into a winning list. The alerts are spot-on, and I feel more confident making moves in the market
                    </blockquote>
                    <div className="flex items-center justify-between">
                        {/* Author info block*/}
                        <div>
                            <cite className="auth-testimonial-author">- Ethan R.</cite>
                            <p className="max-md:text-xs text-gray-500">Retail Investor</p>
                        </div>
                        {/* Stars icons block*/}
                        <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Image src="/assets/icons/star.svg" alt="Star" key={star} width={20} height={20} className="w-5 h-5" />
                            ))}
                        </div>
                    </div>
                </div>
                {/* Dashboard preview block*/}
                <div className="flex-1 relative">
                    <Image src="/assets/images/dashboard.png" alt="Dashboard Preview" width={1440} height={1150} className="auth-dashboard-preview absolute top-0" />
                </div>
            </section>
        </main>
    )
}

// exports Layout component
export default Layout
