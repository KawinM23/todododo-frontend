import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./component/Sidebar";
import * as React from "react";
import Box from "@mui/material/Box";
import { CssBaseline } from "@mui/material";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODODODO",
  description: "Todo Application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className + " bg-[#c5e5ef]"}>
        <NextAuthProvider session={session}>
          {/* <CssBaseline /> */}
          <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box
              component="main"
              sx={{
                flexGrow: 1,
              }}
            >
              {children}
            </Box>
          </Box>
        </NextAuthProvider>
      </body>
    </html>
  );
}
