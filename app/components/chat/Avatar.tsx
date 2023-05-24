import Image from "next/image"

export const Avatar = function({src, width, height, onClick} : {src: string, width?: number, height?: number, onClick? : () => void}) {
    return (
        <div onClick={onClick ? onClick : () => {}}>
            <div className="inline-block relative rounded-3xl h-7 w-7 md:h-10 md:w-10 images">
            <Image alt="avatar" src={src} fill className="rounded-full"/>
            </div>
           
        </div>
    )
}