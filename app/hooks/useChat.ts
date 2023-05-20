import { useParams } from "next/navigation"
import { useMemo } from "react";

export const useChat = function() {
    const params = useParams();
    const obj = useMemo(() => {
        if(!params?.chatId) {
            return {chatId : '', isOpen: false}
        }
        return {chatId: params.chatId, isOpen: !!params.chatId}
    }, [params])
    return obj
}