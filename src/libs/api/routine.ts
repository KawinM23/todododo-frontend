export async function getAllRoutines(user_id: string) {
  try {
    const res = await fetch(
      process.env.TASK_SERVICE_API_ROUTE + "/routine?user_id=" + user_id,
      {
        method: "GET",
        cache: "no-store",
        next: { tags: ["routine"] },
      }
    );

    return res.json();
  } catch (err) {
    console.log(err);
  }
}

export async function addRoutine({
  title,
  description,
  typena,
  user_id,
}: {
  title: string;
  description: string;
  typena: string;
  user_id: string;
}) {
  console.log("Add Routine ", title);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_TASK_SERVICE_API_ROUTE + "/routine",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          description: description,
          typena: typena,
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

export async function editRoutine({
  title,
  description,
  completed,
  user_id,
  id,
}: {
  title: string;
  description: string;
  completed: boolean;
  user_id: string;
  id: string;
}) {
  console.log("Edit Routine", title);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_TASK_SERVICE_API_ROUTE + "/routine/" + id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          description: description,
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

export async function completeRoutine(id: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_TASK_SERVICE_API_ROUTE +
        "/routine/" +
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

export async function deleteRoutine(id: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_TASK_SERVICE_API_ROUTE + "/routine/" + id,
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