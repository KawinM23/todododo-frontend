export async function getAllHabits(user_id: string) {
  try {
    const res = await fetch(
      process.env.TASK_SERVICE_API_ROUTE + "/habit?user_id=" + user_id,
      {
        method: "GET",
        cache: "no-store",
        next: { tags: ["habit"] },
      }
    );

    return res.json();
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
          score: 0,
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
  score,
  user_id,
  id,
}: {
  title: string;
  description: string;
  score: number;
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
          score: score,
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
