import CommunityList from "./component/CommunityList";
import MyCommunity from "./component/MyCommunity";

export default function page() {
  return (
    <main>
      <MyCommunity />
      <CommunityList />
    </main>
  );
}
