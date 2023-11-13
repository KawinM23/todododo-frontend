import { getAllTasks } from "@/libs/api/task";
import HabitList from "./component/HabitList";
import RoutineList from "./component/RoutineList";
import TaskList from "./component/TaskList";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getAllHabits } from "@/libs/api/habit";
import { getAllRoutines } from "@/libs/api/routine";

export default async function page() {
  const session = await getServerSession(authOptions);
  console.log(session);

  const allTasks = await getAllTasks(session?.user.sub ?? "");
  const allHabits = await getAllHabits(session?.user.sub ?? "");
  const allRoutines = await getAllRoutines(session?.user.sub ?? "");

  return (
    <div className="w-full flex flex-row justify-around gap-4">
      <div className="w-1/2 flex flex-col gap-4">
        <RoutineList routines={allRoutines} />
        <HabitList habits={allHabits} />
      </div>
      <TaskList tasks={allTasks} />
    </div>
  );
}
