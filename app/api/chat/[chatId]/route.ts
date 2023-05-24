import OrmClient from "@/app/libs/ormconfig";
import { server_socket } from "@/app/libs/sockets";
import { getCurrentUser } from "@/app/services/server-side/getCurrentUser";
import { NextResponse } from "next/server";

interface Params {
    chatId? : string
}


export async function GET(req : Request, {params} : {params : Params}) {
    try {
        const {chatId} = params;
        
        console.log(chatId);
        const currentUser = await getCurrentUser();
        if(!currentUser || !currentUser.email) {
            return NextResponse.json({
                success: false,
                message: '',
                data: null
            })
        }
        // console.log(currentUser)
        if(!chatId) {
            return NextResponse.json({
                success: false,
                message: '',
                data: null
            })
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
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                },
                
            }
        });

        return NextResponse.json({
            success: true,
            message: "",
            data: chat
        })
    } catch (error) {
        console.log(error + 'from chat by id');
        return NextResponse.json({
            success: false,
            message: 'Internal Server error',
            data: null
        })  
    }
}
export async function DELETE(req : Request, {params} : {params : Params}) {
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
                users: true
            }
        })

        if(!chat) {
            return NextResponse.json({success: false, message: 'Something wrong please refresh the page'});
        }

        const deletedChat = await OrmClient.chat.deleteMany({
            where: {
                id: chatId,
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