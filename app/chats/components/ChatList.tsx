'use client'
import { getChats } from "@/app/services/server-side/getChats";
import { ChatBox } from "./Chat";
import { ChatType } from "@/app/types/types";
import { useChat } from "@/app/hooks/useChat";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { client_socket } from "@/app/libs/sockets";
import { toast } from "react-hot-toast";

export const ChatList = function ({chats} : {chats: ChatType[]}) {
    const {chatId} = useChat();
    const router = useRouter();
    const [initialChats, setInitialChat] = useState(chats)
    const session = useSession();
    const channel = useMemo(() => {
        return session.data?.user?.email
    }, [session.data?.user?.email])

    useEffect(() => {
        if(!channel) return;
        client_socket.subscribe(channel);
        function updateCallback(chat : ChatType) {
            setInitialChat((chats) => {
                return chats.map((prev_chat) => {
                    if(prev_chat.id == chat.id) {
                        return {
                            ...prev_chat,
                            messages: chat.messages
                        }
                    }
                    return prev_chat
                })
            })
        }

        function deletedCallback(deletedChat : ChatType) {
            // toast.success('Deleted Chat');
            router.replace('/chats');
            setInitialChat((chats) => {
                return [...chats.filter((chat) => chat.id !== deletedChat.id)]
            })
        }
        client_socket.bind('chat-updated', updateCallback);
        client_socket.bind('chat-deleted', deletedCallback);

    }, [channel, router])
    return (
        <div className={`flex flex-col overflow-y-scroll message-section ${chatId.length != 0 ? 'm-0 sm:m-3' : 'sm:m-3'}`}>
             {initialChats.map((chat) => {
                return <ChatBox chat = {chat} lastMessage={chat.id === chats[initialChats.length - 1].id}/>
            })}
            
             
            
        </div>
    )
}