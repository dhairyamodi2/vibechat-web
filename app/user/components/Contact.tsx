import { Avatar } from "@/app/components/chat/Avatar"
import {RxOpenInNewWindow} from 'react-icons/rx'
export const Contact = function() {
    return (
        <div className="p-2 flex items-center  bg-gray-100 my-3 rounded-xl hover:bg-purple-500 hover:text-white flex-1 cursor-pointer">
            <Avatar src=""></Avatar>
            <div className="flex-1 m-3">
            <span >Dhairya Modi</span>
            </div>
            <div>
                <RxOpenInNewWindow></RxOpenInNewWindow>
            </div>
        </div>
    )
}