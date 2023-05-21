import OrmClient from "@/app/libs/ormconfig";
import { getCurrentUser } from "./getCurrentUser"
import { ChatType } from "@/app/types/types";

export const getChatsById = async function (id : Array<string>) : Promise<ChatType | null> {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser || !currentUser.email) return null;
        // console.log(currentUser)
        if(!id || !id[0]) return null;
        const chat = await OrmClient.chat.findUnique({
            where: {
                id: id[0]
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                        sender: true
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                },
                
            }
        });
        // console.log(chat + id[0]);

        return chat;
    } catch (error) {
        console.log(error + 'server component getchatsbyid');
        return null;
    }
}