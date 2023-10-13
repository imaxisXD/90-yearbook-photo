import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { Toaster } from 'sonner'
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Github } from '@/components/icons'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const lazer = localFont({
  src: "../styles/Lazer84.ttf",
  variable: "--font-lazer",
});

export const metadata: Metadata = {
  title: '90`s yearbook',
  description: 'Turn your selfies into a 90`s yearbook photo in seconds',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(lazer.variable, inter.variable, "bg-gradient-to-br from-[#0f042e] h-full")}>
        <Toaster />
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center justify-center p-2 gap-1">
            <Image src='/logo-removebg-preview.png' alt='90`s Yearbook' width={55} height={55} />
            <p className='px-1 font-lazer tracking-[0.1rem] text-2xl drop-shadow-[2px_3px_var(--tw-shadow-color)] shadow-blue-700 text-white'>
              Year book
            </p>
          </Link>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/imaxisXD/90-yearbook-photo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
            </a>
          </div>
        </div>

        <main className="flex min-h-screen w-full flex-col items-center justify-center py-32">
          {children}
        </main>


        <div className="absolute w-full py-5 text-center">
          <p className="text-gray-500">
            A project by{" "}
            <a
              className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
              href="https://twitter.com/abhishek_084"
              target="_blank"
              rel="noopener noreferrer"
            >
              Abhishek
            </a>
          </p>
          <a
            href="https://www.buymeacoffee.com/steventey"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-auto mt-2 flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-6 py-2 transition-all duration-75 hover:scale-105"
          >
            <p className="font-medium text-gray-600">Buy me a coffee</p>
          </a>
        </div>
      </body>
    </html>
  )
}
