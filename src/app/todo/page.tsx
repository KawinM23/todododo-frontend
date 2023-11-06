import AddTask from "./component/AddTask";
import HabitList from "./component/HabitList";
import RoutineList from "./component/RoutineList";
import TaskTable from "./component/TaskTable";

export default function page() {
  return (
    <div className="w-full flex flex-row justify-around gap-4">
      <div className="w-1/2 h-screen flex flex-col gap-4">
        <RoutineList />
        <HabitList />
      </div>
      <div className="w-1/2">
        <AddTask />
        <TaskTable taskType={"normal"} />
      </div>
    </div>
  );
}
