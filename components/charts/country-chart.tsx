"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import type { DataPoint } from "@/app/page"

interface CountryChartProps {
  data: DataPoint[]
}

export function CountryChart({ data }: CountryChartProps) {
  const processData = () => {
    const countryCounts = data.reduce(
      (acc, item) => {
        const country = item.country || "Unknown"
        if (country !== "Unknown" && country.trim() !== "") {
          acc[country] = (acc[country] || 0) + 1
        }
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(countryCounts)
      .map(([country, count]) => ({
        name: country.length > 15 ? country.substring(0, 15) + "..." : country,
        value: count,
        fullName: country,
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
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value) => [value, "Count"]}
          labelFormatter={(label, payload) => {
            if (payload && payload[0] && payload[0].payload.fullName) {
              return payload[0].payload.fullName
            }
            return label
          }}
        />
        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
