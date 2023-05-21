import { getChats } from "@/app/services/server-side/getChats";
import { ChatBox } from "./Chat";

export const ChatList = async function () {
    const chats = await getChats();
    return (
        <div>
             {chats.map((chat) => {
                return <ChatBox chat = {chat}/>
            })}
        </div>
    )
}