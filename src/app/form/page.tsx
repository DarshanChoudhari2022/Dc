"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function BENFormPage() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(1)
  const [formData, setFormData] = useState({
    // Personal Information
    name: "",
    email: "",
    phone: "",
    address: "",

    // Employment Type
    employmentType: "", // "selfEmployed" or "ownBusiness"

    // Self-Employment Information
    isSelfEmployed: "",
    areaOfExpertise: "",

    // Employment Details
    employer: "",
    areaOfWork: "",
    workExperience: "",

    // Business Overview
    businessName: "",
    businessDescription: "",
    businessSocialMedia: "",
    businessWebsite: "",
    // Services & Requirements
    servicesOffered: "",
    lookingFor: "",

    // Additional Information
    agreeToRules: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (currentSection === 1) {
      // First section logic remains the same
      if (formData.employmentType === "selfEmployed") {
        setCurrentSection(3)
      } else if (formData.employmentType === "ownBusiness") {
        setCurrentSection(2)
      } else {
        alert("Please select whether you are Self Employed/Consultant or Own a Business")
        return
      }
      window.scrollTo(0, 0)
    } else if (currentSection === 2 || currentSection === 3) {
      // From Business Details (2) or Self-Employed (3), go to Services (4)
      setCurrentSection(4)
      window.scrollTo(0, 0)
    } else if (currentSection < 4) {
      // Safety net for any other sections
      setCurrentSection(currentSection + 1)
      window.scrollTo(0, 0)
    } else {
      try {
        const response = await fetch("http://localhost:3001/submit-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        if (!response.ok) {
          throw new Error("Submission failed")
        }

        router.push("/form/success")
      } catch (error) {
        console.error("Submission error:", error)
        alert("There was an error submitting your form. Please try again.")
      }
    }
  }

  const handleBack = () => {
    if (currentSection === 4) {
      // Return to Business Details (2) or Self-Employed (3) based on selection
      if (formData.employmentType === "ownBusiness") {
        setCurrentSection(2)
      } else if (formData.employmentType === "selfEmployed") {
        setCurrentSection(3)
      }
    } else if (currentSection === 2 || currentSection === 3) {
      // Return to Basic Info from either Business Details or Self-Employed
      setCurrentSection(1)
    } else if (currentSection > 1) {
      // Regular back navigation
      setCurrentSection(currentSection - 1)
    }
    window.scrollTo(0, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Business Entrepreneurs Network</h1>
            <p className="text-gray-600 mt-2">Please fill out this form to join our community</p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentSection >= 1 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  1
                </div>
                <span className="text-sm mt-2">Basic Info</span>
              </div>

              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div className="h-full bg-orange-600" style={{ width: currentSection >= 2 ? "100%" : "0%" }}></div>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentSection >= 2 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  2
                </div>
                <span className="text-sm mt-2">Business Details </span>
              </div>

              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div className="h-full bg-orange-600" style={{ width: currentSection >= 3 ? "100%" : "0%" }}></div>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentSection >= 3 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  3
                </div>
                <span className="text-sm mt-2">Self Employed /Consultant Details </span>
              </div>

              <div className="flex-1 h-1 mx-4 bg-gray-200">
                <div className="h-full bg-orange-600" style={{ width: currentSection >= 4 ? "100%" : "0%" }}></div>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentSection >= 4 ? "bg-orange-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  4
                </div>
                <span className="text-sm mt-2">Services</span>
              </div>
            </div>
          </div>

          <Card>
            <form onSubmit={handleSubmit}>
              {currentSection === 1 && (
                <>
                  <CardHeader className="text-center">
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription className="mt-1">Tell us about yourself</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {" "}
                    {/* Ensures consistent spacing */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone"> Business Contact No*</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        required
                      />
                    </div>
                    {/* New section for employment type selection */}
                    <div className="space-y-2 mt-6 border-t pt-4">
                      <Label>Are you *</Label>
                      <RadioGroup
                        value={formData.employmentType}
                        onValueChange={(value) => handleSelectChange("employmentType", value)}
                        required
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-3 py-2">
                          <RadioGroupItem value="selfEmployed" id="self-employed" />
                          <Label htmlFor="self-employed">1) Self Employed/Consultant</Label>
                        </div>
                        <div className="flex items-center space-x-3 py-2">
                          <RadioGroupItem value="ownBusiness" id="own-business" />
                          <Label htmlFor="own-business">2) Own a Business</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </>
              )}

              {currentSection === 2 && (
                <>
                  <CardHeader className="text-center">
                    <CardTitle>Business Overview</CardTitle>
                    <CardDescription className="mt-1">
                      Tell us about your business if you are Consultant can skip this section{" "}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Company Name </Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Your company or business name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessDescription">Business Description *</Label>
                      <Textarea
                        id="businessDescription"
                        name="businessDescription"
                        value={formData.businessDescription}
                        onChange={handleChange}
                        placeholder="Briefly describe what your business does"
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessWebsite">Business Website (if any)</Label>
                      <Input
                        id="businessWebsite"
                        name="businessWebsite"
                        value={formData.businessWebsite}
                        onChange={handleChange}
                        placeholder="https://example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="businessSocialMedia">Business Social Media Handles</Label>
                      <Input
                        id="businessSocialMedia"
                        name="businessSocialMedia"
                        value={formData.businessSocialMedia}
                        onChange={handleChange}
                        placeholder="LinkedIn, Instagram, Twitter, etc."
                      />
                    </div>
                  </CardContent>
                </>
              )}

              {currentSection === 3 && (
                <>
                  <CardHeader className="text-center">
                    <CardTitle>Self Employment/Consultation </CardTitle>
                    <CardDescription className="mt-1">
                      Tell us about your Employement status / Consultant{" "}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <Label>Are you self-employed? *</Label>
                      <RadioGroup
                        value={formData.isSelfEmployed}
                        onValueChange={(value) => handleSelectChange("isSelfEmployed", value)}
                        required
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="yes" id="self-employed-yes" />
                          <Label htmlFor="self-employed-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="no" id="self-employed-no" />
                          <Label htmlFor="self-employed-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="areaOfExpertise">What is your area of expertise? *</Label>
                      <Input
                        id="areaOfExpertise"
                        name="areaOfExpertise"
                        value={formData.areaOfExpertise}
                        onChange={handleChange}
                        placeholder="E.g., Digital Marketing, Web Development, Financial Consulting"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="areaOfWork">What is your area of work? *</Label>
                      <Input
                        id="areaOfWork"
                        name="areaOfWork"
                        value={formData.areaOfWork}
                        onChange={handleChange}
                        placeholder="E.g., Technology, Finance, Healthcare"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="workExperience">Years of Experience *</Label>
                      <Select
                        value={formData.workExperience}
                        onValueChange={(value) => handleSelectChange("workExperience", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select years of experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-2">0-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="11-15">11-15 years</SelectItem>
                          <SelectItem value="15+">15+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </>
              )}
              {currentSection === 4 && (
                <>
                  <CardHeader className="text-center">
                    <CardTitle>Services & Requirements</CardTitle>
                    <CardDescription className="mt-1 mb-4">
                    Tell us what you offer and what you&apos;re looking for
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="servicesOffered" className="block mb-1">
                        What services do you provide? *
                      </Label>
                      <Textarea
                        id="servicesOffered"
                        name="servicesOffered"
                        value={formData.servicesOffered}
                        onChange={handleChange}
                        placeholder="List the services or products your business offers"
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="lookingFor" className="block mb-1">
                        What are you looking for from this community? *
                      </Label>
                      <Textarea
                        id="lookingFor"
                        name="lookingFor"
                        value={formData.lookingFor}
                        onChange={handleChange}
                        placeholder="E.g., clients, partners, suppliers, knowledge sharing"
                        rows={4}
                        required
                      />
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="agreeToRules"
                          checked={formData.agreeToRules}
                          onCheckedChange={(checked) => handleCheckboxChange("agreeToRules", checked as boolean)}
                          required
                          className="border-black text-black focus:ring-black"
                        />
                        <div>
                          <Label
                            htmlFor="agreeToRules"
                            className="text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the community rules and guidelines - to join the WhatsApp group
                          </Label>
                          <div className="text-sm text-gray-500 mt-1">
                            By submitting this form, you agree to our community guidelines:
                            <ul className="list-disc pl-5 space-y-1">
                              <li>For business/entrepreneurial exchange only</li>
                              <li>No greetings/chit-chatting/discussions/gyan</li>
                              <li>No other group invites allowed</li>
                              <li>Limit promotional posts to once in a fortnight</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </>
              )}

              <CardFooter className="flex justify-between border-t pt-6">
                {currentSection > 1 ? (
                  <Button type="button" variant="outline" onClick={handleBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                ) : (
                  <div></div>
                )}

                <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                  {currentSection < 4 ? (
                    <>
                      Next <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          {/* <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Already a member?{" "}
              <Link href="/login" className="text-orange-600 hover:underline">
                Login here
              </Link>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  )
}