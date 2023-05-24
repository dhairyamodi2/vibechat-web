import { Chat, User } from "@prisma/client";
import { http } from "../libs/http";
import { ChatType, ResponseType } from "../types/types";
import { toast } from "react-hot-toast";


export const StartChat = async function (user : User, isGroup: boolean, members: Array<User>, userId: string, name: string | null) {
    try {
        const {data, status} = await http.post<ResponseType<Chat>>('/api/chat', JSON.stringify({
            userId, isGroup, members, name
        }));

        if(!data || !data.success) {
            toast.error(data.message ? data.message : "Internal Server Error");
            return null;
        }
        if(data.success) {
            return data;
        }
    } catch (error) {
        toast.error('Some error');
        return null;
    }
}


export const getChats = async function () {
    try {
        const {data, status} = await http.get<ResponseType<Array<ChatType>>>('/api/chat');
        if(data.success === true) {
            return data.data;
        }
        return []
    } catch (error) {
        return []
    }
}


export const getChatById = async function(chatId: string | undefined | null) {
    try {
        if(!chatId) {
            return null ;
        }
        const {data,status} = await http.get<ResponseType<ChatType>>(`/api/chat/${chatId}`);
        if(data.success === true && data.data) {
            return data.data
        }
        return null
    } catch (error) {
        return null
    }
}