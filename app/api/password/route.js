import { connectToDB } from "@utils/database";
import Password from "@models/password";

export const GET = async ( req ) => {
    try {
        await connectToDB();

        const passwords = await Password.find({}).populate("creator");

        return new Response(JSON.stringify(passwords), { status: 200 });
        
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify
        (
            { message: "Failed to fetch Code Vault passwords!" }),
            { status: 500 }
        );
    }
}