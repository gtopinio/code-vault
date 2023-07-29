"use client";

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

import Form from "@components/Form"

const GeneratePassword = () => {
    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState(
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
            const response = await fetch('/api/passwords/new',
            {
                method: 'POST',
                body: JSON.stringify({
                    userId: session?.user.id,
                    password: post.password,
                    serviceName: post.serviceName,
                    category: post.category,
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
                setpost={setpost}
                submitting={submitting}
                handleSubmit={createPassword}
            />
        </div>
    )
}

export default GeneratePassword