export async function getAllTasks() {
  try {
    const res = await fetch(process.env.TASK_SERVICE_API_ROUTE + "/task", {
      cache: "no-store",
    });

    return res.json();
  } catch (err) {
    console.log(err);
  }
}
