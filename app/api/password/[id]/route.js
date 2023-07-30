// This specific password route will have three methods:
// GET - (read)
// PATCH - (update)
// DELETE - (delete)


import { connectToDB } from "@utils/database";
import Password from "@models/password";

// GET - (read)
export const GET = async ( req, { params } ) => {
    try {
        await connectToDB();

        const password = await Password.findById(params.id).populate("creator");

        if(!password) {
            return new Response(JSON.stringify
            (
                { message: "Password not found!" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(password), { status: 200 });
        
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify
        (
            { message: "Failed to fetch Code Vault passwords!" }),
            { status: 500 }
        );
    }
}

// PATCH - (update)

export const PATCH = async ( req, { params } ) => {
    const { password, serviceName, category, userId } = await req.json();

    try {
        await connectToDB();
        
        const existingPassword = await Password.findById(params.id);

        if(!password) {
            return new Response(JSON.stringify
            (
                { message: "Password not found!" }),
                { status: 404 }
            );
        }

        existingPassword.encryptedPassword = password;
        existingPassword.serviceName = serviceName;
        existingPassword.category = category;
        existingPassword._dateModified = new Date();
        existingPassword._modifiedBy = userId;

        await existingPassword.save();

        return new Response(JSON.stringify(existingPassword), { status: 200 });

        
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify
        (
            { message: "Failed to update Code Vault passwords!" }),
            { status: 500 }
        );
    }
}

// DELETE - (delete)

export const DELETE = async ( req, { params } ) => {

    const { userId } = await req.json();

    try {
        await connectToDB();

        const existingPassword = await Password.findById(params.id);

        if(!existingPassword) {
            return new Response(JSON.stringify
            (
                { message: "Password not found!" }),
                { status: 404 }
            );
        }

        existingPassword._deleted = true;
        existingPassword._dateModified = new Date();
        existingPassword._modifiedBy = userId;
        
        
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify
        (
            { message: "Failed to update Code Vault passwords!" }),
            { status: 500 }
        );
    }
}