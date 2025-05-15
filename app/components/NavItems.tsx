'use client'

import { Bell, BriefcaseBusiness, Home, MessageCircleMore, Users } from 'lucide-react'
import React from 'react'
import { JSX } from 'react/jsx-runtime'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NAVITEM {
  src: string
  icon: JSX.Element
  text: string
}

const navItems: NAVITEM[] = [
  { src: "/home", icon: <Home />, text: "Home" },
  { src: "/networks", icon: <Users />, text: "My Network" },
  { src: "/job", icon: <BriefcaseBusiness />, text: "Jobs" },
  { src: "/message", icon: <MessageCircleMore />, text: "Messaging" },
  { src: "/notification", icon: <Bell />, text: "Notification" },
]

const Navigation = () => {
  const pathname = usePathname()

  return (
    <div className='flex gap-8'>
      {navItems.map((navItem, index) => (
        <Link
          href={navItem.src}
          key={index}
          className={`flex flex-col items-center cursor-pointer 
                      ${pathname === navItem.src ? 'text-black' : 'text-[#666666]'}
                      hover:text-black`}
        >
          <span>{navItem.icon}</span>
          <span className="text-xs">{navItem.text}</span>
        </Link>
      ))}
    </div>
  )
}

export default Navigation



