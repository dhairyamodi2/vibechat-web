'use client'

import { Avatar } from "@/app/components/chat/Avatar"
import { ConfirmDelete } from "@/app/components/dialog/ConfirmDeleteDialog"
import { useRecipent } from "@/app/hooks/useRecipent"
import { ChatType } from "@/app/types/types"
import Image from "next/image"
import { useState } from "react"
import {RiChatDeleteFill} from 'react-icons/ri'


export const Header = function ({chat} : {chat: ChatType}) {
    const recipent = useRecipent(chat)

    const [open, setOpen] = useState(false);
    function closeModal () {
        setOpen(false);
    }
    return (
        <div>
            <div className="flex justify-between items-center cursor-pointer shadow-lg p-3">
                <div className="m-2">
                <Avatar src={`${recipent && recipent.image ? recipent.image : '/avatar.png'}`}></Avatar></div>
                <div className="flex flex-col flex-1 m-2">
                    <span className="font-bold">{recipent && recipent.name ? recipent.name : chat.name}</span>
                    <span className="font-light text-sm">Active</span>
                </div>
                <div className="m-2" onClick={() => setOpen(true)}>
                <RiChatDeleteFill className="text-purple-600 text-2xl"/>
                <ConfirmDelete chatId={chat.id} isOpen={open} closeModal={closeModal}/>
                </div>
            </div>
        </div>
    )
}