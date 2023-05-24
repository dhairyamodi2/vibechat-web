import OrmClient from "@/app/libs/ormconfig";
import { server_socket } from "@/app/libs/sockets";
import { getCurrentUser } from "@/app/services/server-side/getCurrentUser";
import { NextResponse } from "next/server";

interface Params {
    chatId? : Array<string>
}
export async function DELETE(req : Request, {params} : {params : Params}) {
    try {
        const {chatId} = params;

        const currentUser = await getCurrentUser();
        if(!currentUser) {
            return NextResponse.json({success: false, message: 'Unauthorized'}, {status: 401})
        }


        if(!chatId || chatId.length === 0 ){
            return NextResponse.json({success: false, message: '', data: null})
        }  

        const chat = await OrmClient.chat.findUnique({
            where: {
                id: chatId[0]
            },
            include: {
                users: true
            }
        })

        if(!chat) {
            return NextResponse.json({success: false, message: 'Something wrong please refresh the page'});
        }

        const deletedChat = await OrmClient.chat.deleteMany({
            where: {
                id: chatId[0],
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })

        chat.users.map((user)=> {
            if(user.email) {
                server_socket.trigger(user.email, 'chat-deleted', chat)
            }
        })
        return NextResponse.json({
            success: true,
            message: 'Delete',
            data: deletedChat
        })

    } catch (error) {
        console.log(error + 'from delete');
        return NextResponse.json({
            success: false,
            message: 'Internal Server error',
            data: null
        })        
    }
}