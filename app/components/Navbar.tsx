'use client'

import Image from 'next/image'
import React from 'react'
import SearchInput from './SearchInput'
import Navigation from './NavItems'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

const Navbar: React.FC = () => {
  return (
    <div className="fixed w-full bg-white z-50 shadow-sm">
      <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <Image 
            src="/round-linkedin-logo-isolated-white-background_469489-1046.avif"
            alt="Logo"
            width={35}
            height={35}
            priority // ✅ LCP fix
          />
          <div className='md:block hidden'>
            <SearchInput />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className='md:block hidden'>
            <Navigation />
          </div>

          <div>
            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <Button className='rounded-full' variant="secondary" asChild>
                <SignInButton />
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar


