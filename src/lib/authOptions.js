import GoogleProvider from "next-auth/providers/google";
import prisma from "./prismadb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      try {
       
        
        // Ensure user has an email before proceeding
        if (!user.email) {
          console.error("No email found for Google user");
          return false;
        }
          
        // Check if the user already exists in the database
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
    
        if (!existingUser) {
          // Create a new user if not found
        
          await prisma.user.create({
            data: {
              fullName: user.name,
              email: user.email,
              password: '123456', // Google users don't have a password
            },
          });
        }

        return true; // Allow login
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false; // Deny login if an error occurs
      }
    },
  },
};
