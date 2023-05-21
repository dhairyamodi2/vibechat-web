
import { ReactNode } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import {  ChatBox } from "./components/Chat";
import { getChats } from "../services/server-side/getChats";
import { useParams, usePathname, useRouter } from "next/navigation";

export default async function ChatLayout({children} : {children : ReactNode}){
    const chats = await getChats();
    return (
        <div className={`h-full grid md:grid-cols-9 lg:grid-cols-7`}>
        <div className="md:col-span-3 lg:col-span-2 ">
        <Sidebar>
            {chats.map((chat) => {
                return <ChatBox chat = {chat}/>
            })}
        </Sidebar>
        </div>
        <div className="h-full  md:col-span-6  lg:col-span-5 ">
            {children}
        </div>
    </div>
    )
}