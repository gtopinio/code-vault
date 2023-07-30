"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {

    const { data: session } = useSession();
    
    const [passwords, setPasswords] = useState([]);

    const handleEdit = () => {};

    const handleDelete = async () => {};

    useEffect(() => {
        const fetchPasswords = async () => {
          const response = await fetch(
            `/api/users/${session?.user.id}/passwords`


          ); // must be a dynamic route
          const data = await response.json();
    
          setPasswords(data);
        }
    
        if(session?.user.id){
            fetchPasswords();
        }
      }, []);


    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page!"
            data={passwords} // For the array of passwords
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile