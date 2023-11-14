"use client";

import { getTaskStreaks } from "@/libs/api/summary";
import { CircularProgress, Paper } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState, useEffect, Fragment } from "react";

export default function TaskStreak() {
  const { data: session } = useSession();

  const [taskStreak, setTaskStreak] = useState({
    user_id: "",
    combo: 0,
    best_record: 0,
  });
  //Task
  useEffect(() => {
    const fetchData = async () => {
      const res = await getTaskStreaks(session?.user.sub ?? "");
      setTaskStreak(res);
    };
    fetchData();

    return () => {};
  }, [session]);

  if (!taskStreak || (taskStreak.user_id != "" && taskStreak.combo == 0)) {
    return (
      <Paper sx={{ display: "inline-block" }} className={`p-4 mb-4 mr-4`}>
        No task completed yet!
      </Paper>
    );
  }

  if (taskStreak.user_id != "") {
    return (
      <Fragment>
        <Paper
          sx={{ display: "inline-block", backgroundColor: "#c5ffff" }}
          className={`p-4 mb-4 mr-4`}
        >
          You have completed {taskStreak.combo} tasks before deadline!
        </Paper>
        <Paper
          sx={{ display: "inline-block", backgroundColor: "#c5ffff" }}
          className={`p-4 mb-4`}
        >
          Your best record is {taskStreak.best_record} tasks!
        </Paper>
      </Fragment>
    );
  }

  return (
    <Paper sx={{ display: "inline-block" }} className={`p-4 mb-4 mr-4`}>
      <CircularProgress size={24} />
    </Paper>
  );
}
