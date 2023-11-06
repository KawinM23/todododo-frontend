import HabitList from "./component/HabitList";
import RoutineList from "./component/RoutineList";
import TaskList from "./component/TaskList";

export default function page() {
  return (
    <div className="w-full flex flex-row justify-around gap-4">
      <div className="w-1/2 h-screen flex flex-col gap-4">
        <RoutineList />
        <HabitList />
      </div>
      <TaskList taskType={"normal"} />
    </div>
  );
}
