export async function getAllHabits(user_id: string) {
  if (user_id == "") {
    return [];
  }
  try {
    const res = await fetch(
      process.env.TASK_SERVICE_API_ROUTE + "/habit?user_id=" + user_id,
      {
        method: "GET",
        cache: "no-store",
        next: { tags: ["habit"] },
      }
    );

    if (res.ok) {
      return res.json();
    }
    return null;
  } catch (err) {
    console.log(err);
  }
}

export async function addHabit({
  title,
  description,
  user_id,
}: {
  title: string;
  description: string;
  user_id: string;
}) {
  console.log("Add Habit", title);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_TASK_SERVICE_API_ROUTE + "/habit",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          description: description,
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

export async function editHabit({
  title,
  description,
  user_id,
  id,
}: {
  title: string;
  description: string;
  user_id: string;
  id: string;
}) {
  console.log("Edit Habit", title);
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_TASK_SERVICE_API_ROUTE + "/habit/" + id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          description: description,
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

export async function adjustScoreHabit(id: string, increase: boolean) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_TASK_SERVICE_API_ROUTE +
        "/habit/" +
        id +
        (increase ? "/increasescore" : "/decreasescore"),
      {
        method: "PUT",
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

export async function deleteHabit(id: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_TASK_SERVICE_API_ROUTE + "/habit/" + id,
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
