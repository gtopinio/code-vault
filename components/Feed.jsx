"use client";

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

import PasswordCard from "@components/PasswordCard";

const PasswordCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 passwordLayout max-md:flex max-md:flex-col max-md:justify-center max-md:items-center ">
      {data.map((password) => (
        <PasswordCard
          key={password._id}
          password={password}
          handleTagClick={handleTagClick}        
        />
      ))}
    </div>
  );
}


const Feed = () => {
  const { data: session } = useSession();

  const [searchText, setSearchText] = useState('');
  const [passwords, setPasswords] = useState([]);

  const handleSearchChange = (e) => {
  }

  useEffect(() => {
    const fetchPasswords = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/passwords`);
      const data = await response.json();

      // Check status code
      if(data.statusCode === 500){
        setPasswords([]);
      } else {
        setPasswords(data);
      }
    }

    fetchPasswords();
  }, []);

  return (
    <section className="feed">
      {session?.user.id && passwords.length > 0 ? (
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
                data={passwords}
                handleTagClick={()=>{}}
            />
            </div>
      ) : (
        <></>
      )}
    </section>
  )
}

export default Feed