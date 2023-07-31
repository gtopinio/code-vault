import { connectToDB } from "@utils/database";
import Password from "@models/password";

export const POST = async ( req, { params } ) => {
    try {
        await connectToDB();

        const { userId, queryText } = await req.json();

        // Find all passwords using the following details:
        // 1. The user ID
        // 2. The category
        // 3. The service name

        if(queryText === "" || queryText === undefined || queryText === queryText.replace(/\s/g, "") == ""){
            const allPasswords = await Password.find({
                creator: userId,
                _deleted: false
            }).populate("creator");

            return new Response(JSON.stringify(allPasswords), { status: 200 });
        }
            
        
        const passwordsByServiceName = await Password.find({
            creator: userId,
            // Use regex to find all passwords that contain the query text. It should resemble the 'LIKE' operator in SQL.
            serviceName: { $regex: queryText, $options: "i" },
            _deleted: false
        }).populate("creator");

        return new Response(JSON.stringify(passwordsByServiceName), { status: 200 });
        
    } catch (error) {
        console.log(error);

        return new Response(JSON.stringify
        (
            { message: "Failed to fetch Code Vault passwords!" }),
            { status: 500 }
        );
    }
}
