"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import type { DataPoint } from "@/app/page"

interface RegionChartProps {
  data: DataPoint[]
}

export function RegionChart({ data }: RegionChartProps) {
  const processData = () => {
    const regionCounts = data.reduce(
      (acc, item) => {
        const region = item.region || "Unknown"
        acc[region] = (acc[region] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(regionCounts)
      .map(([region, count]) => ({
        name: region.length > 20 ? region.substring(0, 20) + "..." : region,
        value: count,
        fullName: region,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 8)
  }

  const chartData = processData()
  const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16", "#F97316"]

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    if (percent < 0.05) return null // Don't show labels for slices less than 5%

    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name, props) => [value, "Count"]}
          labelFormatter={(label, payload) => {
            if (payload && payload[0] && payload[0].payload.fullName) {
              return payload[0].payload.fullName
            }
            return label
          }}
        />
        <Legend verticalAlign="bottom" height={36} formatter={(value, entry) => entry.payload.fullName} />
      </PieChart>
    </ResponsiveContainer>
  )
}
