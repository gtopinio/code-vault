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
    handleDelete,
    handleUpdatePasswords
  }
) => {
  const { data: session } = useSession();

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSeachQuery = async (e) => {
    e.preventDefault();

        try {
          const response = await fetch(`/api/password/search/${searchText}}`,
          {
              method: 'POST',
              body: JSON.stringify({
                  userId: session?.user.id,
                  queryText: searchText,
              }),
          });

          if(response.ok){
              // Update the `data` array with the response data
              const updatedData = await response.json();
              handleUpdatePasswords(updatedData);
          } else {
              console.log('Error fetching data');
          }

      } catch (error) {
          console.log(error);
      } finally {
          setSearchText('');
      }

  }

  return (
    <section className="feed">
      {session?.user.id && data.length > 0 ? (
        <div>
            <form className="relative w-full flex justify-center">
                <input
                  type="text"
                  className="searchInput text-black font-semibold"
                  placeholder="Search for a Code Vault password..."
                  value={searchText}
                  onChange={handleSearchChange}
                  required
                >
                </input>
                <div className="flex flex-col justify-center ml-2.5" onClick={handleSeachQuery}>
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