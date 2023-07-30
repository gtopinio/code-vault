"use client";

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { decrypt } from "@utils/crypto";
// useSearchParams is a hook that allows us to access the query params in the URL
// Example: http://localhost:3000/update-password?id=12345

import Form from "@components/Form"

const EditPassword = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const passwordId = searchParams.get('id');

    const [submitting, setsubmitting] = useState(false);
    const [post, setPost] = useState(
        {
            password: '',
            serviceName: '',
            category: '',
        }
    );

    useEffect(() => {
        const getPasswordDetails = async () => {
            const response = await fetch(`/api/password/${passwordId}`);

            const data = await response.json();
            const key = await session?.user._keyArray;
            const iv = await session?.user._ivArray;
            const decryptedPassword = await decrypt(data.encryptedPassword, key, iv);

            setPost({
                password: decryptedPassword,
                serviceName: data.serviceName,
                category: data.category,
            });
        }

        if(passwordId){
            getPasswordDetails();
        }
    }, [passwordId]);

    // const createPassword = async (e) => {
    //     e.preventDefault();
    //     setsubmitting(true);

    //     try {
    //         const response = await fetch('/api/password/new',
    //         {
    //             method: 'POST',
    //             body: JSON.stringify({
    //                 userId: session?.user.id,
    //                 password: post.password,
    //                 serviceName: post.serviceName,
    //                 category: post.category,
    //                 key: session?.user._keyArray,
    //                 iv: session?.user._ivArray,
    //             }),
    //         });

    //         if(response){
    //             router.push('/');
    //         }

    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setsubmitting(false);
    //     }

    // }

    return (
        <div className="flex justify-center">
            <Form
                type="Edit"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={()=>{}}
            />
        </div>
    )
}

export default EditPassword