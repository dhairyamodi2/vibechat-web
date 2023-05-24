'use client'
import Image from "next/image";
import { Header } from "./components/Header";
import { Messages } from "./components/Messages";
import { MessageForm } from "./components/MessageForm";
import { useEffect, useRef, useState } from "react";
import { getMessages } from "@/app/services/server-side/getMessages";
import { useParams } from "next/navigation";
import { getChatById } from "@/app/services/chats";
import { ChatType } from "@/app/types/types";
import { Loader } from "@/app/components/Loader/Loader";


export default function Chat() {
    const params = useParams() as {chatId : string};
    const [loader, setLoader] = useState(false);
    const [chat, setChat] = useState<ChatType | null>(null);
    useEffect(() => {
        // alert(JSON.stringify(params));
        async function x() {
            setLoader(true);
            const res = await getChatById(params.chatId);
            if(res) {
                setChat(res);
            }
            setLoader(false);
        }
        x();
    }, [params.chatId])

    if(loader) {
        return <Loader />
    }
    if(!chat) {
        return (
            <div className="h-full sm:hidden md:block border-l-2">
                 <div className="bg-gray-100 h-full flex items-center mx-auto w-full justify-center">
                <div>
                    <Image
                        alt="logo"
                        width={52}
                        height={52}
                        className="mx-auto w-auto my-3 "
                        src={"/vibechat.png"}
                    />
                    <span className="text-lg text-bold">These are chats</span>
                </div>
            </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col border-l-2 messages h-full absolute w-full top-0 sm:relative">
            <Header chat={chat}></Header>
            {/* <div> */}
            <Messages chat={chat} />
            {/* </div> */}
            
            <MessageForm />
            
        </div>
    )
}