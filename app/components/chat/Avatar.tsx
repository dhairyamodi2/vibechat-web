import Image from "next/image"

export const Avatar = function({src} : {src: string}) {
    return (
        <div>
            <Image alt="avatar" src={'/vibechat.png'} width={35} height={35} className="rounded-3xl
            "/>
        </div>
    )
}