// imports libraries(components)
import Header from '@/components/Header'
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation"


// creates Layout component
const Layout = async ({children}: {children: React.ReactNode}) => {

    // gets access to the current session
    const session = await auth.api.getSession({headers: await headers()});

    // if user in session doesn't exist
    if (!session?.user) {
        // redirects user to sign-in page
        redirect('/sign-in')
    }

    // if user exists forms new user object
    const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
    }

    return (
        <main className = "min-h-screen text-gray-400" >
            {/*Header component*/}
            <Header user={user}/>
            {/* container  for children components of layout  */}
            <div className="container py-10 ">
                {children}
            </div>
        </main>
    )
}

// exports Layout component
export default Layout
