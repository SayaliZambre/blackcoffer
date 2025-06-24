"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FilterSidebar } from "@/components/filter-sidebar"
import { IntensityChart } from "@/components/charts/intensity-chart"
import { LikelihoodChart } from "@/components/charts/likelihood-chart"
import { RelevanceChart } from "@/components/charts/relevance-chart"
import { YearTrendChart } from "@/components/charts/year-trend-chart"
import { RegionChart } from "@/components/charts/region-chart"
import { SectorChart } from "@/components/charts/sector-chart"
import { TopicsChart } from "@/components/charts/topics-chart"
import { CountryChart } from "@/components/charts/country-chart"
import { SummaryCards } from "@/components/summary-cards"
import { Button } from "@/components/ui/button"
import { Menu, Sparkles, Zap } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Chatbot } from "@/components/chatbot"

export interface DataPoint {
  id?: number
  end_year: string
  intensity: number
  sector: string
  topic: string
  insight: string
  url: string
  region: string
  start_year: string
  impact: string
  added: string
  published: string
  country: string
  relevance: number
  pestle: string
  source: string
  title: string
  likelihood: number
}

export interface Filters {
  endYear: string
  topics: string[]
  sector: string[]
  region: string[]
  pestle: string[]
  source: string[]
  country: string[]
  city: string[]
}

