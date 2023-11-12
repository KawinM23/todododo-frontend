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

export default function StreakVisual({ data }: { data: StreakData }) {
  const [timeLeft, setTimeLeft] = useState(data.streak.length);
  const intervalRef = useRef<any>(); // Add a ref to store the interval id

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 2000 / data.streak.length);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Add a listener to `timeLeft`
  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(intervalRef.current);
    }
  }, [timeLeft]);

  const daily = data.repeat == "daily";
  const weekly = data.repeat == "weekly";
  const monthly = data.repeat == "monthly";

  return (
    <Paper sx={{ display: "inline-block" }} className={`px-6 py-14 mr-4 mb-4`}>
      {data.streak.map((eachStreak, index) => {
        return (
          <Fragment key={index}>
            <span
              className={`${daily && "w-10"} ${weekly && "w-32"} ${
                monthly && "w-14"
              } h-10 mr-2 rounded-full inline-block relative transition-all duration-300 ${
                timeLeft < data.streak.length - index
                  ? eachStreak
                    ? "bg-green-500"
                    : "bg-red-500"
                  : "bg-gray-300 scale-90"
              }`}
              key={index}
            >
              {index == 0 && (
                <span className="absolute w-min z-20 bottom-full mb-2 left-0 float-left pl-1 border-l-2">
                  {dayjs(data.startDate).format("DD/MM/YYYY")}
                </span>
              )}
              {index == data.streak.length - 1 && (
                <span className="absolute w-min z-20 top-full mt-2 right-0 float-right pr-1 border-r-2">
                  {dayjs(data.endDate).format("DD/MM/YYYY")}
                </span>
              )}
            </span>

            {daily && index % 7 == 6 && <br />}
            {weekly && index % 4 == 3 && <br />}
            {monthly && index % 12 == 11 && <br />}
          </Fragment>
        );
      })}
    </Paper>
  );
}
