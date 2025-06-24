"use client"

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import type { DataPoint } from "@/app/page"

interface LikelihoodChartProps {
  data: DataPoint[]
}

export function LikelihoodChart({ data }: LikelihoodChartProps) {
  const chartData = data
    .filter((d) => d.likelihood > 0 && d.relevance > 0)
    .map((d) => ({
      likelihood: d.likelihood,
      relevance: d.relevance,
      intensity: d.intensity,
      sector: d.sector,
      topic: d.topic,
    }))

  const getColor = (intensity: number) => {
    if (intensity >= 50) return "#EF4444"
    if (intensity >= 30) return "#F59E0B"
    if (intensity >= 20) return "#10B981"
    if (intensity >= 10) return "#3B82F6"
    return "#6B7280"
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="number"
          dataKey="likelihood"
          name="Likelihood"
          tick={{ fontSize: 12 }}
          label={{ value: "Likelihood", position: "insideBottom", offset: -10 }}
        />
        <YAxis
          type="number"
          dataKey="relevance"
          name="Relevance"
          tick={{ fontSize: 12 }}
          label={{ value: "Relevance", angle: -90, position: "insideLeft" }}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(value, name) => [value, name]}
          labelFormatter={() => ""}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload
              return (
                <div className="bg-white p-3 border rounded shadow-lg">
                  <p className="font-medium">{data.sector || "Unknown Sector"}</p>
                  <p className="text-sm text-gray-600">{data.topic || "Unknown Topic"}</p>
                  <p className="text-sm">Likelihood: {data.likelihood}</p>
                  <p className="text-sm">Relevance: {data.relevance}</p>
                  <p className="text-sm">Intensity: {data.intensity}</p>
                </div>
              )
            }
            return null
          }}
        />
        <Scatter name="Data Points" data={chartData} fill="#3B82F6">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.intensity)} />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  )
}
