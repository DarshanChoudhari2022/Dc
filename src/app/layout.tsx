import type React from "react"
import { ThemeProvider } from "../components/theme-provider"
// import { ThemeProvider } from "@/components/theme-provider"; // Using alias from tsconfig
import Image from 'next/image';

import "./globals.css"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
          <header className="border-b bg-white">
  <div className="container mx-auto px-4">
    <div className="flex h-16 items-center justify-between relative">
      {/* Logo with BEN text */}
      <Link href="/" className="flex items-center space-x-2 z-10">
        {/* Add your logo image in public folder */}
        <Image src="/ben-logo1.png" alt="Logo" width={50} height={50} />
        <span className="text-xl font-bold text-orange-600">Bharat Entrepreneurs Network</span>
      </Link>

      {/* Centered title - hidden on mobile, visible on md+ */}
      {/* <h1 className="hidden md:block absolute left-1/2 transform -translate-x-1/2 text-xl font-semibold">
        Bharat Entrepreneurs Network
      </h1> */}

      {/* Navigation links */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/directory" className="text-gray-600 hover:text-orange-600">
          Directory
        </Link>
        <Link href="/events" className="text-gray-600 hover:text-orange-600">
          Events
        </Link>
        <Link href="/about" className="text-gray-600 hover:text-orange-600">
          About
        </Link>
        <Button asChild size="sm" className="bg-orange-600 hover:bg-orange-700">
          <Link href="/form">Join Network</Link>
        </Button>
      </nav>

      {/* Mobile menu */}
      <div className="md:hidden flex items-center">
        <Button variant="ghost" size="icon" className="text-gray-600">
          <Menu className="h-6 w-6" />
        </Button>
      </div>
    </div>
  </div>
</header>

            <main className="flex-1">{children}</main>

            <footer className="bg-gray-900 text-white py-8">
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
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

