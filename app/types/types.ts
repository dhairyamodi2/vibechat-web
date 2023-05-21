import { Chat, User, Message } from "@prisma/client";

export interface AuthPostFields {
    name: string;
    email: string;
    password: string;
}


export interface ResponseType<T> {
    success: boolean;
    message: string;
    data: T | null
}


export type ChatType = Chat & {
    users: User[];
    messages: (Message & {
        sender: User;
        seen: User[];
    })[];
}


export type MessageType = Message & {
    sender: User;
    seen : User[]
}