export default function Dashboard() {
  const [data, setData] = useState<DataPoint[]>([])
  const [filteredData, setFilteredData] = useState<DataPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    endYear: "",
    topics: [],
    sector: [],
    region: [],
    pestle: [],
    source: [],
    country: [],
    city: [],
  })

  useEffect(() => {
    fetchData()
    // Simulate page load animation
    setTimeout(() => setPageLoaded(true), 500)
  }, [])

  useEffect(() => {
    applyFilters()
  }, [data, filters])

  const fetchData = async () => {
    try {
      const response = await fetch("/api/data")
      const result = await response.json()
      setData(result)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...data]

    if (filters.endYear) {
      filtered = filtered.filter((item) => item.end_year === filters.endYear)
    }

    if (filters.topics.length > 0) {
      filtered = filtered.filter((item) => filters.topics.includes(item.topic))
    }

    if (filters.sector.length > 0) {
      filtered = filtered.filter((item) => filters.sector.includes(item.sector))
    }

    if (filters.region.length > 0) {
      filtered = filtered.filter((item) => filters.region.includes(item.region))
    }

    if (filters.pestle.length > 0) {
      filtered = filtered.filter((item) => filters.pestle.includes(item.pestle))
    }

    if (filters.source.length > 0) {
      filtered = filtered.filter((item) => filters.source.includes(item.source))
    }

    if (filters.country.length > 0) {
      filtered = filtered.filter((item) => filters.country.includes(item.country))
    }

    setFilteredData(filtered)
  }

  const resetFilters = () => {
    setFilters({
      endYear: "",
      topics: [],
      sector: [],
      region: [],
      pestle: [],
      source: [],
      country: [],
      city: [],
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="text-center animate-fade-in">
          {/* Animated Logo */}
          <div className="relative mb-8">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin opacity-20"></div>
              <div
                className="absolute inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-spin opacity-40"
                style={{ animationDirection: "reverse", animationDuration: "3s" }}
              ></div>
              <div
                className="absolute inset-4 bg-gradient-to-r from-pink-600 to-blue-600 rounded-full animate-spin opacity-60"
                style={{ animationDuration: "2s" }}
              ></div>
              <div className="absolute inset-6 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-600 animate-bounce" />
              </div>
            </div>

            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              />
            ))}
          </div>

          {/* Loading Text */}
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-pulse">
            <span className="text-gradient-animate">Loading Dashboard</span>
          </h2>

          {/* Progress Bar */}
          <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-slide-in-right"></div>
          </div>

          {/* Loading Dots */}
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Preparing your analytics experience
            <span className="loading-dots"></span>
          </p>

          {/* Sparkles */}
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(3)].map((_, i) => (
              <Sparkles
                key={i}
                className="h-4 w-4 text-yellow-400 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500 ${pageLoaded ? "animate-fade-in" : "opacity-0"}`}
    >
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-colors duration-300 animate-slide-in-left">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="animate-fade-in-up">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
              <span className="text-gradient-animate">Blackcoffer Analytics Dashboard</span>
              <Sparkles className="inline-block ml-2 h-6 w-6 text-yellow-400 animate-bounce" />
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 animate-typewriter">
              Data Visualization & Insights Platform
            </p>
          </div>
          <div className="flex items-center gap-4 animate-slide-in-right">
            <ThemeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden hover:scale-110 transition-all duration-300 hover-glow ripple-effect"
                >
                  <Menu className="h-4 w-4 animate-pulse" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <FilterSidebar data={data} filters={filters} onFiltersChange={setFilters} onReset={resetFilters} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-80 bg-white dark:bg-gray-900 shadow-sm border-r border-gray-200 dark:border-gray-700 min-h-screen transition-colors duration-300 animate-slide-in-left">
          <FilterSidebar data={data} filters={filters} onFiltersChange={setFilters} onReset={resetFilters} />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {/* Summary Cards */}
          <SummaryCards data={filteredData} />

          {/* Charts */}
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="grid w-full grid-cols-4 animate-zoom-in">
              <TabsTrigger value="overview" className="hover:scale-105 transition-transform">
                Overview
              </TabsTrigger>
              <TabsTrigger value="metrics" className="hover:scale-105 transition-transform">
                Key Metrics
              </TabsTrigger>
              <TabsTrigger value="geographic" className="hover:scale-105 transition-transform">
                Geographic
              </TabsTrigger>
              <TabsTrigger value="trends" className="hover:scale-105 transition-transform">
                Trends
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-animation">
                <Card className="chart-enter card-3d hover-glow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Intensity Distribution
                      <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
                    </CardTitle>
                    <CardDescription>Distribution of intensity values across all data points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <IntensityChart data={filteredData} />
                  </CardContent>
                </Card>

                <Card className="chart-enter card-3d hover-glow" style={{ animationDelay: "0.1s" }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Sector Analysis
                      <Sparkles className="h-4 w-4 text-blue-500 animate-pulse" />
                    </CardTitle>
                    <CardDescription>Data distribution by sector</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SectorChart data={filteredData} />
                  </CardContent>
                </Card>

                <Card className="chart-enter card-3d hover-glow" style={{ animationDelay: "0.2s" }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Likelihood vs Relevance
                      <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
                    </CardTitle>
                    <CardDescription>Correlation between likelihood and relevance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <LikelihoodChart data={filteredData} />
                  </CardContent>
                </Card>

                <Card className="chart-enter card-3d hover-glow" style={{ animationDelay: "0.3s" }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Top Topics
                      <Sparkles className="h-4 w-4 text-green-500 animate-pulse" />
                    </CardTitle>
                    <CardDescription>Most frequently mentioned topics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TopicsChart data={filteredData} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-6 animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-animation">
                <Card className="chart-enter card-3d hover-glow">
                  <CardHeader>
                    <CardTitle>Relevance Analysis</CardTitle>
                    <CardDescription>Relevance scores across different dimensions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RelevanceChart data={filteredData} />
                  </CardContent>
                </Card>

                <Card className="chart-enter card-3d hover-glow" style={{ animationDelay: "0.1s" }}>
                  <CardHeader>
                    <CardTitle>Intensity by Sector</CardTitle>
                    <CardDescription>Average intensity values by sector</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <IntensityChart data={filteredData} groupBy="sector" />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="geographic" className="space-y-6 animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 stagger-animation">
                <Card className="chart-enter card-3d hover-glow">
                  <CardHeader>
                    <CardTitle>Regional Distribution</CardTitle>
                    <CardDescription>Data points by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RegionChart data={filteredData} />
                  </CardContent>
                </Card>

                <Card className="chart-enter card-3d hover-glow" style={{ animationDelay: "0.1s" }}>
                  <CardHeader>
                    <CardTitle>Country Analysis</CardTitle>
                    <CardDescription>Top countries by data points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CountryChart data={filteredData} />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6 animate-fade-in-up">
              <Card className="chart-enter card-3d hover-glow">
                <CardHeader>
                  <CardTitle>Year-wise Trends</CardTitle>
                  <CardDescription>Trends in intensity, likelihood, and relevance over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <YearTrendChart data={filteredData} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Chatbot */}
      <Chatbot />
    </div>
  )
}
