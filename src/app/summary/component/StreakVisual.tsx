"use client";
import { Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import { Fragment, useEffect, useRef, useState } from "react";

export interface StreakData {
  startDate: Date;
  endDate: Date;
  streak: boolean[];
  repeat: "daily" | "weekly" | "monthly";
}

export default function StreakVisual({
  title,
  dates,
  completions,
  typena,
}: {
  title: string;
  dates: Date[];
  completions: boolean[];
  typena: "daily" | "weekly" | "monthly";
}) {
  const [timeLeft, setTimeLeft] = useState(completions.length);
  const intervalRef = useRef<any>(); // Add a ref to store the interval id

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 2000 / completions.length);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Add a listener to `timeLeft`
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
    }
  }, [timeLeft]);

  const daily = typena == "daily";
  const weekly = typena == "weekly";
  const monthly = typena == "monthly";

  return (
    <Paper sx={{ display: "inline-block" }} className={`px-6 py-4 mr-4 mb-4`}>
      <Typography variant="h6">{title}</Typography>
      <div className="pt-10 pb-7">
        {completions.slice(1, completions.length).map((eachStreak, index) => {
          return (
            <Fragment key={index}>
              <span
                className={`${daily && "w-10"} ${weekly && "w-32"} ${
                  monthly && "w-11"
                } h-10 mr-2 rounded-full inline-block relative transition-all duration-300 ${
                  timeLeft < completions.length - index
                    ? eachStreak
                      ? "bg-green-500"
                      : "bg-gray-400"
                    : "bg-gray-300 scale-90"
                }`}
                key={index}
              >
                {index == 0 && (
                  <span className="absolute w-min z-20 bottom-full mb-2 left-0 float-left pl-1 border-l-2">
                    {dayjs(dates[0]).format("DD/MM/YYYY")}
                  </span>
                )}
                {index == dates.length - 2 && (
                  <span className="absolute w-min z-20 top-full mt-2 right-0 float-right pr-1 border-r-2">
                    {dayjs(dates[dates.length - 1]).format("DD/MM/YYYY")}
                  </span>
                )}
              </span>

              {daily && index % 7 == 6 && <br />}
              {weekly && index % 4 == 3 && <br />}
              {monthly && index % 12 == 11 && <br />}
            </Fragment>
          );
        })}
      </div>
    </Paper>
  );
}
