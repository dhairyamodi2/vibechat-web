import OrmClient from "@/app/libs/ormconfig";
import { server_socket } from "@/app/libs/sockets";
import { getCurrentUser } from "@/app/services/server-side/getCurrentUser";
import { NextResponse } from "next/server";

interface Params {
    chatId : string
}
export async function PUT (req : Request, {params} : {params : Params} ) {
    try {
        const {chatId} = params;

        const currentUser = await getCurrentUser();
        if(!currentUser) {
            return NextResponse.json({success: false, message: 'Unauthorized'}, {status: 401})
        }

        if(!chatId){
            return NextResponse.json({success: false, message: '', data: null})
        }  

        const chat = await OrmClient.chat.findUnique({
            where: {
                id: chatId
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                        sender: true
                    }
                }
            }
        })

        // console.log(chat);
        if(!chat) {
            return NextResponse.json({success: false, message: 'Something wrong please refresh the page'});
        }
        if(chat.messages.length == 0) {
            return NextResponse.json({success: true, message: '', data: chat});
        }

        const recentMessage = chat.messages[chat.messages.length - 1];
        if(!recentMessage) {
            return NextResponse.json({success: true, message: '', data: chat});
        }
        // console.log(recentMessage);
        if(recentMessage.seenIds.indexOf(currentUser.id) !== -1) {
            return NextResponse.json({
                success: true,
                message: '',
                data: chat
            })
        }

        const updatedMessage = await OrmClient.message.update({
            where: {
                id : recentMessage.id
            },
            include: {
                seen: true,
                sender: true
            },
            data: {
                seen : {
                    connect : {
                        id: currentUser.id
                    }
                }
            }
        })
       
        await server_socket.trigger(chat.id, 'message-updated', updatedMessage);
        return NextResponse.json({
            success: true,
            message: '',
            data: chat
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'internal server error',
            data: null
        })
    }
}