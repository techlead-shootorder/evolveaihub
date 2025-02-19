import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
 
const handler = NextAuth(authOptions);
// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// };
 
export { handler as GET, handler as POST };