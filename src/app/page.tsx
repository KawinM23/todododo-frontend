"use client";
import { Button, Paper } from "@mui/material";
import { signIn, useSession } from "next-auth/react";

import "./style.css";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  function NavCard({
    title,
    description,
    href,
  }: {
    title: string;
    description: string;
    href: string;
  }) {
    return (
      <Link href={href}>
        <Paper
          sx={{ display: "inline-block", padding: 3, width: 200 }}
          className="hover:scale-[102%] hover:shadow-lg"
        >
          <h3 className="text-lg font-medium">{title}</h3>
          <p>{description}</p>
        </Paper>
      </Link>
    );
  }

  return (
    <main className="center-container h-[100vh] p-5">
      <div className="growing"></div>
      <h1 className="text-2xl font-bold my-5">Welcome to TODODODODO</h1>
      <h2 className="text-xl mb-5">Todo application</h2>
      {session ? (
        <div>
          <p className="text-lg">Hi, {session.user.username}!</p>
        </div>
      ) : (
        <div className="flex flex-row gap-5">
          <Button
            variant="contained"
            className="bg-[#13bcf2] hover:bg-[#13bcf2] hover:brightness-95"
            href="/user/register"
          >
            Register
          </Button>
          <Button
            variant="contained"
            className="bg-[#13bcf2] hover:bg-[#13bcf2] hover:brightness-95"
            href="/user/login"
          >
            Login
          </Button>
        </div>
      )}
      <div className="grid grid-cols-3 gap-8 mt-5">
        <NavCard title={"TODO"} description={""} href={"/todo"}></NavCard>
        <NavCard title={"Summary"} description={""} href={"/summary"}></NavCard>
        <NavCard
          title={"Community"}
          description={""}
          href={"/community"}
        ></NavCard>
      </div>
      <Link
        href="https://freefrontend.com/css-animation-examples/"
        className="absolute bottom-2 right-2"
      >
        Animation Credit: Temani Afif October 7, 2021
      </Link>
    </main>
  );
}
