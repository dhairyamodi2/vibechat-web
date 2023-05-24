'use client'

import { ChatType, MessageType } from "@/app/types/types"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import { Message } from "./Message"
import { useChat } from "@/app/hooks/useChat"
import { client_socket } from "@/app/libs/sockets"
import Methods, { update } from 'lodash'
import { useRouter } from "next/navigation"
import { http } from "@/app/libs/http"
export const Messages = function ({chat} : {chat : ChatType}) {
    const lastref = useRef<HTMLDivElement>(null)
    const {chatId} = useChat()
    const session = useSession();
    const router = useRouter()
    const entirediv = useRef<HTMLDivElement>(null)
    const [messages, setMessages] = useState<Array<MessageType>>(chat.messages);
    useEffect(() => {

        http.put(`/api/chat/${chatId}/seen`);
        // alert(entirediv.current?.scrollHeight);
        lastref.current?.scrollIntoView()
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
            entirediv.current?.scrollTo({top: 21000})
            lastref.current?.scrollIntoView()
           
            // router.refresh()
        }

        function updatedMessageCallback(message: MessageType) {
            setMessages((initialMessages) => {
                return initialMessages.map((initialMessages) => {
                    if(initialMessages.id === message.id) {
                        return message;
                    }
                    return initialMessages
                })
            })
        }
        client_socket.bind('new-message', newMessageCallback)
        client_socket.bind('message-updated', updatedMessageCallback);
        return () => {
            // client_socket.unsubscribe(chatId);
            // client_socket.unbind('new-message', newMessageCallback);
        }

    }, [chatId, router])
    return (
        <div className="flex flex-col overflow-y-auto message-section flex-1 custom-anchor" ref={entirediv}>
            {messages.map((message) => {
                return <Message message={message} lastMessage={messages.length > 0 && messages[messages.length - 1].id === message.id ? true : false} chat={chat}/>
            })}
            <div ref={lastref} className="flex-1 p-16"></div>
        </div>
    )
}