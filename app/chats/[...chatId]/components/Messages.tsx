'use client'

import { ChatType, MessageType } from "@/app/types/types"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { Message } from "./Message"
import { useChat } from "@/app/hooks/useChat"
import { client_socket } from "@/app/libs/sockets"
import Methods from 'lodash'
export const Messages = function ({chat} : {chat : ChatType}) {
    const lastref = useRef<HTMLDivElement>(null)
    const {chatId} = useChat()
    const session = useSession();
    const [messages, setMessages] = useState<Array<MessageType>>(chat.messages);
    useEffect(() => {
        client_socket.subscribe(chatId);

        function newMessageCallback(message: MessageType){
            setMessages((initialMessages) => {
                if(Methods.find(initialMessages, {id: message.id})){
                    return initialMessages;
                }
                return [...initialMessages, message]
            })
        }

        client_socket.bind('new-message', newMessageCallback)


    }, [chatId])
    return (
        <div className="h-3/4 sm:h-4/5 overflow-y-scroll message-section">
            {messages.map((message) => {
                return <Message message={message} />
            })}
            <div ref={lastref}></div>
        </div>
    )
}