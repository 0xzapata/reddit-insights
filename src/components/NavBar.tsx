'use client';

import React from 'react';
import Link from 'next/link';
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

export function NavBar() {
  const { theme } = useTheme();

  // Calculate the lighter background color
  const getBgColor = () => {
    if (theme === 'dark') {
      return 'bg-neutral-900'; // 20% lighter than typical dark mode bg
    }
    return 'bg-neutral-100'; // 20% darker than typical light mode bg
  };

  return (
    <nav className={`${getBgColor()} p-4 flex justify-between items-center`}>
      <div className='container flex mx-auto justify-between'>
			<div className="flex items-center">
        {/* Replace with your actual logo */}
        <span className="text-2xl font-bold">Logo</span>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/dashboard" className="hover:text-gray-300">
          My Desk
        </Link>
      </div>
      <UserButton afterSignOutUrl="/"/>
			</div>
			
    </nav>
  );
}