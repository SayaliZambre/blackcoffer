"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { X, RotateCcw } from "lucide-react"
import type { DataPoint, Filters } from "@/app/page"

interface FilterSidebarProps {
  data: DataPoint[]
  filters: Filters
  onFiltersChange: (filters: Filters) => void
  onReset: () => void
}

export function FilterSidebar({ data, filters, onFiltersChange, onReset }: FilterSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")

  // Extract unique values for each filter
  const uniqueValues = {
    endYears: [...new Set(data.map((d) => d.end_year).filter(Boolean))].sort(),
    topics: [...new Set(data.map((d) => d.topic).filter(Boolean))].sort(),
    sectors: [...new Set(data.map((d) => d.sector).filter(Boolean))].sort(),
    regions: [...new Set(data.map((d) => d.region).filter(Boolean))].sort(),
    pestles: [...new Set(data.map((d) => d.pestle).filter(Boolean))].sort(),
    sources: [...new Set(data.map((d) => d.source).filter(Boolean))].sort(),
    countries: [...new Set(data.map((d) => d.country).filter(Boolean))].sort(),
  }

  const handleMultiSelectChange = (filterKey: keyof Filters, value: string, checked: boolean) => {
    const currentValues = filters[filterKey] as string[]
    const newValues = checked ? [...currentValues, value] : currentValues.filter((v) => v !== value)

    onFiltersChange({
      ...filters,
      [filterKey]: newValues,
    })
  }

  const handleSingleSelectChange = (filterKey: keyof Filters, value: string) => {
    onFiltersChange({
      ...filters,
      [filterKey]: value,
    })
  }

  const removeFilter = (filterKey: keyof Filters, value?: string) => {
    if (value) {
      const currentValues = filters[filterKey] as string[]
      onFiltersChange({
        ...filters,
        [filterKey]: currentValues.filter((v) => v !== value),
      })
    } else {
      onFiltersChange({
        ...filters,
        [filterKey]: Array.isArray(filters[filterKey]) ? [] : "",
      })
    }
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.endYear) count++
    count += filters.topics.length
    count += filters.sector.length
    count += filters.region.length
    count += filters.pestle.length
    count += filters.source.length
    count += filters.country.length
    return count
  }

  const FilterSection = ({
    title,
    items,
    filterKey,
    isMultiSelect = true,
  }: {
    title: string
    items: string[]
    filterKey: keyof Filters
    isMultiSelect?: boolean
  }) => {
    const filteredItems = items.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
      <div className="space-y-3">
        <Label className="text-sm font-medium">{title}</Label>
        <ScrollArea className="h-32">
          <div className="space-y-2">
            {filteredItems.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                {isMultiSelect ? (
                  <Checkbox
                    id={`${filterKey}-${item}`}
                    checked={(filters[filterKey] as string[]).includes(item)}
                    onCheckedChange={(checked) => handleMultiSelectChange(filterKey, item, checked as boolean)}
                  />
                ) : (
                  <input
                    type="radio"
                    id={`${filterKey}-${item}`}
                    name={filterKey}
                    checked={filters[filterKey] === item}
                    onChange={() => handleSingleSelectChange(filterKey, item)}
                    className="w-4 h-4"
                  />
                )}
                <Label htmlFor={`${filterKey}-${item}`} className="text-sm cursor-pointer flex-1">
                  {item}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="animate-pulse">
            {getActiveFiltersCount()} active
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            className="h-8 px-2 hover:scale-105 transition-transform duration-200"
          >
            <RotateCcw className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {getActiveFiltersCount() > 0 && (
        <Card className="animate-fade-in">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-gray-900 dark:text-white">Active Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {filters.endYear && (
              <Badge variant="outline" className="mr-1 mb-1">
                End Year: {filters.endYear}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter("endYear")} />
              </Badge>
            )}
            {filters.topics.map((topic) => (
              <Badge key={topic} variant="outline" className="mr-1 mb-1">
                Topic: {topic}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter("topics", topic)} />
              </Badge>
            ))}
            {filters.sector.map((sector) => (
              <Badge key={sector} variant="outline" className="mr-1 mb-1">
                Sector: {sector}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter("sector", sector)} />
              </Badge>
            ))}
            {filters.region.map((region) => (
              <Badge key={region} variant="outline" className="mr-1 mb-1">
                Region: {region}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter("region", region)} />
              </Badge>
            ))}
            {filters.pestle.map((pestle) => (
              <Badge key={pestle} variant="outline" className="mr-1 mb-1">
                PESTLE: {pestle}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter("pestle", pestle)} />
              </Badge>
            ))}
            {filters.source.map((source) => (
              <Badge key={source} variant="outline" className="mr-1 mb-1">
                Source: {source}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter("source", source)} />
              </Badge>
            ))}
            {filters.country.map((country) => (
              <Badge key={country} variant="outline" className="mr-1 mb-1">
                Country: {country}
                <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter("country", country)} />
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div>
        <Label htmlFor="search" className="text-sm font-medium">
          Search Filters
        </Label>
        <Input
          id="search"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1"
        />
      </div>

      <Separator />

      {/* Filter Sections */}
      <ScrollArea className="h-[calc(100vh-400px)]">
        <div className="space-y-6">
          <FilterSection title="End Year" items={uniqueValues.endYears} filterKey="endYear" isMultiSelect={false} />

          <Separator />

          <FilterSection title="Topics" items={uniqueValues.topics} filterKey="topics" />

          <Separator />

          <FilterSection title="Sector" items={uniqueValues.sectors} filterKey="sector" />

          <Separator />

          <FilterSection title="Region" items={uniqueValues.regions} filterKey="region" />

          <Separator />

          <FilterSection title="PESTLE" items={uniqueValues.pestles} filterKey="pestle" />

          <Separator />

          <FilterSection title="Source" items={uniqueValues.sources} filterKey="source" />

          <Separator />

          <FilterSection title="Country" items={uniqueValues.countries} filterKey="country" />
        </div>
      </ScrollArea>
    </div>
  )
}
