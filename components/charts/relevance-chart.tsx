"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts"
import type { DataPoint } from "@/app/page"

interface RelevanceChartProps {
  data: DataPoint[]
}

export function RelevanceChart({ data }: RelevanceChartProps) {
  const processData = () => {
    const sectorData = data.reduce(
      (acc, item) => {
        if (item.sector && item.relevance > 0) {
          if (!acc[item.sector]) {
            acc[item.sector] = { total: 0, count: 0 }
          }
          acc[item.sector].total += item.relevance
          acc[item.sector].count += 1
        }
        return acc
      },
      {} as Record<string, { total: number; count: number }>,
    )

    return Object.entries(sectorData)
      .map(([sector, { total, count }]) => ({
        sector: sector.length > 12 ? sector.substring(0, 12) + "..." : sector,
        relevance: Math.round((total / count) * 10) / 10,
        fullName: sector,
      }))
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 8)
  }

  const chartData = processData()

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={chartData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
        <PolarGrid />
        <PolarAngleAxis dataKey="sector" tick={{ fontSize: 10 }} />
        <PolarRadiusAxis angle={90} domain={[0, "dataMax"]} tick={{ fontSize: 10 }} />
        <Radar
          name="Average Relevance"
          dataKey="relevance"
          stroke="#3B82F6"
          fill="#3B82F6"
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Legend />
      </RadarChart>
    </ResponsiveContainer>
  )
}
