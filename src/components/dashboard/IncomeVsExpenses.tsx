"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--chart-2)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", income: 186, expenses: 80 },
  { month: "February", income: 305, expenses: 200 },
  { month: "March", income: 237, expenses: 120 },
  { month: "April", income: 73, expenses: 190 },
  { month: "May", income: 209, expenses: 130 },
  { month: "June", income: 214, expenses: 140 },
];

export default function IncomeVsExpenses() {
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-4">
        Income vs Expenses
        <br />
        <span className="text-xs text-slate-400">
          Weekly performance tracking
        </span>
      </h1>

      <ChartContainer
        config={chartConfig}
        className="h-[260px] w-full" // ← reduced height here
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="income" fill="var(--color-income)" radius={4} />
          <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
