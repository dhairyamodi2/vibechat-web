import Image from "next/image"
import { BsChatDots } from "react-icons/bs"
import { RiContactsLine } from "react-icons/ri"

export const Navbar = function() {

    return (

        // <div className="fixed flex w-full lg:w-80 md:w-64 px-4 items-center justify-between py-4">
        //     <Image alt="profile" src={'/vibechat.png'} width={35} height={35} className="rounded-3xl"></Image>
        //     <div className="p-3 w-full text-2xl md:text-lg  text-center md:text-left "><span>Users</span></div>
            

        //     <div className="flex">
        //     <BsChatDots className="text-4xl p-2 mx-2 md:text-4xl md:p-2 md:mx-1 bg-gray-200 rounded-lg hover:bg-purple-600 hover:text-white"></BsChatDots>
        //     <RiContactsLine className="text-4xl p-2 mx-2 md:text-4xl md:p-2 md:mx-1 bg-gray-200 rounded-lg hover:bg-purple-600 hover:text-white"></RiContactsLine>
        //     </div>
        // </div>

        <div className="flex justify-between p-3 md:p-1 lg:p-2  m-1 ">
            <Image alt="profile" src={'/vibechat.png'} width={35} height={35} className="rounded-3xl"></Image>
            <div className="p-1 mx-1 w-full text-2xl md:text-lg text-center md:text-left"><span className="mx-1">Users</span></div>
            

            <div className="flex">
            <BsChatDots className="text-4xl p-2 mx-2 md:text-4xl md:p-2 md:mx-1 bg-gray-200 rounded-lg hover:bg-purple-600 hover:text-white"></BsChatDots>
            <RiContactsLine className="text-4xl p-2 mx-2 md:text-4xl md:p-2 md:mx-1 bg-gray-200 rounded-lg hover:bg-purple-600 hover:text-white"></RiContactsLine>
            </div>
        </div>
    )
}