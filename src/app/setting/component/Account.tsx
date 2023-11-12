import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Paper, Typography } from "@mui/material";
import { getServerSession } from "next-auth";

export default async function Account() {
  const session = await getServerSession(authOptions);
  return (
    <Paper className="w-[700px] text-left p-4 mb-5">
      <Typography variant="h5">Account</Typography>
      <Typography>Username: {session?.user.username}</Typography>
      <Typography>Email: {session?.user.email}</Typography>
    </Paper>
  );
}
