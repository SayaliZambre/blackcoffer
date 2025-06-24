"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import type { DataPoint } from "@/app/page"

interface IntensityChartProps {
  data: DataPoint[]
  groupBy?: string
}

export function IntensityChart({ data, groupBy }: IntensityChartProps) {
  const processData = () => {
    if (groupBy === "sector") {
      const sectorData = data.reduce(
        (acc, item) => {
          if (item.sector) {
            if (!acc[item.sector]) {
              acc[item.sector] = { total: 0, count: 0 }
            }
            acc[item.sector].total += item.intensity
            acc[item.sector].count += 1
          }
          return acc
        },
        {} as Record<string, { total: number; count: number }>,
      )

      return Object.entries(sectorData)
        .map(([sector, { total, count }]) => ({
          name: sector.length > 15 ? sector.substring(0, 15) + "..." : sector,
          value: Math.round((total / count) * 10) / 10,
          fullName: sector,
        }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 10)
    }

    // Default: intensity distribution
    const intensityRanges = [
      { range: "0-10", min: 0, max: 10 },
      { range: "11-20", min: 11, max: 20 },
      { range: "21-30", min: 21, max: 30 },
      { range: "31-40", min: 31, max: 40 },
      { range: "41-50", min: 41, max: 50 },
      { range: "51+", min: 51, max: Number.POSITIVE_INFINITY },
    ]

    return intensityRanges.map(({ range, min, max }) => ({
      name: range,
      value: data.filter((d) => d.intensity >= min && d.intensity <= max).length,
    }))
  }

  const chartData = processData()
  const colors = ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444", "#6B7280"]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          formatter={(value, name, props) => [value, groupBy === "sector" ? "Avg Intensity" : "Count"]}
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
