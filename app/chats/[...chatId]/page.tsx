import { getChatsById } from "@/app/services/server-side/getChatsById";
import Image from "next/image";
import { Header } from "./components/Header";
import { Messages } from "./components/Messages";
import { MessageForm } from "./components/MessageForm";
import { useRef } from "react";


export default async function Chat({params} : {params : {chatId: Array<string>}}) {
    console.log(params.chatId);
    const chat = await getChatsById(params.chatId);
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
        <div className="flex flex-col border-l-2 messages">
            <Header chat={chat}></Header>
            {/* <div> */}
            <Messages chat={chat} />
            {/* </div> */}
            
            <MessageForm />
            
        </div>
    )
}