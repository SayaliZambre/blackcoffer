"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Globe, Building, Sparkles } from "lucide-react"
import type { DataPoint } from "@/app/page"
import { useEffect, useState } from "react"

interface SummaryCardsProps {
  data: DataPoint[]
}

export function SummaryCards({ data }: SummaryCardsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState({
    totalRecords: 0,
    avgIntensity: 0,
    avgLikelihood: 0,
    avgRelevance: 0,
    uniqueCountries: 0,
    uniqueSectors: 0,
  })

  const totalRecords = data.length
  const avgIntensity = data.length > 0 ? data.reduce((sum, d) => sum + d.intensity, 0) / data.length : 0
  const avgLikelihood = data.length > 0 ? data.reduce((sum, d) => sum + d.likelihood, 0) / data.length : 0
  const avgRelevance = data.length > 0 ? data.reduce((sum, d) => sum + d.relevance, 0) / data.length : 0
  const uniqueCountries = new Set(data.map((d) => d.country).filter(Boolean)).size
  const uniqueSectors = new Set(data.map((d) => d.sector).filter(Boolean)).size

  useEffect(() => {
    setIsVisible(true)

    // Animate numbers counting up
    const duration = 1500
    const steps = 60
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setAnimatedValues({
        totalRecords: Math.floor(totalRecords * progress),
        avgIntensity: avgIntensity * progress,
        avgLikelihood: avgLikelihood * progress,
        avgRelevance: avgRelevance * progress,
        uniqueCountries: Math.floor(uniqueCountries * progress),
        uniqueSectors: Math.floor(uniqueSectors * progress),
      })

      if (currentStep >= steps) {
        clearInterval(timer)
        setAnimatedValues({
          totalRecords,
          avgIntensity,
          avgLikelihood,
          avgRelevance,
          uniqueCountries,
          uniqueSectors,
        })
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [data])

  const cards = [
    {
      title: "Total Records",
      value: animatedValues.totalRecords.toLocaleString(),
      icon: Activity,
      description: "Data points in current view",
      trend: null,
      color: "from-blue-500 to-cyan-500",
      bgPattern: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950",
    },
    {
      title: "Avg Intensity",
      value: animatedValues.avgIntensity.toFixed(1),
      icon: TrendingUp,
      description: "Average intensity score",
      trend: animatedValues.avgIntensity > 10 ? "up" : "down",
      color: "from-emerald-500 to-teal-500",
      bgPattern: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950",
    },
    {
      title: "Avg Likelihood",
      value: animatedValues.avgLikelihood.toFixed(1),
      icon: TrendingUp,
      description: "Average likelihood score",
      trend: animatedValues.avgLikelihood > 3 ? "up" : "down",
      color: "from-purple-500 to-pink-500",
      bgPattern: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950",
    },
    {
      title: "Avg Relevance",
      value: animatedValues.avgRelevance.toFixed(1),
      icon: Activity,
      description: "Average relevance score",
      trend: animatedValues.avgRelevance > 3 ? "up" : "down",
      color: "from-orange-500 to-red-500",
      bgPattern: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950",
    },
    {
      title: "Countries",
      value: animatedValues.uniqueCountries.toString(),
      icon: Globe,
      description: "Unique countries covered",
      trend: null,
      color: "from-indigo-500 to-blue-500",
      bgPattern: "bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950",
    },
    {
      title: "Sectors",
      value: animatedValues.uniqueSectors.toString(),
      icon: Building,
      description: "Different sectors analyzed",
      trend: null,
      color: "from-green-500 to-emerald-500",
      bgPattern: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950",
    },
  ]

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 stagger-animation ${isVisible ? "animate-fade-in" : ""}`}
    >
      {cards.map((card, index) => {
        const Icon = card.icon
        return (
          <Card
            key={index}
            className={`
              relative overflow-hidden card-3d hover-glow group cursor-pointer
              ${card.bgPattern}
              border-0 shadow-lg hover:shadow-2xl
              transition-all duration-500 ease-out
              hover:scale-105 hover:-translate-y-2
            `}
            style={{
              animationDelay: `${index * 0.1}s`,
              transform: isVisible ? "translateY(0)" : "translateY(50px)",
            }}
          >
            {/* Animated Background Particles */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="particle animate-float"
                  style={{
                    left: `${20 + i * 30}%`,
                    animationDelay: `${i * 0.5}s`,
                    animationDuration: `${3 + i}s`,
                  }}
                />
              ))}
            </div>

            {/* Gradient Border */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg`}
            />

            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                {card.title}
              </CardTitle>
              <div className="relative">
                <Icon className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:animate-bounce transition-colors" />
                <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity" />
              </div>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="flex items-center justify-between">
                <div
                  className={`text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent group-hover:animate-scale-pulse`}
                >
                  {card.value}
                </div>
                {card.trend && (
                  <Badge
                    variant={card.trend === "up" ? "default" : "secondary"}
                    className="ml-2 animate-heartbeat group-hover:animate-bounce"
                  >
                    {card.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 animate-wave" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                {card.description}
              </p>
            </CardContent>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          </Card>
        )
      })}
    </div>
  )
}
