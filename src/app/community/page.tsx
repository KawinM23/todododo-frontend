import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CommunityList from "./component/CommunityList";
import MyCommunity from "./component/MyCommunity";
import {
  getAllJoinedCommu,
  getAllOwnedCommu,
  getAllPublicCommu,
} from "@/libs/api/community";

export default async function page() {
  const session = await getServerSession(authOptions);
  console.log("sesssion", session);
  const publicCommu = await getAllPublicCommu();
  const joinedCommu = await getAllJoinedCommu(session?.user.accessToken ?? "");
  const ownedCommu = await getAllOwnedCommu(session?.user.accessToken ?? "");
  //console.log(publicCommu);
  //console.log("own ", ownedCommu);

  return (
    <main className="p-5">
      <MyCommunity myCommunities={ownedCommu} joinedCommunities={joinedCommu} />
      <CommunityList publicCommu={publicCommu} />
    </main>
  );
}
