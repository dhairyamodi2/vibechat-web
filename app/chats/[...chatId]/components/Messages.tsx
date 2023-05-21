'use client'

import { ChatType, MessageType } from "@/app/types/types"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { Message } from "./Message"

export const Messages = function ({chat} : {chat : ChatType}) {
    const session = useSession();
    const [messages, setMessages] = useState<Array<MessageType>>([
        {body: 'Typescript is cool', chatId: 'current', createdAt: (new Date()), id: '123', image: '', seen: chat.users, seenIds: chat.userIds, sender: chat.users[0], senderId: session.data?.user?.email!},
        {body: 'o', chatId: 'current', createdAt: (new Date()), id: '123', image: '', seen: chat.users, seenIds: chat.userIds, sender: chat.users[0], senderId: 'Some other id'},
        {body: 'lorem sdfnkjsdnfksdkfsdkfjsdldsllslfsdlfsdlflsdflsdjlfdslf sdnfjsdljnfks sdhflksjfls sdfljsfjlfsdfklsjlfs djklfdjlflsf dlfkjslf', chatId: 'current', createdAt: (new Date()), id: '123', image: '', seen: chat.users, seenIds: chat.userIds, sender: chat.users[0], senderId: 'Some other id'},
        {body: 'How come you do all these things with so easy? I just realized it is very time consuming', chatId: 'current', createdAt: (new Date()), id: '123', image: '', seen: chat.users, seenIds: chat.userIds, sender: chat.users[0], senderId: session.data?.user?.email!},
        {body: 'Like everything, it just gets better and better with time. Only prerequisite is self-awareness', chatId: 'current', createdAt: (new Date()), id: '123', image: '', seen: chat.users, seenIds: chat.userIds, sender: chat.users[0], senderId: 'Some other id'},
        {body: 'Self Awareness! That is what I need to work on', chatId: 'current', createdAt: (new Date()), id: '123', image: '', seen: chat.users, seenIds: chat.userIds, sender: chat.users[0], senderId: session.data?.user?.email!}


    ])
    return (
        <div className="h-4/5 overflow-y-scroll">
            {messages.map((message) => {
                return <Message message={message} />
            })}
        </div>
    )
}