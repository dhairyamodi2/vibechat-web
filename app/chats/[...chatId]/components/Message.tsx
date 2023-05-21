'use client'
import { Avatar } from "@/app/components/chat/Avatar";
import { MessageType } from "@/app/types/types";
import { useSession } from "next-auth/react";

export const Message = function ({ message }: { message: MessageType }) {
    const session = useSession();
    return (
        <div className="px-4 pt-3 sm:pb-4">
            <div className="">
                <div className={`flex items-start ${session.data?.user?.email === message.senderId ? 'justify-end' : ''}`}>
                    {session.data?.user?.email !== message.senderId &&
                        <div className="">
                            <Avatar src="/avatar.png" width={40} height={40}></Avatar>
                        </div>
                    }

                    <div className="flex flex-col">
                        <div className={`flex ${session.data?.user?.email === message.senderId ? 'justify-end' : ''} mx-3 items-center`}>
                            <span className="font-bold text-md">Radhu</span>
                            <span className="text-sm px-2">11:10</span>
                        </div>
                        <div className={`${session.data?.user?.email === message.senderId ? 'bg-purple-600 text-white' : 'bg-gray-200'}  p-4 my-2 ml-2 rounded-2xl flex justify-center max-w-xs md:max-w-sm w-auto text-md break-all`}>
                            {message.body}
                        </div>

                    </div>
                    {session.data?.user?.email === message.senderId &&
                        <div className="">
                            <Avatar src="/avatar.png" width={40} height={40}></Avatar>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}