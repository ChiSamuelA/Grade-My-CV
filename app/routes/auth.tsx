import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { usePuterStore } from "~/lib/puter"

export const meta = () => ([
    { title: 'Grade My CV | Auth' },
    { name: 'description', content: 'Log Into Your Account' }
])

const Auth = () => {
    const {isLoading, auth} = usePuterStore()
    const location = useLocation()
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])
  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
        <div className="gradient-border shadow-lg">
            <div className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="capitalize">welcome</h1>
                    <h2 className="capitalize">login to continue your journey</h2>
                </div>

                <div>
                    {isLoading ? (
                        <button className="auth-button animate-pulse">
                            <p className="capitalize">signing you in...</p>
                        </button>
                    ): (
                        <>
                            {auth.isAuthenticated ? (
                                <button className="auth-button" onClick={auth.signOut}>
                                    <p className="capitalize">log out</p>
                                </button>
                            ): (
                                <button className="auth-button" onClick={auth.signIn}>
                                    <p className="capitalize">log in</p>
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    </main>
  )
}

export default Auth
