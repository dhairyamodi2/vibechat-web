'use client'
import Image from "next/image"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { BsChatDots } from "react-icons/bs"
import { RiContactsLine } from "react-icons/ri"

export const Navbar = function () {
    const pathname = usePathname();
    const params = useParams() as {chatId : string};

    return (

        // <div className="fixed flex w-full lg:w-80 md:w-64 px-4 items-center justify-between py-4">
        //     <Image alt="profile" src={'/vibechat.png'} width={35} height={35} className="rounded-3xl"></Image>
        //     <div className="p-3 w-full text-2xl md:text-lg  text-center md:text-left "><span>Users</span></div>


        //     <div className="flex">
        //     <BsChatDots className="text-4xl p-2 mx-2 md:text-4xl md:p-2 md:mx-1 bg-gray-200 rounded-lg hover:bg-purple-600 hover:text-white"></BsChatDots>
        //     <RiContactsLine className="text-4xl p-2 mx-2 md:text-4xl md:p-2 md:mx-1 bg-gray-200 rounded-lg hover:bg-purple-600 hover:text-white"></RiContactsLine>
        //     </div>
        // </div>

        <div className={`${params && params.chatId ? 'hidden sm:flex' : ''} flex justify-between items-center p-6 bg-gray-200 m-0`}>
            <Image alt="profile" src={'/vibechat.png'} width={35} height={35} className="rounded-3xl"></Image>
            <div className="p-1 mx-1 w-full text-2xl md:text-lg text-center md:text-left"><span className="mx-1">Users</span></div>


            <div className="flex">
                <Link href={'/chats'}>
                    <BsChatDots className={`text-4xl p-2 mx-2 md:text-4xl md:p-2 md:mx-1 ${pathname === '/chats' ? 'bg-purple-600 text-white' : 'bg-gray-200'} rounded-lg hover:bg-purple-600 hover:text-white`}></BsChatDots>
                </Link>
                <Link href={'/user'}>
                    <RiContactsLine className={`text-4xl p-2 mx-2 md:text-4xl md:p-2 md:mx-1 ${pathname === '/user' ? 'bg-purple-600 text-white' : 'bg-gray-200'} rounded-lg hover:bg-purple-600 hover:text-white`}></RiContactsLine>
                </Link>

            </div>
        </div>
    )
}