"use client";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

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
    <div className={`h-[500px] w-[90%] py-10`}>
      {data.streak.map((eachStreak, index) => {
        return (
          <>
            <span
              className={`${daily && "w-10"} ${weekly && "w-32"} ${
                monthly && "w-14"
              } h-10 mr-2 rounded-full inline-block relative transition-all duration-300 ${
                eachStreak ? "bg-green-500" : "bg-red-500"
              } ${
                timeLeft < data.streak.length - index
                  ? ""
                  : "bg-gray-300 scale-90"
              }`}
              key={index}
            >
              {index == 0 && (
                <span className="absolute left-0 text-center z-20 w-full bottom-full mb-2">
                  {dayjs(data.startDate).format("DD/MM/YYYY")}
                </span>
              )}
              {index == data.streak.length - 1 && (
                <span className="absolute right-0 text-center z-20 w-full top-full mt-2">
                  {dayjs(data.endDate).format("DD/MM/YYYY")}
                </span>
              )}
            </span>

            {daily && index % 7 == 6 && <br />}
            {weekly && index % 4 == 3 && <br />}
            {monthly && index % 12 == 11 && <br />}
          </>
        );
      })}
    </div>
  );
}
