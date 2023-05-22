'use client'
import { getChats } from "@/app/services/server-side/getChats";
import { ChatBox } from "./Chat";
import { ChatType } from "@/app/types/types";
import { useChat } from "@/app/hooks/useChat";

export const ChatList = function ({chats} : {chats: ChatType[]}) {
    const {chatId} = useChat();
    return (
        <div className={`flex flex-col overflow-y-scroll message-section ${chatId.length != 0 ? 'm-0 sm:m-3' : 'sm:m-3'}`}>
             {chats.map((chat) => {
                return <ChatBox chat = {chat}/>
            })}
            
             
            
        </div>
    )
}