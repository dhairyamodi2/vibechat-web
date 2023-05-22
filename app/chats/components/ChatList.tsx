'use client'
import { getChats } from "@/app/services/server-side/getChats";
import { ChatBox } from "./Chat";
import { ChatType } from "@/app/types/types";

export const ChatList = function ({chats} : {chats: ChatType[]}) {
    
    return (
        <div>
             {chats.map((chat) => {
                return <ChatBox chat = {chat}/>
            })}
        </div>
    )
}