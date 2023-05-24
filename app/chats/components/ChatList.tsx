'use client'
import { ChatBox } from "./Chat";
import { ChatType } from "@/app/types/types";
import { useChat } from "@/app/hooks/useChat";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { client_socket } from "@/app/libs/sockets";
import { toast } from "react-hot-toast";
import Method from 'lodash';
import { getChats } from "@/app/services/chats";
import { Loader } from "@/app/components/Loader/Loader";
export const ChatList = function ({chats} : {chats?: ChatType[]}) {

   
    const {chatId} = useChat();

    const router = useRouter();
    const [initialChats, setInitialChat] = useState<Array<ChatType>>([])
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        async function x() {
            setLoader(true);
            const res = await getChats();
            setInitialChat((prevState) => {
                if(res != undefined && res.length !== 0) return res;
                return prevState;
            })
            setLoader(false);
            // toast.success('loaded');
        }
        x();
    }, [chatId])
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

        function createdCallback(newChat : ChatType) {
            setInitialChat((exisitingchats) => {
                if(Method.find(exisitingchats, {id: newChat.id})){
                    return exisitingchats
                }
                return [newChat, ...exisitingchats]
            })
        }
        client_socket.bind('chat-updated', updateCallback);
        client_socket.bind('chat-deleted', deletedCallback);
        client_socket.bind('chat-created', createdCallback);

    }, [channel, router])
    return (
        <div className={`flex flex-col overflow-y-scroll message-section ${chatId.length != 0 ? 'm-0 sm:m-3' : 'sm:m-3'}`}>
            {initialChats.length === 0 && loader && <Loader />}
             {initialChats.map((chat) => {
                return <ChatBox chat = {chat} key={chat.id} lastMessage={chat.id === initialChats[initialChats.length - 1].id}/>
            })}
            
             
            
        </div>
    )
}