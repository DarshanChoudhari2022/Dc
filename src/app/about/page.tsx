import Link from "next/link"
import { Users, MessageSquare, Building, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Our Network</h1>
          <p className="text-xl opacity-90">Building a community of entrepreneurs and business owners</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Mission Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-700 mb-8">
            To create a thriving ecosystem where entrepreneurs can connect, collaborate, and grow their businesses
            through meaningful relationships and knowledge sharing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2" />
              <span className="font-medium">Business Growth</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2" />
              <span className="font-medium">Meaningful Connections</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2" />
              <span className="font-medium">Knowledge Sharing</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-orange-600 mr-2" />
              <span className="font-medium">Collaborative Opportunities</span>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              The Bharat Entrepreneurs Network (BEN) began as a small WhatsApp group in 2020, founded by a group of
              like-minded entrepreneurs who wanted to create a space for meaningful business connections beyond
              traditional networking events.
            </p>
            <p className="text-gray-700 mb-4">
              What started as a group of 20 entrepreneurs has now grown into a thriving community of over 500 verified
              business owners across India, spanning multiple industries and sectors.
            </p>
            <p className="text-gray-700">
              Our community is built on the principles of trust, value exchange, and genuine relationship building. We
              believe that the best business relationships are formed when people come together with the intention to
              give, not just take.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
          <Image
    src="/placeholder.svg"
    alt="BEN Community"
    width={500}
    height={300}
    className="w-full h-auto rounded-lg mb-4"
  />
            <p className="text-sm text-gray-500 italic text-center">Members at our first Sneh Milan meetup in 2021</p>
          </div>
        </div>

        {/* Community Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Our Community Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100 text-orange-600">
                <Building className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Business-Focused</h3>
              <p className="text-gray-600">
                Our community is dedicated to business and entrepreneurial exchange. We maintain a professional
                environment focused on growth and opportunity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100 text-orange-600">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Members</h3>
              <p className="text-gray-600">
                Every member of our community is a verified business owner or entrepreneur, ensuring quality connections
                and meaningful interactions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-orange-100 text-orange-600">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Value Exchange</h3>
              <p className="text-gray-600">
                We believe in the power of giving before taking. Our community thrives on members who share knowledge,
                resources, and opportunities.
              </p>
            </div>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-16">
          <h2 className="text-2xl font-bold mb-6">Community Guidelines</h2>
          <div className="space-y-4">
            <div className="pb-4 border-b">
              <h3 className="font-medium text-lg mb-2">For business/entrepreneurial exchange only</h3>
              <p className="text-gray-600">
                Our platform is dedicated to business discussions and opportunities. We maintain a professional
                environment focused on entrepreneurial growth.
              </p>
            </div>

            <div className="pb-4 border-b">
              <h3 className="font-medium text-lg mb-2">No greetings/chit-chatting/discussions/gyan</h3>
              <p className="text-gray-600">
                To maintain the quality of interactions, we focus on business-related communications rather than casual
                conversations.
              </p>
            </div>

            <div className="pb-4 border-b">
              <h3 className="font-medium text-lg mb-2">No other group invites allowed</h3>
              <p className="text-gray-600">
                To maintain the integrity of our community, we do not allow promotion of other groups or communities.
              </p>
            </div>

            <div>
              <h3 className="font-medium text-lg mb-2">Limited promotional posts</h3>
              <p className="text-gray-600">
                Members are welcome to share their services, but we limit promotional posts to once in a fortnight to
                ensure balanced interactions.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image
  src={member.image || "/placeholder.svg"}
  alt={member.name}
  width={300}
  height={300}
  className="w-full h-48 object-cover"
/>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-gray-600 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="bg-orange-50 border border-orange-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Our Community</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Ready to connect with verified business owners and entrepreneurs? Join our network today and start growing
            your business through meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Link href="/register">
                Apply for Membership <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/directory">Browse Member Directory</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: "Vikram Mehta",
    role: "Founder & Community Lead",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Anjali Sharma",
    role: "Events Coordinator",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Rahul Kapoor",
    role: "Membership Manager",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 4,
    name: "Priya Singh",
    role: "Content & Communications",
    image: "/placeholder.svg?height=200&width=200",
  },
]

