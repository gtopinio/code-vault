"use client";

import { useState, useEffect } from "react"

import PasswordCard from "@components/PasswordCard";

const PasswordCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 passwordLayout">

    </div>
  );
}


const Feed = () => {

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
  }

  return (
    <section className="feed">
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
      </form>

      <PasswordCardList
          data={[]}
          handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed