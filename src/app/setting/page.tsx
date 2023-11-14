import { getMyWebhook } from "@/libs/api/notification";
import Account from "./component/Account";
import Setting from "./component/Setting";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function page() {
  const session = await getServerSession(authOptions);
  const webhook = await getMyWebhook(session?.user.sub);

  return (
    <main className="center-container flex-col h-screen p-5">
      <Account />
      <Setting myWebhook={webhook} />
    </main>
  );
}
