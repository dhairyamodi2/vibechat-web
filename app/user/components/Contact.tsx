'use client'
import { Avatar } from "@/app/components/chat/Avatar"
import { StartChat } from "@/app/services/chats"
// import { StartChat } from "@/app/services/chats"
import { User } from "@prisma/client"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import {RxOpenInNewWindow} from 'react-icons/rx'

interface ContactProps {
    user : User
}
export const Contact : React.FC<ContactProps> = function({user}) {
    const router = useRouter()
    const handleClick = useCallback(async () => {
        const data = await StartChat(user, false, [], user.id, null)
        if(data && data.success === true) {
            router.push(`/chats/${user.id}`)
        }
    }, [user, router])
    return (
        <div className="p-2 flex items-center  bg-gray-100 my-3 rounded-xl hover:bg-purple-500 hover:text-white flex-1 cursor-pointer" onClick={handleClick}>
            <Avatar src={user.image ? user.image : '/avatar.png'}></Avatar>
            <div className="flex-1 m-3">
            <span>{user.name}</span>
            </div>
            <div>
                <RxOpenInNewWindow></RxOpenInNewWindow>
            </div>
        </div>
    )
}