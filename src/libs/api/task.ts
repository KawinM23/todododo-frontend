export async function getAllTasks(user_id: string) {
  if (user_id == "") {
    return [];
  }
  try {
    const res = await fetch(
      process.env.TASK_SERVICE_API_ROUTE + "/task?user_id=" + user_id,
      {
        method: "GET",
        cache: "no-store",
        next: { tags: ["task"] },
      }
    );

    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export async function addTask({
  title,
  description,
  deadline,
  user_id,
}: {
  title: string;
  description: string;
  deadline: Date;
  user_id: string;
}) {
  console.log("Add Task ", title);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_TASK_SERVICE_API_ROUTE + "/task",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          description: description,
          deadline: deadline,
          completed: false,
          user_id: user_id,
        }),
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function editTask({
  title,
  description,
  deadline,
  completed,
  user_id,
  id,
}: {
  title: string;
  description: string;
  deadline: Date;
  completed: boolean;
  user_id: string;
  id: string;
}) {
  console.log("Edit Task", title);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_TASK_SERVICE_API_ROUTE + "/task/" + id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          description: description,
          deadline: deadline,
          completed: completed,
          user_id: user_id,
        }),
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function completeTask(id: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_TASK_SERVICE_API_ROUTE +
        "/task/" +
        id +
        "/complete",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}

export async function deleteTask(id: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_TASK_SERVICE_API_ROUTE + "/task/" + id,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (res.ok) {
      return res.json();
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
}
