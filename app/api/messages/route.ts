import OrmClient from "@/app/libs/ormconfig";
import { server_socket } from "@/app/libs/sockets";
import { getCurrentUser } from "@/app/services/server-side/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser || !currentUser.email || !currentUser.id) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized",
                data: null
            }, {status: 401})
        }

        const {body, image, chatId} = await req.json() as {body: string, image: string, chatId: string};

        if(!body || typeof(body) !== 'string' || body.length === 0 || !chatId) {
            return NextResponse.json({
                success: false,
                message: 'chat should exists and no empty body allowed',
                data: null
            }, {status: 422})
        }

        const newMessage = await OrmClient.message.create({
            data: {
                body: body,
                chat: {
                    connect: {id: chatId}
                },
                sender: {
                    connect: {id: currentUser.id}
                },
                seen: {
                    connect: {id : currentUser.id}
                }
            },
            include: {
                seen: true,
                sender: true
            }
        });

        console.log(newMessage)
        const updatedChat = await OrmClient.chat.update({
            where: {
                id : chatId
            },
            data: {
                messages: {
                    connect: {
                        id: newMessage.id
                    }
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
        console.log(updatedChat);
        await server_socket.trigger(chatId, 'new-message', newMessage);


        const recentMessage = updatedChat.messages[updatedChat.messages.length - 1];

        updatedChat.users.map((user) => {
            server_socket.trigger(user.email!, 'chat-updated', {
                id: chatId,
                messages: [recentMessage]
            })
        })

        return NextResponse.json({
            success: true,
            message: '',
            data: newMessage
        }, {status: 201})
    } catch (error) {
        console.log(error + 'from creating messages');
        return NextResponse.json({
            success: false,
            message: 'Internal server error',
            data: null
        }, {status: 500})
    }
}