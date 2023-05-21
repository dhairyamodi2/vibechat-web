'use client'

import { Avatar } from "@/app/components/chat/Avatar"
import { useRecipent } from "@/app/hooks/useRecipent"
import { ChatType } from "@/app/types/types"
import Image from "next/image"
import {SlOptions} from 'react-icons/sl'


export const Header = function ({chat} : {chat: ChatType}) {
    const recipent = useRecipent(chat)
    return (
        <div>
            <div className="flex justify-between items-center cursor-pointer bg-gray-300 p-3">
                <div className="m-2">
                <Avatar src={`${recipent && recipent.image ? recipent.image : '/avatar.png'}`}></Avatar></div>
                <div className="flex flex-col flex-1 m-2">
                    <span className="font-bold">{recipent && recipent.name ? recipent.name : chat.name}</span>
                    <span className="font-light text-sm">Active</span>
                </div>
                <div className="m-2">
                <SlOptions></SlOptions>
                </div>
            </div>
        </div>
    )
}