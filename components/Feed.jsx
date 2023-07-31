"use client";

import { useState } from "react"
import { useSession } from "next-auth/react"

import PasswordCard from "@components/PasswordCard";

const PasswordCardList = ({ data, handleTagClick, handleEdit, handleDelete }) => {
  return (
    <div className="mt-16 passwordLayout max-md:flex max-md:flex-col max-md:justify-center max-md:items-center ">
      {data.map((password) => (
        <PasswordCard
          key={password._id}
          password={password ? password : null}
          handleTagClick={handleTagClick}
          handleEdit={()=>{handleEdit(password)}}  
          handleDelete={() => handleDelete(password)}       
        />
      ))}
    </div>
  );
}


const Feed = (
  {
    data,
    handleEdit,
    handleDelete
  }
) => {
  const { data: session } = useSession();

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
  }

  return (
    <section className="feed">
      {session?.user.id && data.length > 0 ? (
        <div>
            <form className="relative w-full flex justify-center">
                <input
                  type="text"
                  className="searchInput"
                  placeholder="Search for a Code Vault password..."
                  value={searchText}
                  onChange={(e) => {
                    handleSearchChange
                  }}
                  required
                >
                </input>
                <div className="flex flex-col justify-center ml-2.5">
                  <span className="pi pi-search cursor-pointer"></span>
                </div>
            </form>

            <PasswordCardList
                data={data}
                handleTagClick={()=>{}}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
            </div>
      ) : (
        <></>
      )}
    </section>
  )
}

export default Feed