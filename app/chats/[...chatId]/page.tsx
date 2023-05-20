import Image from "next/image";

export default function Chat() {
    return (
        <div className="h-full sm: hidden md:block">
            <div className="bg-gray-100 h-full flex items-center mx-auto w-full justify-center">
                <div>
                    <Image
                        alt="logo"
                        width={52}
                        height={52}
                        className="mx-auto w-auto my-3 "
                        src={"/vibechat.png"}
                    />
                    <span className="text-lg text-bold">This is different</span>
                </div>
            </div>
        </div>
    )
}