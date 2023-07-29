import { connectToDB } from "@utils/database";

export const POST = async ( req ) => {
    const { userId, password, serviceName, category } = await req.json();

    try {
        await connectToDB();
        
    } catch (error) {
        
    }

}