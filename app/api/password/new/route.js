import { connectToDB } from "@utils/database";
import Password from "@models/password";
import { encrypt } from "@utils/crypto";

export const POST = async ( req ) => {
    const { userId, password, serviceName, category, key, iv } = await req.json();

    try {
        await connectToDB();
        
        // Encrypt the password using crypto
        const hashedPassword = encrypt(password, key, iv);

        const newPassword = new Password({
            creator: userId,
            encryptedPassword: hashedPassword,
            serviceName,
            category,
        });

        await newPassword.save();

        return new Response(JSON.stringify
        (
            { message: "Code Vault Password saved successfully!" }),
            { status: 201 }
        );

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify
        (
            { message: "Failed to save Code Vault password!" }),
            { status: 500 }
        );      
    }

}