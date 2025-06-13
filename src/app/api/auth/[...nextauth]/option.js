// src/app/api/auth/[...nextauth]/options.js
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/server/lib/database";
import User from "@/server/models/user.model";

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                await dbConnect();
                try {
                    const { email, password } = credentials;

                    // Explicitly select the passwordHash field which is normally excluded
                    const user = await User.findOne({ email }).select('+passwordHash');

                    if (!user) {
                        throw new Error("No user found with this email");
                    }

                    // Use the model's comparePassword method
                    const isPasswordValid = await user.comparePassword(password);

                    if (!isPasswordValid) {
                        throw new Error("Incorrect password");
                    }

                    // Return user data without the passwordHash
                    return {
                        _id: user._id.toString(),
                        name: user.name,
                        email: user.email,
                        profilePicture: user.profilePicture,
                        bio: user.bio,
                        institution: user.institution,
                        // Add any other fields you want in the session
                    };

                } catch (error) {
                    console.error("Authentication error:", error.message);
                    // Return null to indicate failed authentication
                    // You can also throw the error to display it to the user
                    throw new Error(error.message || "Authentication failed");
                }
            },
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.profilePicture = token.profilePicture;
                session.user.bio = token.bio;
                session.user.institution = token.institution;
            }
            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token._id = user._id;
                token.name = user.name;
                token.email = user.email;
                token.profilePicture = user.profilePicture;
                token.bio = user.bio;
                token.institution = user.institution;
                
            }
            return token;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login", // Optional: Error page for authentication errors
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);