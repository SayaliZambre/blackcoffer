"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import type { DataPoint } from "@/app/page"

interface YearTrendChartProps {
  data: DataPoint[]
}

export function YearTrendChart({ data }: YearTrendChartProps) {
  const processData = () => {
    const yearData = data.reduce(
      (acc, item) => {
        const year = item.end_year || item.start_year || new Date(item.published).getFullYear().toString()
        if (year && year !== "NaN") {
          if (!acc[year]) {
            acc[year] = {
              intensity: [],
              likelihood: [],
              relevance: [],
              count: 0,
            }
          }
          acc[year].intensity.push(item.intensity)
          acc[year].likelihood.push(item.likelihood)
          acc[year].relevance.push(item.relevance)
          acc[year].count += 1
        }
        return acc
      },
      {} as Record<string, { intensity: number[]; likelihood: number[]; relevance: number[]; count: number }>,
    )

    return Object.entries(yearData)
      .map(([year, data]) => ({
        year: Number.parseInt(year),
        avgIntensity: Math.round((data.intensity.reduce((sum, val) => sum + val, 0) / data.intensity.length) * 10) / 10,
        avgLikelihood:
          Math.round((data.likelihood.reduce((sum, val) => sum + val, 0) / data.likelihood.length) * 10) / 10,
        avgRelevance: Math.round((data.relevance.reduce((sum, val) => sum + val, 0) / data.relevance.length) * 10) / 10,
        count: data.count,
      }))
      .filter((d) => d.year >= 2015 && d.year <= 2030)
      .sort((a, b) => a.year - b.year)
  }

  const chartData = processData()

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip formatter={(value, name) => [value, name]} labelFormatter={(label) => `Year: ${label}`} />
        <Legend />
        <Line
          type="monotone"
          dataKey="avgIntensity"
          stroke="#3B82F6"
          strokeWidth={2}
          name="Avg Intensity"
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="avgLikelihood"
          stroke="#10B981"
          strokeWidth={2}
          name="Avg Likelihood"
          dot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="avgRelevance"
          stroke="#F59E0B"
          strokeWidth={2}
          name="Avg Relevance"
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
