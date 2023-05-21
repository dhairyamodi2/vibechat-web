import { getSession, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { ChatType } from "../types/types";

export const useRecipent = function (chats: ChatType) {
    const router = useRouter();

    const currentUser = useSession();
    const recipent = useMemo(() => {
        const currentUserMail = currentUser.data?.user?.email;
        if (!currentUserMail) {
            router.push('/');
            return null;
        }
        const recipent = chats.users.filter((user) => user.email !== currentUserMail)
        return recipent[0]
    }, [chats, currentUser.data?.user?.email]);;
    return recipent;

}