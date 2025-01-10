import React from 'react'

interface LayoutProps {
    children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <main className='auth'>
            <div className="flex flex-center pb-12 w-full h-screen bg-black">
                {children}
            </div>
        </main>
    )
}
export default Layout