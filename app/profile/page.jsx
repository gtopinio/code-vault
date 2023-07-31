"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {

    const router = useRouter();

    const { data: session } = useSession();
    
    const [passwords, setPasswords] = useState([]);

    const fetchPasswords = async () => {
      const response = await fetch(
        `/api/users/${session?.user.id}/passwords`


      ); // must be a dynamic route
      const data = await response.json();

      setPasswords(data);
    }

    const handleEdit = (password) => {
        router.push(`/update-password?id=${password._id}`);
    };

    const handleDelete = async (password) => {
        // Does not need to navigate to a new page since we are not going to use a component (i.e. form)

        const hasConfirmed = confirm('Are you sure you want to delete this password?');

        if(hasConfirmed){
          try {
            await fetch(`/api/password/${password._id}`, {
              method: "POST",
              body: JSON.stringify({
                userId: session?.user.id,
            }),
            });

            const filteredPasswords = passwords.filter((p) => p._id !== password._id);

            setPasswords(filteredPasswords);

            fetchPasswords();

          } catch (error) {
            console.log(error);
          }
        }
    };

    const handleUpdatePasswords = (passwords) => {
      setPasswords(passwords);
    }

    useEffect(() => {
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
            handleUpdatePasswords={handleUpdatePasswords}
        />
    )
}

export default MyProfile