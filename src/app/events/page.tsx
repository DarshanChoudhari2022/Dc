import { Calendar, MapPin, Clock, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-orange-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Events & Meetups</h1>
          <p className="text-xl opacity-90">Connect with fellow entrepreneurs at our in-person and virtual events</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="upcoming" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="sen-milan">Sneh Milan</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} isPast />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sen-milan" className="mt-6">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3">
                <Image
    src="/placeholder.svg"
    alt="Sen Milan Event"
    width={400}
    height={300}
    className="rounded-lg w-full h-auto"
  />
                </div>
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-2">Sneh Milan Quarterly Meetups</h2>
                  <p className="text-gray-600 mb-4">
                    Sneh Milan is our flagship quarterly in-person networking event where members of our Bharat
                    Entrepreneurs Network come together to connect, collaborate, and grow their businesses.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                      <span>Held quarterly (March, June, September, December)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-orange-600 mr-2" />
                      <span>Premium venues across major cities</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-orange-600 mr-2" />
                      <span>Limited to 100 members per event</span>
                    </div>
                  </div>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    Learn More About Sneh Milan <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Upcoming Sneh Milan Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents
                .filter((event) => event.type === "Sen Milan")
                .map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-white rounded-lg shadow-md p-6 mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Host Your Own Event</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-3">For BEN Members</h3>
              <p className="text-gray-600 mb-4">
                As a member of our Bharat Entrepreneurs Network, you can propose and host your own networking events,
                workshops, or seminars for fellow members.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Share your expertise through workshops</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Host industry-specific networking sessions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Organize panel discussions on business topics</span>
                </li>
              </ul>
              <Button variant="outline">Submit Event Proposal</Button>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">For Non-Members</h3>
              <p className="text-gray-600 mb-4">
                Interested in collaborating with our network? We welcome partnership opportunities for events that bring
                value to our entrepreneurial community.
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Sponsor an existing BEN event</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Propose a co-branded event</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  <span>Offer exclusive workshops for our members</span>
                </li>
              </ul>
              <Button variant="outline">Contact for Partnerships</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  type: string
  capacity: number
  description: string
  image?: string
}

interface EventCardProps {
  event: Event
  isPast?: boolean
}

function EventCard({ event, isPast = false }: EventCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
      <Image
  src={event.image || "/placeholder.svg"}
  alt={event.title}
  width={400}
  height={200}
  className="w-full h-48 object-cover"
/>

        <Badge
          className={`absolute top-3 right-3 ${
            event.type === "Sen Milan" ? "bg-orange-600" : event.type === "Workshop" ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          {event.type}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm">{event.date}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm">{event.time}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm">{event.location}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-4 w-4 text-gray-500 mr-2" />
          <span className="text-sm">Capacity: {event.capacity} attendees</span>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50">
        {isPast ? (
          <Button variant="outline" className="w-full">
            View Event Photos
          </Button>
        ) : (
          <Button className="w-full bg-orange-600 hover:bg-orange-700">Register Now</Button>
        )}
      </CardFooter>
    </Card>
  )
}

// Mock data for upcoming events
const upcomingEvents: Event[] = [
  {
    id: "1",
    title: "Sen Milan - Q2 2025",
    date: "June 15, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "Hotel Taj Palace, New Delhi",
    type: "Sen Milan",
    capacity: 100,
    description: "Quarterly networking meetup for all BEN members",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "2",
    title: "Digital Marketing Masterclass",
    date: "May 10, 2025",
    time: "2:00 PM - 5:00 PM",
    location: "Virtual (Zoom)",
    type: "Workshop",
    capacity: 50,
    description: "Learn advanced digital marketing strategies for your business",
  },
  {
    id: "3",
    title: "Industry Networking Breakfast",
    date: "April 25, 2025",
    time: "8:30 AM - 10:30 AM",
    location: "The Leela Palace, Bangalore",
    type: "Networking",
    capacity: 30,
    description: "Connect with entrepreneurs in your industry over breakfast",
  },
  {
    id: "4",
    title: "Funding & Investment Panel",
    date: "May 20, 2025",
    time: "4:00 PM - 6:00 PM",
    location: "WeWork, Mumbai",
    type: "Panel Discussion",
    capacity: 40,
    description: "Learn from investors about funding opportunities for startups",
  },
  {
    id: "5",
    title: "Sen Milan - Q3 2025",
    date: "September 21, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "ITC Gardenia, Bangalore",
    type: "Sen Milan",
    capacity: 100,
    description: "Quarterly networking meetup for all BEN members",
  },
  {
    id: "6",
    title: "Business Growth Strategies",
    date: "July 15, 2025",
    time: "3:00 PM - 5:00 PM",
    location: "Virtual (Zoom)",
    type: "Workshop",
    capacity: 50,
    description: "Practical strategies to scale your business in 2025",
  },
]

// Mock data for past events
const pastEvents: Event[] = [
  {
    id: "p1",
    title: "Sen Milan - Q1 2025",
    date: "March 18, 2025",
    time: "6:00 PM - 9:00 PM",
    location: "The Oberoi, Mumbai",
    type: "Sen Milan",
    capacity: 100,
    description: "Quarterly networking meetup for all BEN members",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    id: "p2",
    title: "Tax Planning for Entrepreneurs",
    date: "February 12, 2025",
    time: "2:00 PM - 4:00 PM",
    location: "Virtual (Zoom)",
    type: "Workshop",
    capacity: 45,
    description: "Essential tax planning strategies for business owners",
  },
  {
    id: "p3",
    title: "Tech Startup Showcase",
    date: "January 25, 2025",
    time: "5:00 PM - 8:00 PM",
    location: "91springboard, Delhi NCR",
    type: "Networking",
    capacity: 60,
    description: "Showcase event for tech startups to present their innovations",
  },
]

