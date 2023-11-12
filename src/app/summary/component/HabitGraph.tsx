"use client";

import * as echarts from "echarts";
import { useEffect, useRef } from "react";
export default function HabitGraph({ data }: { data: any }) {
  const echartsContainerRef = useRef(null);

  useEffect(() => {
    // Create ECharts instance
    const chart = echarts.init(echartsContainerRef.current); // I bind this dom element to echart

    // ECharts configuration
    const option = {
      title: {
        text: "Habit",
      },
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
      },
      yAxis: {
        type: "value",
        min: function (value: { min: number }) {
          return Math.round(value.min ** 2 * 1000) / 1000;
        },
        max: function (value: { max: number }) {
          return Math.round(value.max ** 2 * 1000) / 1000;
        },
      },
      series: [
        {
          name: "Score",
          type: "line",
          data: data,
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
  }, [data]);

  return (
    <div>
      <div ref={echartsContainerRef} className="w-full my-5 h-[400px]" />
    </div>
  );
}
