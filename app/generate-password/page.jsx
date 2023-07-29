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