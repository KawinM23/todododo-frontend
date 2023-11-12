"use client";
import { Button } from "@mui/material";
import { signIn, useSession } from "next-auth/react";

import "./style.css";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="center-container h-[90vh]">
      <div className="growing"></div>
      <h1 className="text-2xl font-bold my-5">Welcome to TODODODODO</h1>
      <h2 className="text-xl mb-5">Todo application</h2>
      {session ? (
        <div>
          <p>Hi, {session.user.username}!</p>
        </div>
      ) : (
        <div className="flex flex-row gap-5">
          <Button variant="outlined" href="/user/register">
            Register
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              signIn();
            }}
          >
            Login
          </Button>
        </div>
      )}
      <Link
        href="https://freefrontend.com/css-animation-examples/"
        className="absolute bottom-2 right-2"
      >
        Animation Credit: Temani Afif October 7, 2021
      </Link>
    </main>
  );
}
