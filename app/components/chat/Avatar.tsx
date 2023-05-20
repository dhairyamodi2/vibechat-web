import Image from "next/image"

export const Avatar = function({src} : {src: string}) {
    return (
        <div>
            <Image alt="avatar" src={src} width={45} height={45} className="rounded-3xl
            "/>
        </div>
    )
}