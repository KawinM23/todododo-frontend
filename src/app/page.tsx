"use client";
import { Button, Typography } from "@mui/material";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="center-container h-[90vh]">
      <Typography className="text-2xl font-bold mb-5">
        Welcome to TODODODODO
      </Typography>
      <Typography className="mb-5">Todo application</Typography>
      {session ? (
        <div>
          <Typography>Hi, {session.user.username}!</Typography>
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
    </main>
  );
}
