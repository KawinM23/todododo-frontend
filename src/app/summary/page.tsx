import HabitGraph from "./component/HabitGraph";
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

  const habitData = [1, 1.01, 1.02, 1.03, 0.99, 0.98];

  return (
    <main>
      Summary
      <StreakVisual data={streakData} />
      <HabitGraph data={habitData} />
    </main>
  );
}
