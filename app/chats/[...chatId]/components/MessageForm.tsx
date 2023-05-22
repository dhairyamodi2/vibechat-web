'use client'
import { Input } from '@/app/components/input/Input'
import { useChat } from '@/app/hooks/useChat'
import { useState } from 'react'
import  {BsImage} from 'react-icons/bs'
import { RiSendPlaneFill } from 'react-icons/ri'
import {toast} from 'react-hot-toast'
import { http } from '@/app/libs/http'
export const MessageForm =  function () {
    const {chatId} = useChat();

    const [messageText, setMessageText] = useState('');
    const handleSend = function () {
        if(messageText.length === 0){
            toast.error("Message can't be empty!")
            return;
        }   
        alert(chatId)
        http.post('/api/messages', JSON.stringify({chatId: chatId, body: messageText}))
    }
    return (
        <div className="mt-3">
            <div className='flex flex-col'>
            <div className="flex items-center justify-center">
                <BsImage className='text-purple-600 mx-2' size={25}></BsImage>
                <input type='text' className='placeholder:text-sm bg-gray-100 p-2 rounded-lg flex-1 focus:border-none focus:outline-none' placeholder='Type Message' name='messageText' value={messageText} onChange={(e) => setMessageText(e.target.value)}>
                </input>
                <RiSendPlaneFill onClick={handleSend} className='text-purple-600 mx-2'  size={25}></RiSendPlaneFill>
            </div>
            <div className='flex 1'></div>
            </div>
        </div>
    )
}