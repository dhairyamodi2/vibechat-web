'use client'

import { ChatType, MessageType } from "@/app/types/types"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { Message } from "./Message"
import { useChat } from "@/app/hooks/useChat"
import { client_socket } from "@/app/libs/sockets"
import Methods from 'lodash'
import { useRouter } from "next/navigation"
export const Messages = function ({chat} : {chat : ChatType}) {
    const lastref = useRef<HTMLDivElement>(null)
    const {chatId} = useChat()
    const session = useSession();
    const router = useRouter()
    const entirediv = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<Array<MessageType>>(chat.messages);
    useEffect(() => {
        // alert(entirediv.current?.scrollHeight);
        if(lastref.current && entirediv.current) {
            entirediv.current.scrollTo({left:0, top: 2100})
        }
        client_socket.subscribe(chatId);

        function newMessageCallback(message: MessageType){
            setMessages((initialMessages) => {
                if(Methods.find(initialMessages, {id: message.id})){
                    return initialMessages;
                }
                return [...initialMessages, message]
            });
            if(lastref.current) {
                lastref.current!.scrollTop = lastref.current?.scrollHeight
            }
            entirediv.current?.scrollTo({left:0, top: 21000})
           
            // router.refresh()
        }

        client_socket.bind('new-message', newMessageCallback)


    }, [chatId])
    return (
        <div className="flex flex-col overflow-y-auto message-section flex-1 custom-anchor" ref={entirediv}>
            {messages.map((message) => {
                return <Message message={message} />
            })}
            <div ref={lastref} className="flex-1 p-16"></div>
        </div>
    )
}