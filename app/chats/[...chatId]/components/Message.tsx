'use client'
import { Avatar } from "@/app/components/chat/Avatar";
import { MessageType } from "@/app/types/types";
import { useSession } from "next-auth/react";
import {format} from 'date-fns';

export const Message = function ({ message }: { message: MessageType }) {
    const session = useSession();

    
    return (
        <div className="px-4 pt-3 sm:pb-4">
            <div className="">
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
                        <div className={`${session.data?.user?.email === message.sender.email ? 'bg-purple-600 text-white' : 'bg-gray-200'}  p-4 my-2 ml-2 rounded-2xl flex justify-start items-end max-w-xs md:max-w-sm w-auto text-md break-all`}>
                            {message.body}
                        </div>

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