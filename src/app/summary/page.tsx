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

  //Routine
  const allRoutines = await getAllRoutines(session?.user.sub ?? "");

  const routinesIds = allRoutines.map((routine: any) => {
    return "task_ids=" + routine.id;
  });

  const routineTitles = new Map(
    allRoutines.map((routine: any) => {
      return [routine.id, routine.title];
    })
  );

  const queryRoutineIds = routinesIds.join("&");

  const routineStreaks = await getRoutineStreaks(queryRoutineIds);

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

  const queryHabitIds = habitIds.join("&");

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
      {routineStreaks.length != 0 ? (
        routineStreaks.map((routine: any) => {
          return (
            <StreakVisual
              key={routine.task_id}
              title={routineTitles.get(routine.task_id) as string}
              dates={routine.dates}
              completions={routine.completions}
              typena={routine.typena}
            />
          );
        })
      ) : (
        <Paper sx={{ display: "inline-block" }} className={`p-4 mb-4 mr-4`}>
          No routine done yet!
        </Paper>
      )}
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
