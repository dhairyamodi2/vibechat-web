'use client'
import Image from "next/image";
import { AuthForm } from "./components/auth/AuthForm";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/app/components/Loader/Loader";

export default function Home() {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(session.status === 'loading')
  useEffect(() => {
    // nextRouter().events.on('hashChangeComplete', () => {
    //   setLoading(false)
    // })

    // if (session?.status === 'authenticated') {
    //   router.replace('/chats')
    // }
  }, [session?.status])
  return (
    <>
      {typeof(1) !== 'number' ? <Loader /> : <div
        className="
        font-ubu
        flex
        min-h-full
        flex-col
        justify-center
        py-12
        sm: px-6
        lg: px-12
        bg-gray-100"
      >

        
        <AuthForm />
      </div>}

    </>
  );
}
