import { Avatar } from "@/app/components/chat/Avatar"

export const Chat = function() {
    return (
        <div className="p-2 flex items-center my-3 rounded-xl hover:bg-gray-200 flex-1 cursor-pointer">
            <Avatar src=""></Avatar>
            <div className="flex-1 mx-3 my-1">
                <div className="flex flex-col">
                    <span className="text-lg font-bold">Dhairya Modi</span>
                    <span className="text-sm mt-0.5">Message</span>
                </div>    
            </div>
            <div >
                <span className="text-sm">11:10</span>
            </div>
        </div>
    )
}