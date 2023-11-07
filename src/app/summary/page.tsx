import StreakVisual, { StreakData } from "./component/StreakVisual";

export default function page() {
  const streakData: StreakData = {
    startDate: new Date("2023/10/01"),
    endDate: new Date("2023/10/14"),
    streak: [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      false,
      true,
      true,
      true,
      true,
      true,
      true,
    ],
    repeat: "daily",
  };

  return (
    <main>
      Summary
      <StreakVisual data={streakData} />
    </main>
  );
}
