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
        lastref.current?.scrollIntoView()
        client_socket.subscribe(chatId);

        function newMessageCallback(message: MessageType){
            setMessages((initialMessages) => {
                if(Methods.find(initialMessages, {id: message.id})){
                    return initialMessages;
                }
                return [...initialMessages, message]
            });
            
            lastref.current?.scrollIntoView()
        }

        client_socket.bind('new-message', newMessageCallback)


    }, [chatId])
    return (
        <div className="flex flex-col overflow-y-scroll message-section flex-1 custom-anchor">
            {messages.map((message) => {
                return <Message message={message} />
            })}
            <div ref={lastref} className="flex-1 m-2"></div>
        </div>
    )
}