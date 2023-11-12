import { Paper, Typography } from "@mui/material";
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
    repeat: "weekly",
  };

  const habitData = [1, 1.01, 1.02, 1.03, 0.99, 0.98];

  return (
    <main>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Summary
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Task
      </Typography>
      <Paper
        sx={{ display: "inline-block", backgroundColor: "rgb(187 247 208)" }}
        className={`p-4 mb-4`}
      >
        You have completed 20 tasks in 2 Months!
      </Paper>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Streak
      </Typography>
      <StreakVisual data={streakData} />
      <StreakVisual data={streakData} />
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Habit
      </Typography>
      <HabitGraph data={habitData} />
    </main>
  );
}
