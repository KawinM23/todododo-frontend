import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      sub: string;
      username: string;
      email: string;
      accessToken: string;
    };
  }
}
