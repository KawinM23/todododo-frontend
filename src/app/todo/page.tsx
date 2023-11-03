import AddTask from "./component/Addtask";
import TaskTable from "./component/TaskTable";

export default function page() {
  return (
    <div className="w-full flex flex-row">
      <div className="w-1/2">
        <AddTask />
        <TaskTable taskType={"normal"} />
      </div>
    </div>
  );
}
