"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, use } from 'react';
import { signIn, signOut, useSession, getProviders, ClientSafeProvider } from 'next-auth/react';

const Nav = () => {
  const isUserLoggedIn = true;
  
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    fetchData();
  },[]);
  
  return (
    <nav className="flex justify-between w-full mb-16 pt-3">
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
          alt="Code Vault Logo"
          src="/assets/icons/code-vault-logo.png"
          width={50}
          height={50}
          unoptimized={true}
          className='object-contain sm:-mt-7'
        />
        <p className='logoText'>CodeVault</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='flex max-sm:hidden'>
        {isUserLoggedIn ? ( // Signed-in Desktop
          <div className='flex gap-3 md:gap-5'>
              <Link href="/generate-password" className='btnGreen'>
                Generate Password
              </Link>

              <button type='button' className='btnBorderBlack' onClick={() => { signOut(); }}>
                Sign Out
              </button>

              
              <Link href="/profile">
                <div className='fill-cyan-500 hover:fill-green-300 hover:scale-110 transition duration-700 ease-in-out'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/></svg>
                </div>
              </Link>
          </div>
        ):( // Signed-out Desktop
          <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                type='button'
                className='btnGreen'
                onClick={() => signIn(provider.id)}
              >
                Sign In
              </button>
            ))}
        </>
        )}
      </div>


      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (// Signed-in Mobile
          <div className='flex'>
            <div className='fill-cyan-500 hover:fill-cyan-300 hover:scale-110 transition duration-700 ease-in-out'>
              <button onClick={() => setToggleDropdown((prev)=> !prev)}>
                <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 496 512"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 96c48.6 0 88 39.4 88 88s-39.4 88-88 88-88-39.4-88-88 39.4-88 88-88zm0 344c-58.7 0-111.3-26.6-146.5-68.2 18.8-35.4 55.6-59.8 98.5-59.8 2.4 0 4.8.4 7.1 1.1 13 4.2 26.6 6.9 40.9 6.9 14.3 0 28-2.7 40.9-6.9 2.3-.7 4.7-1.1 7.1-1.1 42.9 0 79.7 24.4 98.5 59.8C359.3 421.4 306.7 448 248 448z"/></svg>
              </button>
            </div>

            {toggleDropdown && (
              <div className='dropdown'>
                <Link
                  href="/profile"
                  className='dropDownLink'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>

                <Link
                  href="/generate-password"
                  className='dropDownLink'
                  onClick={() => setToggleDropdown(false)}
                >
                  Generate Password
                </Link>

                <button 
                type='button'
                className='btnGreen mt-3 w-full'
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                >
                  Sign Out
                </button>
              </div>
              )  
            }
          </div>):

          ( // Signed-out Mobile
            <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  key={provider.id}
                  type='button'
                  className='btnGreen'
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
          )
        
        }

      </div>
    </nav>
  )
}

export default Nav