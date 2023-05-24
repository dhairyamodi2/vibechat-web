'use client'
import { Avatar } from "@/app/components/chat/Avatar";
import { ChatType, MessageType } from "@/app/types/types";
import { useSession } from "next-auth/react";
import { format } from 'date-fns';
import { IoCheckmarkDoneSharp } from 'react-icons/io5'
import { useRecipent } from "@/app/hooks/useRecipent";
export const Message = function ({ message, lastMessage, chat }: { message: MessageType, lastMessage: boolean, chat: ChatType }) {
    const session = useSession();

    const recipent = useRecipent(chat);
    return (
        <div className="px-4 pt-3 sm:pb-4">
            <div className="relative">
                <div className={`flex items-start ${session.data?.user?.email === message.sender.email ? 'justify-end' : ''}`}>
                    {session.data?.user?.email !== message.sender.email &&
                        <div className="">
                            <Avatar src={message.sender.image ? message.sender.image : '/avatar.png'} width={40} height={40}></Avatar>
                        </div>
                    }

                    <div className={`flex flex-col w-full ${message.sender.email !== session.data?.user?.email ? 'items-start' : 'items-end'}`}>
                        <div className={`flex ${session.data?.user?.email === message.sender.email ? 'justify-end' : ''} mx-3 items-center`}>
                            <span className="font-bold text-md">{message.sender.name}</span>
                            <span className="text-sm px-2">{format(new Date(message.createdAt), 'p')}</span>
                        </div>
                        <div className={`${session.data?.user?.email === message.sender.email ? 'bg-purple-600 text-white' : 'bg-gray-200'}  px-3 py-2 my-2 ml-2 rounded-lg flex justify-start items-end max-w-xs md:max-w-sm w-auto text-md break-all custom-max-width relative`}>
                            <span>{message.body}</span>

                        </div>
                        {session.data?.user?.email === message.sender.email &&
                        <div className={`text-xs h-full pl-1 ${lastMessage && message.seenIds.indexOf(recipent ? recipent.id : 'null') !== -1 ? 'visible' : 'invisible'}`}>
                            <span>Seen</span>
                        </div>

                    }

                    </div>
        
                    {session.data?.user?.email === message.sender.email &&
                        <div className="">
                            <Avatar src="/avatar.png" width={40} height={40}></Avatar>
                        </div>
                    }
                   
            

                </div>



            </div>
        </div>
    )
}