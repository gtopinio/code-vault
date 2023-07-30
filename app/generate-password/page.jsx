"use client";

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

import Form from "@components/Form"

const GeneratePassword = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [submitting, setsubmitting] = useState(false);
    const [post, setPost] = useState(
        {
            password: '',
            serviceName: '',
            category: '',
        }
    );

    const createPassword = async (e) => {
        e.preventDefault();
        setsubmitting(true);

        try {
            const response = await fetch('/api/password/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user.id,
                    password: post.password,
                    serviceName: post.serviceName,
                    category: post.category,
                    key: session?.user._keyArray,
                    iv: session?.user._ivArray,
                }),
            });

            if(response){
                router.push('/');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setsubmitting(false);
        }

    }

    return (
        <div className="flex justify-center">
            <Form
                type="Generate"
                post={post}
                setPost={setPost}
                submitting={submitting}
                handleSubmit={createPassword}
            />
        </div>
    )
}

export default GeneratePassword