"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { decrypt } from "@utils/crypto";

const PasswordCard = ({ password, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState('');
  const [copyIcon, setCopyIcon] = useState('pi pi-copy');
  
  const handleCopyClick = () => {
    // Unhash the password using crypto utils
    const decryptedPassword = decrypt(password.encryptedPassword, session?.user._keyArray, session?.user._ivArray);

    setCopied(decryptedPassword);

    navigator.clipboard.writeText(decryptedPassword);

    // Set icon to checkmark
    setCopyIcon('pi pi-check');

    setTimeout(() => {
      setCopied('');
      setCopyIcon('pi pi-copy');
    }, 1500); // Change back to copy icon after 1.5 seconds
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

          {session?.user.id === password.creator._id && pathName === "/profile" && (
            <div className="flex flex-row justify-end items-end">
              <div className="editBtn mr-3">
                <span className="pi pi-file-edit"></span>
              </div>
              <div className="deleteBtn">
                <span className="pi pi-trash deleteIcon"></span>
              </div>
            </div>
          )}
        </div>

    </div>
  )
}

export default PasswordCard