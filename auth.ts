import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

// @ts-ignore
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID || "",
          clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code",
            },
          },
        }),
      ],
    
      pages: {
        signIn: "/auth/signin",
        error: "/auth/error",
      },
      callbacks: {
        async session({ session, token }: { session: any; token: any }) {
          if (session.user && token.sub) {
            session.user.id = token.sub;
          }
          return session;
        },
        async jwt({ token, user }: { token: any; user?: any }) {
          if (user) {
            token.id = user.id;
          }
          return token;
        },
      },
    
      debug: process.env.NODE_ENV === "development",
      secret: process.env.NEXTAUTH_SECRET,
    
})
 