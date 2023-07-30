import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@models/user";
import { generateKey, generateIV } from "@utils/crypto"

// Next API Authenticated Route to create a new user using Google OAuth
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();
            session.user._keyArray = sessionUser._keyArray;
            session.user._ivArray = sessionUser._ivArray;
            session.user.username = sessionUser.username;
            return session; // making sure that we always know which user is logged in
        },
        async signIn({ profile }){
            try {
                // serverless -> lambda -> opened only when called
                // as oppose to express -> server -> always opened
    
                await connectToDB();
                // check if user exists
                const userExists = await User.findOne({ email: profile.email });
    
                // if not, create user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                        _keyArray: generateKey(),
                        _ivArray: generateIV(),
                    })
                }
    
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    },
});

export { handler as GET, handler as POST };