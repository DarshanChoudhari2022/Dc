"use client"

import { useState, useEffect } from "react"
// import { Search, Filter, MapPin, Briefcase, Mail, Phone, ChevronDown, ChevronUp } from "lucide-react"
import { Search, MapPin, Briefcase, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FormResponse {
  Timestamp: string;
  email: string;
  name: string;
  business?: string;
  "services: ": string;
  lookingFor: string;
  phone?: string | number;
  businessEmail: string;
  location: string;
}

interface ResponseData {
  "Form Responses 1": FormResponse[];
}

interface Member {
  id: string;
  name: string;
  business: string;
  category: string;
  services: string[];
  location: string;
  email: string;
  phone?: string;
  lookingFor: string[];
  website?: string;
}

const predefinedCategories = [
  { id: "tech", name: "Technology" },
  { id: "finance", name: "Finance" },
  { id: "retail", name: "Retail" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "consulting", name: "Consulting" },
  { id: "marketing", name: "Marketing" },
  { id: "education", name: "Education" },
  { id: "healthcare", name: "Healthcare" },
  { id: "services", name: "Services" },
]

const determineCategory = (services: string): string => {
  const servicesLower = services.toLowerCase();
  if (servicesLower.includes("it") || servicesLower.includes("software") || 
      servicesLower.includes("tech") || servicesLower.includes("app") || 
      servicesLower.includes("web")) return "tech";
  if (servicesLower.includes("marketing") || servicesLower.includes("digital")) return "marketing";
  if (servicesLower.includes("consult")) return "consulting";
  if (servicesLower.includes("finance") || servicesLower.includes("loan") || 
      servicesLower.includes("investment")) return "finance";
  if (servicesLower.includes("retail") || servicesLower.includes("handicraft") || 
      servicesLower.includes("home")) return "retail";
  if (servicesLower.includes("manufacturing")) return "manufacturing";
  if (servicesLower.includes("education") || servicesLower.includes("training")) return "education";
  if (servicesLower.includes("health") || servicesLower.includes("wellness")) return "healthcare";
  return "services";
}

export default function DirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showFilters] = useState(false)
  // const [showFilters, setShowFilters] = useState(false)
  const [members, setMembers] = useState<Member[]>([])
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('/ben-response.json')
        if (!response.ok) throw new Error(`Failed to fetch data: ${response.status}`)
        
        const responseData: ResponseData = await response.json()
        const formResponses = responseData["Form Responses 1"]
        
        const transformedMembers: Member[] = formResponses.map((item, index) => {
          const services = (item["services: "] || "")
            .split(/[,/&]+/)
            .map(s => s.trim())
            .filter(Boolean)

          const lookingFor = (item.lookingFor || "")
            .replace(/yes,\s*/i, '')
            .split(/[,/&]+/)
            .map(item => {
              const trimmed = item.trim();
              if (/partner/i.test(trimmed)) return "Partners";
              if (/client/i.test(trimmed)) return "Clients";
              if (/collaborat/i.test(trimmed)) return "Partners";
              return trimmed;
            })
            .filter(Boolean)

          const phone = item.phone?.toString()
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')

          const website = item.business?.startsWith('http') ? item.business : undefined

          return {
            id: `member-${index + 1}`,
            name: item.name || "Unnamed Business",
            business: item.business || item.name || "Unnamed Business",
            category: determineCategory(item["services: "] || ""),
            services,
            location: item.location || "Location not specified",
            email: item.businessEmail || item.email || "",
            phone,
            lookingFor,
            website
          }
        })

        setMembers(transformedMembers)
        setFilteredMembers(transformedMembers)
        setIsLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load directory data')
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSearch = () => {
    const filtered = members.filter(member => {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = 
        member.name.toLowerCase().includes(searchLower) ||
        (member.business || "").toLowerCase().includes(searchLower) ||
        member.services.some(service => service.toLowerCase().includes(searchLower))
      
      const matchesCategory = selectedCategory === "all" || member.category === selectedCategory
      return matchesSearch && matchesCategory
    })
    setFilteredMembers(filtered)
  }

  const getCategoryName = (categoryId: string) => {
    return predefinedCategories.find(c => c.id === categoryId)?.name || categoryId
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mb-4"></div>
          <p className="text-gray-600">Loading directory...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-4">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Loading Error</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-orange-600 hover:bg-orange-700">
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Business Directory</h1>
          <p className="text-xl opacity-90">Connect with verified businesses in our network</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input
              placeholder="Search businesses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSearch} className="bg-orange-600 hover:bg-orange-700">
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="category-all"
                checked={selectedCategory === "all"}
                onChange={() => setSelectedCategory("all")}
                className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-600"
              />
              <Label htmlFor="category-all" className="text-sm font-medium">
                All Categories
              </Label>
            </div>
            {predefinedCategories.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  id={category.id}
                  checked={selectedCategory === category.id}
                  onChange={() => setSelectedCategory(category.id)}
                  className="h-4 w-4 text-orange-600 border-gray-300 focus:ring-orange-600"
                />
                <Label htmlFor={category.id} className="text-sm font-medium">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>

          {/* <div className="flex items-center justify-between"> */}
            {/* <Button
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="text-gray-600"
            >
              <Filter className="mr-2 h-4 w-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
              {showFilters ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
            </Button>
            <p className="text-sm text-gray-500">
              Showing {filteredMembers.length} of {members.length} businesses
            </p>
          </div> */}

          {showFilters && (
            <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-3">Location</h3>
                <div className="space-y-2">
                  {["Pune", "Mumbai", "Delhi", "Gurgaon", "Noida"].map((location) => (
                    <div key={location} className="flex items-center">
                      <Checkbox id={`location-${location}`} />
                      <Label htmlFor={`location-${location}`} className="ml-2">
                        {location}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Looking For</h3>
                <div className="space-y-2">
                  {["Clients", "Partners", "Suppliers", "Investors"].map((type) => (
                    <div key={type} className="flex items-center">
                      <Checkbox id={`looking-${type}`} />
                      <Label htmlFor={`looking-${type}` } className="ml-2">
                        {type}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Services Offered</h3>
                <div className="space-y-2">
                  {predefinedCategories.map((category) => (
                    <div key={category.id} className="flex items-center">
                      <Checkbox id={`service-${category.id}`} />
                      <Label htmlFor={`service-${category.id}`} className="ml-2">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map(member => (
            <Card key={member.id} className="shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                < CardTitle className="text-lg font-semibold">{member.name}</CardTitle>
                <CardDescription className="text-sm text-gray-500">{member.business}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex items-center mb-2">
                    <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-medium">Category:</span>
                    <span className="ml-2 text-orange-600">
                      {getCategoryName(member.category)}
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{member.location}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Mail className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{member.email}</span>
                  </div>
                  {member.phone && (
                    <div className="flex items-center mb-2">
                      <Phone className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{member.phone}</span>
                    </div>
                  )}
                  {member.website && (
                    <div className="flex items-center mb-2">
                      <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}