'use client'
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { BsChatDots } from "react-icons/bs"
import { RiContactsLine } from "react-icons/ri"
import { Dialog } from '@headlessui/react'
import { Modal } from "../dialog/dialog"
import { useSession } from "next-auth/react"
import { Avatar } from "../chat/Avatar"
import { User } from "@prisma/client"


export const Navbar = function ({user} : {user : User | null}) {
    const pathname = usePathname();
    const session = useSession()
    const params = useParams() as {chatId : string};
    const [open, setOpen] = useState(false);
    function closeModal() {
        setOpen(false);
    }
    function openModal() {
        setOpen(true);
    }
    return (

        // <div className="fixed flex w-full lg:w-80 md:w-64 px-4 items-center justify-between py-4">
        //     <Image alt="profile" src={'/vibechat.png'} width={35} height={35} className="rounded-3xl"></Image>
        //     <div className="p-3 w-full text-2xl md:text-lg  text-center md:text-left "><span>Users</span></div>


        //     <div className="flex">
        //     <BsChatDots className="text-4xl p-2 mx-2 md:text-4xl md:p-2 md:mx-1 bg-gray-200 rounded-lg hover:bg-purple-600 hover:text-white"></BsChatDots>
        //     <RiContactsLine className="text-4xl p-2 mx-2 md:text-4xl md:p-2 md:mx-1 bg-gray-200 rounded-lg hover:bg-purple-600 hover:text-white"></RiContactsLine>
        //     </div>
        // </div>

        <div className={`${params && params.chatId ? 'hidden sm:flex' : ''} flex justify-between items-center p-6 bg-gray-200 m-0 sticky t-0`}>
            <Avatar onClick={openModal} src={user && user.image ? user.image: '/avatar.png'}></Avatar>
            <div>
                <Modal isOpen={open} closeModal={closeModal} user={user}/>
            </div>
            <div className="p-1 mx-1 w-full text-2xl md:text-lg text-center md:text-left"><span className="mx-1">{pathname.startsWith('/chats') ? 'Chats' : 'Users'}</span></div>


            <div className="flex">
                <Link href={'/chats'}>
                    <BsChatDots className={`text-4xl p-2 mx-2 md:text-4xl md:p-2 md:mx-1 ${pathname.startsWith('/chats') ? 'bg-purple-600 text-white' : 'bg-gray-200'} rounded-lg hover:bg-purple-600 hover:text-white`}></BsChatDots>
                </Link>
                <Link href={'/user'}>
                    <RiContactsLine className={`text-4xl p-2 mx-2 md:text-4xl md:p-2 md:mx-1 ${pathname.startsWith('/user') ? 'bg-purple-600 text-white' : 'bg-gray-200'} rounded-lg hover:bg-purple-600 hover:text-white`}></RiContactsLine>
                </Link>

            </div>
        </div>
    )
}