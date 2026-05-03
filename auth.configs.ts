// // // auth.config.ts
// // import Google from "next-auth/providers/google";
// // import type { NextAuthConfig } from "next-auth";

// // export default {
// //   providers: [
// //     Google({
// //       clientId: process.env.AUTH_GOOGLE_ID,
// //       clientSecret: process.env.AUTH_GOOGLE_SECRET,
// //     }),
// //   ],
// // } satisfies NextAuthConfig;

// // auth.config.ts
// import type { NextAuthConfig } from "next-auth";
// import Google from "next-auth/providers/google";

// export default {
//   providers: [
//     Google({
//       clientId: process.env.AUTH_GOOGLE_ID,
//       clientSecret: process.env.AUTH_GOOGLE_SECRET,
//     }),
//   ],
//   // Tambahkan halaman kustom Anda di sini agar middleware tahu rute loginnya
//   pages: {
//     signIn: "/auth/login", 
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) token.id = user.id;
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) session.user.id = token.id as string;
//       return session;
//     },
//   },
// } satisfies NextAuthConfig;