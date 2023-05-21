import { getCurrentUser } from "./getCurrentUser"
import prisma from '@/app/libs/ormconfig';

export const getChats = async function () {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser || !currentUser.id) {
            return []
        }

        const chats = await prisma.chat.findMany({
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        })
        return chats;
    } catch (error) {
        console.log(error + 'server-components getchats')
        return []
    }
}