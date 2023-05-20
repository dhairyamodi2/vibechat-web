import Image from "next/image";

export default function User() {
    return (
        <div className="hidden md:grid lg:pl-80 md:pl-64 h-full">
            <div className="bg-gray-100 h-full flex items-center mx-auto w-full justify-center">
                <div>
                <Image alt="logo" width={52} height={52} className="mx-auto w-auto my-3 " src={'/vibechat.png'}/>
                <span className="text-lg text-bold">Select a Chat</span>
                </div>
            
            </div>
        </div>
    )
}