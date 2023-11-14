export async function getTaskStreaks(user_id: string) {
  if (user_id == "") {
    return [];
  }
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PERFORMANCE_SERVICE_API_ROUTE +
        "/streak/" +
        user_id,
      {
        method: "GET",
        cache: "no-store",
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

export async function getRoutineStreaks(routine_ids: string) {
  if (routine_ids == "") {
    return [];
  }
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PERFORMANCE_SERVICE_API_ROUTE +
        "/routine?" +
        routine_ids,
      {
        method: "GET",
        cache: "no-store",
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

export async function getHabitStreaks(habit_ids: string) {
  if (habit_ids == "") {
    return [];
  }
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_PERFORMANCE_SERVICE_API_ROUTE +
        "/habit?" +
        habit_ids,
      {
        method: "GET",
        cache: "no-store",
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
