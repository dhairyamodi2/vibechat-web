'use client'
import { Input } from '@/app/components/input/Input'
import { useChat } from '@/app/hooks/useChat'
import { FormEventHandler, useEffect, useRef, useState } from 'react'
import  {BsImage} from 'react-icons/bs'
import { RiSendPlaneFill } from 'react-icons/ri'
import {toast} from 'react-hot-toast'
import { http } from '@/app/libs/http'

export const MessageForm =  function () {
    const {chatId} = useChat();
    const lastdiv = useRef<HTMLDivElement>(null)
    const [messageText, setMessageText] = useState('');

    // useEffect(() => {
    //     lastdiv.current?.scrollIntoView()
    // }, [chatId])
    const handleSend : FormEventHandler = function (e) {
        e.preventDefault();
        if(messageText.length === 0){
            toast.error("Message can't be empty!")
            return;
        }   
        // alert(chatId)
        http.post('/api/messages', JSON.stringify({chatId: chatId, body: messageText}));
        
        setMessageText('');
    }
    return (
        <div className="mt-4 mb-3">
            <div className='flex flex-col'>
            <div className="flex items-center justify-between text-xl">
                <BsImage className='text-purple-600 mx-2' size={25} onClick={() => {
                    toast.error('This functionality is yet to be implemented', {position: 'bottom-center', duration: 3000 })
                }}></BsImage>
                <form className='flex w-full' onSubmit={handleSend}>
                <input type='text' className='placeholder:text-sm bg-gray-100 p-2 rounded-lg flex-1 focus:border-none focus:outline-none flex-1' placeholder='Type Message' name='messageText' value={messageText} autoComplete={'off'} onChange={(e) => setMessageText(e.target.value)}>
                </input>
                </form>
                <button><RiSendPlaneFill onClick={handleSend} className='text-purple-600 mx-2'  size={25}></RiSendPlaneFill></button>
                
            </div>
            <div className='flex-1' ref={lastdiv}></div>
            </div>
        </div>
    )
}