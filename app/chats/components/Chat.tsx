'use client'
import { Avatar } from "@/app/components/chat/Avatar"
import { useRecipent } from "@/app/hooks/useRecipent"
import { ChatType } from "@/app/types/types"
import { Chat, User} from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import { Message } from "postcss"
import { useCallback } from "react"

interface ChatProps {
    chat : ChatType
}
export const ChatBox : React.FC<ChatProps> = function( {chat}) {
    const recipent = useRecipent(chat);
    const router = useRouter();
    const params = useParams() as {chatId : string};
    const handleClick = useCallback(() => {
    router.push(`/chats/${chat.id}`)
    }, [router, chat])
    return (
        <div className={`p-2 flex items-center my-3 rounded-xl ${params.chatId === chat.id ? 'bg-gray-200' : ''} hover:bg-gray-200 flex-1 cursor-pointer`} onClick={handleClick}>
            <Avatar src={`${recipent?.image ? recipent.image : '/avatar.png'}`}></Avatar>
            <div className="flex-1 mx-3 my-1">
                <div className="flex flex-col">
                    <span className="text-lg font-bold">{recipent?.name}</span>
                    <span className="text-sm mt-0.5">Message</span>
                </div>    
            </div>
            <div >
                <span className="text-sm">11:10</span>
            </div>
        </div>
    )
}