import { Divider, Paper, Typography } from "@mui/material";
import HabitGraph from "./component/HabitGraph";
import StreakVisual, { StreakData } from "./component/StreakVisual";
import { getAllRoutines } from "@/libs/api/routine";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getAllHabits } from "@/libs/api/habit";
import TaskStreak from "./component/TaskStreak";
import { getHabitStreaks, getRoutineStreaks } from "@/libs/api/summary";

export default async function page() {
  const session = await getServerSession(authOptions);

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
    repeat: "monthly",
  };

  const habitData = [1, 1.01, 1.02, 1.03, 0.99, 0.98];

  //Routine
  // const allRoutines = await getAllRoutines(session?.user.sub ?? "");

  // const routinesIds = allRoutines.map((routine: any) => {
  //   return "task_ids=" + routine.id;
  // });

  // const routineTitles = new Map(
  //   allRoutines.map((routine: any) => {
  //     return [routine.id, routine.title];
  //   })
  // );

  // let queryRoutineIds = routinesIds.join("&");

  // const routineStreaks = await getRoutineStreaks(queryRoutineIds);

  // console.log(routineStreaks);

  //Habit
  const allHabits = await getAllHabits(session?.user.sub ?? "");

  const habitIds = allHabits.map((routine: any) => {
    return "task_ids=" + routine.id;
  });

  const habitTitles = new Map(
    allHabits.map((habit: any) => {
      return [habit.id, habit.title];
    })
  );

  let queryHabitIds = habitIds.join("&");

  const habitStreaks = await getHabitStreaks(queryHabitIds);
  const sortedHabitStreaks = habitStreaks.sort((a: any, b: any) => {
    return b.growth.length - a.growth.length;
  });

  return (
    <main className="p-5">
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Summary
      </Typography>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Task
      </Typography>
      <TaskStreak />
      <Divider className="my-3" />
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Routine
      </Typography>
      <StreakVisual title={"title"} data={streakData} />
      <StreakVisual title={"title"} data={streakData} />
      <Divider className="my-3" />
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Habit
      </Typography>
      {sortedHabitStreaks.length != 0 ? (
        sortedHabitStreaks.map((habit: any) => {
          return (
            <HabitGraph
              key={habit.task_id}
              title={habitTitles.get(habit.task_id) as string}
              growth={habit.growth}
              date={habit.dates}
            />
          );
        })
      ) : (
        <Paper sx={{ display: "inline-block" }} className={`p-4 mb-4 mr-4`}>
          No habit created yet!
        </Paper>
      )}
    </main>
  );
}
