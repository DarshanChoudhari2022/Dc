import Link from "next/link"
import { ArrowRight, Users, Building, Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
{/* Hero Section */}


<header className="relative h-[600px] overflow-hidden text-white">
  {/* Video Background */}
  <video 
  autoPlay
  muted
  loop
  playsInline
  className="absolute inset-0 w-full h-full object-cover opacity-30"
>
  <source src="/ben-bgvideo1.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
  
  {/* Gradient Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 mix-blend-multiply" />
  
  {/* Content */}
  <div className="container mx-auto px-4 py-16 md:py-24 relative z-10 h-full flex items-center">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Bharat Entrepreneurs Network (BEN)</h1>
      <p className="text-xl md:text-2xl mb-8">
        Connect with verified business owners and entrepreneurs to grow your network and business opportunities
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" variant="outline" className="bg-white text-orange-600 hover:bg-orange-50">
          <Link href="/directory">
            Browse Directory <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="bg-white text-orange-600 hover:bg-orange-50">
          <Link href="/form">Join Network <ArrowRight className="ml-2 h-5 w-5" /></Link>
        </Button>
      </div>
    </div>
  </div>
</header>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <Input placeholder="Search for services, businesses, or members..." className="flex-1" />
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Our Platform Helps You</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100 text-orange-600">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Connect with Members</h3>
              <p className="text-gray-600">
                Browse our directory of verified business owners and entrepreneurs categorized by industry and services.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100 text-orange-600">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">B2B Opportunities</h3>
              <p className="text-gray-600">
                Find business partners, suppliers, or clients within our trusted network of verified entrepreneurs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100 text-orange-600">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">In-Person Meetups</h3>
              <p className="text-gray-600">
              Join our quarterly &quot;Sneh Milan&quot; meetups to network face-to-face with other business owners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Browse by Category</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/directory?category=${category.id}`}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <h3 className="font-medium text-lg">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.count} members</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link href="/directory">View All Categories</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Upcoming Sneh Milan Meetups</h2>

          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
              <Image
    src="/placeholder.svg"
    alt="Upcoming meetup"
    width={300}
    height={300}
    className="h-48 w-full object-cover md:w-48"
  />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-orange-600 font-semibold">Quarterly Meetup</div>
                <h3 className="mt-1 text-xl font-semibold">Sneh Milan - Q2 2025 Business Networking</h3>
                <p className="mt-2 text-gray-600">June 15, 2025 • 6:00 PM - 9:00 PM</p>
                <p className="mt-2 text-gray-600">Hotel Taj Palace, New Delhi</p>
                <div className="mt-4">
                  <Button className="bg-orange-600 hover:bg-orange-700">Register for Event</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bharat Entrepreneurs Network</h3>
              <p className="text-gray-400">A community dedicated to business and entrepreneurial exchange.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/directory" className="text-gray-400 hover:text-white">
                    Member Directory
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-gray-400 hover:text-white">
                    Upcoming Events
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="text-gray-400 hover:text-white">
                    Join Network
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">For any inquiries, please contact the group administrators.</p>
              <p className="text-gray-400 mt-2">
                WhatsApp Community Link: <br />
                <a
                  href="https://chat.whatsapp.com/0i3nhit7Qy27UP7UIRHOV5"
                  className="text-orange-400 hover:text-orange-300"
                >
                  Join our WhatsApp Group
                </a>
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Bharat Entrepreneurs Network. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  )
}

// Mock data for categories
const categories = [
  { id: "tech", name: "Technology", count: 42 },
  { id: "finance", name: "Finance", count: 38 },
  { id: "retail", name: "Retail", count: 27 },
  { id: "manufacturing", name: "Manufacturing", count: 31 },
  { id: "consulting", name: "Consulting", count: 45 },
  { id: "marketing", name: "Marketing", count: 36 },
  { id: "education", name: "Education", count: 24 },
  { id: "healthcare", name: "Healthcare", count: 29 },
]

