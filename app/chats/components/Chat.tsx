'use client'
import { Avatar } from "@/app/components/chat/Avatar"
import { useRecipent } from "@/app/hooks/useRecipent"
import { client_socket } from "@/app/libs/sockets"
import { ChatType } from "@/app/types/types"
import { Chat, User} from "@prisma/client"
import { useSession } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import { Message } from "postcss"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

interface ChatProps {
    chat : ChatType
    lastMessage: boolean
}
export const ChatBox : React.FC<ChatProps> = function( {chat, lastMessage}) {

    const recipent = useRecipent(chat);
    const router = useRouter();
    const lasref = useRef<HTMLDivElement>(null)
    const params = useParams() as {chatId : string};
    useEffect(() => {
        if(lastMessage === true && lasref.current?.scrollTop) {
            lasref.current!.scrollTop = lasref.current?.scrollHeight
        }
    }, [lastMessage])
    const handleClick = useCallback(() => {
    router.push(`/chats/${chat.id}`)
    }, [router, chat])
    return (
        <div className={`${params && params.chatId ? 'hidden p-0 my-0 sm:flex' : ''} p-3 flex items-center my-3 rounded-xl ${params.chatId === chat.id ? 'bg-gray-200' : ''} hover:bg-gray-200 flex-1 cursor-pointer shadow-lg drop-shadow-md`} ref={lasref} onClick={handleClick}>
            <Avatar src={`${recipent?.image ? recipent.image : '/avatar.png'}`}></Avatar>
            <div className="flex-1 mx-3 my-1">
                <div className="flex flex-col">
                    <span className="text-lg font-bold">{recipent?.name}</span>
                    <span className="text-sm mt-0.5">{chat.messages.length === 0 ? 'Start a conversation' : chat.messages[chat.messages.length - 1].body}</span>
                </div>    
            </div>
            <div >
                <span className="text-sm">11:10</span>
            </div>
        </div>
    )
}