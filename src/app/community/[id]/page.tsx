import { getCommuByID, getallCommuTask } from "@/libs/api/community";
import Commu from "./component/commu";
import TaskCommu from "./component/taskcommu";

export default async function CommunityPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await getCommuByID(params.id);
  const resna = await getallCommuTask(params.id);

  return (
    <div>
      <div className="flex mb-5 flex-col justify-center items-center">
        <div className="text-3xl mb-2">Welcome to Community {res.name}</div>
        <div>{res.description}</div>
      </div>
      <Commu data={res} />
      <TaskCommu data={resna} />
    </div>
  );
}
