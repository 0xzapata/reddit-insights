'use client';

import React from 'react';
import Link from 'next/link';
import { UserButton, useAuth } from "@clerk/nextjs";

export function NavBar() {
  const { isSignedIn } = useAuth();

  return (
    <nav className='bg-black text-white p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">Reddit Analytics</span>
        </Link>
          {isSignedIn ? (
             <div className="flex items-center space-x-4">

              <Link href="/dashboard" className="hover:text-gray-300">
                My Desk
              </Link>
              <UserButton afterSignOutUrl="/"/>
							</div>
          ) : (
            <Link href="/sign-in" className="hover:text-gray-300">
              Sign In
            </Link>
          )}
      </div>
    </nav>
  );
}