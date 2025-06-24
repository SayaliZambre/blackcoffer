"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import type { DataPoint } from "@/app/page"

interface TopicsChartProps {
  data: DataPoint[]
}

export function TopicsChart({ data }: TopicsChartProps) {
  const processData = () => {
    const topicCounts = data.reduce(
      (acc, item) => {
        const topic = item.topic || "Unknown"
        acc[topic] = (acc[topic] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(topicCounts)
      .map(([topic, count]) => ({
        name: topic.length > 12 ? topic.substring(0, 12) + "..." : topic,
        value: count,
        fullName: topic,
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10)
  }

  const chartData = processData()
  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#EC4899",
    "#6B7280",
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} layout="horizontal" margin={{ top: 20, right: 30, left: 80, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
        <Tooltip
          formatter={(value) => [value, "Count"]}
          labelFormatter={(label, payload) => {
            if (payload && payload[0] && payload[0].payload.fullName) {
              return payload[0].payload.fullName
            }
            return label
          }}
        />
        <Bar dataKey="value" radius={[0, 4, 4, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
