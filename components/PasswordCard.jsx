"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PasswordCard = ({ password, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('');
  const [copyIcon, setCopyIcon] = useState('pi pi-copy');
  
  const handleCopyClick = () => {
    // Unhash the 

    setCopied('');

    // Set icon to checkmark
    setCopyIcon('pi pi-check');
    console.log('Copied to clipboard!');

    setTimeout(() => {
      setCopied(false);
      setCopyIcon('pi pi-copy');
    }, 1500); // Reset to false and change back to copy icon after 1.5 seconds
  };
  
  return (
    <div className="passwordCard">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={password.creator.image}
            alt="userImage"
            width={40}
            height={40}
            className="rounded-full object-contain"
            unoptimized={true}
          />
          <div className="flex flex-col">
            <h3 type className="font-semibold text-zinc-900">
              {password.creator.username.replace(" ", "").toLowerCase()}
            </h3>
            <p className="text-sm text-gray-300">
              {password.creator.email}
            </p>
          </div>
        </div>
        
        <div className="copyBtn" onClick={handleCopyClick}>
          <span className={`${copyIcon}`}></span>
        </div>

      </div>

        <div className="mt-3">
          <p className="truncate blur-sm select-none">{password.encryptedPassword}</p>
          <p className="my-3 text-3xl font-bold horizonGradient">{password.serviceName}</p>
          <p className="cursor-pointer" onClick={()=>{
            handleTagClick && handleTagClick(password.category)
          }}>#{password.category.replace(" ","").toLowerCase()}</p>
        </div>

    </div>
  )
}

export default PasswordCard