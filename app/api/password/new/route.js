import { connectToDB } from "@utils/database";
import Password from "@models/password";
import bcrypt from "bcrypt";

export const POST = async ( req ) => {
    const { userId, password, serviceName, category } = await req.json();

    try {
        await connectToDB();
        
        // Hash the password using bcryptjs
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

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