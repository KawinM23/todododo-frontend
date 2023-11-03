import { Button } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <main className="center-container h-[90vh]">
      <h1 className="text-2xl font-bold mb-5">Welcome to TODODODODO</h1>
      <h2 className="mb-5">Todo application</h2>
      <div className="flex flex-row gap-5">
        <Button variant="outlined" href="/user/register">
          Register
        </Button>
        <Button variant="outlined">Login</Button>
      </div>
    </main>
  );
}
