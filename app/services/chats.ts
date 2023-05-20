import { Chat, User } from "@prisma/client";
import { http } from "../libs/http";
import { ResponseType } from "../types/types";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

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