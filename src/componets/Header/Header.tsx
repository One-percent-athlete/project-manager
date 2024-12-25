import Link from "next/link"
import React from 'react'

const Header = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white border-b border-gray-200">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                    <Link href="/" className="flex ml-2 md:mr-24">
                        <span className="slef-center text-xl font-semibold sm:text-2xl">PlanIt</span>
                    </Link>
                </div>
                <div className="flex items-center">
                    <div className="relative items-center ml-3">
                        <div>
                            <button>
                                <span className="sr-only">Open user menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Header