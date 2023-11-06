import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session?.user != null) {
    return (
      <main className="center-container h-screen">
        <div>
          <p>Username: {session?.user.name}</p>
          <p>Email: {session?.user.email}</p>
        </div>
      </main>
    );
  } else {
    return <main>Pls Register or Login</main>;
  }
}
