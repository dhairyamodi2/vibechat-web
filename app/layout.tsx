import './globals.css'
import { Inter } from 'next/font/google'
import {Toaster} from "react-hot-toast";
import {AuthProvider} from "@/app/context/auth";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vibechat',
  description: 'Developed By Dhairya Modi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={'font-ubu'}>
      <AuthProvider>
          <Toaster />
          {children}
      </AuthProvider>

      </body>
    </html>
  )
}
