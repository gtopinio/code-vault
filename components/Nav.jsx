"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const { data: session } = useSession();
  
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    }

    setUpProviders();
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
          className='object-contain sm:-mt-4 hover:scale-110 transition duration-700 ease-in-out'
        />
        <p className='logoText'>CodeVault</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='flex max-sm:hidden'>
        {session?.user ? ( // Signed-in Desktop
          <div className='flex gap-3 md:gap-5'>
              <Link href="/generate-password" className='btnCyan'>
                Generate Password
              </Link>

              <button type='button' className='btnBorderBlack' onClick={() => { signOut(); }}>
                Sign Out
              </button>

              
              <Link href="/profile">
                  <Image
                  src={session?.user.image}
                  width={50}
                  height={40}
                  alt="Profile"
                  unoptimized={true}
                  className='rounded-full cursor-pointer hover:scale-110 transition duration-700 ease-in-out'
                  onClick={() => setToggleDropdown((prev) => !prev)}
                  >
                </Image>
              </Link>
          </div>
        ):( // Signed-out Desktop
          <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.id}
                type='button'
                className='btnCyan'
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
        {session?.user ? (// Signed-in Mobile
          <div className='flex'>
            <Image
              src={session?.user.image}
              width={50}
              height={40}
              alt="Profile"
              unoptimized={true}
              className='rounded-full cursor-pointer hover:scale-110 transition duration-700 ease-in-out'
              onClick={() => setToggleDropdown((prev) => !prev)}
            >
            </Image>

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
                className='btnBorderBlack mt-3 w-full'
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
                  className='btnCyan'
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