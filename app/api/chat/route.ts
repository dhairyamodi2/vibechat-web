import { NewChat } from "@/app/libs/typeGuards";
import { getCurrentUser } from "@/app/services/server-side/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/ormconfig';
import { server_socket } from "@/app/libs/sockets";
import OrmClient from "@/app/libs/ormconfig";

export async function POST(req : Request){
    try {
        const user = await getCurrentUser();
        if(!user || !user.email || !user.id) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
                data: null
            }, {status: 401})
        }

        const {isGroup, userId, members, name} = await req.json() as NewChat;

        if(isGroup && (!members || members.length < 2 || !name)){
            return NextResponse.json({
                success: false,
                message: "A group requires more than 2 members",
                data: null
            }, {status: 422})
        }
        if(!userId) return NextResponse.json({success: false, message: "No recepent", data: null}, {status: 422})
        if(!isGroup){
            const existingChats = await prisma.chat.findMany({
                where: {
                    OR: [
                        {
                            userIds: {
                                equals: [userId, user.id]
                            }
                        },
                        {
                            userIds: {
                                equals: [user.id,userId]
                            }
                        }
                    ]
                }
            })
            if(existingChats.length > 0) {
                return NextResponse.json({
                    success: true,
                    message: '',
                    data: existingChats[0]
                })
            }
            const newChat = await prisma.chat.create({
                data: {
                    users: {
                        connect: [
                            {id: user.id}, {id: userId}
                        ]
                    }
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
            newChat.users.map((user) =>{
                if(user.email) {
                    server_socket.trigger(user.email, 'chat-created', newChat)
                }
            })
            return NextResponse.json({
                success: true,
                message: '',
                data: newChat
            })
        }

        return NextResponse.json({
            success: false,
            message: 'still upgrading',
            data: null
        })
        

    } catch (error) {
        console.log(error + 'coming from new chat');
        return NextResponse.json({
            success: false,
            message: "internal server error",
            data: null
        })
    }
}
export async function GET(req : Request) {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser || !currentUser.id) {
            return NextResponse.json({
                success: false,
                message: 'Unauthorized',
                data: null
            })
        }

        const chats = await OrmClient.chat.findMany({
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
        return NextResponse.json({
            success: true,
            message: '',
            data: chats
        })
    } catch (error) {
        console.log(error + 'coming from chats');
        return NextResponse.json({
            success: false,
            message: "internal server error",
            data: null
        })
    }
}