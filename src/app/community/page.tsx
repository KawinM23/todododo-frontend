import CommunityList from "./component/CommunityList";

export default function page() {
  return (
    <main>
      <CommunityList title={"My Community"} />
      <CommunityList title={"Discover Community!"} />
    </main>
  );
}
