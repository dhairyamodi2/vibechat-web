import OrmClient from "@/app/libs/ormconfig";
import { getCurrentUser } from "./getCurrentUser";

export async function getMessages(chatId : Array<string>  ){
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) return []
        const messages = await OrmClient.message.findMany({
            where: {
                chatId: chatId[0]
            },
            include: {
                seen: true,
                sender: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        })
        return messages;
    } catch (error) {
        return []
    }
}