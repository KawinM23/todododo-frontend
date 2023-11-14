"use client";

import { Paper, Typography } from "@mui/material";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
export default function HabitGraph({
  title,
  growth,
  date,
}: {
  title: string | null;
  growth: any;
  date: any;
}) {
  const echartsContainerRef = useRef(null);

  useEffect(() => {
    // Create ECharts instance
    const chart = echarts.init(echartsContainerRef.current); // I bind this dom element to echart

    // ECharts configuration
    const option = {
      title: { text: title },
      tooltip: {
        trigger: "axis",
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },
          dataView: { readOnly: false },
          magicType: { type: ["line", "bar"] },
          restore: {},
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: date,
      },
      yAxis: {
        type: "value",
        min: function (value: { min: number }) {
          return Math.round((value.min - 0.1) * 1000) / 1000;
        },
        max: function (value: { max: number }) {
          return Math.round((value.max + 0.1) * 1000) / 1000;
        },
      },
      series: [
        {
          name: "Growth",
          type: "line",
          data: growth,
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
        },
      ],
    };

    // Set options and render
    chart.setOption(option);

    // Clean up the ECharts instance when the component is unmounted
    return () => {
      chart.dispose();
    };
  }, [growth]);

  return (
    <Paper className={`mb-4 p-3`}>
      <div ref={echartsContainerRef} className="w-full my-5 h-[400px]" />
    </Paper>
  );
}
